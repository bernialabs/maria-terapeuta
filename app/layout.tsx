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
  title: "Dra. Márcia Mendonça - Odontologia Estética e Reabilitação Oral | Pinheiros, São Paulo",
  description:
    "Cirurgiã-dentista especializada em Implantodontia e Prótese Dentária. Mais de 11 anos transformando sorrisos com planejamento digital, implantes, facetas e lentes de contato dental em Pinheiros, SP.",
  keywords:
    "odontologia estética, implantodontia, prótese dentária, dentista pinheiros, lentes de contato dental, facetas, implantes dentários, clareamento dental, harmonização facial, ortodontia, reabilitação oral",
  openGraph: {
    title: "Dra. Márcia Mendonça - Odontologia Estética e Reabilitação Oral",
    description:
      "Especialista em Implantodontia e Prótese Dentária com mais de 11 anos de experiência em Pinheiros, São Paulo",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.app'
}

// Root layout component for the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "Dra. Márcia Mendonça - Odontologia Estética e Reabilitação Oral",
              description: "Especialista em Implantodontia e Prótese Dentária",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rua Teodoro Sampaio, 352 - cj 14",
                addressLocality: "Pinheiros",
                addressRegion: "SP",
                postalCode: "05406-000",
                addressCountry: "BR",
              },
              priceRange: "$$$",
            }),
          }}
        />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
