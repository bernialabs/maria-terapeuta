"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const cases = [
  {
    id: 1,
    title: "Lentes de Contato Dental",
    image: "/images/cases/smile-transformation-1.jpeg",
    description: "Sorriso natural e harmonioso",
  },
  {
    id: 2,
    title: "Transformação Completa do Sorriso",
    image: "/images/cases/smile-transformation-2.jpeg",
    description: "Reabilitação total com facetas de porcelana",
  },
  {
    id: 3,
    title: "Harmonização com Lentes",
    image: "/images/cases/veneers-result-closeup.jpeg",
    description: "Perfeição em cada detalhe",
  },
  {
    id: 5,
    title: "Botox - Região dos Olhos",
    image: "/images/cases/botox-eyes-profile-1.jpeg",
    description: "Rejuvenescimento natural",
  },
  {
    id: 7,
    title: "Botox Preventivo",
    image: "/images/cases/botox-eyes-profile-3.jpeg",
    description: "Prevenção de rugas dinâmicas",
  },
]

export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cases.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % cases.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section id="resultados" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-3 text-balance">
            Resultados que <span className="font-semibold text-secondary">falam por si</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transformações reais com planejamento digital 3D. Cada sorriso é único e projetado para harmonizar com suas
            características naturais.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/9]">
                <img
                  src={cases[currentIndex].image || "/placeholder.svg"}
                  alt={cases[currentIndex].title}
                  className="object-cover w-full h-full"
                />

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background h-8 w-8 p-0"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background h-8 w-8 p-0"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Case Counter */}
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs">
                  {currentIndex + 1} / {cases.length}
                </div>
              </div>

              <div className="p-3 text-center">
                <h3 className="text-lg font-serif font-semibold mb-1">{cases[currentIndex].title}</h3>
                <p className="text-sm text-muted-foreground">{cases[currentIndex].description}</p>
              </div>
            </Card>

            <div className="flex justify-center gap-1.5 mt-4">
              {cases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir para caso ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a
                href={`https://wa.me/34666905970?text=${encodeURIComponent("Hola, me gustaría agendar una consulta.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero Resultados Assim
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
