import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

const portfolioItems = [
  {
    title: "Rediseño de marca para Café Aroma",
    description: "Incremento del 45% en reconocimiento de marca",
    image: "/placeholder.svg?height=400&width=600",
    link: "/portfolio#cafe-aroma",
  },
  {
    title: "Campaña digital para Tech Solutions",
    description: "200% de aumento en leads calificados",
    image: "/placeholder.svg?height=400&width=600",
    link: "/portfolio#tech-solutions",
  },
  {
    title: "E-commerce para Moda Urbana",
    description: "Incremento del 80% en ventas online",
    image: "/placeholder.svg?height=400&width=600",
    link: "/portfolio#moda-urbana",
  },
]

export default function PortfolioSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="section-title text-center">Nuestro Portfolio</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center">
            Conocé algunos de nuestros proyectos más destacados y los resultados que hemos logrado para nuestros
            clientes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={300 + index * 100} className="group">
              <Link href={item.link} className="block overflow-hidden rounded-lg">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/90">{item.description}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={600} className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/portfolio">
              Ver todos los proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
