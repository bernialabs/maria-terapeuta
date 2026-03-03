import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Primera Consulta",
    description:
      "Nos conocemos en un espacio seguro y confidencial. Escucho tu situación, tus necesidades y definimos juntos los objetivos terapéuticos.",
  },
  {
    number: "02",
    title: "Plan Personalizado",
    description:
      "Diseñamos un plan de tratamiento adaptado a ti, integrando técnicas cognitivo-conductuales y sexológicas según tu caso específico.",
  },
  {
    number: "03",
    title: "Acompañamiento Continuo",
    description:
      "Avanzamos juntos sesión a sesión, midiendo el progreso y ajustando el camino para que alcances el bienestar que mereces.",
  },
]

export default function Process() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Cómo funciona el <span className="font-semibold text-secondary">proceso</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un camino claro y acompañado hacia relaciones más saludables y satisfactorias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-border -z-10" />

          {steps.map((step, index) => (
            <Card key={index} className="relative border-none shadow-sm">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-serif font-bold mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-serif font-semibold text-center">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
