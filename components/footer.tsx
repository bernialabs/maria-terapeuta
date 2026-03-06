import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { SOCIAL_LINKS } from "@/lib/constants"

export default function Footer({ variant = "default" }: { variant?: "default" | "diadica" }) {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            {variant === "diadica" ? (
              <Image
                src="/images/logo_diadica_completo.png"
                alt="Logo Diadica"
                width={1240}
                height={390}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            ) : (
              <Image
                src="/images/logo_maria_terapeuta.png"
                alt="María Terapeuta"
                width={878}
                height={131}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            )}
            <p className="text-sm opacity-90">{"Terapia y sexología individual y de pareja"}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{"Navegación"}</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/" className="hover:opacity-100 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/test-parejas" className="hover:opacity-100 transition-opacity">
                  Test Parejas
                </Link>
              </li>
              <li>
                <Link href="/diadica" className="hover:opacity-100 transition-opacity">
                  {"Diadica"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{"Recursos"}</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/blog" className="hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/test-parejas/monotonia" className="hover:opacity-100 transition-opacity">
                  Test Monotonia
                </Link>
              </li>
              <li>
                <Link href="/test-parejas/lenguaje-del-amor" className="hover:opacity-100 transition-opacity">
                  Lenguaje del Amor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Redes Sociales</h4>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="TikTok"
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.81a8.18 8.18 0 0 0 4.78 1.53V6.89a4.85 4.85 0 0 1-1.01-.2z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} {"María Alejandra Ovalle. Todos los derechos reservados."}</p>
        </div>
      </div>
    </footer>
  )
}
