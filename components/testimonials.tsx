"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Alexandra",
    content:
      "Llevo unos meses en terapia con María y no puedo estar más contenta con el proceso. Desde el principio me he sentido muy cómoda con ella y he notado un avance real. Es una terapeuta muy cercana, empática y profesional. La recomiendo muchísimo!",
    rating: 5,
    date: "13.01.2026",
  },
  {
    name: "Camila",
    content:
      "Llevamos varias sesiones de terapia de pareja con Alejandra y la experiencia ha sido excelente. Las sesiones son muy didácticas, llenas de ejemplos y ejercicios prácticos, que nos ayudan a aplicar de manera real las técnicas que nos enseña. Además, su empatía y buena vibra han construido un espacio seguro, donde nos sentimos cómodos para expresarnos sin ser juzgados. Hemos notado un gran avance, tanto individualmente como en nuestra relación. Estamos muy agradecidos con Alejandra por su acompañamiento y apoyo durante este proceso. Sin duda, una profesional que recomendamos al 100%",
    rating: 5,
    date: "23.11.2025",
  },
  {
    name: "Paciente",
    content:
      "Llevo cerca de 3 meses con Alejandra y la verdad es que he notado mucha mejoría en mi día a día, y lo mejor es que cada vez va mejor. Muy buena profesional y completamente recomendable.",
    rating: 5,
    date: "18.10.2025",
  },
  {
    name: "Paciente",
    content:
      "Excelente profesional, muy empática y cercana. Desde el primer día me hizo sentir cómoda y escuchada, y su acompañamiento ha sido clave para mi bienestar. Totalmente recomendada.",
    rating: 5,
    date: "18.12.2025",
  },
  {
    name: "Paciente",
    content:
      "Maria Alejandra demuestra mucha paciencia y muchas habilidades como terapeuta. Nos está ayudando a comunicarnos mejor cómo pareja y a superar las situaciones desagradables que hemos vivido. Estamos muy agradecidos por la ayuda y por las herramientas que estamos recibiendo sesión tras sesión",
    rating: 5,
    date: "18.11.2025",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Lo que dicen mis <span className="font-semibold text-secondary">pacientes</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                <div className="flex gap-1 justify-center">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-secondary text-2xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground italic text-center">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Testimonio anterior">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-secondary w-8" : "bg-border"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Siguiente testimonio">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
