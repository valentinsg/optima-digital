"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  language: "es" | "en"
}

const translations = {
  es: {
    madeWith: "Hecho con",
    by: "por Valentín Sánchez Guevara",
    rights: "Todos los derechos reservados.",
  },
  en: {
    madeWith: "Made with",
    by: "by Valentín Sánchez Guevara",
    rights: "All rights reserved.",
  },
}

export function Footer({ language }: FooterProps) {
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <span className="font-bold text-lg">Valentín Sánchez Guevara</span>
            </div>
            <p className="text-muted-foreground">Full-Stack Developer & Creative</p>
          </div>

          <div className="flex flex-col md:items-end space-y-4">
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-orange-500">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-orange-500">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-orange-500">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center space-x-1">
            <span>{t.madeWith}</span>
            <Heart className="w-4 h-4 text-orange-500 fill-current" />
            <span>{t.by}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {currentYear} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
