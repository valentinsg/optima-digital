import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"

const teamMembers = [
  {
    name: "Brisa Colombini",
    role: "Directora Creativa y de Contenido",
    image: "/placeholder.svg?height=600&width=600",
    bio: "Responsable de la identidad visual, estrategia de marca y creación de contenido personalizado para cada cliente. Con su experiencia en diseño y comunicación, Brisa lidera el desarrollo de narrativas efectivas que conectan marcas con sus audiencias.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "brisa@optimadigital.com",
    },
  },
  {
    name: "Facundo Pérez",
    role: "Director Comercial y Ventas",
    image: "/placeholder.svg?height=600&width=600",
    bio: "Encargado de relaciones con clientes, planificación comercial y estrategia de expansión de la agencia. Facundo combina su experiencia en ventas con un profundo conocimiento del mercado digital para desarrollar propuestas de valor únicas para cada cliente.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "facundo@optimadigital.com",
    },
  },
  {
    name: "Valentín Sánchez Guevara",
    role: "Responsable de Desarrollo Web y Producto Digital",
    image: "/placeholder.svg?height=600&width=600",
    bio: "Encargado de diseñar y construir soluciones digitales a medida que potencien la presencia online y el rendimiento de los clientes. Valentín combina habilidades técnicas con un enfoque centrado en el usuario para crear experiencias digitales excepcionales.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "valentin@optimadigital.com",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-center mb-4 text-text">Nuestro Equipo</h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Conocé a los profesionales apasionados que trabajan para impulsar tu negocio en el mundo digital.
          </p>
        </ScrollReveal>

        <div className="space-y-24 mt-16">
          {teamMembers.map((member, index) => (
            <div key={member.name}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal delay={300} className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-text">{member.name}</h2>
                    <p className="text-primary font-medium text-xl mb-6">{member.role}</p>
                    <p className="text-muted-foreground mb-8">{member.bio}</p>

                    <div className="flex space-x-4">
                      <Link
                        href={member.social.linkedin}
                        className="text-text hover:text-primary transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                      <Link
                        href={member.social.instagram}
                        className="text-text hover:text-primary transition-colors"
                        aria-label={`Instagram de ${member.name}`}
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                      <Link
                        href={`mailto:${member.social.email}`}
                        className="text-text hover:text-primary transition-colors"
                        aria-label={`Email de ${member.name}`}
                      >
                        <Mail className="h-5 w-5" />
                      </Link>
                    </div>
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
