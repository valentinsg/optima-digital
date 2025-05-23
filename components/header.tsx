"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Equipo", href: "/equipo" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-primary shadow-md py-2 font-bold text-white" : "bg-transparent py-4",
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center" >
          <span className={cn("text-white font-bold text-2xl", scrolled ? "text-white hover:brightness-[0.95]" : "text-primary hover:text-primary hover:brightness-[1.05]")}>Óptima Digital</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn("text-white hover:text-primary font-medium transition-colors", scrolled ? "text-white hover:text-primary hover:brightness-[0.95]" : "text-primary hover:text-primary hover:brightness-[1.05]")}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className={cn("bg-primary hover:bg-primary/90 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background", scrolled ? "border-white border-2 text-white hover:text-white hover:bg-primary hover:brightness-[0.95]" : "text-white hover:text-white hover:brightness-[1.05]")}>
            <Link href="/contacto">Trabajá con nosotros</Link>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary shadow-md py-4">
          <nav className="max-w-[1200px] mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn("text-white hover:text-white hover:brightness-[0.75] font-medium py-2 transition-colors", scrolled ? "text-white hover:text-white hover:brightness-[0.75]" : "text-primary hover:text-primary hover:brightness-[1.05]")}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className={cn("bg-white hover:bg-primary/90 text-primary w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background", scrolled ? "bg-primary text-white hover:text-white hover:brightness-[0.95]" : "text-white hover:text-primary hover:brightness-[1.05]")}>
              <Link href="/contacto" onClick={() => setIsOpen(false)}>
                Trabajá con nosotros
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
