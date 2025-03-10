"use client"

import { useEffect, useState } from "react"

interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  className?: string
}

export default function StatsCounter({ value, label, suffix = "+", className }: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
  }, [value])

  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-zinc-300">{label}</div>
    </div>
  )
} 