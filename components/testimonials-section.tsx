"use client"

import { Star, MessageSquare, ChevronRight, CheckCheck, Users, Quote } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"
import Image from "next/image"
import ClientCarousel from "../components/ui/ClientCarousel"

const testimonials = [
  {
    id: 1,
    name: "María González",
    company: "Café Aroma",
    quote: "¡Increíble trabajo! Nuestras redes nunca habían tenido tanto alcance.",
    time: "10:30 AM",
    avatar: "/avatars/user-1.jpg"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    company: "Tech Solutions",
    quote: "El equipo de Óptima Digital superó todas nuestras expectativas con su estrategia digital.",
    time: "Ayer",
    avatar: "/avatars/user-2.jpg"
  },
  {
    id: 3,
    name: "Laura Martínez",
    company: "Moda Urbana",
    quote: "¡Nuestras ventas online se han disparado desde que trabajamos juntos! Muy recomendables.",
    time: "Lunes",
    avatar: "/avatars/user-3.jpg"
  },
  {
    id: 4,
    name: "Jorge Fernández",
    company: "Restaurante Sabores",
    quote: "El diseño de nuestra web ha mejorado significativamente la experiencia de nuestros clientes.",
    time: "27/04",
    avatar: "/avatars/user-4.jpg"
  },
  {
    id: 5,
    name: "Ana Torres",
    company: "Belleza Natural",
    quote: "La campaña de redes sociales ha sido un éxito total. ¡Gracias por su dedicación!",
    time: "20/04",
    avatar: "/avatars/user-5.jpg"
  },
  {
    id: 6,
    name: "Diego Ramírez",
    company: "Gimnasio Activo",
    quote: "El SEO que implementaron nos ha posicionado en los primeros lugares de búsqueda. Excelente trabajo.",
    time: "15/04",
    avatar: "/avatars/user-6.jpg"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 text-white overflow-hidden bg-[url('/fondo-papel-optima.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header mejorado */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold tracking-wide">TESTIMONIOS</span>
            </div>

            <h2 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Nuestros clientes
            </h2>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <Quote className="w-8 h-8 text-blue-400" />
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-center text-xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
            Conversaciones reales con nuestros clientes que han experimentado el
            <span className="text-blue-300 font-semibold"> impacto transformador </span>
            de nuestros servicios digitales.
          </p>
        </ScrollReveal>

        {/* Teléfono con diseño mejorado */}
        <ScrollReveal delay={400}>
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[50px] shadow-2xl overflow-hidden max-w-[380px] mx-auto border-4 border-gray-700 relative">
            {/* Notch más realista */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10 border-x-2 border-b-2 border-gray-700" />
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-20" />

            {/* Header tipo WhatsApp mejorado */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center border-b border-emerald-700/50 pt-10 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm border border-white/30">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Testimonios de Clientes</h3>
                <p className="text-sm opacity-90 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  En línea
                </p>
              </div>
            </div>

            {/* Chat con mejor diseño */}
            <div className="h-[520px] overflow-y-auto bg-gradient-to-b from-gray-100 to-gray-200 scroll-smooth">
              <div className="p-4 space-y-4">
                {testimonials.map((testimonial, index) => (
                  <ScrollReveal key={testimonial.id} delay={index * 150}>
                    <div className="flex items-start gap-3 group">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 border-2 border-white shadow-lg">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=4F46E5&color=ffffff&size=48`
                          }}
                        />
                      </div>

                      <div className="max-w-[75%]">
                        <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-lg border border-gray-200/50 group-hover:shadow-xl transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 text-sm">{testimonial.name}</span>
                            <span className="text-xs text-gray-500 font-medium">{testimonial.time}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm mb-2">{testimonial.quote}</p>
                          <div className="flex justify-end">
                            <CheckCheck className="h-4 w-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-2 ml-3 font-medium bg-gray-300/50 inline-block px-2 py-1 rounded-full">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Input mejorado */}
            <div className="bg-gray-50 p-3 border-t border-gray-300">
              <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm border border-gray-200">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="w-full bg-transparent border-none outline-none text-sm text-gray-600"
                  disabled
                />
                <button className="text-gray-400 hover:text-emerald-600 transition-colors ml-2 p-1 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}