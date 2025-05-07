import { ArrowRight } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

const steps = [
  {
    number: "01",
    title: "Contacto inicial",
    description: "Presencial, redes o recomendación.",
  },
  {
    number: "02",
    title: "Reunión inicial",
    description: "Explicamos nuestro sistema, resolvemos dudas, presentamos contrato.",
  },
  {
    number: "03",
    title: "Inicio",
    description: "Capturamos contenido, se realiza el pago.",
  },
  {
    number: "04",
    title: "Ejecución mensual",
    description: "Grupo activo de WhatsApp, calendario de contenido, visitas cada 15 días, mantenimiento de web.",
  },
]

export default function MethodologySection() {
  return (
    <section className="py-16 bg-[#0056B3] text-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Metodología de trabajo</h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-center text-white/90">
            Nuestro proceso está diseñado para brindarte una experiencia fluida y resultados efectivos.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={300 + index * 100}>
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-[#0056B3] border-2 border-white w-16 h-16 rounded-full flex items-center justify-center mb-6 z-10">
                    <span className="text-xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full transform -translate-x-1/2">
                      <ArrowRight className="h-6 w-6 text-white/40" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
