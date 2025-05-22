"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import Image from "next/image"
import HeroVisual from "../public/hero-visual-uncut.png"

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#DEECFE] to-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* TEXT SECTION */}
        <div className="text-center md:text-left md:max-w-4xl">
          {/* Etiqueta chica arriba */}
          <ScrollReveal>
            <span className="uppercase text-sm font-bold text-primary tracking-widest mb-4 block">
              Agencia de marketing digital
            </span>
          </ScrollReveal>
          {/* Título */}
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 leading-tighter md:leading-tighter mb-2">
              Marketing estratégico,<br />
              <span className="text-primary">ventas reales.</span>
            </h1>
          </ScrollReveal>
          {/* Subtítulo */}
          <ScrollReveal delay={200}>
            <p className="text-xl md:text-3xl text-muted-foreground mb-10">
              Atraé a los clientes correctos con campañas que convierten y estrategias que escalan.
            </p>
          </ScrollReveal>
          {/* Botones CTA */}
          <ScrollReveal delay={400}>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-8">
              <Button asChild size="lg" className="bg-primary p-6 text-md hover:text-primary hover:bg-white/50 text-white shadow-md">
                <Link href="/contacto">
                  Trabajá con nosotros <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-primary text-primary p-6 text-md hover:text-white hover:bg-primary/90"
                size="lg"
              >
                <Link href="/servicios">Conocé nuestros servicios</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
        {/* IMAGE SECTION */}
        <div className="w-full md:w-[680px] md:flex justify-center">
          <ScrollReveal delay={300}>
            <div className="relative">
              <Image
                src={HeroVisual}
                alt="Visual marketing digital"
                className="w-full h-auto max-w-[680px] drop-shadow-xl"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}