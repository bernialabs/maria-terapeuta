# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/landing site for **Maria Alejandra Ovalle**, a sex and couples therapist (terapeuta en sexologia y terapia de pareja). Content is in Spanish. The site also has a sub-page for **Diadica** (`/diadica`), a companion couples-therapy app.

## Commands

```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # ESLint
```

Package manager is **pnpm**.

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** — no `tailwind.config.ts`; theme is configured via CSS custom properties in `app/globals.css` using `@theme inline {}`
- **shadcn/ui** (new-york style) — components in `components/ui/` are auto-generated, do not edit manually
- **Fonts**: Cormorant Garamond (`font-serif`, headings) + Poppins (`font-sans`, body) via `next/font/google`
- No backend or database — fully static site. All CTAs redirect to WhatsApp. Quizzes are embedded Google Forms.

## Architecture

### Routing

| Route | Purpose |
|-------|---------|
| `/` | Main landing page (assembles section components from `components/`) |
| `/diadica` | Diadica app landing page |
| `/test-parejas` | Quiz index |
| `/test-parejas/monotonia` | Embedded Google Form quiz |
| `/test-parejas/lenguaje-del-amor` | Embedded Google Form quiz |
| `/blog` | Placeholder (coming soon) |

### Component Conventions

- Route files in `app/` are Server Components; interactive components use `"use client"`
- `Header` and `Footer` accept `variant?: "default" | "diadica"` to switch branding between the main site and Diadica sub-brand
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes (clsx + tailwind-merge)
- Path alias: `@/*` maps to project root

### Styling

- Color palette: coral-red primary (`#FA523C`), orange-red secondary (`#F26749`), warm cream background (`#FAF2E8`)
- All theme tokens defined in `app/globals.css`
- Images are unoptimized (`next.config.mjs` sets `images.unoptimized: true`)

## Pending Assets

- **Hero and about images** — `public/images/maria-alejandra-1.jpeg` and `maria-alejandra-2.jpeg` need to be added (referenced by `hero.tsx` and `about.tsx`)
- **Service images** — `services.tsx` uses Lucide icons as fallback; add an `image` property to each service entry to display photos instead

## No Environment Variables Required

No `.env` files or `process.env` references exist. Everything is client-side links/iframes.
