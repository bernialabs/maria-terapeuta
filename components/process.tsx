import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Avaliação Completa",
    description:
      "Análise detalhada do seu sorriso com tecnologia 3D. Entendemos suas expectativas e criamos um plano personalizado.",
  },
  {
    number: "02",
    title: "Planejamento Digital",
    description:
      "Visualize seu novo sorriso antes de começar. Aprovamos juntos cada detalhe para garantir o resultado perfeito.",
  },
  {
    number: "03",
    title: "Transformação",
    description:
      "Execução precisa do tratamento com acompanhamento em cada etapa. Conforto e segurança do início ao fim.",
  },
]

export default function Process() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Como funciona o <span className="font-semibold text-secondary">processo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um caminho simples e transparente para o sorriso que você sempre sonhou
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
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
