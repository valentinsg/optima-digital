import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, BoltIcon, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

const portfolioItems = [
  {
    title: "Feria De Artesanos Del Bosque",
    description: "Logo nuevo, paleta de colores, creación de contenido y marketing digital básico promocional.",
    image: "/Logo_de_FEED_1.webp",
    link: "/portfolio#cafe-aroma",
    category: "Branding",
    year: "2024"
  },
  {
    title: "Heladería Matimel",
    description: "Creación de contenido para Instagram y TikTok, gestión de cuentas y análisis de resultados.",
    image: "/Logo_FEED_3_.webp",
    link: "/portfolio#tech-solutions",
    category: "Redes Sociales",
    year: "2024"
  },
  {
    title: "Chungaratos Pet Shop",
    description: "Mejora de la identidad de marca, creación de contenido para Instagram y Facebook, gestión de cuentas y análisis de resultados.",
    image: "/Logo_FEED_4.webp",
    link: "/portfolio#moda-urbana",
    category: "Marketing Digital",
    year: "2023"
  },
]

export default function PortfolioSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#DEECFE] to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary mb-4">
                <BoltIcon className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Proyectos Destacados</span>
              </div>

              <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-primary">
                Nuestros Trabajos
              </h2>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <Quote className="w-8 h-8 text-blue-400" />
                <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-center text-xl text-gray-800 mb-16 max-w-3xl mx-auto leading-relaxed">
              Estas marcas son clientes que confiaron en nosotros para mejorar su presencia en línea y generar más ventas.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white">
            Todos
          </button>
          {Array.from(new Set(portfolioItems.map(item => item.category))).map((category, i) => (
            <button
              key={i}
              className="px-4 py-2 text-sm font-medium rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <ScrollReveal
              key={item.title}
              delay={200 + (index * 100)}
              className="group"
            >
              <Link
                href={item.link}
                className="block h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{item.year}</span>
                    <div className="flex items-center text-primary font-medium">
                      Ver caso de estudio
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400} className="text-center mt-16">
          <Button
            asChild
            className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <Link href="/portfolio" className="relative z-10 flex items-center">
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
