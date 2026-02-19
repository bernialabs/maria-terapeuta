"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/34666905970?text=${encodeURIComponent("Hola, me gustaría agendar una consulta.")}`,
      "_blank",
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight text-balance">
              Terapia y sexología <span className="font-semibold text-secondary">individual y de pareja</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {"Explora nuevas formas de establecer conexiones profundas y aprende a transformar tus relaciones en saludables y satisfactorias."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base"
              >
                Agendar Consulta
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <a href="#reseñas">{"Ver reseñas"}</a>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-serif font-semibold" style={{ color: "#FA523C" }}>3+</div>
                <div className="text-sm text-muted-foreground">{"Años de experiencia"}</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-base md:text-lg font-serif font-semibold text-secondary">{"Enfoque cognitivo-conductual"}</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-[80%] xl:w-[75%]">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/images/maria-alejandra-1.jpeg"
                  alt="María Alejandra Ovalle - Terapeuta en Sexología y Terapia de Pareja"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-[38%] rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: "#e8cfc0" }}>
                <img
                  src="/images/recomendacion_hero.png"
                  alt="Reseña de Xavier: 5.0 estrellas - Lo mejor que me ha pasado es recibir su ayuda"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
