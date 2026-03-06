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

const siteDescription =
  "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual. Acompañamiento individual y de pareja para construir relaciones más sanas, conscientes y satisfactorias."

export const metadata: Metadata = {
  metadataBase: new URL("https://mariaterapeuta.com"),
  title: {
    default: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
    template: "%s | María Terapeuta",
  },
  description: siteDescription,
  keywords:
    "terapia de pareja, sexología, terapeuta sexual, terapia sexual, terapia cognitivo-conductual, relaciones de pareja, sexóloga, terapia individual",
  alternates: {
    canonical: "https://mariaterapeuta.com",
  },
  openGraph: {
    title: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
    description:
      "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual. Acompañamiento individual y de pareja.",
    url: "https://mariaterapeuta.com",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
    description:
      "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual. Acompañamiento individual y de pareja.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://mariaterapeuta.com/#service",
      name: "María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja",
      description:
        "Terapeuta especializada en terapia sexual y de pareja con enfoque cognitivo-conductual.",
      telephone: "+34 666 90 59 70",
      email: "consulta.mariaterapeuta@gmail.com",
      url: "https://mariaterapeuta.com",
      priceRange: "€35-€55 por sesión",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "12:00",
          closes: "17:00",
        },
      ],
      areaServed: ["España", "Latinoamérica"],
      availableLanguage: "Spanish",
      sameAs: [
        "https://www.instagram.com/diadicaoficial",
        "https://www.tiktok.com/@diadicaoficial",
        "https://www.linkedin.com/in/ma-alejandra-ovalle-zuleta-8135a2124",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Terapia",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Terapia Individual",
              description:
                "Acompañamiento individual con enfoque cognitivo-conductual para trabajar la sexualidad y el bienestar emocional.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Terapia de Pareja",
              description:
                "Sesiones para parejas que desean mejorar su comunicación, resolver conflictos y fortalecer su vínculo.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sexología Clínica",
              description:
                "Terapia especializada en sexología para abordar disfunciones sexuales, identidad y expresión de la sexualidad.",
            },
          },
        ],
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+34 666 90 59 70",
        contactOption: "TollFree",
        availableLanguage: "Spanish",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Person",
      "@id": "https://mariaterapeuta.com/#person",
      name: "María Alejandra Ovalle",
      jobTitle: "Terapeuta en Sexología y Terapia de Pareja",
      url: "https://mariaterapeuta.com",
      sameAs: [
        "https://www.instagram.com/diadicaoficial",
        "https://www.linkedin.com/in/ma-alejandra-ovalle-zuleta-8135a2124",
        "https://www.tiktok.com/@diadicaoficial",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://mariaterapeuta.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es la terapia cognitivo-conductual?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La terapia cognitivo-conductual (TCC) es un enfoque psicológico que trabaja la relación entre pensamientos, emociones y conductas. Ayuda a identificar y cambiar patrones de pensamiento negativos que afectan el bienestar emocional y las relaciones.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuándo es recomendable ir a terapia de pareja?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La terapia de pareja se recomienda cuando algo no está bien para uno o ambos miembros de la pareja, no solo como último recurso. Conflictos repetitivos, falta de comunicación, distancia emocional o sexual, o simplemente el deseo de fortalecer el vínculo son motivos válidos para comenzar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta una sesión de terapia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Las sesiones tienen un precio de entre €35 y €55 dependiendo del tipo de terapia (individual o de pareja). Puedes consultar tarifas exactas contactando directamente por WhatsApp.",
          },
        },
        {
          "@type": "Question",
          name: "¿Las sesiones son online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, todas las sesiones se realizan online, lo que permite atender a personas en España y Latinoamérica desde la comodidad de su hogar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es la sexología?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La sexología es la ciencia que estudia la sexualidad humana en todas sus dimensiones: biológica, psicológica y social. En consulta, aborda disfunciones sexuales, identidad, deseo, y el desarrollo de una sexualidad consciente y satisfactoria.",
          },
        },
      ],
    },
  ],
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
          // JSON-LD structured data — static, trusted content, no user input
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}
