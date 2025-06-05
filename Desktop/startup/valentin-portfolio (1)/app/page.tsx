"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function Portfolio() {
  const [language, setLanguage] = useState<"es" | "en">("es")

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <motion.div
        className="min-h-screen bg-background text-foreground transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header language={language} setLanguage={setLanguage} />
        <main>
          <HeroSection language={language} />
          <ProjectsSection language={language} />
          <AboutSection language={language} />
          <SkillsSection language={language} />
          <ContactSection language={language} />
        </main>
        <Footer language={language} />
      </motion.div>
    </ThemeProvider>
  )
}
