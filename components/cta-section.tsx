import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export default function CTASection() {
  return (
    <section className="relative py-24 text-white overflow-hidden bg-[url('/fondo-papel-optima.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 text-center z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Potencia tu presencia digital</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm">
            ¿Listo para transformar tu negocio?</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
            Trabajemos juntos para crear una estrategia digital que transforme tu presencia online y potencie tus
            resultados de manera efectiva y duradera.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-medium p-6 h-auto rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 group">
              <Link href="/contacto" className="flex items-center gap-2">
                Trabajá con nosotros
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white/50 font-medium p-6 h-auto rounded-lg backdrop-blur-sm transition-all duration-300 group">
              <Link href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Contactanos por WhatsApp
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Indicador visual */}
        <ScrollReveal delay={600}>
          <div className="mt-16 text-white/70 text-sm">
            <p>Respuesta garantizada en menos de 24 horas</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
