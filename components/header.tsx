"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header({ variant = "default" }: { variant?: "default" | "diadica" }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hola! Me gustaría agendar una consulta.")
    window.open(`https://wa.me/34666905970?text=${message}`, "_blank")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {variant === "diadica" ? (
            <Link
              href="/diadica"
              className="h-8 w-24 rounded-md bg-muted border border-border flex items-center justify-center"
            >
              <span className="sr-only">{"Logo Diádica"}</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center"
            >
              <span className="sr-only">Logo</span>
            </Link>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors">
              Inicio
            </Link>
            <Link href="/test-parejas" className="text-sm font-medium hover:text-secondary transition-colors">
              Test Parejas
            </Link>
            <Link href="/diadica" className="text-sm font-medium hover:text-secondary transition-colors">
              {"Diádica"}
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-secondary transition-colors">
              Blog
            </Link>
            <Button onClick={handleWhatsAppClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Agendar Consulta
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/test-parejas"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Test Parejas
              </Link>
              <Link
                href="/diadica"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {"Diádica"}
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Button onClick={handleWhatsAppClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Agendar Consulta
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
