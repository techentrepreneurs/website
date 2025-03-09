"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface HeroSectionProps {
  title: string;
  tagline: string;
  bannerUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export function HeroSection({
  title = "TECH ENTREPRENEURS",
  tagline = "A community for tech founders and builders",
  bannerUrl = "/banner.png",
  ctaText = "Join Discord",
  ctaUrl = "#",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Banner Image */}
      <div className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={bannerUrl}
          alt="Tech Entrepreneurs Community"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

          {/* Tagline */}
          <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground">
            {tagline}
          </p>

          {/* CTA Button */}
          <div className="mt-6">
            <Button size="lg" asChild>
              <a href={ctaUrl} className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                {ctaText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 