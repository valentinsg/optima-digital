"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        e.preventDefault()
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: "smooth",
        })
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
