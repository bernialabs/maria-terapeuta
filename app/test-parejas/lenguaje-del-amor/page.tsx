import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "¿Cuál es mi lenguaje del amor? | Test Gratuito",
  description:
    "Identifica cómo expresas y necesitas recibir amor. Conocer tu lenguaje emocional transformará la forma en que te conectas con tu pareja.",
}

export default function LenguajeDelAmorTestPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-20 px-4">
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
              {"¿Cuál es mi "}
              <span className="font-semibold text-secondary">{"lenguaje del amor"}</span>
              {" para dar y recibir?"}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {"Descubre la forma en que expresas cariño y lo que realmente necesitas sentir de tu pareja."}
            </p>
          </div>

          <div className="w-full rounded-lg overflow-hidden border border-border shadow-sm bg-card">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe5RgYqC6rV5wel-GtwstWsob9CdUhHnbxVJG09a5U0dj0EMQ/viewform?embedded=true"
              width="100%"
              height="800"
              className="w-full min-h-[600px] md:min-h-[800px]"
              title="Test: ¿Cuál es mi lenguaje del amor para dar y recibir?"
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
