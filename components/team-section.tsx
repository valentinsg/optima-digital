import Image from "next/image"
import ScrollReveal from "@/components/scroll-reveal"
import { Heart, Quote } from "lucide-react"

const teamMembers = [
  {
    name: "Brisa Colombini",
    role: "Directora Creativa y de Contenido",
    image: "/Bri.webp",
    bio: "Responsable de la identidad visual, estrategia de marca y creación de contenido personalizado para cada cliente.",
  },
  {
    name: "Facundo Pérez",
    role: "Director Comercial y Ventas",
    image: "/Facu.webp",
    bio: "Encargado de relaciones con clientes, planificación comercial y estrategia de expansión de la agencia.",
  },
  {
    name: "Valentín Sánchez Guevara",
    role: "Responsable de Desarrollo Web y Producto Digital",
    image: "/Valen.png",
    bio: "Encargado de diseñar y construir soluciones digitales a medida que potencien la presencia online y el rendimiento de los clientes.",
  },
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#DEECFE] to-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary mb-4">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Equipo</span>
            </div>

            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-primary">
              Nuestro Equipo
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
            Conocé a los profesionales apasionados que trabajan para impulsar tu negocio en el mundo digital.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={300 + index * 100} className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-40 h-40 relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-text">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
