"use client"

import { NavBar } from "@/components/ui/tubelight-navbar";
import { HomeIcon, Users, CalendarIcon, RocketIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function MainNavBar() {
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "builders", "events"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <NavBar 
      items={[
        { 
          name: "Home", 
          url: "/#home", 
          icon: HomeIcon,
          onClick: () => scrollToSection("home"),
        },
        { 
          name: "About", 
          url: "/#about", 
          icon: Users,
          onClick: () => scrollToSection("about"),
        },
        { 
          name: "Builders", 
          url: "/#builders", 
          icon: Users,
          onClick: () => scrollToSection("builders"),
        },
        { 
          name: "Events", 
          url: "/#events", 
          icon: CalendarIcon,
          onClick: () => scrollToSection("events"),
        },
        { 
          name: "Join Discord", 
          url: "https://discord.gg/2ACAxkBhMB", 
          icon: RocketIcon 
        },
      ]}
      className="mb-16 sm:mb-0"
      activeTabName={activeSection}
    />
  );
} 