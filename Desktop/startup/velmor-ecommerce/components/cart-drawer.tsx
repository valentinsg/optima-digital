"use client"

import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-xl flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-foreground" />
                <h2 className="font-playfair text-lg font-medium">Tu carrito</h2>
                {totalItems > 0 && (
                  <span className="ml-2 bg-[#c5a96d] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close cart">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-playfair text-xl font-medium mb-2">Tu carrito está vacío</h3>
                <p className="text-muted-foreground mb-6">Añade algunos productos para comenzar.</p>
                <Button onClick={onClose} className="group">
                  Continuar comprando
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-foreground">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)}</p>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="mx-2 text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-medium">Calculado en el checkout</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button asChild className="w-full group">
                      <Link href="/checkout" onClick={onClose}>
                        Finalizar compra
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={clearCart}>
                      Vaciar carrito
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
