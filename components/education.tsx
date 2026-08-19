import { BookOpen, Check, GraduationCap } from "lucide-react"

const educacion = [
  {
    year: "2022",
    title: "Diploma de Especialización en Terapia Sexual y de Pareja",
    institution: "Universidad Autónoma de Madrid · Facultad de Psicología",
  },
  {
    year: "2021",
    title: "Máster en Psicología",
    institution: "Universidad Complutense de Madrid · Facultad de Psicología",
  },
  {
    year: "2018",
    title: "Grado en Psicología",
    institution: "Universidad El Bosque · Facultad de Psicología",
  },
]

const cursos = [
  {
    title: "Intervención clínica ante celopatías e infidelidades en la pareja",
    institution: "Asociación Española de Psicología Sanitaria",
  },
  {
    title: "Terapia de Pareja Breve Estratégica",
    institution: "Asociación Española de Psicología Sanitaria",
  },
  {
    title: "¿Amar duele? Técnicas para diferenciar necesidad, deseo y capricho",
    institution: "Universidad Nacional Autónoma de México",
  },
]

export default function Education() {
  return (
    <section id="formacion" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            {"Formación y "}<span className="font-semibold text-secondary">especialización</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Formación universitaria y actualización continua en terapia sexual y de pareja.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground">Educación</h3>
            </div>

            <ol className="relative border-l border-border pl-6 flex flex-col gap-8">
              {educacion.map((item) => (
                <li key={item.title} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 w-3 h-3 rounded-full bg-secondary" />
                  <p className="text-sm text-secondary font-medium mb-1">{item.year}</p>
                  <h4 className="text-lg font-serif font-semibold text-foreground leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.institution}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                Cursos y formación continua
              </h3>
            </div>

            <ul className="flex flex-col gap-6">
              {cursos.map((curso) => (
                <li key={curso.title} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-serif font-semibold text-foreground leading-snug">
                      {curso.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{curso.institution}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-10">
          {"Tarjeta Profesional de Psicólogo n.º 194533 · Colegio Colombiano de Psicólogos (COLPSIC)"}
        </p>
      </div>
    </section>
  )
}
