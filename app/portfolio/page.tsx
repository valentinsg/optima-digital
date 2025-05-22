import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react"

const portfolioItems = [
  {
    id: "cafe-aroma",
    title: "Rediseño de marca para Café Aroma",
    client: "Café Aroma",
    category: "Branding",
    description:
      "Desarrollamos una nueva identidad visual para Café Aroma, una cadena de cafeterías premium. El rediseño incluyó logotipo, paleta de colores, tipografía y aplicaciones de marca.",
    challenge:
      "Café Aroma necesitaba modernizar su imagen para atraer a un público más joven sin perder la fidelidad de sus clientes habituales.",
    solution:
      "Creamos una identidad visual que combina elementos tradicionales con un enfoque contemporáneo, manteniendo la esencia de la marca pero con un aspecto más fresco y actual.",
    results:
      "Incremento del 45% en reconocimiento de marca y aumento del 30% en ventas a nuevos clientes en los primeros 3 meses tras el lanzamiento.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "tech-solutions",
    title: "Campaña digital para Tech Solutions",
    client: "Tech Solutions",
    category: "Marketing Digital",
    description:
      "Diseñamos y ejecutamos una campaña integral de marketing digital para el lanzamiento de un nuevo servicio de consultoría tecnológica.",
    challenge:
      "Tech Solutions necesitaba generar leads calificados para su nuevo servicio en un mercado altamente competitivo.",
    solution:
      "Implementamos una estrategia multicanal que incluía contenido especializado, webinars, campañas de email marketing y publicidad en redes sociales.",
    results: "200% de aumento en leads calificados y reducción del 25% en el costo por adquisición de cliente.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "moda-urbana",
    title: "E-commerce para Moda Urbana",
    client: "Moda Urbana",
    category: "Desarrollo Web",
    description:
      "Diseñamos y desarrollamos una tienda online para Moda Urbana, una marca de ropa con presencia física que buscaba expandirse al canal digital.",
    challenge:
      "Moda Urbana necesitaba una plataforma e-commerce que reflejara la personalidad de su marca y ofreciera una experiencia de compra fluida y atractiva.",
    solution:
      "Creamos una tienda online con diseño personalizado, optimizada para móviles, con integración de pasarelas de pago y sistema de gestión de inventario.",
    results: "Incremento del 80% en ventas online y ampliación de su base de clientes a nivel nacional.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "eco-friendly",
    title: "Estrategia de contenidos para Eco Friendly",
    client: "Eco Friendly",
    category: "Marketing de Contenidos",
    description:
      "Desarrollamos una estrategia de contenidos para posicionar a Eco Friendly como referente en productos sostenibles y ecológicos.",
    challenge:
      "Eco Friendly necesitaba aumentar su visibilidad online y educar a su audiencia sobre la importancia de los productos sostenibles.",
    solution:
      "Creamos un plan de contenidos que incluía blog, redes sociales, newsletter y colaboraciones con influencers del sector.",
    results: "Aumento del 120% en tráfico orgánico y crecimiento del 65% en seguidores en redes sociales en 6 meses.",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <ScrollReveal>
            <Link 
              href="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestro Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Conocé en detalle los proyectos que hemos desarrollado y los resultados que hemos logrado para nuestros clientes.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-32">
          {portfolioItems.map((project, index) => (
            <article key={project.id} id={project.id} className="scroll-mt-24 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <ScrollReveal 
                  delay={200} 
                  className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-gray-100 aspect-video"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                        {project.category}
                      </span>
                      <h2 className="text-3xl font-bold">{project.title}</h2>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={300} className="lg:col-span-5">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Cliente</h3>
                        <p className="text-lg font-medium text-gray-900">{project.client}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Descripción</h3>
                        <p className="text-gray-600">{project.description}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Desafío</h3>
                        <p className="text-gray-600">{project.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Solución</h3>
                        <p className="text-gray-600">{project.solution}</p>
                      </div>

                      <div className="p-6 bg-primary/5 rounded-xl">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Resultados</h3>
                        <p className="text-primary font-medium">{project.results}</p>
                      </div>

                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <Link href="/contacto" className="flex items-center justify-center">
                          Quiero un proyecto similar
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={400} className="mt-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Galería del proyecto</h3>
                  <span className="text-sm text-gray-500">{project.gallery.length} imágenes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.gallery.map((image, i) => (
                    <div 
                      key={i} 
                      className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] hover:shadow-lg transition-all duration-300"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Imagen ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-colors">
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {index < portfolioItems.length - 1 && (
                <div className="border-t border-gray-200 my-16"></div>
              )}
            </article>
          ))}
        </div>

        <ScrollReveal className="mt-24 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para comenzar tu proyecto?</h3>
            <p className="text-gray-600 mb-6">
              Transformá tu visión en realidad con nuestro equipo de expertos. Contanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/contacto" className="flex items-center mx-auto w-fit">
                Hablemos de tu proyecto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
