import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-playfair text-xl font-bold mb-4">Velmor</h3>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              Velmor es una marca registrada de elegancia silenciosa.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://instagram.com"
                className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/70">Calle Elegancia 123, Ciudad de México</li>
              <li className="text-primary-foreground/70">+52 (55) 1234 5678</li>
              <li>
                <a
                  href="mailto:contacto@velmor.com"
                  className="text-primary-foreground/70 hover:text-[#c5a96d] transition-colors"
                >
                  contacto@velmor.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>Copyright Velmor © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
