export const WHATSAPP_NUMBER = "34666905970"

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/soymariaterapeuta",
  tiktok: "https://www.tiktok.com/@soymariaterapeuta",
  linkedin: "https://www.linkedin.com/in/ma-alejandra-ovalle-zuleta-8135a2124",
}
