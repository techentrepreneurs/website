"use client"

import { NavBar } from "@/components/ui/tubelight-navbar";
import { HomeIcon, Users, CalendarIcon, RocketIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function MainNavBar() {
  const [activeSection, setActiveSection] = useState("Home");

  // Force home tab to be selected on initial load
  useEffect(() => {
    // Set Home as active on mount
    setActiveSection("Home");
    
    // Optional: Scroll to top on initial load
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", name: "Home" },
        { id: "about", name: "About" },
        { id: "builders", name: "Builders" }
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
          name: "Join Discord", 
          url: "https://discord.gg/2ACAxkBhMB", 
          icon: RocketIcon,
          highlight: true,
          onClick: () => {
            window.open("https://discord.gg/2ACAxkBhMB", "_blank", "noopener,noreferrer");
          }
        },
      ]}
      className="mb-16 sm:mb-0"
      activeTabName={activeSection}
    />
  );
} 