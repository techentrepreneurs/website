"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="absolute top-4 bottom-0 left-0 right-0 sm:left-24 sm:right-24 z-0">
        <Image
          className="object-contain"
          src="/assets/footer-discord-background.webp"
          alt="Discord Logo"
          fill
          priority
        />
      </div>
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t to-transparent"
        style={{
          backgroundImage: `linear-gradient(to top, rgb(var(--discord-rgb) / 0.1), transparent)`,
        }}
      ></div>

      {/* Discord Call to Action */}
      <div className="container relative z-10 mx-auto px-4 pt-24 pb-8 md:pt-32">
        <div className="flex flex-col items-center text-center gap-8">
          <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            You in?
          </h2>

          <p className="relative z-10 w-full font-medium text-muted-foreground sm:text-lg">
            Drop your intro. The rest is up to the community.
          </p>

          <a
            href={env.NEXT_PUBLIC_DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative z-[100] inline-flex h-12 cursor-pointer items-center justify-center rounded-xl px-8 py-3 font-medium text-foreground transition-all duration-300",
              "shadow-lg mt-4"
            )}
            style={{
              backgroundColor: "var(--discord)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--discord-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--discord)";
            }}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block">Join Discord</span>
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-10 bg-background/5 border-b border-border backdrop-blur-lg shadow-lg mt-4">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-white.svg"
                  alt="Tech Startups Logo"
                  width={20}
                  height={20}
                  className="h-auto"
                />
                <Image
                  src="/logo-text.svg"
                  alt="Tech Startups"
                  width={150}
                  height={45}
                  className="h-auto mt-0.5 ml-2"
                />
              </Link>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">
                Crafted by&nbsp;
              </span>
              <Link
                href="https://www.artasaka.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:underline"
              >
                Artasaka
              </Link>
              <span className="text-sm text-muted-foreground">
                , coded by&nbsp;
              </span>
              <Link
                href="https://x.com/alperortac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:underline"
              >
                Alper
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
