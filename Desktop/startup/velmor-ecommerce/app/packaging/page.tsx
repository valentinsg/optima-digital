import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PackagingPage() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#0A0F2C] mb-4 text-center">
            La experiencia Velmor
          </h1>
          <p className="text-lg text-[#0A0F2C]/70 mb-12 text-center max-w-2xl mx-auto">
            Cada producto Velmor llega a tus manos en un packaging tan excepcional como su contenido, creando una
            experiencia sensorial completa.
          </p>

          {/* Hero Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-16">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Packaging premium Velmor"
              fill
              className="object-cover"
            />
          </div>

          {/* First Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-[#0A0F2C] mb-4">Diseño meticuloso</h2>
              <p className="text-[#0A0F2C]/80 mb-4">
                Nuestro packaging está diseñado con la misma atención al detalle que nuestros productos. Cada caja está
                hecha a mano con materiales premium, seleccionados por su calidad y elegancia.
              </p>
              <p className="text-[#0A0F2C]/80">
                La paleta de colores, las texturas y los acabados han sido cuidadosamente elegidos para crear una
                primera impresión que refleje la exclusividad de lo que hay en su interior.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Diseño de packaging Velmor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[300px] rounded-lg overflow-hidden md:order-first order-last">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Materiales de packaging Velmor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-[#0A0F2C] mb-4">Materiales nobles</h2>
              <p className="text-[#0A0F2C]/80 mb-4">
                Utilizamos cartón rígido de alta densidad recubierto con papel texturizado importado de Italia. El
                interior está forrado con suave terciopelo que protege el producto y añade un elemento táctil a la
                experiencia.
              </p>
              <p className="text-[#0A0F2C]/80">
                Cada detalle, desde la cinta de seda hasta el sello de cera con nuestro logotipo, ha sido seleccionado
                para crear un ritual de desempaque memorable.
              </p>
            </div>
          </div>

          {/* Third Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-[#0A0F2C] mb-4">Experiencia sensorial</h2>
              <p className="text-[#0A0F2C]/80 mb-4">
                Abrir un producto Velmor es una experiencia que involucra todos los sentidos. El suave sonido de la caja
                al abrirse, el aroma sutil del cuero genuino, la textura del papel de seda y la vista de tu nueva pieza
                Velmor cuidadosamente presentada.
              </p>
              <p className="text-[#0A0F2C]/80">
                Incluimos una tarjeta personalizada con instrucciones de cuidado y la historia de tu producto,
                completando así una experiencia de unboxing que es tan especial como el producto mismo.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Experiencia de unboxing Velmor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Fourth Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[300px] rounded-lg overflow-hidden md:order-first order-last">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Sostenibilidad en packaging Velmor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-[#0A0F2C] mb-4">Compromiso sostenible</h2>
              <p className="text-[#0A0F2C]/80 mb-4">
                A pesar de nuestro enfoque en la elegancia y el lujo, no comprometemos nuestro compromiso con el medio
                ambiente. Todos nuestros materiales de packaging son reciclables o biodegradables.
              </p>
              <p className="text-[#0A0F2C]/80">
                Las tintas utilizadas son de base vegetal y los adhesivos son libres de solventes. Además, nuestras
                cajas están diseñadas para ser reutilizadas, extendiendo su vida útil más allá del momento de la compra.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#F2F2F2] p-12 rounded-lg">
            <h2 className="font-playfair text-3xl font-bold text-[#0A0F2C] mb-4">Descubre la experiencia completa</h2>
            <p className="text-[#0A0F2C]/80 mb-8 max-w-2xl mx-auto">
              El packaging es solo el comienzo de tu viaje con Velmor. Explora nuestra colección de accesorios de cuero
              premium y descubre por qué somos sinónimo de elegancia silenciosa.
            </p>
            <Button asChild size="lg" className="bg-[#0A0F2C] text-white hover:bg-[#c5a96d]">
              <Link href="/productos">Ver colección</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
