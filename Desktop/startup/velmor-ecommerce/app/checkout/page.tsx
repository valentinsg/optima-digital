"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check } from "lucide-react"

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 15
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleSubmitOrder = () => {
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true)
      clearCart()

      toast({
        title: "¡Pedido completado!",
        description: "Tu pedido ha sido procesado con éxito.",
        duration: 5000,
      })
    }, 1500)
  }

  if (orderComplete) {
    return (
      <div className="bg-muted/30 dark:bg-muted/10 min-h-screen pt-24">
        <div className="container px-4 md:px-6 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-[#c5a96d] flex items-center justify-center">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-foreground/70 mb-8">
              Tu pedido ha sido procesado con éxito. Hemos enviado un correo electrónico con los detalles de tu compra.
            </p>
            <p className="text-foreground/70 mb-8">
              Número de orden: <span className="font-medium">VLM-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/">Volver a la tienda</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 dark:bg-muted/10 min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <Link href="/productos" className="inline-flex items-center text-foreground hover:text-[#c5a96d] mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a productos
        </Link>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">Finalizar compra</h1>

        {/* Checkout Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#c5a96d] text-white" : "bg-muted text-foreground/50"}`}
              >
                1
              </div>
              <span className="text-sm mt-2">Información</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-[#c5a96d]" : "bg-muted"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#c5a96d] text-white" : "bg-muted text-foreground/50"}`}
              >
                2
              </div>
              <span className="text-sm mt-2">Envío</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-[#c5a96d]" : "bg-muted"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-[#c5a96d] text-white" : "bg-muted text-foreground/50"}`}
              >
                3
              </div>
              <span className="text-sm mt-2">Pago</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Información de contacto</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nombre</Label>
                      <Input id="first-name" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Apellido</Label>
                      <Input id="last-name" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" className="border-border focus:ring-[#c5a96d]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" className="border-border focus:ring-[#c5a96d]" />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setCurrentStep(2)} className="group">
                      Continuar a envío
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Dirección de envío</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" className="border-border focus:ring-[#c5a96d]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Apartamento, suite, etc. (opcional)</Label>
                    <Input id="address2" className="border-border focus:ring-[#c5a96d]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado/Provincia</Label>
                      <Input id="state" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Código postal</Label>
                      <Input id="postal-code" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select>
                        <SelectTrigger id="country" className="border-border">
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mx">México</SelectItem>
                          <SelectItem value="us">Estados Unidos</SelectItem>
                          <SelectItem value="ca">Canadá</SelectItem>
                          <SelectItem value="es">España</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Volver
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="group">
                      Continuar a pago
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-background p-6 rounded-lg shadow-sm animate-fade-in">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Método de pago</h2>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Tarjeta de crédito
                    </TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Número de tarjeta</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="border-border focus:ring-[#c5a96d]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de expiración</Label>
                        <Input id="expiry" placeholder="MM/AA" className="border-border focus:ring-[#c5a96d]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="border-border focus:ring-[#c5a96d]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Nombre en la tarjeta</Label>
                      <Input id="name-on-card" className="border-border focus:ring-[#c5a96d]" />
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal">
                    <div className="text-center py-8">
                      <p className="text-foreground/70 mb-4">
                        Serás redirigido a PayPal para completar tu pago de forma segura.
                      </p>
                      <Image
                        src="/placeholder.svg?height=60&width=200"
                        alt="PayPal"
                        width={200}
                        height={60}
                        className="mx-auto"
                      />
                    </div>
                  </TabsContent>
                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Volver
                    </Button>
                    <Button onClick={handleSubmitOrder} className="group">
                      Completar pedido
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Tabs>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Resumen del pedido</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-sm text-foreground/70">Cantidad: {item.quantity}</p>
                      <p className="font-medium text-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Envío</span>
                  <span className="font-medium text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Impuestos</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/productos" className="text-sm text-foreground hover:text-[#c5a96d] underline">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
