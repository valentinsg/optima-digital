import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "@/components/contact-form"
import ScrollReveal from "@/components/scroll-reveal"

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-center mb-4 text-text">Contacto</h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            ¿Listo para impulsar tu negocio en el mundo digital? Contactanos y comencemos a trabajar juntos.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ScrollReveal delay={300}>
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-text mb-6">Información de contacto</h2>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-text">Email</h3>
                  <p className="text-muted-foreground">info@optimadigital.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-text">Teléfono</h3>
                  <p className="text-muted-foreground">+54 9 11 0000 0000</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-text">Ubicación</h3>
                  <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-medium text-text mb-4">Seguinos en redes</h3>
                <Link
                  href="https://instagram.com/optimaadigital_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary hover:underline"
                >
                  @optimaadigital_
                </Link>
              </div>

              <div className="pt-6">
                <Link
                  href="https://wa.me/5491100000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-[#25D366] px-6 py-3 font-medium text-white hover:bg-[#25D366]/90 transition-colors"
                >
                  Contactanos por WhatsApp
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-text mb-6">Envianos un mensaje</h2>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
