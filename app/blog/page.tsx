import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Blog | Terapia y Sexología",
  description:
    "Artículos y recursos sobre terapia de pareja, sexología y bienestar emocional.",
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-balance mb-6">
              Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {"Contenido próximamente disponible."}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
