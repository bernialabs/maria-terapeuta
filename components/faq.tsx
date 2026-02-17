'use client';

import { Button } from "@/components/ui/button"
import { Clock, Video, MessageCircle } from "lucide-react"

const plans = [
  {
    title: "Terapia individual",
    price: "35",
    details: [
      { icon: Clock, text: "Sesión de 60 minutos" },
      { icon: Video, text: "Online" },
      { icon: MessageCircle, text: "Valoración inicial gratuita (15 min)" },
    ],
  },
  {
    title: "Terapia sexológica",
    price: "35",
    details: [
      { icon: Clock, text: "Sesión de 60 minutos" },
      { icon: Video, text: "Online" },
      { icon: MessageCircle, text: "Valoración inicial gratuita (15 min)" },
    ],
  },
  {
    title: "Terapia de pareja",
    price: "55",
    details: [
      { icon: Clock, text: "Sesión de 80 minutos (1era sesión)" },
      { icon: Video, text: "Online" },
      { icon: MessageCircle, text: "Valoración inicial gratuita (25 min)" },
    ],
  },
]

export default function Pricing() {
  const handleReservar = () => {
    const message = encodeURIComponent("Hola, me gustaría reservar una cita.")
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank")
  }

  return (
    <section id="precios" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            <span className="font-semibold text-secondary">Precios</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <h3 className="text-xl font-serif font-semibold text-foreground mb-6 text-center">
                {plan.title}
              </h3>

              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-4xl font-serif font-bold text-foreground">{plan.price}</span>
                <span className="text-lg text-muted-foreground font-sans">{"€ / sesión"}</span>
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {plan.details.map((detail) => (
                  <li key={detail.text} className="flex items-start gap-3">
                    <detail.icon className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{detail.text}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleReservar}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Reservar cita
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
