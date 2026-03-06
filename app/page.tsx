import Header from "@/components/header"
import Hero from "@/components/hero"
import Benefits from "@/components/benefits"
import Services from "@/components/services"
import Percepciones from "@/components/percepciones"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Location from "@/components/location"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://mariaterapeuta.com/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es la terapia cognitivo-conductual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La terapia cognitivo-conductual (TCC) es un enfoque psicológico que trabaja la relación entre pensamientos, emociones y conductas. Ayuda a identificar y cambiar patrones de pensamiento negativos que afectan el bienestar emocional y las relaciones.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo es recomendable ir a terapia de pareja?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La terapia de pareja se recomienda cuando algo no está bien para uno o ambos miembros de la pareja, no solo como último recurso. Conflictos repetitivos, falta de comunicación, distancia emocional o sexual, o simplemente el deseo de fortalecer el vínculo son motivos válidos para comenzar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta una sesión de terapia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Las sesiones tienen un precio de entre €35 y €55 dependiendo del tipo de terapia (individual o de pareja). Puedes consultar tarifas exactas contactando directamente por WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "¿Las sesiones son online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, todas las sesiones se realizan online, lo que permite atender a personas en España y Latinoamérica desde la comodidad de su hogar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es la sexología?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La sexología es la ciencia que estudia la sexualidad humana en todas sus dimensiones: biológica, psicológica y social. En consulta, aborda disfunciones sexuales, identidad, deseo, y el desarrollo de una sexualidad consciente y satisfactoria.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          // JSON-LD structured data — static, trusted content, no user input
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Hero />
        <Benefits />
        <Services />
        <Percepciones />
        <About />
        <Testimonials />
        <Pricing />
        <Location />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
