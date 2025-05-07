import { Star } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

const testimonials = [
  {
    name: "María González",
    company: "Café Aroma",
    quote:
      "Trabajar con Óptima Digital transformó nuestra presencia online. Su enfoque estratégico y creatividad nos ayudaron a conectar con nuestra audiencia de manera efectiva.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    company: "Tech Solutions",
    quote:
      "El equipo de Óptima Digital entendió perfectamente nuestras necesidades y desarrolló una estrategia que superó nuestras expectativas. Los resultados hablan por sí solos.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    company: "Moda Urbana",
    quote:
      "Desde que implementamos las estrategias de Óptima Digital, nuestras ventas online han crecido exponencialmente. Su profesionalismo y dedicación son excepcionales.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="section-title text-center">Lo que dicen nuestros clientes</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center">
            Nos enorgullece el impacto positivo que generamos en los negocios de nuestros clientes. Estas son algunas de
            sus experiencias.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              delay={300 + index * 100}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-text italic mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.company}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
