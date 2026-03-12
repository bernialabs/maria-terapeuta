import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// All .html URLs are legacy spam from a previous WordPress hack.
// Return 410 Gone (faster deindex signal than 404) for all of them.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith(".html")) {
    return new NextResponse(null, { status: 410 })
  }
}

export const config = {
  matcher: "/:path*.html",
}
