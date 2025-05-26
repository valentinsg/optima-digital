import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#0A0F2C] mb-4 text-center">Contacto</h1>
          <p className="text-lg text-[#0A0F2C]/70 mb-12 text-center">
            Estamos aquí para responder cualquier pregunta que puedas tener sobre nuestros productos o servicios.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mb-6">Envíanos un mensaje</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-[#0A0F2C]">
                      Nombre
                    </label>
                    <Input
                      id="first-name"
                      className="border-[#0A0F2C]/20 focus:border-[#c5a96d] focus:ring-[#c5a96d]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-[#0A0F2C]">
                      Apellido
                    </label>
                    <Input id="last-name" className="border-[#0A0F2C]/20 focus:border-[#c5a96d] focus:ring-[#c5a96d]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#0A0F2C]">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="border-[#0A0F2C]/20 focus:border-[#c5a96d] focus:ring-[#c5a96d]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[#0A0F2C]">
                    Asunto
                  </label>
                  <Input id="subject" className="border-[#0A0F2C]/20 focus:border-[#c5a96d] focus:ring-[#c5a96d]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#0A0F2C]">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    className="border-[#0A0F2C]/20 focus:border-[#c5a96d] focus:ring-[#c5a96d]"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#0A0F2C] text-white hover:bg-[#c5a96d]">
                  Enviar mensaje
                </Button>
              </form>
            </div>

            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mb-6">Información de contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#c5a96d] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-[#0A0F2C]">Dirección</h3>
                    <p className="text-[#0A0F2C]/70">
                      Calle Elegancia 123
                      <br />
                      Ciudad de México, 01234
                      <br />
                      México
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-[#c5a96d] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-[#0A0F2C]">Teléfono</h3>
                    <p className="text-[#0A0F2C]/70">+52 (55) 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-[#c5a96d] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-[#0A0F2C]">Correo electrónico</h3>
                    <p className="text-[#0A0F2C]/70">contacto@velmor.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#0A0F2C]/10">
                <h3 className="font-medium text-[#0A0F2C] mb-4">Horario de atención</h3>
                <div className="space-y-2 text-[#0A0F2C]/70">
                  <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábado: 10:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
