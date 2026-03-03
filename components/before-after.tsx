"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const transformations = [
  {
    id: 1,
    theme: "Comunicación en pareja",
    before: "\"Siento que mi pareja no me escucha y terminamos discutiendo por lo mismo una y otra vez.\"",
    after: "\"Hemos aprendido a expresarnos sin atacarnos y a escuchar de verdad. Las discusiones son mucho menos frecuentes.\"",
  },
  {
    id: 2,
    theme: "Vida sexual",
    before: "\"Hay distancia física entre nosotros y no sé cómo romper ese hielo. Me siento incomprendida.\"",
    after: "\"Recuperamos la intimidad y ahora hablamos abiertamente sobre nuestros deseos sin vergüenza ni miedo.\"",
  },
  {
    id: 3,
    theme: "Autoestima y sexualidad",
    before: "\"Me cuesta disfrutar de mi sexualidad. Tengo mucha culpa y no entiendo por qué.\"",
    after: "\"Entendí mis bloqueos y aprendí a vivir mi sexualidad desde un lugar libre y sin juicio.\"",
  },
  {
    id: 4,
    theme: "Crisis de pareja",
    before: "\"Llevamos meses distantes. No sé si seguir o terminar. Solo hay tensión y silencio.\"",
    after: "\"Reconectamos emocionalmente. Tomamos decisiones juntos desde un lugar más claro y consciente.\"",
  },
  {
    id: 5,
    theme: "Ansiedad en las relaciones",
    before: "\"Tengo miedo constante a que me abandonen. Me aferro a mi pareja de una forma que sé que no es sana.\"",
    after: "\"Trabajé mi apego y ahora puedo tener una relación desde la seguridad, no desde el miedo.\"",
  },
]

export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformations.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const current = transformations[currentIndex]

  return (
    <section id="transformaciones" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-3 text-balance">
            Transformaciones <span className="font-semibold text-secondary">reales</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            Así describen el cambio quienes han pasado por el proceso terapéutico.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="p-6 md:p-8 space-y-6">
                <div className="text-center">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {current.theme}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/60 p-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Antes</p>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">{current.before}</p>
                  </div>
                  <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: "#FCDED6" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Después</p>
                    <p className="text-sm text-foreground leading-relaxed italic">{current.after}</p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background h-8 w-8 p-0"
                onClick={goToPrevious}
                aria-label="Transformación anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background h-8 w-8 p-0"
                onClick={goToNext}
                aria-label="Transformación siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Card>

            <div className="flex justify-center gap-1.5 mt-4">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir a transformación ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
