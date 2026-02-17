"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hola! Mi nombre es ${formData.name}.\n\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\n\nMensaje: ${formData.message}`,
    )
    window.open(`https://wa.me/34666905970?text=${message}`, "_blank")
  }

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">
            Agenda tu <span className="font-semibold text-secondary">cita</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {"Llena el formulario y me pondré en contacto contigo para agendar tu cita"}
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                <Label htmlFor="phone">{"Teléfono"}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
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
