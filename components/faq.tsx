"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Qué es la terapia cognitivo-conductual?",
    answer:
      "La terapia cognitivo-conductual (TCC) es un enfoque psicológico que trabaja la relación entre pensamientos, emociones y conductas. Ayuda a identificar y cambiar patrones de pensamiento negativos que afectan el bienestar emocional y las relaciones.",
  },
  {
    question: "¿Cuándo es recomendable ir a terapia de pareja?",
    answer:
      "La terapia de pareja se recomienda cuando algo no está bien para uno o ambos miembros de la pareja, no solo como último recurso. Conflictos repetitivos, falta de comunicación, distancia emocional o sexual, o simplemente el deseo de fortalecer el vínculo son motivos válidos para comenzar.",
  },
  {
    question: "¿Cuánto cuesta una sesión de terapia?",
    answer:
      "Las sesiones tienen un precio de entre €35 y €55 dependiendo del tipo de terapia (individual o de pareja). Puedes consultar tarifas exactas contactando directamente por WhatsApp.",
  },
  {
    question: "¿Las sesiones son online?",
    answer:
      "Sí, todas las sesiones se realizan online, lo que permite atender a personas en España y Latinoamérica desde la comodidad de su hogar.",
  },
  {
    question: "¿Qué es la sexología?",
    answer:
      "La sexología es la ciencia que estudia la sexualidad humana en todas sus dimensiones: biológica, psicológica y social. En consulta, aborda disfunciones sexuales, identidad, deseo, y el desarrollo de una sexualidad consciente y satisfactoria.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="preguntas-frecuentes" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Preguntas <span className="font-semibold text-secondary">frecuentes</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-serif text-lg font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-secondary flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180",
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
