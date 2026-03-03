export const WHATSAPP_NUMBER = "34666905970"

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Update these with María's actual social media profile URLs
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mariaterapeuta",
  facebook: "https://www.facebook.com/mariaterapeuta",
  youtube: "https://www.youtube.com/@mariaterapeuta",
}
