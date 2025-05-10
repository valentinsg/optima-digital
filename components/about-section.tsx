import ScrollReveal from "@/components/scroll-reveal"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="section-title text-center">¿Quiénes somos?</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="section-subtitle text-center ">
            Óptima nació a principios del 2025 como un proyecto de una pareja con experiencia en marketing digital y
            ventas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ScrollReveal delay={300} className="mt-10 bg-section-subtitle p-8 rounded-lg border-2 border-primary shadow-sm">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="text-text text-lg text-center">
                Hoy somos un equipo en crecimiento, recientemente sumamos a nuestros servicios Contenido Publicitario de Autor y desarrollo web.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} className="bg-white mt-10 p-8 rounded-lg border-2 border-primary shadow-sm">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="text-text text-lg text-center">
                Operamos en Capital Federal y Mar del Plata. 
                <br />
                Nuestro objetivo es ofrecer un servicio de calidad a nuestros clientes, y así poder crecer juntos.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
