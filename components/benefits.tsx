import { Lock, GraduationCap, Scale, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Lock,
    title: "Confidencial",
    description: "Espacio seguro y privado para expresarte con libertad.",
  },
  {
    icon: GraduationCap,
    title: "Profesional",
    description: "Intervención basada en evidencia científica y adaptada a ti.",
  },
  {
    icon: Scale,
    title: "Imparcial",
    description: "Acompañamiento sin juicios ni sesgos.",
  },
  {
    icon: Target,
    title: "Resolutiva",
    description: "Enfoque práctico orientado a soluciones reales.",
  },
]

export default function Benefits() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
