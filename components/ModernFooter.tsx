"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

interface ModernFooterProps {
  logoUrl?: string;
  discordInviteUrl?: string;
}

export function ModernFooter({ 
  logoUrl = "/logo.png", 
  discordInviteUrl = "https://discord.gg/2ACAxkBhMB" 
}: ModernFooterProps) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/builders", label: "Builders" },
    { href: "/code-of-conduct", label: "Code of Conduct" },
  ];

  return (
    <footer className="relative overflow-hidden bg-black py-16">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#5865F2]/10 to-transparent"></div>
      
      {/* Discord Call to Action */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Ready to build?
          </h2>
          
          <p className="relative z-10 max-w-[550px] font-medium text-gray-400 sm:text-lg">
            Connect, share ideas, and grow together in our active community.
          </p>
          
          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative z-[100] inline-flex h-12 cursor-pointer items-center justify-center rounded-xl bg-[#5865F2] px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-[#4752c4] hover:scale-105 active:scale-95",
              "shadow-lg"
            )}
          >
            <span className="flex items-center gap-2">
              <DiscordLogo className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg]" />
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                Join Discord
              </span>
              <ExternalLink className="ml-1 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </span>
          </a>
          
          {/* Bottom-oriented glow */}
          <Glow
            variant="bottom"
            className="opacity-50"
          />
        </div>
      </div>
      
      {/* Simple Footer */}
      <div className="container relative z-10 mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-800/30 pt-8">
          <div className="flex items-center gap-2">
            <Image src={logoUrl} alt="Tech Startups Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-sm font-medium text-gray-500">
              © {new Date().getFullYear()} techstartups.gg
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {links.map((link, i) => (
              <Link 
                key={i}
                href={link.href} 
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Discord Logo SVG Component
const DiscordLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    className={className}
    fill="currentColor"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
); 