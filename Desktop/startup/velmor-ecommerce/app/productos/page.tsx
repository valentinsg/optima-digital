"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "@/components/product-card"

// Mock products data
const allProducts = [
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
  {
    id: "6",
    name: "Cinturón Casual",
    price: 130,
    image: "/placeholder.svg?height=600&width=600",
    slug: "cinturon-casual",
    category: "cinturones",
  },
  {
    id: "7",
    name: "Porta Pasaporte",
    price: 95,
    image: "/placeholder.svg?height=600&width=600",
    slug: "porta-pasaporte",
    category: "accesorios",
  },
  {
    id: "8",
    name: "Billetera Vertical",
    price: 125,
    image: "/placeholder.svg?height=600&width=600",
    slug: "billetera-vertical",
    category: "billeteras",
  },
  {
    id: "9",
    name: "Pulsera de Cuero",
    price: 70,
    image: "/placeholder.svg?height=600&width=600",
    slug: "pulsera-cuero",
    category: "accesorios",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(allProducts)
  const [activeCategory, setActiveCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [view, setView] = useState("grid")

  useEffect(() => {
    filterProducts()
  }, [activeCategory, searchQuery, priceRange, sortBy])

  const filterProducts = () => {
    let filtered = [...allProducts]

    // Filter by category
    if (activeCategory !== "todos") {
      filtered = filtered.filter((product) => product.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
      )
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // featured - no sorting needed
        break
    }

    setProducts(filtered)
  }

  const resetFilters = () => {
    setActiveCategory("todos")
    setSearchQuery("")
    setPriceRange([0, 200])
    setSortBy("featured")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">Nuestra Colección</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mb-12">
            Descubre nuestra selección de accesorios de cuero premium, diseñados con atención meticulosa al detalle y
            artesanía excepcional.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.div
            className="hidden md:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-medium text-lg mb-4">Categorías</h3>
                <div className="space-y-2">
                  <Button
                    variant={activeCategory === "todos" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory("todos")}
                  >
                    Todos los productos
                  </Button>
                  <Button
                    variant={activeCategory === "billeteras" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory("billeteras")}
                  >
                    Billeteras
                  </Button>
                  <Button
                    variant={activeCategory === "cinturones" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory("cinturones")}
                  >
                    Cinturones
                  </Button>
                  <Button
                    variant={activeCategory === "accesorios" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory("accesorios")}
                  >
                    Accesorios
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Precio</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Restablecer filtros
              </Button>
            </div>
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>

            <div className="flex items-center gap-2">
              <Tabs defaultValue="grid" value={view} onValueChange={setView}>
                <TabsList>
                  <TabsTrigger value="grid" className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="fixed inset-0 z-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
                <motion.div
                  className="absolute top-0 right-0 h-full w-80 bg-background p-6 overflow-y-auto"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-playfair text-xl font-bold">Filtros</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Categorías</h3>
                      <div className="space-y-2">
                        <Button
                          variant={activeCategory === "todos" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveCategory("todos")}
                        >
                          Todos los productos
                        </Button>
                        <Button
                          variant={activeCategory === "billeteras" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveCategory("billeteras")}
                        >
                          Billeteras
                        </Button>
                        <Button
                          variant={activeCategory === "cinturones" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveCategory("cinturones")}
                        >
                          Cinturones
                        </Button>
                        <Button
                          variant={activeCategory === "accesorios" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveCategory("accesorios")}
                        >
                          Accesorios
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-4">Precio</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 200]}
                          max={200}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-4">Ordenar por</h3>
                      <select
                        className="w-full p-2 border border-border rounded-md bg-background"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="featured">Destacados</option>
                        <option value="price-asc">Precio: Menor a mayor</option>
                        <option value="price-desc">Precio: Mayor a menor</option>
                        <option value="name-asc">Nombre: A-Z</option>
                        <option value="name-desc">Nombre: Z-A</option>
                      </select>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        resetFilters()
                        setIsFilterOpen(false)
                      }}
                    >
                      Restablecer filtros
                    </Button>

                    <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                      Ver {products.length} productos
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort - Desktop */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden md:flex items-center gap-2">
                  <Tabs defaultValue="grid" value={view} onValueChange={setView}>
                    <TabsList>
                      <TabsTrigger value="grid" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                        </svg>
                      </TabsTrigger>
                      <TabsTrigger value="list" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <line x1="3" y1="12" x2="21" y2="12" />
                          <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <select
                  className="p-2 border border-border rounded-md bg-background flex-1 md:flex-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a mayor</option>
                  <option value="price-desc">Precio: Mayor a menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                  <option value="name-desc">Nombre: Z-A</option>
                </select>
              </div>
            </motion.div>

            {/* Active Filters */}
            {(activeCategory !== "todos" || searchQuery || priceRange[0] > 0 || priceRange[1] < 200) && (
              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeCategory !== "todos" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setActiveCategory("todos")}
                  >
                    Categoría: {activeCategory}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}

                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setSearchQuery("")}
                  >
                    Búsqueda: {searchQuery}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}

                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setPriceRange([0, 200])}
                  >
                    Precio: ${priceRange[0]} - ${priceRange[1]}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}

                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={resetFilters}>
                  Limpiar todo
                </Button>
              </motion.div>
            )}

            {/* Products Grid */}
            {products.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground mb-6">Intenta con otros filtros o términos de búsqueda.</p>
                <Button onClick={resetFilters}>Ver todos los productos</Button>
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={
                  view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"
                }
              >
                {products.map((product, index) => (
                  <motion.div key={product.id} variants={item}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      slug={product.slug}
                      category={product.category}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
