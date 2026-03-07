import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import DiadicaContent from "@/components/diadica-content"

export const metadata: Metadata = {
  title: "Diadica — La App de Terapia para Parejas",
  description:
    "Diadica combina psicología y tecnología para ofrecer actividades terapéuticas personalizadas que fortalecen tu relación de pareja.",
  alternates: {
    canonical: "https://mariaterapeuta.com/diadica",
  },
  openGraph: {
    title: "Diadica — La App de Terapia para Parejas",
    description:
      "Diadica combina psicología y tecnología para ofrecer actividades terapéuticas personalizadas que fortalecen tu relación de pareja.",
    url: "https://mariaterapeuta.com/diadica",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diadica — La App de Terapia para Parejas",
    description:
      "Diadica combina psicología y tecnología para ofrecer actividades terapéuticas personalizadas que fortalecen tu relación de pareja.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Diadica",
  description:
    "Aplicación que combina psicología cognitivo-conductual y tecnología para ofrecer actividades terapéuticas personalizadas para parejas.",
  url: "https://www.diadica.com/",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Prueba gratuita disponible",
  },
  creator: {
    "@type": "Person",
    "@id": "https://mariaterapeuta.com/#person",
    name: "María Alejandra Ovalle",
    jobTitle: "Terapeuta en Sexología y Terapia de Pareja",
  },
}

export default function DiadicaPage() {
  return (
    <>
      <Header variant="diadica" />
      <main>
        <script
          type="application/ld+json"
          // JSON-LD structured data — static, trusted content, no user input
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DiadicaContent />
      </main>
      <Footer variant="diadica" />
      <WhatsAppButton />
    </>
  )
}
