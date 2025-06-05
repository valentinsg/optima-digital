"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectsSectionProps {
  language: "es" | "en"
}

const translations = {
  es: {
    title: "Proyectos Destacados",
    subtitle: "Una selección de mis trabajos más recientes",
    all: "Todos",
    web: "Desarrollo Web",
    blockchain: "Blockchain",
    business: "Software Empresarial",
    design: "Diseño",
    viewProject: "Ver Proyecto",
    viewCode: "Ver Código",
    filter: "Filtrar por categoría",
  },
  en: {
    title: "Featured Projects",
    subtitle: "A selection of my most recent work",
    all: "All",
    web: "Web Development",
    blockchain: "Blockchain",
    business: "Business Software",
    design: "Design",
    viewProject: "View Project",
    viewCode: "View Code",
    filter: "Filter by category",
  },
}

const projects = [
  {
    id: 1,
    title: "Smithii Staking",
    titleEn: "Smithii Staking",
    description: "Plataforma de staking en Solana con interfaz intuitiva",
    descriptionEn: "Solana staking platform with intuitive interface",
    category: "blockchain",
    tags: [ "React", "TypeScript", "Chakra UI", "Rust"],
    image: "/images/smithii-staking.png",
    demoUrl: "https://stake.smithii.io",
    codeUrl: "",
  },
  {
    id: 2,
    title: "Smithii Tools",
    titleEn: "Smithii Tools",
    description: "Suite de herramientas para gestión de criptomonedas",
    descriptionEn: "Cryptocurrency management tools suite",
    category: "blockchain",
    tags: ["React", "TypeScript", "Rust", "Chakra UI", "Sanity", "Redux", "Crypto APIs"],
    image: "/images/smithii-tools.png",
    demoUrl: "https://smithii.io",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Smithii Software",
    titleEn: "Smithii Software",
    description: "Sistema de gestión empresarial de proyectos Web3",
    descriptionEn: "Business management system for Web3 projects",
    category: "business",
    tags: ["React",  "MongoDB", "TypeScript", "Chakra UI", "Redux", "Discord/X/Telegram API", "Auth0", "Socket.io", "Chart.js", "Springboot", "Crypto APIs"],
    image: "/images/smithii-software-2.jpg",
    demoUrl: "https://smithii.io",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Optima Digital",
    titleEn: "Optima Digital",
    description: "Sitio web corporativo con diseño para agencia de marketing digital",
    descriptionEn: "Corporate website with responsive design for marketing agency",
    category: "web",
    tags: ["Next.js", "Tailwind CSS"],
    image: "/images/optima-digital.png",
    demoUrl: "https://optimaagencia.com",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "Estudio VE",
    titleEn: "Estudio VE",
    description: "Sitio web para estudio creativo",
    descriptionEn: "Website for creative studio",
    category: "web",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Mercado Pago", "Firebase"],
    image: "/images/estudio-ve.png",
    demoUrl: "https://estudiove.com.ar",
    codeUrl: "#",
  },
  {
    id: 6,
    title: "Viandas Saludables",
    titleEn: "Healthy Meals",
    description: "Plataforma de suscripción a viandas saludables",
    descriptionEn: "Healthy meal subscription platform",
    category: "web",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Sanity", "Mercado Pago"],
    image: "/images/viandas.png",
    demoUrl: "https://viandas-fitness-landing-valentin-sg-valentinsgs-projects.vercel.app/",
    codeUrl: "#",
  },
  {
    id: 7,
    title: "Roccos",
    titleEn: "Roccos",
    description: "Sitio web para restaurante",
    descriptionEn: "Restaurant website",
    category: "web",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity", "TypeScript"],
    image: "/images/roccos.png",
    demoUrl: "https://roccosdolores.com",
    codeUrl: "#",
  },
  {
    id: 8,
    title: "Crime Map",
    titleEn: "Crime Map",
    description: "Mapa de crímenes con visualización de datos y análisis",
    descriptionEn: "Crime data visualization map with analysis",
    category: "web",
    tags: ["Next.js", "Leaflet", "Supabase", "Tailwind CSS", "TypeScript", "MongoDB", "Auth0", "Chart.js", "Socket.io"],
    image: "/images/crime-map.png",
    demoUrl: "https://claridad.ar",
    codeUrl: "#",
  },
  {
    id: 9,
    title: "Busy",
    titleEn: "Busy",
    description: "E-commerce de ropa streetwear con blog",
    descriptionEn: "E-commerce of streetwear clothing with blog",
    category: "web",
    tags: ["React", "Supabase", "Chakra UI", "TypeScript", "Mercado Pago", "Sanity"],
    image: "/images/busy.png",
    demoUrl: "https://busy.com.ar",
    codeUrl: "#",
  },
]

export function ProjectsSection({ language }: ProjectsSectionProps) {
  const t = translations[language]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-64 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={language === "es" ? project.title : project.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="secondary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.viewProject}
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Github className="w-4 h-4 mr-2" />
                      {t.viewCode}
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{language === "es" ? project.title : project.titleEn}</h3>
                  <p className="text-muted-foreground mb-4">
                    {language === "es" ? project.description : project.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-orange-500/10 text-orange-600 border-orange-500/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
