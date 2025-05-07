import ScrollReveal from "@/components/scroll-reveal"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="section-title text-center">¿Quiénes somos?</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center">
            Óptima nació a principios del 2025 como un proyecto de una pareja con experiencia en marketing digital y
            ventas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <ScrollReveal delay={300} className="bg-[#f8f9fa] p-8 rounded-lg">

            <p className="text-text">
              Hoy somos un equipo en crecimiento, recientemente sumamos a nuestros servicios Contenido Publicitario de Autor y desarrollo web.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400} className="bg-[#f8f9fa] p-8 rounded-lg">
            <p className="text-text mb-4">Operamos principalmente en Capital Federal y Mar del Plata. 
              <br />
              Nuestro objetivo es ofrecer un servicio de calidad a nuestros clientes, y así poder crecer juntos.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
