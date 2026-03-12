#!/usr/bin/env node
/**
 * GSC URL Export + Sitemap Generator
 *
 * Usage: node scripts/gsc-export.mjs
 *
 * First run: prints an OAuth2 URL — open it in your browser, authorize, then
 *            the script captures the callback automatically and saves a token.
 * Subsequent runs: reuses scripts/token.json automatically.
 */

import fs from 'fs';
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Configuration ────────────────────────────────────────────────────────────

const GSC_PROPERTY = 'sc-domain:mariaterapeuta.com';

const VALID_PATHS = new Set([
  '/',
  '/diadica',
  '/test-parejas',
  '/test-parejas/monotonia',
  '/test-parejas/lenguaje-del-amor',
  '/blog',
]);

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');
const OUTPUT_DIR = path.join(__dirname, 'output');
const URLS_TXT = path.join(OUTPUT_DIR, 'urls.txt');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

const AUTH_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

// GSC date range: last 16 months (max retention).
// Fix: build startDate from explicit year/month math to avoid day-of-month
// overflow (e.g. Jan 31 − 1 month would roll to Mar 3 in some engines).
const endDate = new Date();
const _sd = new Date();
_sd.setUTCDate(1);
_sd.setUTCMonth(_sd.getUTCMonth() - 16);
const startDate = _sd;
const fmt = (d) => d.toISOString().slice(0, 10);

// ── OAuth2 helpers ────────────────────────────────────────────────────────────

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(
      `\n❌  credentials.json not found at ${CREDENTIALS_PATH}\n\n` +
        '    Steps to set up:\n' +
        '    1. Go to Google Cloud Console → APIs & Services → Credentials\n' +
        '    2. Create an OAuth 2.0 Client ID (Desktop app)\n' +
        '    3. Download the JSON and save it as scripts/credentials.json\n' +
        '    4. Enable the "Google Search Console API" in your project\n'
    );
    process.exit(1);
  }

  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  } catch (e) {
    console.error(`❌  credentials.json is not valid JSON: ${e.message}`);
    process.exit(1);
  }

  const creds = raw.installed ?? raw.web;
  if (!creds || !creds.client_id || !creds.client_secret) {
    console.error(
      '❌  credentials.json does not contain a recognised OAuth2 client.\n' +
        '    Expected a top-level "installed" or "web" key with client_id/client_secret.'
    );
    process.exit(1);
  }
  return creds;
}

function saveToken(tokens) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), { mode: 0o600 });
}

async function getAuthenticatedClient(credentials) {
  const { client_id, client_secret } = credentials;
  const redirectUri = 'http://localhost:3456/oauth2callback';

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);

  // Persist any token rotations the library performs automatically.
  oAuth2Client.on('tokens', (tokens) => {
    // Merge with existing saved token so refresh_token is preserved when
    // Google omits it from subsequent refresh responses.
    let merged = tokens;
    if (fs.existsSync(TOKEN_PATH)) {
      try {
        const existing = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
        merged = { ...existing, ...tokens };
      } catch {
        // ignore — just overwrite
      }
    }
    saveToken(merged);
  });

  // Reuse saved token if available — the library refreshes automatically.
  if (fs.existsSync(TOKEN_PATH)) {
    let token;
    try {
      token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    } catch (e) {
      console.error(`❌  token.json is not valid JSON: ${e.message}`);
      process.exit(1);
    }
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // First run: print auth URL for manual browser open.
  const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('\n🔐  Open this URL in your browser to authorize:\n');
  console.log('   ', authUrl, '\n');

  // Spin up a local server to capture the auth code.
  const code = await new Promise((resolve, reject) => {
    let settled = false;
    const done = (fn, val) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      server.close();
      fn(val);
    };

    const timer = setTimeout(
      () => done(reject, new Error('Timed out waiting for OAuth2 callback (5 min)')),
      AUTH_TIMEOUT_MS
    );

    const server = createServer((req, res) => {
      const url = new URL(req.url, 'http://localhost:3456');

      // Ignore ancillary browser requests (favicon, etc.)
      if (url.pathname !== '/oauth2callback') {
        res.writeHead(204).end();
        return;
      }

      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (code) {
        // Flush response before closing the server.
        res.end('<h2>Authorized! You can close this tab.</h2>', () => done(resolve, code));
      } else {
        const msg = error ? `OAuth error: ${error}` : 'No authorization code received.';
        res.end(`<h2>${msg}</h2>`, () => done(reject, new Error(msg)));
      }
    });

    server.listen(3456, () => console.log('⏳  Waiting for OAuth2 callback on port 3456…'));
    server.on('error', (err) => done(reject, err));
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  saveToken(tokens);
  console.log(`✅  Token saved to ${TOKEN_PATH}`);

  return oAuth2Client;
}

// ── GSC query ────────────────────────────────────────────────────────────────

async function fetchAllUrls(auth) {
  const webmasters = google.webmasters({ version: 'v3', auth });
  const urls = new Set();
  let startRow = 0;
  const ROW_LIMIT = 25000;

  console.log(`\n📡  Fetching GSC data for ${GSC_PROPERTY}`);
  console.log(`    Date range: ${fmt(startDate)} → ${fmt(endDate)}\n`);

  while (true) {
    process.stdout.write(`    startRow=${startRow} … `);

    let res;
    try {
      res = await webmasters.searchanalytics.query({
        siteUrl: GSC_PROPERTY,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['page'],
          rowLimit: ROW_LIMIT,
          startRow,
        },
      });
    } catch (err) {
      const status = err.status ?? err.code;
      if (status === 403) {
        console.error(
          `\n❌  GSC returned 403 Forbidden.\n` +
            `    Make sure the Google account you authorized has access to the property:\n` +
            `    ${GSC_PROPERTY}\n` +
            `    Also verify the property URL format — GSC distinguishes between\n` +
            `    "https://mariaterapeuta.com/" and "sc-domain:mariaterapeuta.com".`
        );
        process.exit(1);
      }
      if (status === 429) {
        console.error('\n❌  GSC rate limit hit (429). Wait a few minutes and retry.');
        process.exit(1);
      }
      throw err;
    }

    const rows = res.data.rows ?? [];
    console.log(`${rows.length} rows`);

    for (const row of rows) {
      urls.add(row.keys[0]);
    }

    if (rows.length < ROW_LIMIT) break;
    startRow += ROW_LIMIT;
  }

  return urls;
}

