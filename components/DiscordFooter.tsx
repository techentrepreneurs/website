"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiscordFooterProps {
  logoUrl?: string;
}

export function DiscordFooter({ logoUrl = "/logo.png" }: DiscordFooterProps) {
  return (
    <footer className="py-12 px-4 md:px-6 bg-[#2f3136] text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoUrl} alt="Tech Entrepreneurs Logo" width={32} height={32} />
              <h2 className="text-lg font-bold text-[#7289da]">TechEntrepreneurs</h2>
            </Link>

            <p className="text-sm text-gray-300 mt-5">
              A community of tech entrepreneurs building the future together. Join us to connect, learn, and grow with like-minded innovators.
            </p>
            <div className="mt-4">
              <Link href="https://discord.gg/2ACAxkBhMB" target="_blank" legacyBehavior>
                <a>
                  <Button className="bg-[#7289da] hover:bg-[#5f73bc] text-white border-none">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Join Our Discord
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-[#7289da]">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/builders" className="text-gray-300 hover:text-white transition-colors">
                    Builders
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7289da]">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/code-of-conduct" className="text-gray-300 hover:text-white transition-colors">
                    Code of Conduct
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TechEntrepreneurs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="https://twitter.com/techentrepreneurs" className="text-gray-300 hover:text-[#7289da]" target="_blank">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com/techentrepreneurs" className="text-gray-300 hover:text-[#7289da]" target="_blank">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 