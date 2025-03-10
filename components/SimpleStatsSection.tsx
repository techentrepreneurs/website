"use client";

import StatsCounter from "@/components/ui/stats-counter";

export function SimpleStatsSection() {
  const stats = [
    {
      value: 500,
      label: "Active Members",
    },
    {
      value: 120,
      label: "Startups",
    },
    {
      value: 35,
      label: "Countries",
    },
    {
      value: 1500,
      label: "Messages/Day",
    }
  ];

  return (
    <div className="w-full max-w-[660px] mx-auto animate-appear opacity-0 delay-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
        {stats.map((stat, index) => (
          <StatsCounter 
            key={index}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
} 