"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_NUMBER } from "@/lib/constants"
import { contactFormSchema, type ContactFormData, type ContactFormErrors } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState<ContactFormErrors>({})

  const update = (field: keyof ContactFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactFormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: ContactFormErrors = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData
        if (!fieldErrors[field]) fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    const { name, phone, email, message } = result.data
    const text = `Hola! Mi nombre es ${name}.\n\nTeléfono: ${phone}\nEmail: ${email}\n\nMensaje: ${message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <section id="contacto" className="py-24 px-4 bg-muted/30">
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
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={update("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{"Teléfono"}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={update("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder={"Cuéntame en qué puedo ayudarte..."}
                  rows={5}
                  value={formData.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" className="text-xs text-destructive">{errors.message}</p>}
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
