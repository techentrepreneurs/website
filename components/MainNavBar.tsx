"use client"

import { NavBar } from "@/components/ui/tubelight-navbar";
import { HomeIcon, Users, CalendarIcon, RocketIcon } from "lucide-react";

export function MainNavBar() {
  return (
    <NavBar 
      items={[
        { name: "Home", url: "/", icon: HomeIcon },
        { name: "About", url: "/about", icon: Users },
        { name: "Builders", url: "/builders", icon: Users },
        { name: "Events", url: "/events", icon: CalendarIcon },
        { name: "Join Discord", url: "https://discord.gg/techentrepreneurs", icon: RocketIcon },
      ]}
      className="mb-16 sm:mb-0"
    />
  );
} 