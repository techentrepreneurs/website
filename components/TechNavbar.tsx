"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Home, Users, Calendar, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface TechNavbarProps {
  logoUrl?: string;
  navItems?: NavItem[];
  ctaButton?: {
    text: string;
    href: string;
    icon?: React.ElementType;
  };
  className?: string;
}

export function TechNavbar({
  logoUrl = "/logo.png",
  navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Users },
    { name: "Builders", href: "/builders", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
  ],
  ctaButton = {
    text: "Join Discord",
    href: "https://discord.gg/techbuilders",
    icon: ExternalLink,
  },
  className,
}: TechNavbarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoUrl} alt="Tech Entrepreneurs" width={32} height={32} />
            <span className="font-bold">TechEntrepreneurs</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:inline-flex">
            <a href={ctaButton.href} target="_blank" rel="noopener noreferrer">
              {ctaButton.icon && <ctaButton.icon className="mr-2 h-4 w-4" />}
              {ctaButton.text}
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image src={logoUrl} alt="Tech Entrepreneurs" width={32} height={32} />
                    <span className="font-bold">TechEntrepreneurs</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <a href={ctaButton.href} target="_blank" rel="noopener noreferrer">
                    {ctaButton.icon && <ctaButton.icon className="mr-2 h-4 w-4" />}
                    {ctaButton.text}
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 