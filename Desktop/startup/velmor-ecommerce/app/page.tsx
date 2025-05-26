import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import BrandValue from "@/components/brand-value"
import ProductCarousel from "@/components/product-carousel"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Velmor | Accesorios de cuero premium para hombres",
  description:
    "Descubre accesorios de cuero premium para hombres que combinan elegancia silenciosa, artesanía excepcional y diseño atemporal. Velmor, lujo que no grita.",
  keywords:
    "accesorios de cuero, billeteras de cuero, cinturones premium, accesorios masculinos, lujo silencioso, artesanía en cuero",
  openGraph: {
    title: "Velmor | Accesorios de cuero premium para hombres",
    description:
      "Descubre accesorios de cuero premium para hombres que combinan elegancia silenciosa, artesanía excepcional y diseño atemporal.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Premium leather wallet"
            fill
            className="object-cover opacity-60 dark:opacity-40"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Lujo que no grita. Presencia que se siente.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-foreground/80">
            Accesorios de cuero para quienes entienden que el estilo está en los detalles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg" className="group">
              <Link href="/productos">
                Ver colección
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/historia">Conocer nuestra historia</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Product Carousel */}
      <section className="py-16 bg-muted/30 dark:bg-muted/10 overflow-hidden">
        <div className="container px-4 md:px-6 mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center">Descubre nuestra colección</h2>
        </div>
        <ProductCarousel />
      </section>

      {/* Brand Manifesto */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Un símbolo silencioso de buen gusto</h2>
            <p className="text-lg mb-12 text-foreground/80">
              En Velmor, creemos que la verdadera elegancia nunca necesita anunciarse. Nuestros accesorios de cuero son
              una expresión de refinamiento discreto, diseñados para aquellos que aprecian la calidad excepcional y el
              diseño atemporal. Cada pieza es un testimonio de artesanía meticulosa y atención al detalle.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16">
              <BrandValue title="Elegancia" icon="crown" />
              <BrandValue title="Exclusividad" icon="gem" />
              <BrandValue title="Sutileza" icon="feather" />
              <BrandValue title="Cortesía" icon="heart" />
              <BrandValue title="Minimalismo" icon="circle" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16">Productos destacados</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              id="1"
              name="Billetera Clásica"
              price={120}
              image="/placeholder.svg?height=600&width=600"
              slug="billetera-clasica"
              category="billeteras"
            />
            <ProductCard
              id="2"
              name="Cinturón Ejecutivo"
              price={150}
              image="/placeholder.svg?height=600&width=600"
              slug="cinturon-ejecutivo"
              category="cinturones"
            />
            <ProductCard
              id="3"
              name="Porta Tarjetas"
              price={85}
              image="/placeholder.svg?height=600&width=600"
              slug="porta-tarjetas"
              category="accesorios"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="group">
              <Link href="/productos">
                Ver todos los productos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Packaging Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">La experiencia Velmor</h2>
              <p className="text-lg mb-6 text-foreground/80">
                Cada producto Velmor llega a tus manos en un packaging tan excepcional como su contenido. Desde el
                momento en que recibes tu pieza, comienza una experiencia sensorial que refleja nuestra dedicación a la
                excelencia.
              </p>
              <p className="text-lg text-foreground/80">
                La caja de presentación, el aroma del cuero genuino, la textura del papel de seda y la tarjeta
                personalizada son detalles cuidadosamente seleccionados para crear un ritual de desempaque memorable.
              </p>
              <div className="mt-8">
                <Button asChild variant="outline" className="group">
                  <Link href="/packaging">
                    Descubrir más
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Velmor premium packaging"
                fill
                className="object-cover transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">De la visión a la materia</h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Velmor nació de una pasión por la artesanía tradicional y un deseo de crear accesorios que perduren en el
              tiempo. Nuestra historia es un viaje de descubrimiento, dedicación y un compromiso inquebrantable con la
              excelencia. Cada pieza que creamos es el resultado de generaciones de conocimiento artesanal combinado con
              diseño contemporáneo.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-[#c5a96d] hover:text-white hover:border-[#c5a96d] group"
            >
              <Link href="/historia">
                Leer historia completa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16">
            Lo que dicen nuestros clientes
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              quote="Simple, pero poderoso. Nunca me sentí tan representado por algo tan sutil."
              author="Alejandro M."
            />
            <TestimonialCard
              quote="La calidad es excepcional. Estos accesorios son una inversión en elegancia duradera."
              author="Carlos R."
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Forma parte del círculo Velmor</h2>
            <p className="text-lg mb-8 text-foreground/80">
              Acceso anticipado a lanzamientos, inspiración y contenido exclusivo.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-[#c5a96d]"
                required
              />
              <Button type="submit" className="group">
                Suscribirme
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
