import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

const portfolioItems = [
  {
    title: "Feria De Artesanos Del Bosque",
    description: "Logo nuevo, paleta de colores, creación de contenido y marketing digital básico promocional.",
    image: "/Logo_de_FEED_1.webp",
    link: "/portfolio#cafe-aroma",
  },
  {
    title: "Heladería Matimel",
    description: "Creación de contenido para Instagram y TikTok, gestión de cuentas y análisis de resultados.",
    image: "/Logo_FEED_3_.webp",
    link: "/portfolio#tech-solutions",
  },
  {
    title: "Chungaratos Pet Shop",
    description: "Mejora de la identidad de marca, creación de contenido para Instagram y Facebook, gestión de cuentas y análisis de resultados.",
    image: "/Logo_FEED_4.webp",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={300 + index * 100} className="group">
              <Link href={item.link} className="block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-primary/80 transition-colors">{item.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
                    Ver proyecto <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={600} className="text-center mt-10">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/portfolio">
              Ver todos los proyectos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
