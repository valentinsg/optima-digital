import ScrollReveal from "@/components/scroll-reveal"
import { PhoneCall, Users, Play, Calendar, CheckCircle2, MessageCircle, Camera, Globe, TrendingUp, Quote } from "lucide-react"
import PaperStepCard from "./ui/paper-step-card"

const steps = [
  {
    number: "01",
    title: "Contacto inicial",
    description: "Presencial, redes o recomendación.",
    icon: PhoneCall,
    position: "left"
  },
  {
    number: "02",
    title: "Reunión inicial",
    description: "Explicamos nuestro sistema, resolvemos dudas, presentamos contrato.",
    icon: Users,
    position: "right"
  },
  {
    number: "03",
    title: "Inicio",
    description: "Capturamos contenido, se realiza el pago.",
    icon: Play,
    position: "left"
  },
  {
    number: "04",
    title: "Ejecución mensual",
    description: "Grupo activo de WhatsApp, calendario de contenido, visitas cada 15 días, mantenimiento de web.",
    icon: Calendar,
    position: "right"
  },
]

export default function EnhancedRoadmap() {
  return (
    <section className="relative py-24 text-white overflow-hidden bg-[url('/fondo-papel-optima.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/4 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
      <ScrollReveal>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold tracking-wide">Proceso Optimizado</span>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Nuestro camino de trabajo
            </h2>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <Quote className="w-8 h-8 text-blue-400" />
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-center text-xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
            Acompañamos a nuestros clientes en cada paso de forma clara, cercana y profesional.
          </p>
        </ScrollReveal>

        {/* Roadmap con curvas dinámicas */}
        <div className="relative">
          {/* Línea curva de conexión */}
          <svg width="100%" height="1600" viewBox="0 0 800 1600" className="absolute left-1/2 -translate-x-1/2">
            <defs>
              <linearGradient id="roadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff55" />
                <stop offset="100%" stopColor="#ffffff11" />
              </linearGradient>
            </defs>

            <path
              d="
                M 200 80
                Q 320 150, 500 200
                Q 700 300, 400 400
                Q 200 500, 500 600
                Q 700 700, 300 800
                Q 100 900, 500 1000
                Q 700 1100, 300 1200
                Q 100 1300, 500 1400
                Q 700 1500, 400 1600
              "
              stroke="url(#roadGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="12,8"
              className="animate-pulse"
            />
          </svg>

          {/* Steps */}
          <div className="relative space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = step.position === "left"

              return (
                <ScrollReveal key={step.number} delay={200 + i * 200}>
                  <PaperStepCard step={step} isLeft={i % 2 === 0} />
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={steps.length * 200 + 400}>
            <div className="relative mx-auto mt-24 max-w-5xl ">
              {/* Fondo SVG decorativo ampliado */}
              <svg viewBox="0 0 700 175" className="absolute w-full h-full z-0">
                <defs>
                  <linearGradient id="metaGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0078d4" />
                    <stop offset="100%" stopColor="#0078d4" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 66.4C0 31.6 0 14.2 15 5.2C30 -3.8 55 0.1 105 8L620 62.1C645 65.9 660 67.8 670 73.8C680 79.8 680 88.2 680 105V131C680 151.7 680 162.1 665 168.6C650 175 630 175 590 175H80C40 175 22 175 11 168.6C0 162.1 0 151.7 0 131V66.4Z"
                  fill="url(#metaGradient)"
                />
              </svg>

              {/* Contenido */}
              <div className="relative z-10 flex flex-col gap-4 items-center px-12 py-12 text-white text-center">
                <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-green-500 animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>

                <h3 className="text-3xl font-bold tracking-tight">¡Meta Alcanzada!</h3>
                <p className="text-white/90 text-lg leading-snug max-w-2xl">
                  Sitio optimizado y contenido en marcha
                </p>

                <div className="w-28 h-[2px] bg-gradient-to-r from-white/20 via-white/60 to-white/20" />

                <div className="flex justify-center gap-10 flex-wrap text-md font-medium text-white/90 mt-2">
                  <div className="flex items-center border border-white/20 rounded-full px-4 py-2 gap-2">
                    <Globe className="w-4 h-4" />
                    Web Optimizada
                  </div>
                  <div className="flex items-center border border-white/20 rounded-full px-4 py-2 gap-2">
                    <Camera className="w-4 h-4" />
                    Contenido Activo
                  </div>
                  <div className="flex items-center border border-white/20 rounded-full px-4 py-2 gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Comunicación 24/7
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}