"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useCart } from "@/context/cart-context"
import CartDrawer from "@/components/cart-drawer"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { theme, setTheme } = useTheme()

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-playfair text-2xl font-bold text-foreground">
            Velmor
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active={pathname === "/"}>
              Inicio
            </NavLink>
            <NavLink href="/productos" active={pathname.startsWith("/productos") || pathname.startsWith("/producto")}>
              Tienda
            </NavLink>
            <NavLink href="/historia" active={pathname === "/historia"}>
              Historia
            </NavLink>
            <NavLink href="/packaging" active={pathname === "/packaging"}>
              Packaging
            </NavLink>
            <NavLink href="/contacto" active={pathname === "/contacto"}>
              Contacto
            </NavLink>
          </nav>

          {/* Theme Toggle and Cart */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-[#c5a96d]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:text-[#c5a96d]"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a96d] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-[#c5a96d]"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-full left-0 right-0 border-t border-border animate-slide-down">
            <nav className="container px-4 py-6 flex flex-col space-y-4">
              <MobileNavLink href="/" onClick={closeMenu}>
                Inicio
              </MobileNavLink>
              <MobileNavLink href="/productos" onClick={closeMenu}>
                Tienda
              </MobileNavLink>
              <MobileNavLink href="/historia" onClick={closeMenu}>
                Historia
              </MobileNavLink>
              <MobileNavLink href="/packaging" onClick={closeMenu}>
                Packaging
              </MobileNavLink>
              <MobileNavLink href="/contacto" onClick={closeMenu}>
                Contacto
              </MobileNavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-[#c5a96d] relative",
        active ? "text-[#c5a96d]" : "text-foreground",
        active &&
          "after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-[#c5a96d]",
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-foreground hover:text-[#c5a96d] text-lg font-medium transition-colors py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
