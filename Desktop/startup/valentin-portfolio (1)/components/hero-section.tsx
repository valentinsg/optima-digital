"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MapPinIcon,
  CodeIcon,
  PaletteIcon,
  Link,
} from "lucide-react"

interface HeroSectionProps {
  language: "es" | "en"
}

const translations = {
  es: {
    greeting: "Hola! Soy",
    name: "Valentín Sánchez Guevara",
    role: "Desarrollador Frontend",
    subtitle: "con visión de producto",
    description:
      "Integro código, diseño e identidad de marca para generar experiencias que no se sientan vacías. Desarrollo con foco en funcionalidad, contenido y coherencia visual, creando productos intuitivos.",
    location: "Mar del Plata, Buenos Aires. Argentina",
    downloadCV: "Descargar CV",
    viewProjects: "Ver Proyectos",
    workTogether: "Trabajemos Juntos",
    availableForWork: "Disponible para trabajar",
    experience: "4+ años de experiencia",
    projects: "15+ proyectos completados",
  },
  en: {
    greeting: "Hello! I'm",
    name: "Valentín Sánchez Guevara",
    role: "Frontend Developer",
    subtitle: "with product vision",
    description:
      "I integrate code, design and brand to generate experiences that don't feel empty. I design with focus on functionality, content and visual coherence, creating clear and intuitive products.",
    location: "Mar del Plata, Bs.AS. Argentina",
    downloadCV: "Download CV",
    viewProjects: "View Projects",
    workTogether: "Let's Work Together",
    availableForWork: "Available for work",
    experience: "4+ years of experience",
    projects: "15+ completed projects",
  },
}

export function HeroSection({ language }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const t = translations[language]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = language === "es" ? "/valentin-sanchez-guevara.pdf" : "/valentin-sanchez-guevara-english.pdf"
    link.download = link.href
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-60">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto z-10 my-12">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="space-y-4">
                <motion.p className="text-lg text-muted-foreground font-medium" variants={itemVariants}>
                  {t.greeting}
                </motion.p>
                <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold" variants={itemVariants}>
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                    {t.name}
                  </span>
                </motion.h1>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <CodeIcon className="w-5 h-5 text-orange-500" />
                    {t.role}
                    <PaletteIcon className="ml-4 w-5 h-5 text-orange-500" />
                    {t.subtitle}
                  </h2>
                </motion.div>

                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    {t.availableForWork}
                  </Badge>
                </div>
              </div>

              <motion.p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" variants={itemVariants}>
                {t.description}
              </motion.p>

              <motion.div className="flex items-center space-x-2 text-muted-foreground" variants={itemVariants}>
                <MapPinIcon className="w-5 h-5 text-orange-500" />
                <span className="font-medium">{t.location}</span>
              </motion.div>

              {/* Stats */}
              <motion.div className="grid grid-cols-2 gap-6" variants={itemVariants}>
                <div className="text-center p-8 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <div className="text-2xl font-bold text-orange-500">{t.experience}</div>
                  <div className="text-sm text-muted-foreground">Frontend</div>
                </div>
                <div className="text-center p-8 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <div className="text-2xl font-bold text-orange-500">{t.projects}</div>
                  <div className="text-sm text-muted-foreground">Portfolio</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToProjects}
              >
                {t.viewProjects}
                <ExternalLinkIcon className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500"
                onClick={scrollToContact}
              >
                {t.workTogether}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300"
                onClick={downloadCV}
              >
                {t.downloadCV}
                <DownloadIcon className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex space-x-4" variants={itemVariants}>
              <a href="https://github.com/valentinsg" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-orange-500 hover:bg-orange-500/10">
                  <GithubIcon className="w-8 h-8" />
                </Button>
              </a>

              <a href="https://www.linkedin.com/in/valent%C3%ADn-s-761910200/" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-orange-500 hover:bg-orange-500/10">
                  <LinkedinIcon className="w-8 h-8" />
                </Button>
              </a>
              <a href="mailto:sanchezguevaravalentin@gmail.com" target="_blank">
                <Button variant="ghost" size="icon" className="hover:text-orange-500 hover:bg-orange-500/10">
                  <MailIcon className="w-8 h-8" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="relative">
              <motion.div
                className="w-[420px] h-[420px] rounded-full overflow-hidden border-4 border-orange-500/50 shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Image
                  src="/images/profile.png"
                  alt="Valentín Sánchez Guevara"
                  width={840}
                  height={840}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <span className="text-white text-4xl">👋</span>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
