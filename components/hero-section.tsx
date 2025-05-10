import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import EyeAnimation from "@/components/eye-animation"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-20 z-10">
          <EyeAnimation className="w-24 h-24 md:w-32 md:h-32 mx-auto" />
        </div>

        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 pt-20 md:pt-24">
            Impulsamos negocios en el <span className="text-primary leading-tight">mundo digital</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Somos una agencia de marketing digital especializada en crear estrategias efectivas que transforman tu
            presencia online y potencian tus resultados.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/contacto">
                Trabajá con nosotros <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-primary hover:bg-primary/10 border-2 text-primary hover:text-primary transition-colors" size="lg">
              <Link href="/servicios">Conocé nuestros servicios</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
