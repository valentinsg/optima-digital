import Link from "next/link"
import { Instagram } from "lucide-react"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Equipo", href: "/equipo" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contacto", href: "/contacto" },
]

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] py-12 border-t">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-primary font-bold text-2xl">Óptima Digital</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Impulsamos negocios en el mundo digital con estrategias efectivas de marketing, branding y desarrollo web.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://instagram.com/optimaadigital_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-text hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>info@optimadigital.com</p>
              <p>Buenos Aires, Argentina</p>
              <Link
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-block mt-2"
              >
                Contactanos por WhatsApp
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Óptima Digital. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
