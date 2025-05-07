import Link from "next/link"
import { ArrowRight, Camera, Globe, Palette, Instagram, BarChart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

const services = [
  {
    icon: <Instagram className="h-10 w-10 text-primary" />,
    title: "Gestión de Redes Sociales",
    description:
      "Gestionamos tus redes sociales (Instagram, Facebook, TikTok) con estrategias efectivas para aumentar tu visibilidad y engagement.",
    link: "/servicios#redes",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Branding",
    description: "Creamos y fortalecemos la identidad de tu marca para destacar en un mercado competitivo.",
    link: "/servicios#branding",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Diseño y Desarrollo Web",
    description: "Diseñamos sitios web atractivos, funcionales y optimizados para convertir visitantes en clientes.",
    link: "/servicios#web",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Creación de Contenido Visual",
    description:
      "Producimos contenido visual de calidad (foto y video presencial) para potenciar tu presencia digital.",
    link: "/servicios#contenido",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Analítica y Reportes",
    description: "Analizamos el rendimiento de tus canales digitales para tomar decisiones basadas en datos.",
    link: "/servicios#analitica",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "SEO y Posicionamiento",
    description: "Mejoramos la visibilidad de tu negocio en los motores de búsqueda para aumentar tu tráfico orgánico.",
    link: "/servicios#seo",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="section-title text-center">¿Qué hacemos?</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center">
            Brindamos soluciones digitales 100% personalizadas para comercios y marcas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={300 + index * 100}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-text">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Link href={service.link} className="text-primary font-medium inline-flex items-center hover:underline">
                Saber más <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={800} className="text-center mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/servicios">
              Ver todos los servicios <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
