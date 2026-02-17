import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import DiadicaContent from "@/components/diadica-content"

export const metadata: Metadata = {
  title: "Diádica | La app que cuida tu relación de pareja",
  description:
    "Diádica combina psicología y tecnología para ofrecer actividades terapéuticas personalizadas que fortalecen tu relación de pareja.",
}

export default function DiadicaPage() {
  return (
    <>
      <Header variant="diadica" />
      <main>
        <DiadicaContent />
      </main>
      <Footer variant="diadica" />
      <WhatsAppButton />
    </>
  )
}
