"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  PenToolIcon as ToolIcon,
  BrainIcon,
  GlobeIcon,
  ZapIcon,
  LayersIcon,
} from "lucide-react"

interface SkillsSectionProps {
  language: "es" | "en"
}

const translations = {
  es: {
    title: "Habilidades & Experiencia",
    subtitle: "Tecnologías y herramientas que domino",
    experience: "Experiencia Profesional",
    claridad: "Frontend Developer & Consultor",
    claridadDesc:
      "Desarrollo del Mapa de Crimen con geolocalización y visualización de datos en tiempo real. Integración con cámaras de seguridad IP y colaboración interinstitucional.",
    optima: "Frontend Developer Freelance",
    optimaDesc:
      "Desarrollo de landing pages y e-commerce para pymes. Definición comercial, experiencia de usuario y estructura de marca.",
    smithii: "JR. Frontend Developer",
    smithiiDesc:
      "Proyectos internos, herramientas de análisis, landing pages. Creé interfaces de chats, dashboards y herramientas digitales con enfoque Web3.",
    education: "Educación",
    values: "Valores Profesionales",
    leadership: "Capacidad de liderazgo en entornos creativos y técnicos",
    adaptability: "Adaptabilidad y autonomía en entornos freelance y remotos",
  },
  en: {
    title: "Skills & Experience",
    subtitle: "Technologies and tools I master",
    experience: "Professional Experience",
    claridad: "Frontend Developer & Consultant",
    claridadDesc:
      "Development of Crime Map with geolocation and real-time data visualization. Integration with IP security cameras and inter-institutional collaboration.",
    optima: "Freelance Frontend Developer",
    optimaDesc:
      "Development of landing pages and e-commerce for SMEs. Commercial definition, user experience and brand structure.",
    smithii: "JR. Frontend Developer",
    smithiiDesc:
      "Internal projects, analysis tools, landing pages. Created chat interfaces, dashboards and digital tools with Web3 focus.",
    education: "Education",
    values: "Professional Values",
    leadership: "Leadership capacity in creative and technical environments",
    adaptability: "Adaptability and autonomy in freelance and remote environments",
  },
}

const skillCategories = [
  {
    icon: CodeIcon,
    titleEs: "Frontend",
    titleEn: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Astro", "Chakra UI", "TailwindCSS"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ServerIcon,
    titleEs: "Backend",
    titleEn: "Backend",
    skills: ["Supabase", "Firebase", "Node.js", "MongoDB"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: PaletteIcon,
    titleEs: "Diseño y Prototipado",
    titleEn: "Design & Prototyping",
    skills: ["Photoshop", "Canva", "UX/UI", "Figma"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BrainIcon,
    titleEs: "Python",
    titleEn: "Python",
    skills: ["Scripting", "Web Scraping", "Automation"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: ToolIcon,
    titleEs: "Dev Tools",
    titleEn: "Dev Tools",
    skills: ["Redux", "GitHub", "Vercel", "Netlify", "Notion"],
    color: "from-gray-500 to-slate-500",
  },
  {
    icon: ZapIcon,
    titleEs: "Otros",
    titleEn: "Other",
    skills: ["Sanity", "SEO Técnico", "Headless CMS", "Web3"],
    color: "from-red-500 to-orange-500",
  },
]

const experiences = [
  {
    company: "Claridad",
    role: "Frontend Developer & Consultor",
    period: "Diciembre 2024 - Actualidad",
    periodEn: "December 2024 - Present",
    location: "Mar Del Plata, Argentina",
    url: "https://claridad.ar",
    type: "Part-Time",
  },
  {
    company: "Óptima Digital",
    role: "Frontend Developer Freelance",
    period: "2025 - Actualidad",
    periodEn: "2025 - Present",
    location: "CABA, Argentina",
    url: "https://optimaagencia.com",
    type: "Freelance",
  },
  {
    company: "Smithii",
    role: "JR. Frontend Developer",
    period: "Junio 2023 - Noviembre 2024",
    periodEn: "June 2023 - November 2024",
    location: "Emiratos Árabes Unidos",
    url: "https://smithii.io/",
    type: "Remote",
  },
]

export function SkillsSection({ language }: SkillsSectionProps) {
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-lg">{language === "es" ? category.titleEs : category.titleEn}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: skillIndex * 0.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20 transition-colors duration-200"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">{t.experience}</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="font-semibold text-lg text-foreground">{exp.role}</h4>
                          <Badge variant="outline" className="text-orange-600 border-orange-500/30 w-fit">
                            {exp.type}
                          </Badge>
                        </div>
                        <p className="text-orange-500 font-medium mb-1">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {language === "es" ? exp.period : exp.periodEn} • {exp.location}
                        </p>
                        <p className="text-muted-foreground mb-3">
                          {exp.company === "Claridad" && t.claridadDesc}
                          {exp.company === "Óptima Digital" && t.optimaDesc}
                          {exp.company === "Smithii" && t.smithiiDesc}
                        </p>
                        {exp.url && (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:text-orange-600 text-sm font-medium inline-flex items-center gap-1"
                          >
                            <GlobeIcon className="w-3 h-3" />
                            {exp.url.replace("https://", "")}
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Values */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8">{t.values}</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <LayersIcon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-muted-foreground">{t.leadership}</p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <ZapIcon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-muted-foreground">{t.adaptability}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
