import Link from "next/link"
import { ArrowRight, Camera, Globe, Palette, Instagram, BarChart, Search, TrendingUp, Users, BriefcaseIcon, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "@/components/scroll-reveal"


export default function ServicesSection() {
  const services = [
    {
      icon: <Instagram className="h-6 w-6 text-pink-600" />,
      title: "Gestión de Redes Sociales",
      description: "Estrategias efectivas para aumentar tu visibilidad y engagement en Instagram, Facebook y TikTok.",
      link: "/servicios#redes",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-100",
      iconBg: "bg-pink-100",
    },
    {
      icon: <Palette className="h-6 w-6 text-blue-600" />,
      title: "Branding",
      description: "Creamos identidades visuales únicas que destacan en mercados competitivos.",
      link: "/servicios#branding",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-100",
    },
    {
      icon: <Globe className="h-6 w-6 text-green-600" />,
      title: "Desarrollo Web",
      description: "Sitios web atractivos y optimizados que convierten visitantes en clientes.",
      link: "/servicios#web",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconBg: "bg-green-100",
    },
    {
      icon: <Camera className="h-6 w-6 text-orange-600" />,
      title: "Contenido Visual",
      description: "Producción profesional de foto y video para potenciar tu presencia digital.",
      link: "/servicios#contenido",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      iconBg: "bg-orange-100",
    },
    {
      icon: <BarChart className="h-6 w-6 text-cyan-600" />,
      title: "Analítica",
      description: "Análisis de rendimiento para decisiones basadas en datos concretos.",
      link: "/servicios#analitica",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-100",
      iconBg: "bg-cyan-100",
    },
    {
      icon: <Search className="h-6 w-6 text-purple-600" />,
      title: "SEO",
      description: "Mejoramos tu visibilidad en buscadores para aumentar el tráfico orgánico.",
      link: "/servicios#seo",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-100",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-[#DEECFE] to-white text-gray-700">
      {/* Sección Servicios */}
      <div className="mb-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary mb-4">
              <BriefcaseIcon className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Nuestros Servicios</span>
            </div>

            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-primary">
              ¿Qué ofrecemos?
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
            Transformamos tu presencia digital con soluciones 100% personalizadas que impulsan el crecimiento de tu marca
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={300 + index * 100}
              className="group h-full"
            >
              <div className={`relative w-full p-6 ${service.bgColor} hover:bg-white hover:border-2 hover:${service.borderColor} hover:border rounded-2xl ${service.borderColor} border hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg h-full flex flex-col`}>
                {/* Icono */}
                <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Contenido principal */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Link */}
                <Link
                  href={service.link}
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-all duration-300 group/link text-sm mt-auto"
                >
                  Conocer más
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ScrollReveal delay={900} className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg rounded-xl">
          <Link href="/servicios">
            Explorar todos los servicios <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </ScrollReveal>
    </section>
  )
}