"use client"

import { HeroSection } from "@/components/HeroSection"
import { Github } from "lucide-react"

export function HeroSectionDemo() {
  return (
    <HeroSection
      badge={{
        text: "Introducing our new components",
        action: {
          text: "Learn more",
          href: "/docs",
        },
      }}
      title="Build faster with beautiful components"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/your-repo",
          variant: "glow",
          icon: <Github className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop",
        dark: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop",
        alt: "UI Components Preview",
      }}
    />
  )
} 