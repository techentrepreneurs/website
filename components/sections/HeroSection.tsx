"use client";

import Image from "next/image";
import { DiscordButton } from "../DiscordButton";

export function HeroSection() {
  return (
    <section id="overview" className="relative w-full max-w-7xl m-auto mt-16 overflow-hidden  py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-white">
              Built for builders,
              <br />
              chosen by builders.
            </h1>
            <p className="text-lg text-gray-300">
              A private space for founders to connect, ship, and grow.
            </p>
            <div className="pt-4">
              <DiscordButton />
            </div>
          </div>
          
          {/* Right side - Hero image */}
          <div className="relative lg:block">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                className="object-cover"
                src="/assets/hero-slanted-preview.webp"
                alt="Tech Startups Community Preview"
                fill
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
