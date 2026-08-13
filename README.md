# Maria Terapeuta

Marketing and landing site for **María Alejandra Ovalle**, a therapist specialising in
sexology and couples therapy. Content is in Spanish. Live at
[mariaterapeuta.com](https://mariaterapeuta.com).

The site also hosts a sub-page for **Diadica** (`/diadica`), a companion couples-therapy app.

## Getting Started

Package manager is **pnpm**.

```bash
pnpm install
pnpm dev      # dev server on localhost:3000
```

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config in `eslint.config.mjs`) |

No `.env` file is needed — there are no environment variables and no `process.env`
references anywhere in the project.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** — no `tailwind.config.ts`; theme tokens live in `app/globals.css`
  under `@theme inline {}`
- **shadcn/ui** (new-york style) — `components/ui/` and `hooks/` are generated, not
  hand-edited
- **Fonts**: Cormorant Garamond (headings) and Poppins (body), via `next/font/google`

There is no backend and no database. The site is fully static: every CTA links to WhatsApp,
and the quizzes are embedded Google Forms.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Main landing page |
| `/diadica` | Diadica app landing page |
| `/test-parejas` | Quiz index |
| `/test-parejas/monotonia` | Embedded Google Form quiz |
| `/test-parejas/lenguaje-del-amor` | Embedded Google Form quiz |
| `/blog` | Placeholder (`noindex`) |

## `proxy.ts` — please read before adding files

`proxy.ts` (the `proxy` file convention, renamed from `middleware` in Next 16) gates every
request. The domain previously ran a WordPress install that was hacked, leaving well over a
million spam URLs in Google's index. Anything outside the allowlist returns **410 Gone** to
crawlers — a faster deindex signal than 404 — while humans fall through to the normal 404
page.

This means **new routes must be added to `VALID_PATHS`**, and **new files under `public/`
outside `/images/` must be added to `ALLOWED_EXACT`**. Otherwise they return 410 to
Googlebot while looking perfectly fine in your browser, since the 410 is gated on the
user-agent.

See `CLAUDE.md` for the fuller architecture notes.
