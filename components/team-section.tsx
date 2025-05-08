import Image from "next/image"
import ScrollReveal from "@/components/scroll-reveal"

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
    image: "/placeholder.svg?height=400&width=400",
    bio: "Encargado de diseñar y construir soluciones digitales a medida que potencien la presencia online y el rendimiento de los clientes.",
  },
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="section-title text-center">Nuestro Equipo</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center">
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
