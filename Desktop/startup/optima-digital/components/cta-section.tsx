import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

export default function CTASection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para impulsar tu negocio?</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
            Trabajemos juntos para crear una estrategia digital que transforme tu presencia online y potencie tus
            resultados.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contacto">Trabajá con nosotros</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer">
                Contactanos por WhatsApp
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
