import { Instagram, Globe, Palette, Camera, ArrowRight, BarChart, Search, Megaphone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"

const services = [
  {
    id: "redes",
    icon: <Instagram className="h-12 w-12 text-primary" />,
    title: "Gestión de Redes Sociales",
    description:
      "Gestionamos tus redes sociales (Instagram, Facebook, TikTok) con estrategias efectivas para aumentar tu visibilidad y engagement. Creamos contenido relevante, programamos publicaciones y analizamos resultados para optimizar constantemente tu presencia digital.",
    features: [
      "Estrategia de contenido personalizada",
      "Diseño de piezas gráficas",
      "Programación de publicaciones",
      "Gestión de comunidad",
      "Análisis de métricas y resultados",
      "Campañas publicitarias en redes sociales",
    ],
  },
  {
    id: "branding",
    icon: <Palette className="h-12 w-12 text-primary" />,
    title: "Branding",
    description:
      "Creamos y fortalecemos la identidad de tu marca para destacar en un mercado competitivo. Desarrollamos elementos visuales y conceptuales que transmiten los valores y la personalidad de tu negocio, generando conexión con tu audiencia.",
    features: [
      "Desarrollo de identidad visual",
      "Diseño de logotipo",
      "Paleta de colores y tipografía",
      "Manual de marca",
      "Estrategia de posicionamiento",
      "Aplicaciones de marca",
    ],
  },
  {
    id: "web",
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: "Diseño y Desarrollo Web",
    description:
      "Diseñamos sitios web atractivos, funcionales y optimizados para convertir visitantes en clientes. Creamos experiencias digitales que representan tu marca y cumplen con tus objetivos de negocio, con enfoque en usabilidad y rendimiento.",
    features: [
      "Diseño web responsive",
      "Desarrollo a medida",
      "Optimización de velocidad",
      "Integración con CMS",
      "E-commerce",
      "Mantenimiento y soporte",
    ],
  },
  {
    id: "contenido",
    icon: <Camera className="h-12 w-12 text-primary" />,
    title: "Creación de Contenido Visual",
    description:
      "Producimos contenido visual de calidad (foto y video presencial) para potenciar tu presencia digital. Capturamos la esencia de tu negocio con material auténtico y profesional que conecta con tu audiencia.",
    features: [
      "Sesiones fotográficas profesionales",
      "Producción de videos",
      "Edición y postproducción",
      "Contenido para redes sociales",
      "Material para sitio web",
      "Banco de imágenes personalizado",
    ],
  },
  {
    id: "analitica",
    icon: <BarChart className="h-12 w-12 text-primary" />,
    title: "Analítica y Reportes",
    description:
      "Analizamos el rendimiento de tus canales digitales para tomar decisiones basadas en datos. Proporcionamos informes detallados y recomendaciones estratégicas para optimizar tus resultados.",
    features: [
      "Configuración de herramientas de análisis",
      "Seguimiento de KPIs",
      "Informes periódicos personalizados",
      "Análisis de competencia",
      "Recomendaciones de optimización",
      "Interpretación de datos para toma de decisiones",
    ],
  },
  {
    id: "seo",
    icon: <Search className="h-12 w-12 text-primary" />,
    title: "SEO y Posicionamiento",
    description:
      "Mejoramos la visibilidad de tu negocio en los motores de búsqueda. Implementamos estrategias de optimización para aumentar tu tráfico orgánico y mejorar tu posicionamiento en Google.",
    features: [
      "Auditoría SEO",
      "Optimización on-page",
      "Estrategia de contenidos SEO",
      "Optimización técnica",
      "Link building",
      "Seguimiento de posiciones",
    ],
  },
  {
    id: "publicidad",
    icon: <Megaphone className="h-12 w-12 text-primary" />,
    title: "Publicidad Digital",
    description:
      "Diseñamos y gestionamos campañas publicitarias efectivas en plataformas digitales. Maximizamos tu inversión publicitaria para alcanzar a tu audiencia objetivo y generar resultados medibles.",
    features: [
      "Campañas en Google Ads",
      "Publicidad en redes sociales",
      "Remarketing",
      "Segmentación avanzada",
      "Optimización de conversiones",
      "Análisis de ROI",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-center mb-4 text-text">Nuestros Servicios</h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Brindamos soluciones digitales 100% personalizadas para comercios y marcas.
          </p>
        </ScrollReveal>

        <div className="space-y-24 mt-16">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className="scroll-mt-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal delay={300} className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-[#f8f9fa] p-12 rounded-lg flex items-center justify-center">{service.icon}</div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-text">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    <h3 className="text-xl font-semibold mb-4 text-text">Qué incluye:</h3>
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <Link href="/contacto">Solicitar este servicio</Link>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
