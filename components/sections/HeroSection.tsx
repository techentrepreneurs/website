"use client";

import Image from "next/image";
import { DiscordButton } from "../DiscordButton";

export function HeroSection() {
  return (
    <section
      id="overview"
      className="relative w-full max-w-7xl m-auto mt-16 py-12 md:py-24 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-2 items-center">
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-foreground">
              Built for builders,
              <br />
              chosen by builders.
            </h1>
            <p className="text-lg text-muted-foreground">
              A private space for founders to connect, ship, and grow.
            </p>
            <div className="pt-4">
              <DiscordButton />
            </div>
          </div>

          <div className="relative lg:block">
            <div className="relative aspect-[16/9] w-[130%] xl:scale-110 2xl:scale-[120%]">
              <Image
                className="object-contain"
                src="/assets/hero-slanted-preview.webp"
                alt="Tech Startups Community Preview"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-55% from-transparent to-80% to-background z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
