import { Instagram, Facebook, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer({ variant = "default" }: { variant?: "default" | "diadica" }) {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            {variant === "diadica" ? (
              <div className="h-12 w-32 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-4">
                <span className="sr-only">{"Logo Diádica"}</span>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
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
