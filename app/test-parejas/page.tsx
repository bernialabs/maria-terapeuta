import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Test Gratuitos para Parejas | Terapia y Sexología",
  description:
    "Descubre el estado de tu relación con nuestros test gratuitos para parejas. Cuestionarios diseñados para ayudarte a comprender y mejorar tu vínculo.",
}

export default function TestParejasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight text-balance mb-6">
              Test <span className="font-semibold text-secondary">GRATUITOS</span> para parejas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {"Pruébalos y descubre herramientas para entender mejor tu relación."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cuestionario 1 - Monotonía */}
            <Link href="/test-parejas/monotonia" className="group">
              <Card className="h-full border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold mb-3 text-balance">
                      {"¿Tu relación cayó en la monotonía?"}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {"Descubre si la rutina se ha apoderado de tu relación y encuentra claves para reavivar la chispa que los conectó desde el inicio."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all">
                    Comenzar test
                    <ArrowRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Cuestionario 2 - Lenguaje del amor */}
            <Link href="/test-parejas/lenguaje-del-amor" className="group">
              <Card className="h-full border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold mb-3 text-balance">
                      {"¿Cuál es mi lenguaje del amor para dar y recibir?"}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {"Identifica cómo expresas y necesitas recibir amor. Conocer tu lenguaje emocional transformará la forma en que te conectas con tu pareja."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all">
                    Comenzar test
                    <ArrowRight size={16} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
