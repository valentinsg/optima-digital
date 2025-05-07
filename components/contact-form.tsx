"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
          Nombre completo
        </label>
        <Input id="name" name="name" type="text" required placeholder="Tu nombre" className="w-full" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
          Correo electrónico
        </label>
        <Input id="email" name="email" type="email" required placeholder="tu@email.com" className="w-full" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Mensaje
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="¿Cómo podemos ayudarte?"
          className="w-full min-h-[120px]"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  )
}
