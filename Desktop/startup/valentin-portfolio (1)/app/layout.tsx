import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Valentín Sánchez Guevara - Full-Stack Developer & Creative",
  description:
    "Portfolio de Valentín Sánchez Guevara - Desarrollador Full-Stack especializado en React, Next.js, y tecnologías blockchain. Mejorando empresas a través de la digitalización.",
  keywords: [
    "Valentín Sánchez Guevara",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Blockchain",
    "Web Development",
    "Argentina",
  ],
  authors: [{ name: "Valentín Sánchez Guevara" }],
  creator: "Valentín Sánchez Guevara",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://valentinsanchez.dev",
    title: "Valentín Sánchez Guevara - Full-Stack Developer & Creative",
    description:
      "Portfolio de Valentín Sánchez Guevara - Desarrollador Full-Stack especializado en React, Next.js, y tecnologías blockchain.",
    siteName: "Valentín Sánchez Guevara Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentín Sánchez Guevara - Full-Stack Developer & Creative",
    description:
      "Portfolio de Valentín Sánchez Guevara - Desarrollador Full-Stack especializado en React, Next.js, y tecnologías blockchain.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
