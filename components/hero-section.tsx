"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  animatedWords?: string[];
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  animatedWords = ["Launch", "Grow", "Succeed"],
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;
  
  const [wordIndex, setWordIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(wordIndex);
      setWordIndex((prevIndex) => 
        prevIndex === animatedWords.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);
    
    return () => clearInterval(interval);
  }, [animatedWords, wordIndex]);

  const getAnimationClasses = (index: number) => {
    if (index === wordIndex) {
      return "opacity-100 transform translate-y-0";
    } else if (index === prevIndex) {
      return "opacity-0 transform -translate-y-8";
    } else {
      return "opacity-0 transform translate-y-8";
    }
  };

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32",
        "fade-bottom overflow-hidden pb-0 relative"
      )}
    >
      <Container size="xl" className="flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">
          {/* Badge */}
          {badge && (
            <Badge 
              variant="outline" 
              className="animate-appear gap-2 py-1.5 px-4 text-sm border-border/40 backdrop-blur-sm"
            >
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1 text-foreground font-medium">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title with Animated Words */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground/80 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight tracking-tight max-w-4xl">
            Where Builders{" "}
            <span className="inline-block relative min-w-[180px] min-h-[1.2em] align-bottom">
              {animatedWords.map((word, index) => (
                <span 
                  key={word} 
                  className={cn(
                    "absolute left-0 right-0 text-center transition-all duration-700 ease-in-out font-extrabold",
                    getAnimationClasses(index),
                    index === wordIndex && "text-gradient bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
                  )}
                >
                  {word}
                </span>
              ))}
              <span className="opacity-0">{animatedWords[0]}</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground sm:text-xl opacity-0 delay-100">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            {actions.map((action, index) => (
              <Button 
                key={index} 
                variant={action.variant === "glow" ? "outline" : "default"} 
                size="lg" 
                asChild
                className={cn(
                  "shadow-sm",
                  action.variant === "glow" && "border-muted/40 hover:bg-muted/10 transition-colors"
                )}
              >
                <a href={action.href} className="flex items-center gap-2">
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Image with Glow */}
          <div className="relative mt-12 w-full max-w-[1200px]">
            <MockupFrame
              className="animate-appear opacity-0 delay-700 relative z-10"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src={imageSrc}
                  alt={image.alt}
                  width={1248}
                  height={765}
                  priority
                  className="rounded-sm"
                />
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
