import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import SmoothScroll from "@/components/smooth-scroll"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Óptima Digital | Agencia de Marketing",
  description:
    "Óptima Digital es tu agencia creativa de marketing en Buenos Aires y Mar del Plata. Brindamos soluciones digitales para pymes, e-commerce y negocios en crecimiento: SEO, branding, redes sociales, desarrollo web, diseño visual y estrategias personalizadas.",
  keywords: [
    "agencia de marketing",
    "agencia creativa digital",
    "marketing digital en Argentina",
    "desarrollo web Buenos Aires",
    "SEO Mar del Plata",
    "branding digital",
    "community manager Argentina",
    "asesoría digital personalizada",
    "agencia digital en Mar del Plata",
    "consultora de marketing digital",
    "soluciones digitales para pymes",
    "marketing visual",
    "diseño de identidad digital",
    "creación de contenido visual",
    "seguimiento por WhatsApp",
    "agencia de marketing en Buenos Aires",
    "óptima digital",
    "agencia digital nacional"
  ],
  authors: [{ name: "Óptima Digital" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Óptima Digital | Agencia de Marketing Creativa en Argentina",
    description: "Soluciones digitales para empresas: marketing, branding, SEO, redes sociales y desarrollo web desde Buenos Aires y Mar del Plata.",
    type: "website",
    url: "https://www.optimaagencia.com/",
    images: [
      {
        url: "https://www.optimaagencia.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Óptima Digital"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Óptima Digital | Agencia Creativa Digital",
    description: "Impulsamos tu marca con marketing digital, SEO, desarrollo web y branding estratégico. Desde Mar del Plata y Buenos Aires hacia toda Argentina.",
    images: ["https://www.optimaagencia.com/og-image.jpg"]
  },
  icons: {
    icon: "/optimafavicon.ico"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 mx-auto w-full">{children}</main>
          <Footer />
          <ScrollToTop />
          <SmoothScroll />
        </div>
      </body>
    </html>
  )
}
