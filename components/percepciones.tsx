import Image from "next/image"

export default function Percepciones() {
  return (
    <section id="percepciones" className="py-24 px-4">
      <div className="container mx-auto flex flex-col gap-8">
        {/* First block: image left, text right */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="w-full md:w-48 lg:w-56 flex-shrink-0 relative min-h-[200px]">
            <Image
              src="/images/percepciones_1_sexo.png"
              alt="Ilustración sobre sexología"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 224px"
            />
          </div>
          <div className="flex-1 flex items-center p-6 md:p-10">
            <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed">
              {"El sexo "}
              <span className="font-semibold" style={{ color: "#FA523C" }}>{"NO"}</span>
              {" es solo sexo, el sexo consiste en conocernos, aceptarnos y expresarnos."}
            </p>
          </div>
        </div>

        {/* Second block: text left, image right */}
        <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex-1 flex items-center p-6 md:p-10">
            <p className="text-lg md:text-xl font-serif text-foreground leading-relaxed">
              {"La terapia de pareja "}
              <span className="font-semibold" style={{ color: "#FA523C" }}>{"NO"}</span>
              {" es la última opción; se recomienda cuando algo no está bien para uno o ambos miembros de la pareja."}
            </p>
          </div>
          <div className="w-full md:w-48 lg:w-56 flex-shrink-0 relative min-h-[200px]">
            <Image
              src="/images/percepciones_2_parejas.png"
              alt="Ilustración sobre terapia de pareja"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 224px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
