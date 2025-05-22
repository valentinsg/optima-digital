import ScrollReveal from "@/components/scroll-reveal"
import { Quote, User } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-t from-[#DEECFE] to-white min-h-screen">
      <div className="mb-16 max-w-6xl mx-auto px-2">
        <ScrollReveal>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary mb-4">
              <User className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Sobre nosotros</span>
            </div>

            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-primary">
              ¿Quiénes somos?
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
            Óptima nació a principios del 2025 como un proyecto de una pareja con experiencia en marketing digital y
            ventas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
          {/* Card izquierda - Con fondo blanco semitransparente */}
          <ScrollReveal delay={400} className="mt-10 rounded-lg overflow-hidden shadow-lg border-4 border-primary">
            <div className="relative h-[50vh]">
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img src="/optima-fondo.png" alt="" className="absolute w-full h-full object-cover" />
              </div>

              {/* Overlay blanco semitransparente */}
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center text-center z-10 p-4">
                {/* Ícono */}
                <div className="text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-users">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                {/* Logo Óptima */}
                <img
                  src="/optima.png"
                  alt="Óptima Digital"
                  className="w-40 h-auto mb-6"
                />

                {/* Texto principal */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Somos un equipo en <span className="text-primary">crecimiento</span></h3>

                {/* Texto secundario */}
                <p className="text-gray-800 text-lg max-w-xs mt-2 leading-relaxed">
                  Recientemente sumamos a nuestros servicios <span className="text-primary font-bold">Contenido Publicitario de Autor</span> y <span className="text-primary font-bold">Desarrollo Web/Software</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card derecha - Arreglando el espacio blanco */}
          <ScrollReveal delay={400} className="mt-10 rounded-lg overflow-hidden shadow-lg border-4 border-primary">
            <div className="relative h-[50vh]">
              {/* Imagen de fondo que cubre todo el espacio */}
              <div className="absolute inset-0">
                <img
                  src="/mapa-optima.png"
                  alt="Ubicación"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center text-center z-10 p-4">
                {/* Ícono de ubicación */}
                <div className="text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-location">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                </div>

                {/* Logo Óptima */}
                <img
                  src="/optima.png"
                  alt="Óptima Digital"
                  className="w-40 h-auto mb-6"
                />

                {/* Textos */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Desde <span className="text-primary">Buenos Aires</span> al <span className="text-primary">Mar</span>
                </h3>
                <p className="text-gray-800 text-lg max-w-xs mt-2 leading-relaxed">
                  Operamos en <span className="text-primary font-bold text-xl">Capital Federal</span> y <span className="text-primary font-bold text-xl">Mar del Plata</span>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}