// ── Sitemap helpers ───────────────────────────────────────────────────────────

function escapeXml(str) {
  // '&' must be replaced first to avoid double-escaping other sequences.
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(urls) {
  const urlEntries = urls
    .map((u) => `  <url>\n    <loc>${escapeXml(u)}</loc>\n  </url>`)
    .join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urlEntries +
    '\n</urlset>\n'
  );
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Step 1: Auth
  const credentials = loadCredentials();
  const auth = await getAuthenticatedClient(credentials);

  // Step 2: Fetch all URLs from GSC
  const allUrls = await fetchAllUrls(auth);
  console.log(`\n📊  Total unique URLs from GSC: ${allUrls.size}`);

  // Step 3: Write deduped URL list
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const sortedUrls = [...allUrls].sort();
  fs.writeFileSync(URLS_TXT, sortedUrls.join('\n') + '\n');
  console.log(`💾  Wrote ${sortedUrls.length} URLs to ${URLS_TXT}`);

  // Step 4: Filter spam URLs and write sitemaps
  const spamUrls = sortedUrls.filter((url) => {
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname.replace(/\/$/, '') || '/';
      return !VALID_PATHS.has(pathname);
    } catch {
      return true; // malformed URL — include it
    }
  });

  console.log(`\n🗑️   Spam/unknown URLs to deindex: ${spamUrls.length}`);

  // Remove any existing spam-cleanup sitemaps
  if (fs.existsSync(PUBLIC_DIR)) {
    const existingFiles = fs
      .readdirSync(PUBLIC_DIR)
      .filter((f) => f.startsWith('spam-cleanup-sitemap'));
    for (const f of existingFiles) {
      fs.unlinkSync(path.join(PUBLIC_DIR, f));
      console.log(`🗑️   Removed old sitemap: ${f}`);
    }
  } else {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  if (spamUrls.length === 0) {
    console.log('✅  No spam URLs found — no sitemaps written.');
    return;
  }

  const BATCH_SIZE = 50_000;
  const batches = chunkArray(spamUrls, BATCH_SIZE);

  for (let i = 0; i < batches.length; i++) {
    const filename =
      batches.length === 1
        ? 'spam-cleanup-sitemap.xml'
        : `spam-cleanup-sitemap-${i + 1}.xml`;
    const outPath = path.join(PUBLIC_DIR, filename);
    fs.writeFileSync(outPath, buildSitemap(batches[i]));
    console.log(`📄  Wrote ${batches[i].length} URLs to public/${filename}`);
  }

  console.log('\n✅  Done!');
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message ?? err);
  process.exit(1);
});
