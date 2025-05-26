"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Share2, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  // In a real app, you would fetch product data based on the slug
  // This is mock data for demonstration
  const product = {
    id: params.slug,
    name: "Billetera Clásica",
    price: 120,
    description:
      "Nuestra billetera clásica está confeccionada con cuero premium de grano completo, seleccionado por su excepcional calidad y durabilidad. El diseño minimalista y elegante ofrece un perfil delgado sin comprometer la funcionalidad.",
    features: [
      "Cuero de grano completo",
      "Acabado a mano",
      "6 ranuras para tarjetas",
      "Compartimento para billetes",
      "Bolsillo para monedas con cierre",
      "Dimensiones: 11cm x 9cm x 1.5cm",
    ],
    specifications: [
      { name: "Material", value: "Cuero de grano completo" },
      { name: "Dimensiones", value: "11cm x 9cm x 1.5cm" },
      { name: "Peso", value: "85g" },
      { name: "Color", value: "Marrón oscuro" },
      { name: "Forro", value: "Algodón orgánico" },
      { name: "Origen", value: "Hecho a mano en México" },
    ],
    care: [
      "Limpiar con un paño suave y seco",
      "Evitar la exposición prolongada al sol",
      "Aplicar acondicionador de cuero cada 3-6 meses",
      "Mantener alejado de la humedad excesiva",
      "Guardar en un lugar fresco y seco cuando no se use",
    ],
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    category: "billeteras",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: params.slug,
      quantity: quantity,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
      duration: 3000,
    })
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: isWishlisted
        ? `${product.name} ha sido eliminado de tu lista de favoritos.`
        : `${product.name} ha sido añadido a tu lista de favoritos.`,
      duration: 3000,
    })
  }

  const getCategoryIcon = () => {
    switch (product.category) {
      case "billeteras":
        return (
          <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center">
            Billetera
          </Badge>
        )
      case "cinturones":
        return (
          <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center">
            Cinturón
          </Badge>
        )
      default:
        return (
          <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center">
            Accesorio
          </Badge>
        )
    }
  }

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <Link href="/productos" className="inline-flex items-center text-foreground hover:text-[#c5a96d] mb-8 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a productos
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-square rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {getCategoryIcon()}
            </motion.div>
            <motion.div
              className="grid grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImage === index ? "border-[#c5a96d]" : "border-transparent hover:border-muted-foreground/30"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-[#c5a96d] fill-[#c5a96d]" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/70">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-2xl text-foreground mb-6">${product.price.toFixed(2)}</p>

            <p className="text-foreground/80 mb-8">{product.description}</p>

            <div className="mb-8">
              <h3 className="font-medium text-foreground mb-3">Características</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-[#c5a96d] mr-2 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Badge
                  variant={product.inStock ? "default" : "destructive"}
                  className="bg-[#c5a96d] hover:bg-[#c5a96d]/90"
                >
                  {product.inStock ? "En stock" : "Agotado"}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="w-full sm:w-auto flex-1 group"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`w-full sm:w-auto ${isWishlisted ? "text-[#c5a96d] border-[#c5a96d]" : ""}`}
                onClick={toggleWishlist}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-[#c5a96d]" : ""}`} />
                {isWishlisted ? "En favoritos" : "Añadir a favoritos"}
              </Button>

              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                <TabsTrigger value="care">Cuidados</TabsTrigger>
                <TabsTrigger value="shipping">Envío</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications" className="pt-4">
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{spec.name}</span>
                      <span className="text-foreground/70">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="care" className="pt-4">
                <ul className="space-y-2">
                  {product.care.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#c5a96d] mr-2">•</span>
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p className="text-foreground/80 mb-4">
                  Ofrecemos envío gratuito en pedidos superiores a $200. Para pedidos menores, el costo de envío es de
                  $15.
                </p>
                <p className="text-foreground/80">Tiempo estimado de entrega:</p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-[#c5a96d] mr-2">•</span>
                    <span className="text-foreground/80">Nacional: 3-5 días hábiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#c5a96d] mr-2">•</span>
                    <span className="text-foreground/80">Internacional: 7-14 días hábiles</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
