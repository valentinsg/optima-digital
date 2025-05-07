import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import SmoothScroll from "@/components/smooth-scroll"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Óptima Digital | Agencia de Marketing Digital",
  description:
    "Impulsamos negocios en el mundo digital. Servicios de marketing digital, branding, desarrollo web y SEO.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 max-w-[1200px] mx-auto w-full">{children}</main>
            <Footer />
            <ScrollToTop />
            <SmoothScroll />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
