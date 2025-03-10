"use client";

import { GlassyStatCounter } from "@/components/ui/glassy-stat-counter";

export function StatsSection() {
  const stats = [
    {
      value: 500,
      label: "Active Members",
      suffix: "+"
    },
    {
      value: 120,
      label: "Startups",
      suffix: "+"
    },
    {
      value: 35,
      label: "Countries",
      suffix: "+"
    },
    {
      value: 1500,
      label: "Messages/Day",
      suffix: "+"
    }
  ];

  return (
    <div className="w-full max-w-[660px] mx-auto animate-appear opacity-0 delay-200">
      <GlassyStatCounter stats={stats} />
    </div>
  );
} 