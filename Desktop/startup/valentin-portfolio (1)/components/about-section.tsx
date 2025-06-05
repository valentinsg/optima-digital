"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TargetIcon,
  CalendarIcon,
  TrophyIcon,
  MailIcon,
  PhoneIcon,
  HeartIcon,
  CodeIcon,
  PaletteIcon,
  RocketIcon,
} from "lucide-react"

interface AboutSectionProps {
  language: "es" | "en"
}

const translations = {
  es: {
    title: "Desarrollador frontend con visión en todo el producto",
    subtitle: "Experiencia en diseño UX/UI e identidad creativa",
    personalizedSolutions: "100% Soluciones Personalizadas",
    qualitySince: "Entregando Soluciones de Calidad Desde 2021",
    projectsCompleted: "15+ Proyectos Realizados",
    story1:
      "Desarrollador front-end con visión en todo el producto, experiencia en diseño UX/UI e identidad creativa. Integro código, diseño y marca para generar experiencias con alma.",
    story2:
      "Diseño con foco en estética, funcionalidad y contenido, creando productos claros e intuitivos. Lideré equipos, creando herramientas en línea y trabajando en proyectos tech, Web3 y culturales con impacto tangible.",
    story3:
      "Capaz de construir con propósito, agilizar procesos y diseñar soluciones que lleguen a las personas. Mi enfoque combina creatividad técnica con visión empresarial.",
    interests: "Intereses",
    interestDesc: "Interés en proyectos de impacto, tecnología social y experiencias con identidad.",
    languages: "Idiomas",
    spanish: "Español - Nativo",
    english: "Inglés - B1",
    email: "sanchezguevaravalentin@gmail.com",
    phone: "+54 9 2236680041",
  },
  en: {
    title: "Frontend developer with full product vision",
    subtitle: "Experience in UX/UI design and creative identity",
    personalizedSolutions: "100% Personalized Solutions",
    qualitySince: "Delivering Quality Solutions Since 2021",
    projectsCompleted: "15+ Completed Projects",
    story1:
      "Front-end developer with full product vision, experience in UX/UI design and creative identity. I integrate code, design and brand to generate experiences with soul.",
    story2:
      "I design with focus on aesthetics, functionality and content, creating clear and intuitive products. I led teams, creating online tools and working on tech, Web3 and cultural projects with tangible impact.",
    story3:
      "Capable of building with purpose, streamlining processes and designing solutions that reach people. My approach combines technical creativity with business vision.",
    interests: "Interests",
    interestDesc: "Interest in impact projects, social technology and experiences with identity.",
    languages: "Languages",
    spanish: "Spanish - Native",
    english: "English - B1",
    email: "sanchezguevaravalentin@gmail.com",
    phone: "+54 9 2236680041",
  },
}

const stats = [
  {
    number: "100%",
    labelEs: "Soluciones Personalizadas",
    labelEn: "Personalized Solutions",
    icon: TargetIcon,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "2021",
    labelEs: "Entregando Soluciones de Calidad Desde",
    labelEn: "Delivering Quality Solutions Since",
    icon: CalendarIcon,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "15+",
    labelEs: "Proyectos Realizados",
    labelEn: "Projects Completed",
    icon: TrophyIcon,
    color: "from-orange-500 to-red-500",
  },
]

export function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language]

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 max-w-4xl mx-auto bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mt-16 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">{stat.number}</div>
                      <div className="text-muted-foreground font-medium">
                        {language === "es" ? stat.labelEs : stat.labelEn}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Story */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CodeIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{t.story1}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PaletteIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{t.story2}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <RocketIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">{t.story3}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Interests */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <HeartIcon className="w-6 h-6 text-orange-500" />
                  {t.interests}
                </h3>
                <p className="text-muted-foreground">{t.interestDesc}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Languages */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Badge variant="outline" className="text-orange-600 border-orange-500/30">
                    🌍
                  </Badge>
                  {t.languages}
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">{t.spanish}</p>
                  <p className="text-muted-foreground">{t.english}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="mt-16 text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Badge variant="outline" className="text-orange-600 border-orange-500/30 px-3 py-1">
                <MailIcon className="w-4 h-4 mr-2" />
                {language === "es" ? "Correo" : "Email"}:
              </Badge>
              <span className="text-muted-foreground font-medium">{t.email}</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Badge variant="outline" className="text-orange-600 border-orange-500/30 px-3 py-1">
                <PhoneIcon className="w-4 h-4 mr-2" />
                {language === "es" ? "Teléfono" : "Phone"}:
              </Badge>
              <span className="text-muted-foreground font-medium">{t.phone}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
