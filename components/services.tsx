"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, User, Heart, Users } from "lucide-react"

// To replace icons with images: add `image: "/images/service-name.jpeg"` to each service.
const services: {
  title: string
  description: string
  icon: typeof User
  image?: string
  detail: string
}[] = [
  {
    title: "Terapia individual",
    description: "Para personas que desean mejorar su bienestar emocional y conocerse mejor.",
    icon: User,
    image: "/images/servicios_terapia_individual.jpg",
    detail:
      "Este es un espacio seguro y confidencial, centrado exclusivamente en ti, donde podrás explorar y comprender tu mundo emocional y personal con mayor profundidad. Te acompaño en tu proceso de autoconocimiento, bienestar y crecimiento individual.\n\nEn terapia individual abordamos temas como:\n\n• Autoestima\n• Duelo\n• Manejo de celos\n• Definición y establecimiento de tus límites\n• Gestión emocional y autorregulación\n• Habilidades sociales (por ejemplo, ligar o relacionarte con mayor seguridad)\n• Dependencia emocional\n\nEl objetivo es ayudarte a identificar patrones, necesidades y límites, para que puedas construir una relación más sana contigo y con los demás.",
  },
  {
    title: "Sexología",
    description: "Para personas o parejas que buscan aclarar dudas y vivir su sexualidad con mayor tranquilidad.",
    icon: Heart,
    image: "/images/servicios_terapia_sexologia.jpg",
    detail:
      "Este es un espacio individual y especializado para hablar de sexualidad con tranquilidad, confianza y sin juicios. Está pensado para acompañarte en cualquier duda, bloqueo o malestar que esté afectando a tu vivencia sexual.\n\nTrabajamos aspectos como:\n\n• Bajo o alto deseo erótico\n• Dificultades sexuales\n• Dificultades en la lubricación, erección\n• Dificultades en la eyaculación / orgasmo\n• Exploración y comprensión de intereses sexuales\n• Orientación afectivo-sexual\n• Definición y establecimiento de tus límites sexuales",
  },
  {
    title: "Terapia de pareja",
    description: "Para parejas que quieren cuidar, comprender o mejorar su relación.",
    icon: Users,
    image: "/images/servicios_terapia_de_pareja.jpg",
    detail:
      "Este es un espacio seguro y neutral para la pareja, donde ambos podéis sentiros escuchados y comprendidos. Mi objetivo es acompañaros a entender qué está ocurriendo en la relación y cómo podéis volver a conectar desde un lugar más sano.\n\nEn terapia de pareja trabajamos:\n\n• Comunicación\n• Dificultades en la convivencia\n• Diferencias individuales\n• Patrones de evitación - insistencia\n• Dificultades sexuales\n• Inquietudes sexuales\n• Fortalecimiento de la relación",
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <>
      <section id="servicios" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
              Servicios <span className="font-semibold text-secondary">especializados</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-[3/2] overflow-hidden bg-muted/50 flex items-center justify-center">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={640}
                      height={427}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <service.icon className="w-12 h-12 text-secondary/70 group-hover:text-secondary transition-colors" />
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-serif font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mt-4 flex-1">{service.description}</p>
                  <Button
                    variant="outline"
                    className="w-full mt-6 bg-transparent"
                    onClick={() => setActiveService(index)}
                  >
                    {"Saber más"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom sheet modal */}
      {activeService !== null && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveService(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setActiveService(null)
            }}
            role="button"
            tabIndex={0}
            aria-label="Cerrar"
          />
          <div className="relative w-full max-w-2xl bg-background rounded-t-2xl shadow-2xl p-8 pb-10 animate-in slide-in-from-bottom duration-300">
            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-serif font-semibold mb-4">
              {services[activeService].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {services[activeService].detail || services[activeService].description}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
