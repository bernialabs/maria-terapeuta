export default function Percepciones() {
  return (
    <section id="percepciones" className="py-24 px-4">
      <div className="container mx-auto flex flex-col gap-8">
        {/* First block: image left, text right */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="w-full md:w-auto md:flex-shrink-0 aspect-square md:aspect-auto md:h-auto flex items-center justify-center bg-muted" style={{ maxWidth: "100%", minWidth: 0 }}>
            <div className="w-full h-full md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
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
          <div className="w-full md:w-auto md:flex-shrink-0 aspect-square md:aspect-auto md:h-auto flex items-center justify-center bg-muted" style={{ maxWidth: "100%", minWidth: 0 }}>
            <div className="w-full h-full md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
