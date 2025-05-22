"use client"

import ScrollReveal from "@/components/scroll-reveal"

const clientLogos = [
  { name: "Café Aroma", src: "/logo_de_FEED_1.webp" },
  { name: "Tech Solutions", src: "/logo_FEED_2.webp" },
  { name: "Moda Urbana", src: "/logo_FEED_3_.webp" },
  { name: "Restaurante Sabores", src: "/logo_FEED_4.webp" },
  { name: "Belleza Natural", src: "/logo_de_FEED_1.webp" },
  { name: "Gimnasio Activo", src: "/logo_FEED_2.webp" },
]

export default function ClientCarousel() {
  return (
    <ScrollReveal delay={300}>
      <div className="relative mt-16 mb-12">
        {/* Título con estilo mejorado */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-3">
            Empresas que confían en nosotros
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Contenedor del carrusel */}
        <div className="relative overflow-hidden">
          {/* Gradientes laterales para efecto fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none"></div>
          
          {/* Carrusel infinito */}
          <div className="flex animate-marquee-slow">
            {/* Primera ronda de logos */}
            {clientLogos.map((logo, index) => (
              <div
                key={`first-${logo.name}-${index}`}
                className="flex-shrink-0 mx-6 group"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-blue-200/50 min-w-[180px] h-28 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=${encodeURIComponent(logo.name)}`
                    }}
                  />
                </div>
                <p className="text-center text-white/70 text-sm font-medium mt-3 group-hover:text-white/90 transition-colors duration-300">
                  {logo.name}
                </p>
              </div>
            ))}
            
            {/* Segunda ronda de logos para continuidad */}
            {clientLogos.map((logo, index) => (
              <div
                key={`second-${logo.name}-${index}`}
                className="flex-shrink-0 mx-6 group"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 hover:border-blue-200/50 min-w-[180px] h-28 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/120x60/4F46E5/FFFFFF?text=${encodeURIComponent(logo.name)}`
                    }}
                  />
                </div>
                <p className="text-center text-white/70 text-sm font-medium mt-3 group-hover:text-white/90 transition-colors duration-300">
                  {logo.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estadística de confianza */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 font-medium">+50 empresas satisfechas</span>
          </div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee-slow {
          animation: marquee-slow 30s linear infinite;
        }
        
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </ScrollReveal>
  )
}