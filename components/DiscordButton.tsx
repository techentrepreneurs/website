"use client";

import { env } from "@/lib/env";
import { ExternalLink } from 'lucide-react'
import { cn } from "@/lib/utils";
import React, { LinkHTMLAttributes } from "react";

interface DiscordButtonProps extends LinkHTMLAttributes<HTMLLinkElement> {
  compact?: boolean;
}

export function DiscordButton({ compact = false }: DiscordButtonProps) {
  return (
    <a
      href={env.NEXT_PUBLIC_DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        compact ? "px-4 py-2.5 h-8 rounded-lg text-sm" : "px-8 py-3 h-12 rounded-xl text-lg hover:scale-105",
        "group relative inline-flex cursor-pointer items-center justify-center bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-300 font-medium text-white",
        "shadow-lg"
      )}
    >
      <span className="flex items-center gap-2">
        {compact ? (
          <span className="inline-block">
            Join Discord
          </span>
        ) : (
          <>
            <DiscordLogo className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg]" />
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              Join Discord
            </span>
            <span className="overflow-hidden w-0 transition-all duration-300 group-hover:w-[24px] flex items-center">
              <ExternalLink className="h-4 w-4 ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
          </>
        )}
      </span>
    </a>
  );
}

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
