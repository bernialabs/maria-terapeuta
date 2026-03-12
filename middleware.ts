import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Valid pages on this site. Everything else is legacy spam from a previous
// WordPress hack and should return 410 Gone (faster deindex than 404).
const VALID_PATHS = new Set([
  "/",
  "/diadica",
  "/test-parejas",
  "/test-parejas/monotonia",
  "/test-parejas/lenguaje-del-amor",
  "/blog",
])

// Path prefixes that must pass through to Next.js internals / static assets.
const ALLOWED_PREFIXES = [
  "/_next/",
  "/images/",
  "/api/",
  "/.well-known/",
]

const ALLOWED_EXACT = new Set([
  "/favicon.ico",
  "/icon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/spam-cleanup-sitemap.xml",
])

const BOT_UA_RE = /bot|crawl|spider|google|bing|yandex|baidu|slurp/i

export function middleware(request: NextRequest) {
  const raw = request.nextUrl.pathname
  // Normalize trailing slash so /diadica/ matches /diadica in VALID_PATHS.
  // Keep "/" as-is to avoid reducing it to an empty string.
  const pathname = raw.length > 1 ? raw.replace(/\/$/, "") : raw

  if (
    VALID_PATHS.has(pathname) ||
    ALLOWED_EXACT.has(pathname) ||
    ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    // Next.js App Router serves opengraph-image.tsx as a route for each page.
    pathname.endsWith("/opengraph-image")
  ) {
    return NextResponse.next()
  }

  // Return 410 Gone to crawlers (faster deindex signal).
  // Let humans through to Next.js, which renders the 404 page.
  const ua = request.headers.get("user-agent") ?? ""
  const isBot = BOT_UA_RE.test(ua)
  if (isBot) {
    return new NextResponse(null, { status: 410 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|_next/image|_next/webpack).*)",
}
