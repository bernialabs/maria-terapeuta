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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    VALID_PATHS.has(pathname) ||
    ALLOWED_EXACT.has(pathname) ||
    ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return NextResponse.next()
  }

  return new NextResponse(null, { status: 410 })
}

export const config = {
  matcher: "/((?!_next/static|_next/image|_next/webpack).*)",
}
