"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  onClick?: () => void
  highlight?: boolean
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTabName?: string
}

export function NavBar({ items, className, activeTabName }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeTabName || items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)

  // Set initial render to false after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Update active tab when activeTabName prop changes
  useEffect(() => {
    if (activeTabName) {
      setActiveTab(activeTabName)
    }
  }, [activeTabName])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault()
                  item.onClick()
                }
                setActiveTab(item.name)
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
                item.highlight && !isActive && "text-primary/90" 
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={isInitialRender ? "visible" : false}
                  variants={{
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
              {item.highlight && !isActive && (
                <>
                  <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-primary/30 -z-10"
                    initial={{ opacity: 0.3, scale: 0.98 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2
                    }}
                  />
                </>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
