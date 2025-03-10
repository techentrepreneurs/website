"use client"

import { useEffect, useState, useRef } from "react"

interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  className?: string
}

export default function StatsCounter({ value, label, suffix = "+", className }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get the number of digits in the final value to maintain consistent width
  const valueDigits = value.toString().length

  useEffect(() => {
    // Skip immediate re-render after mounting to allow initial empty render
    if (initialRender) {
      setInitialRender(false)
      return
    }

    const duration = 2000 // ms
    const steps = 50
    const stepValue = value / steps
    const stepTime = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [value, initialRender])

  return (
    <div className={`text-center ${className}`}>
      <div className="relative">
        {/* Hidden final value that ensures the container has the final width from the start */}
        <div 
          className="text-3xl md:text-4xl font-bold text-white mb-1 opacity-0 h-0 overflow-hidden tabular-nums"
          aria-hidden="true"
        >
          {value.toLocaleString()}{suffix}
        </div>
        {/* Visible animated counter */}
        <div 
          ref={containerRef}
          className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums"
        >
          {initialRender ? "\u00A0".repeat(valueDigits) : count.toLocaleString()}{!initialRender && suffix}
        </div>
      </div>
      <div className="text-sm text-zinc-300">{label}</div>
    </div>
  )
} 