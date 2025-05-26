"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function FAQClientPage() {
  const faqs = [
    {
      question: "¿Cuál es el tiempo de entrega de los productos?",
      answer:
        "Nuestros productos se envían dentro de las 24-48 horas posteriores a la confirmación del pedido. El tiempo de entrega estándar es de 3-5 días hábiles, dependiendo de tu ubicación. Para entregas internacionales, el tiempo estimado es de 7-14 días hábiles.",
    },
    {
      question: "¿Qué tipo de cuero utilizan en sus productos?",
      answer:
        "En Velmor utilizamos exclusivamente cuero de grano completo de la más alta calidad, seleccionado por su durabilidad y belleza natural. Nuestro cuero proviene de curtidurías certificadas que cumplen con estrictos estándares éticos y ambientales.",
    },
    {
      question: "¿Ofrecen garantía en sus productos?",
      answer:
        "Sí, todos nuestros productos están respaldados por una garantía de 2 años que cubre defectos de fabricación. Estamos tan seguros de la calidad de nuestros productos que si encuentras algún defecto en la mano de obra o los materiales, lo repararemos o reemplazaremos sin costo adicional.",
    },
    {
      question: "¿Puedo personalizar mi producto Velmor?",
      answer:
        "Sí, ofrecemos servicios de personalización para la mayoría de nuestros productos. Puedes solicitar grabado de iniciales o un mensaje corto. Para proyectos de personalización más extensos, te recomendamos contactar directamente con nuestro equipo de atención al cliente.",
    },
    {
      question: "¿Cómo debo cuidar mi producto de cuero Velmor?",
      answer:
        "Recomendamos limpiar suavemente tus productos Velmor con un paño húmedo y dejar secar naturalmente lejos de fuentes directas de calor. Para mantener la flexibilidad y brillo del cuero, aplica un acondicionador de cuero de calidad cada 3-6 meses. Evita la exposición prolongada al sol y la humedad excesiva.",
    },
    {
      question: "¿Realizan envíos internacionales?",
      answer:
        "Sí, realizamos envíos a nivel internacional. Los costos de envío y los tiempos de entrega varían según el destino. Todos los pedidos internacionales pueden estar sujetos a impuestos y aranceles de importación, que son responsabilidad del cliente.",
    },
    {
      question: "¿Cuál es su política de devoluciones?",
      answer:
        "Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto, siempre que el artículo esté en su estado original, sin usar y con todas las etiquetas y embalajes originales. Los gastos de envío para devoluciones corren por cuenta del cliente, a menos que el producto presente defectos.",
    },
    {
      question: "¿Ofrecen opciones de regalo?",
      answer:
        "Sí, todos nuestros productos vienen en un elegante packaging que ya es perfecto para regalo. Adicionalmente, ofrecemos la opción de incluir una tarjeta personalizada con tu mensaje y envolver el producto en papel de regalo premium por un costo adicional.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-foreground/70 mb-12 text-center">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={item}>
                  <AccordionItem value={`item-${index}`} className="border-b border-border">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-[#c5a96d] hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border text-center"
          >
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-foreground/70 mb-6">
              Si tienes alguna otra pregunta, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte.
            </p>
            <div className="flex justify-center">
              <a
                href="/contacto"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#c5a96d]"
              >
                Contactar
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
