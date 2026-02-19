"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function About() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola, me gustaría agendar una consulta.")
    window.open(`https://wa.me/34666905970?text=${message}`, "_blank")
  }

  return (
    <section id="quien-soy" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img src="/images/maria_alejandra.jpg" alt={"María Alejandra Ovalle"} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
              {"Hola, soy "}<span className="font-semibold" style={{ color: "#FA523C" }}>{"María Alejandra Ovalle"}</span>
            </h2>
            <p className="text-2xl md:text-3xl font-serif text-secondary">
              {"Terapeuta especializada en terapia sexual y de pareja"}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {"Desde siempre he sentido una profunda curiosidad y compromiso por comprender cómo los distintos aspectos de nuestra vida influyen en el bienestar emocional, especialmente las relaciones, la sexualidad y la forma en que nos vinculamos con nuestro entorno."}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {"Mi propósito es acompañarte, a nivel individual o en pareja, en la construcción de relaciones más sanas, conscientes y satisfactorias."}
            </p>

            <h3 className="text-2xl font-serif font-semibold pt-2" style={{ color: "#FA523C" }}>
              {"¿Qué puedes trabajar y lograr en las sesiones?"}
            </h3>
            <ul className="space-y-3 text-lg text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1 flex-shrink-0">{"•"}</span>
                <span>{"Identificar y transformar creencias y patrones que generan malestar, frustración o conflicto."}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1 flex-shrink-0">{"•"}</span>
                <span>{"Fortalecer la conexión emocional desde el autoconocimiento, la autonomía y el respeto mutuo."}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1 flex-shrink-0">{"•"}</span>
                <span>{"Desarrollar herramientas prácticas para mejorar la comunicación, la gestión de conflictos y la expresión emocional."}</span>
              </li>
            </ul>

            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
            >
              Agendar Consulta
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
