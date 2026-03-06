import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Test de Monotonía en la Pareja — Gratis",
  description:
    "Descubre si la rutina se ha apoderado de tu relación y encuentra claves para reavivar la chispa con este test gratuito para parejas.",
  alternates: {
    canonical: "https://mariaterapeuta.com/test-parejas/monotonia",
  },
  openGraph: {
    title: "Test de Monotonía en la Pareja — Gratis",
    description:
      "Descubre si la rutina se ha apoderado de tu relación y encuentra claves para reavivar la chispa con este test gratuito para parejas.",
    url: "https://mariaterapeuta.com/test-parejas/monotonia",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Test de Monotonía en la Pareja — Gratis",
    description:
      "Descubre si la rutina se ha apoderado de tu relación y encuentra claves para reavivar la chispa con este test gratuito para parejas.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mariaterapeuta.com" },
        { "@type": "ListItem", position: 2, name: "Test Parejas", item: "https://mariaterapeuta.com/test-parejas" },
        { "@type": "ListItem", position: 3, name: "Test de Monotonía en la Pareja" },
      ],
    },
    {
      "@type": "LearningResource",
      learningResourceType: "Quiz",
      name: "Test de Monotonía en la Pareja",
      description: "Descubre si la rutina se ha apoderado de tu relación y encuentra claves para reavivar la chispa.",
      url: "https://mariaterapeuta.com/test-parejas/monotonia",
      inLanguage: "es",
    },
  ],
}

export default function MonotoniaTestPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20 px-4">
        <script
          type="application/ld+json"
          // JSON-LD structured data — static, trusted content, no user input
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/test-parejas"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver a Test Parejas
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight text-balance mb-4">
              {"¿Tu relación cayó en la "}
              <span className="font-semibold text-secondary">{"monotonía"}</span>
              {"?"}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {"Responde con sinceridad para descubrir si la rutina ha opacado la conexión en tu relación."}
            </p>
          </div>

          <div className="w-full rounded-lg overflow-hidden border border-border shadow-sm bg-card">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfoomJfvfqloctJsKI4tzOJReL7_2wdbwg4d_IX8cG4n9fnUg/viewform?embedded=true"
              width="100%"
              height="800"
              className="w-full min-h-[600px] md:min-h-[800px]"
              title="Test: ¿Tu relación cayó en la monotonía?"
              loading="lazy"
              allowFullScreen
            >
              Cargando formulario...
            </iframe>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
