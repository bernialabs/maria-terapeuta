import Header from "@/components/header"
import Hero from "@/components/hero"
import BeforeAfter from "@/components/before-after"
import Benefits from "@/components/benefits"
import Services from "@/components/services"
import Percepciones from "@/components/percepciones"
import About from "@/components/about"
import Process from "@/components/process"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/faq"
import Location from "@/components/location"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
