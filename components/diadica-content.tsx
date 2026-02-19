"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Sparkles,
  Brain,
  CalendarHeart,
  Users,
  Heart,
  Zap,
  Shield,
  MapPin,
  Briefcase,
  Lightbulb,
  Lock as LockIcon,
} from "lucide-react"

const benefits = [
  {
    icon: Sparkles,
    title: "Convierte lo cotidiano en algo especial",
  },
  {
    icon: Heart,
    title: "Disfruta de más momentos de conexión",
  },
  {
    icon: Zap,
    title: "Recupera la emoción y la intimidad",
  },
  {
    icon: Shield,
    title: "Reconstruye la confianza y el deseo",
  },
]

const steps = [
  {
    number: "01",
    title: "Descubrimos lo que tu relación necesita",
    description:
      "Mediante breves cuestionarios, entendemos tus gustos, necesidades y horarios, así como los de tu pareja.",
  },
  {
    number: "02",
    title: "Análisis de tu relación como nunca antes",
    description:
      "Interpretamos la información de ambos, creando perfiles únicos con las necesidades específicas de la pareja.",
  },
  {
    number: "03",
    title: "Actividad terapéutica personalizada",
    description:
      "No es simple entretenimiento, es ciencia aplicada para que vuestra relación sea y se sienta fantástica.",
  },
  {
    number: "04",
    title: "Cita programada automáticamente",
    description:
      "Encontramos los momentos en que coincidís, para que podáis dedicaros tranquilamente a disfrutar.",
  },
  {
    number: "05",
    title: "Evolucionamos y crecemos juntos",
    description:
      "Fortaleced vuestra conexión y disfrutad aún más con actividades cada vez más adaptadas a vosotros.",
  },
]

const audiences = [
  {
    icon: MapPin,
    title: "Parejas a distancia",
    description:
      "Para acortar la distancia y mantener viva vuestra conexión.",
  },
  {
    icon: Briefcase,
    title: "Parejas ocupadas",
    description:
      "Para que encontréis tiempo de calidad sin agobios ni complicaciones.",
  },
  {
    icon: Lightbulb,
    title: "Parejas innovadoras",
    description:
      "Para aportar novedad y mantener la emoción en vuestra relación.",
  },
  {
    icon: LockIcon,
    title: "Parejas bloqueadas",
    description:
      "Para salir de la monotonía y recuperar la magia que os une.",
  },
]

export default function DiadicaContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground mb-8">
            <Brain className="w-4 h-4 text-secondary" />
            <span>Psicología + Tecnología</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light leading-tight text-balance mb-6">
            No dejes que tu relación{" "}
            <span className="font-semibold text-secondary">
              se apague en silencio
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            {
              "Diádica es la aplicación que combina ciencia y tecnología para ayudarte a cuidar, fortalecer y reavivar tu relación de pareja cada día."
            }
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base"
            asChild
          >
            <a
              href="https://www.diadica.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Únete a Diádica"}
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </section>

      {/* Pillars / Benefits Strip */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium text-primary-foreground leading-snug max-w-[180px]">
                  {benefit.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Diadica */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-6 text-balance">
                {"¿Qué es "}
                <span className="font-semibold text-secondary">
                  {"Diádica"}
                </span>
                {"?"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {
                  "Diádica es una aplicación que une la psicología cognitivo-conductual y la educación emocional para ofrecer actividades terapéuticas, pensadas para cada tipo de pareja y orientadas a reforzar las relaciones."
                }
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {
                  "Gracias a la inteligencia artificial, recogemos la información de ambos miembros de la pareja para crear perfiles personalizados con las herramientas necesarias para cada relación."
                }
              </p>
            </div>
            <div className="space-y-5">
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-1">
                      Enfoque personalizado
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        "Recomendaciones basadas en psicología y validadas por terapeutas de pareja expertos."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-1">
                      Respaldo científico
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        "Intervenciones basadas en evidencia, con un enfoque cognitivo-conductual probado."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarHeart className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-1">
                      Sin estrés ni complicaciones
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        "La aplicación programa automáticamente vuestras actividades, respetando los horarios libres de ambos."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Numbered steps */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4">
              {"¿Cómo "}
              <span className="font-semibold text-secondary">funciona</span>
              {"?"}
            </h2>
          </div>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 md:gap-10">
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[27px] md:left-[31px] top-16 bottom-0 w-px bg-border" />
                )}
                {/* Number circle */}
                <div className="shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm md:text-base font-semibold font-sans text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="pb-12">
                  <h3 className="text-xl font-serif font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 text-balance">
              {"¿A qué parejas "}
              <span className="font-semibold text-secondary">ayudamos</span>
              {"?"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {
                "Cada pareja es única, pero el deseo de conectar es el mismo."
              }
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <audience.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4">
              El origen de{" "}
              <span className="font-semibold text-secondary">
                nuestra idea
              </span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-2 text-6xl md:text-8xl font-serif text-secondary/20 select-none leading-none">
              {"\u201C"}
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed pl-6 md:pl-10">
              <p>
                {
                  "Todo comenzó cuando, como terapeuta de pareja, me di cuenta de algo preocupante: muchas parejas buscan ayuda solo cuando sus problemas ya han alcanzado un punto crítico. Las estadísticas lo respaldan: 2 de cada 3 parejas llegan a terapia demasiado tarde, ignorando señales que podrían haberse abordado a tiempo."
                }
              </p>
              <p>
                {
                  "Escuchando sus historias y frustraciones, me di cuenta de que hacía falta algo más, una herramienta que no solo reparara, sino que ayudara a las parejas a cuidar su relación antes de que los problemas se profundizaran."
                }
              </p>
              <p>
                {
                  "Así nació Diádica, una aplicación pensada para ser el aliado diario de las relaciones. Decidí enfocarme en ayudar a las parejas a priorizar su tiempo de calidad, ya que la falta de momentos compartidos y la monotonía deterioran incluso las relaciones más fuertes."
                }
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4 pl-6 md:pl-10">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/images/maria_alejandra.jpg"
                  alt="Alejandra Ovalle Zuleta"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% -20%", transform: "scale(2) translateX(13%)" }}
                />
              </div>
              <div>
                <p className="font-serif font-semibold">
                  Alejandra Ovalle Zuleta
                </p>
                <p className="text-sm text-muted-foreground">
                  {"CEO de Diádica"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <DiadicaContactForm />
    </>
  )
}

function DiadicaContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hola! Me interesa probar Diádica.\n\nMi nombre es ${formData.name}.\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\n\nMensaje: ${formData.message}`,
    )
    window.open(`https://wa.me/34666905970?text=${message}`, "_blank")
  }

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-balance">
            {"Cada minuto, una relación "}
            <span className="font-semibold text-secondary">se rompe</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"Con Diádica, cuida tu relación desde hoy. Llena el formulario y me pondré en contacto contigo para que puedas probarla de forma gratuita."}
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="diadica-name">Nombre completo</Label>
                <Input
                  id="diadica-name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="diadica-email">Email</Label>
                  <Input
                    id="diadica-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diadica-phone">{"Teléfono"}</Label>
                  <Input
                    id="diadica-phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diadica-message">Mensaje</Label>
                <Textarea
                  id="diadica-message"
                  placeholder={"Cuéntame en qué puedo ayudarte..."}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Enviar mensaje por WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {"Al enviarlo, serás redirigido a WhatsApp para finalizar la programación"}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
