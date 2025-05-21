import { MessageSquare, Camera, Users } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

const differentials = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Atención personalizada",
    description: "Grupo de WhatsApp directo para una comunicación fluida y constante con nuestro equipo.",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Visitas presenciales",
    description: "Capturamos contenido real de tu negocio para crear materiales auténticos y de calidad.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Flexibilidad y acompañamiento",
    description: "Nos adaptamos a tus necesidades con un enfoque humano y estratégico.",
  },
]

export default function DifferentialSection() {
  return (
    <section className="py-20 bg-gradient-to-t from-[#DEECFE] to-white">
      <div className="mb-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">Nuestro diferencial</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">Óptima se adapta al cliente, no el cliente a la agencia.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {differentials.map((item, index) => (
            <ScrollReveal
              key={item.title}
              delay={300 + index * 100}
              className="bg-[#f8f9fa] p-8 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-text">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
