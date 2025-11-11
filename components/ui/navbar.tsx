"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  onClick?: () => void;
  highlight?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeTabName?: string;
}

export function NavBar({ items, className, activeTabName }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(activeTabName !== undefined ? activeTabName : items[0].name);

  // Update active tab when activeTabName prop changes
  useEffect(() => {
    if (activeTabName !== undefined) {
      setActiveTab(activeTabName);
    }
  }, [activeTabName]);

  return (
    <div className={cn("flex items-center gap-1 md:gap-3", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;

        return (
          <Link
            key={item.name}
            href={item.url || "#"}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
              setActiveTab(item.name);
            }}
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-2 md:px-4 py-2 transition-colors",
              "text-foreground/80 hover:text-primary",
              isActive && "text-primary",
              item.highlight &&
                !isActive &&
                "text-primary/90 border border-primary/30"
            )}
          >
            <span className="hidden md:inline">{item.name}</span>
            <span className="md:hidden">
              <Icon size={18} strokeWidth={2.5} />
            </span>
            {isActive && (
              <motion.div
                layoutId="lamp"
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            {item.highlight && !isActive && (
              <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
