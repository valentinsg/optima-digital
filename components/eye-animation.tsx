"use client"

import { useEffect, useRef, useState } from "react"

interface EyeAnimationProps {
  className?: string
}

export default function EyeAnimation({ className = "" }: EyeAnimationProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSpraying, setIsSpraying] = useState(false)

  useEffect(() => {
    if (!eyeRef.current) return

    const updateDimensions = () => {
      if (eyeRef.current) {
        const { width, height } = eyeRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
      setIsSpraying(true)
      setTimeout(() => setIsSpraying(false), 2000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() => {
    if (!eyeRef.current) return

    const eyeRect = eyeRef.current.getBoundingClientRect()
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    const dx = mousePosition.x - eyeCenterX
    const dy = mousePosition.y - eyeCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxRadius = Math.min(eyeRect.width, eyeRect.height) * 0.3

    let moveX = 0
    let moveY = 0

    if (distance > 0) {
      moveX = (dx / distance) * Math.min(distance * 0.1, maxRadius)
      moveY = (dy / distance) * Math.min(distance * 0.1, maxRadius)
    }

    setPosition({ x: moveX, y: moveY })
  }, [mousePosition])

  return (
    <div ref={eyeRef} className={`relative rounded-full bg-white border-2 border-primary ${className}`}>
      <div
        className="absolute w-1/2 h-1/2 rounded-full bg-primary"
        style={{
          top: `calc(50% - 4px + ${position.y}px)`,
          left: `calc(50% - 4px + ${position.x}px)`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="absolute w-1/3 h-1/3 rounded-full bg-white top-1 left-1"></div>
      </div>
      {isSpraying && (
        <div 
          className="absolute w-4 h-4 bg-white rounded-full animate-spray"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "spray 2s linear forwards",
          }}
        />
      )}
      <style jsx>{`
        @keyframes spray {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
