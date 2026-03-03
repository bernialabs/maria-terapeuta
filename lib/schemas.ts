import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un email válido"),
  phone: z.string().regex(/^[+\d][\d\s\-().]{5,}$/, "Introduce un teléfono válido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>
