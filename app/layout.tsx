import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Poppins } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
  description:
    "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual. Acompañamiento individual y de pareja para construir relaciones más sanas, conscientes y satisfactorias.",
  keywords:
    "terapia de pareja, sexología, terapeuta sexual, terapia sexual, terapia cognitivo-conductual, relaciones de pareja, sexóloga, terapia individual",
  openGraph: {
    title: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
    description:
      "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual. Acompañamiento individual y de pareja.",
    type: "website",
    locale: "es_ES",
  },
}

// Root layout component for the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
              description:
                "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual.",
              telephone: "+34 666 90 59 70",
              email: "consulta.mariaterapeuta@gmail.com",
              url: "https://www.diadica.com/",
            }),
          }}
        />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
