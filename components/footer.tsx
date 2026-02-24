import Image from "next/image"
import { Instagram, Facebook, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer({ variant = "default" }: { variant?: "default" | "diadica" }) {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            {variant === "diadica" ? (
              <Image
                src="/images/logo_diadica_completo.png"
                alt="Logo Diádica"
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
                  {"Diádica"}
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube size={24} />
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
