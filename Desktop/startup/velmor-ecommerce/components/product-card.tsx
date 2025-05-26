"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Eye, Briefcase, Wallet, Package } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  slug: string
  category: string
}

export default function ProductCard({ id, name, price, image, slug, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const getCategoryIcon = () => {
    switch (category) {
      case "billeteras":
        return <Wallet className="h-3 w-3 mr-1" />
      case "cinturones":
        return <Briefcase className="h-3 w-3 mr-1" />
      default:
        return <Package className="h-3 w-3 mr-1" />
    }
  }

  const getCategoryLabel = () => {
    switch (category) {
      case "billeteras":
        return "Billetera"
      case "cinturones":
        return "Cinturón"
      default:
        return "Accesorio"
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id,
      name,
      price,
      image,
      slug,
      quantity: 1,
    })

    toast({
      title: "Producto añadido",
      description: `${name} ha sido añadido a tu carrito.`,
      duration: 3000,
    })
  }

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/producto/${slug}`)
  }

  return (
    <div className="group relative">
      <div
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push(`/producto/${slug}`)}
      >
        <div className="relative overflow-hidden rounded-lg aspect-square mb-4 cursor-pointer">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className={cn("object-cover transition-transform duration-700", isHovered ? "scale-110" : "scale-100")}
          />

          {/* Category Badge */}
          <Badge
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center"
            variant="outline"
          >
            {getCategoryIcon()}
            {getCategoryLabel()}
          </Badge>

          {/* Quick Actions */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm flex justify-between items-center transition-transform duration-300",
              isHovered ? "translate-y-0" : "translate-y-full",
            )}
          >
            <Button size="sm" variant="outline" className="bg-background/50 backdrop-blur-sm" onClick={handleAddToCart}>
              <ShoppingBag className="h-4 w-4 mr-1" />
              Añadir
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
              onClick={handleViewProduct}
            >
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </Button>
          </div>
        </div>

        <h3 className="font-playfair text-xl font-medium text-foreground">{name}</h3>
        <p className="text-foreground/70 mt-1">${price.toFixed(2)}</p>
        <div className="mt-3 h-[2px] w-0 bg-[#c5a96d] transition-all duration-300 group-hover:w-16"></div>
      </div>
    </div>
  )
}
