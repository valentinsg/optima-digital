"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Wallet, Briefcase, Package } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock products for the carousel
const products = [
  {
    id: "1",
    name: "Billetera Clásica",
    price: 120,
    image: "/placeholder.svg?height=600&width=600",
    slug: "billetera-clasica",
    category: "billeteras",
  },
  {
    id: "2",
    name: "Cinturón Ejecutivo",
    price: 150,
    image: "/placeholder.svg?height=600&width=600",
    slug: "cinturon-ejecutivo",
    category: "cinturones",
  },
  {
    id: "3",
    name: "Porta Tarjetas",
    price: 85,
    image: "/placeholder.svg?height=600&width=600",
    slug: "porta-tarjetas",
    category: "accesorios",
  },
  {
    id: "4",
    name: "Llavero Premium",
    price: 65,
    image: "/placeholder.svg?height=600&width=600",
    slug: "llavero-premium",
    category: "accesorios",
  },
  {
    id: "5",
    name: "Cartera Slim",
    price: 110,
    image: "/placeholder.svg?height=600&width=600",
    slug: "cartera-slim",
    category: "billeteras",
  },
]

export default function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "billeteras":
        return <Wallet className="h-3 w-3 mr-1" />
      case "cinturones":
        return <Briefcase className="h-3 w-3 mr-1" />
      default:
        return <Package className="h-3 w-3 mr-1" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "billeteras":
        return "Billetera"
      case "cinturones":
        return "Cinturón"
      default:
        return "Accesorio"
    }
  }

  const handleProductClick = (slug: string) => {
    router.push(`/producto/${slug}`)
  }

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        ref={carouselRef}
        className="flex space-x-8"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {/* First set of products */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 group cursor-pointer"
            onClick={() => handleProductClick(product.slug)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge
                className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center"
                variant="outline"
              >
                {getCategoryIcon(product.category)}
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
            <h3 className="font-playfair text-lg font-medium text-foreground">{product.name}</h3>
            <p className="text-foreground/70">${product.price.toFixed(2)}</p>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {products.map((product) => (
          <div
            key={`duplicate-${product.id}`}
            className="flex-shrink-0 w-64 group cursor-pointer"
            onClick={() => handleProductClick(product.slug)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge
                className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/80 flex items-center"
                variant="outline"
              >
                {getCategoryIcon(product.category)}
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
            <h3 className="font-playfair text-lg font-medium text-foreground">{product.name}</h3>
            <p className="text-foreground/70">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
