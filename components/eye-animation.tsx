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

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
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
    const maxRadius = Math.min(eyeRect.width, eyeRect.height) * 0.25

    let moveX = 0
    let moveY = 0

    if (distance > 0) {
      moveX = (dx / distance) * Math.min(distance * 0.15, maxRadius)
      moveY = (dy / distance) * Math.min(distance * 0.15, maxRadius)
    }

    setPosition({ x: moveX, y: moveY })
  }, [mousePosition])

  return (
    <div 
      ref={eyeRef} 
      className={`relative rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-lg ${className}`}
      style={{
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.15)'
      }}
    >
      {/* Iris */}
      <div
        className="absolute w-2/3 h-2/3 rounded-full"
        style={{
          top: `calc(50% - 4px + ${position.y}px)`,
          left: `calc(50% - 4px + ${position.x}px)`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.1s ease-out",
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.25)',
          background: `
            radial-gradient(circle at 30% 30%, 
              rgba(0, 122, 255, 0.95) 0%,
              rgba(0, 102, 255, 0.95) 50%,
              rgba(0, 82, 255, 0.95) 100%
            ),
            repeating-radial-gradient(
              circle at 50% 50%,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px,
              transparent 3px
            ),
            repeating-conic-gradient(
              from 0deg,
              rgba(255, 255, 255, 0.1) 0deg 10deg,
              transparent 10deg 20deg
            ),
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              rgba(0, 0, 0, 0.1) 50%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.2) 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.1) 100%
            )
          `
        }}
      >
        {/* Pupila */}
        <div 
          className="absolute w-1/2 h-1/2 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: `
              radial-gradient(circle at 30% 30%,
                rgba(0, 0, 0, 0.9) 0%,
                rgba(0, 0, 0, 1) 100%
              ),
              repeating-radial-gradient(
                circle at 50% 50%,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px,
                transparent 2px
              ),
              repeating-conic-gradient(
                from 0deg,
                rgba(255, 255, 255, 0.05) 0deg 5deg,
                transparent 5deg 10deg
              ),
              radial-gradient(
                circle at 50% 50%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 50%
              ),
              linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 50%,
                rgba(0, 0, 0, 0.2) 100%
              )
            `,
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8)'
          }}
        >
          {/* Brillo */}
          <div 
            className="absolute w-1/3 h-1/3 rounded-full bg-white opacity-80"
            style={{
              top: `calc(20% + ${position.y * 0.2}px)`,
              left: `calc(20% + ${position.x * 0.2}px)`,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(1px)',
              transition: 'all 0.1s ease-out'
            }}
          />
        </div>
      </div>
    </div>
  )
}
