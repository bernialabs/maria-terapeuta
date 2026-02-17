"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body className="font-sans antialiased">
      <Suspense fallback={null}>{children}</Suspense>
      <Analytics />
    </body>
  )
}
