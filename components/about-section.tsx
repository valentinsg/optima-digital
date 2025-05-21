import ScrollReveal from "@/components/scroll-reveal"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#DEECFE] h-[100vh] to-white">
      <div className="mb-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium text-sm">¿Quiénes somos?</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
            ¿Quiénes somos?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
            Óptima nació a principios del 2025 como un proyecto de una pareja con experiencia en marketing digital y
            ventas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ScrollReveal delay={400} className="mt-10 p-0 rounded-lg overflow-hidden shadow-lg border-4 border-primary">
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
          <ScrollReveal delay={400} className="mt-10 rounded-lg overflow-hidden shadow-md border-4 border-primary relative">
            <div className="relative h-[50vh]">
              {/* Imagen de fondo tipo mapa */}
              <img
                src="/mapa-optima.png"
                alt="Ubicación"
                className="absolute w-full h-full object-cover"
              />

              {/* Logo de Óptima Digital (badge) */}
              <img
                src="/optima.png"
                alt="Óptima Digital"
                className="absolute right-2 w-36 z-20"
              />

              {/* Overlay con texto */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent p-4 flex flex-col items-center justify-center text-center z-10">
                <div className="mb-4 text-white drop-shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-map-pin">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white stroke-black stroke-1 mb-2">
                  Desde <span className="text-white stroke-black">Buenos Aires</span> al <span className="text-white stroke-black">Mar</span>
                </h3>
                <p className="text-white font-semibold text-base stroke-black stroke-1">
                  Operamos en <span className="text-white stroke-black">Capital Federal</span> y <span className="text-white stroke-black">Mar del Plata</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
