import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="text-8xl md:text-9xl font-serif font-light text-primary/20 leading-none mb-6">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-light leading-tight mb-4">
            Esta página{" "}
            <span className="font-semibold text-secondary">no existe</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            El enlace que seguiste puede estar roto o la página ya no existe. Puedes volver al inicio o contactarme directamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base">
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
              <Link href="/#contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
