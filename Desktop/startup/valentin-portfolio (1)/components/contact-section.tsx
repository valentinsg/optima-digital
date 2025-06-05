"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  GithubIcon,
  LinkedinIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
} from "lucide-react"

interface ContactSectionProps {
  language: "es" | "en"
}

const translations = {
  es: {
    title: "¡Trabajemos Juntos!",
    subtitle: "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él",
    name: "Nombre",
    email: "Email",
    subject: "Asunto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    sending: "Enviando...",
    contactInfo: "Información de Contacto",
    availability: "Disponible para proyectos freelance",
    response: "Respondo en menos de 24 horas",
    successMessage: "¡Mensaje enviado exitosamente!",
    errorMessage: "Error al enviar el mensaje. Inténtalo de nuevo.",
    followMe: "Sígueme en",
    sendMessage: "Envíame un mensaje",
  },
  en: {
    title: "Let's Work Together!",
    subtitle: "Have a project in mind? I'd love to hear about it",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    contactInfo: "Contact Information",
    availability: "Available for freelance projects",
    response: "I respond within 24 hours",
    successMessage: "Message sent successfully!",
    errorMessage: "Error sending message. Please try again.",
    followMe: "Follow me on",
    sendMessage: "Send me a message",
  },
}

export function ContactSection({ language }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate EmailJS integration
      // In a real implementation, you would use EmailJS here:
      // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "✅ " + t.successMessage,
        description:
          language === "es" ? "Te responderé lo antes posible." : "I'll get back to you as soon as possible.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast({
        title: "❌ " + t.errorMessage,
        description:
          language === "es"
            ? "Por favor, inténtalo de nuevo o contáctame directamente."
            : "Please try again or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <SendIcon className="w-6 h-6 text-orange-500" />
                  {t.sendMessage}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.name}</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-orange-500/20 focus:border-orange-500 transition-colors duration-200"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.email}</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-orange-500/20 focus:border-orange-500 transition-colors duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.subject}</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-orange-500/20 focus:border-orange-500 transition-colors duration-200"
                      placeholder="Asunto del mensaje"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.message}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="border-orange-500/20 focus:border-orange-500 transition-colors duration-200"
                      placeholder="Cuéntame sobre tu proyecto..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4 mr-2" />
                        {t.send}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <MailIcon className="w-6 h-6 text-orange-500" />
                    {t.contactInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MailIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">sanchezguevaravalentin@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{language === "es" ? "Teléfono" : "Phone"}</p>
                      <p className="text-muted-foreground">+54 9 2236680041</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{language === "es" ? "Ubicación" : "Location"}</p>
                      <p className="text-muted-foreground">Mar del Plata, Argentina</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2">
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      {t.availability}
                    </Badge>
                    <Badge variant="outline" className="text-orange-600 border-orange-500/30 px-4 py-2">
                      <AlertCircleIcon className="w-4 h-4 mr-2" />
                      {t.response}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">{t.followMe}</h3>
                  <div className="flex space-x-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                      >
                        <GithubIcon className="w-5 h-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                      >
                        <MailIcon className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
