import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

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
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-center mb-4 text-text">Nuestro Portfolio</h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Conocé algunos de nuestros proyectos más destacados y los resultados que hemos logrado para nuestros
            clientes.
          </p>
        </ScrollReveal>

        <div className="space-y-32 mt-16">
          {portfolioItems.map((project, index) => (
            <div key={project.id} id={project.id} className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <ScrollReveal delay={300} className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {project.category}
                    </span>
                    <h2 className="text-3xl font-bold mb-4 text-text">{project.title}</h2>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h3 className="font-semibold text-text">Cliente:</h3>
                        <p>{project.client}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Desafío:</h3>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Solución:</h3>
                        <p>{project.solution}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">Resultados:</h3>
                        <p className="font-medium text-primary">{project.results}</p>
                      </div>
                    </div>

                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <Link href="/contacto">Quiero un proyecto similar</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={500}>
                <h3 className="text-2xl font-semibold mb-6 text-text">Galería del proyecto</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.gallery.map((image, i) => (
                    <div key={i} className="overflow-hidden rounded-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Imagen ${i + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
