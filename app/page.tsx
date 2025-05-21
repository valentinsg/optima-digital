import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import DifferentialSection from "@/components/differential-section"
import MethodologySection from "@/components/methodology-section"
import PortfolioSection from "@/components/portfolio-section"
import TestimonialsSection from "@/components/testimonials-section"
import TeamSection from "@/components/team-section"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <DifferentialSection />
      <MethodologySection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <CTASection />
    </>
  )
}
