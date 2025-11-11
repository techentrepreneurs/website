"use client";

import { NavBar } from '@/components/ui/navbar'
import { HomeIcon, SparkleIcon, UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DiscordButton } from '@/components/DiscordButton'
import styles from './Header.module.css'
import { useRouter, usePathname } from 'next/navigation'

export function Header() {
  const [activeSection, setActiveSection] = useState("Overview");
  const router = useRouter();
  const pathname = usePathname();

  // Force Overview tab to be selected on initial load
  useEffect(() => {
    // Only set Overview as active if on homepage
    if (pathname === '/') {
      setActiveSection("Overview");
      // Optional: Scroll to top on initial load
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Clear active section when not on homepage
      setActiveSection("");
    }
  }, [pathname]);

  // Handle scroll and update active section
  useEffect(() => {
    // Only track scroll on homepage
    if (pathname !== '/') {
      return;
    }

    const handleScroll = () => {
      const sections = [
        { id: "overview", name: "Overview" },
        { id: "inside", name: "Features" },
        // { id: "events", name: "Events" },
        // { id: "success-stories", name: "Success Stories" },
        { id: "governance", name: "Community" },
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate to homepage first
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={`${styles.header} fixed top-0 left-0 right-0 z-[90]`}>
      <div className={styles.backdrop}></div>
      <div className="relative flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Left - Logos */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Link href="/" className="flex items-center">
            <Image
              className="h-auto"
              src="/logo-white.svg"
              alt="Tech Startups Logo"
              width={20}
              height={20}
            />
            <Image
              className="hidden md:inline-block h-auto mt-0.5 ml-2"
              src="/logo-text.svg"
              alt="Tech Startups"
              width={150}
              height={45}
            />
          </Link>
        </div>

        {/* Middle - Navigation */}
        <div className="pointer-events-auto">
          <NavBar
            items={[
              {
                name: "Overview",
                url: "/#overview",
                icon: HomeIcon,
                onClick: () => scrollToSection("overview"),
              },
              {
                name: "Features",
                url: "/#inside",
                icon: SparkleIcon,
                onClick: () => scrollToSection("inside"),
              },
              {
                name: "Community",
                url: "/#governance",
                icon: UsersIcon,
                onClick: () => scrollToSection("governance"),
              },
            ]}
            className=""
            activeTabName={activeSection}
          />
        </div>

        {/* Right - Discord Button */}
        <div className="pointer-events-auto">
          <DiscordButton compact />
        </div>
      </div>
    </header>
  );
}
