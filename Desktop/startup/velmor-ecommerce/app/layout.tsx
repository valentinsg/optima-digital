import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import SiteLoader from "@/components/site-loader"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Velmor | Accesorios de cuero premium",
  description: "Accesorios de cuero para quienes entienden que el estilo está en los detalles.",
  keywords: "accesorios de cuero, billeteras, cinturones, artesanía, lujo, minimalismo",
  openGraph: {
    title: "Velmor | Accesorios de cuero premium",
    description: "Accesorios de cuero para quienes entienden que el estilo está en los detalles.",
    type: "website",
    locale: "es_ES",
    url: "https://velmor.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <SiteLoader />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
