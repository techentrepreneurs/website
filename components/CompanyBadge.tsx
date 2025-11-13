"use client";

interface CompanyBadgeProps {
  variant: "built-on" | "ranking";
  companyName: string;
  rank?: number;
  subscriberCount?: number;
  companySlug: string;
  baseUrl?: string;
  theme?: "light" | "dark";
}

export function CompanyBadge({
  variant,
  companyName,
  rank,
  subscriberCount = 0,
  companySlug,
  baseUrl = "https://techstartups.gg",
  theme = "dark",
}: CompanyBadgeProps) {
  const companyUrl = `${baseUrl}/company/${companySlug}`;

  // Theme colors
  const isDark = theme === "dark";
  const bgColor = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "#2a2a2a" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textSecondary = isDark ? "#9CA3AF" : "#6B7280";
  const logoUrl = isDark
    ? "https://techstartups.gg/logo-white.svg"
    : "https://techstartups.gg/logo-tp.png";
  const logoSize = isDark ? 24 : 36; // 50% larger for light mode

  if (variant === "built-on") {
    return (
      <a
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", textDecoration: "none" }}
      >
        <svg
          width="280"
          height="60"
          viewBox="0 0 280 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background with more rounded corners */}
          <rect width="280" height="60" rx="16" fill={bgColor} />
          <rect
            x="1"
            y="1"
            width="278"
            height="58"
            rx="15"
            stroke={borderColor}
            strokeWidth="2"
          />

          {/* TechStartups Logo */}
          <image
            x={isDark ? "16" : "10"}
            y={isDark ? "18" : "12"}
            width={logoSize}
            height={logoSize}
            href={logoUrl}
          />

          {/* Text */}
          <text
            x="52"
            y="22"
            fill={textSecondary}
            fontSize="10"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
            letterSpacing="0.5"
          >
            FEATURED ON
          </text>
          <text
            x="52"
            y="44"
            fill={textPrimary}
            fontSize="20"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
          >
            TechStartups
          </text>

          {/* Subscriber count with upvote icon (Product Hunt style) */}
          {/* Upvote triangle - larger */}
          <path d="M 252 15 L 246 25 L 258 25 Z" fill={textSecondary} />
          {/* Count - smaller */}
          <text
            x="252"
            y="44"
            fill={textPrimary}
            fontSize="20"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            textAnchor="middle"
          >
            {subscriberCount}
          </text>
        </svg>
      </a>
    );
  }

  // Ranking variant - only show for top 3
  if (!rank || rank > 3) {
    return null;
  }

  // Medal colors based on rank
  const medalColors = {
    1: { main: "#FFD700", shadow: "#DAA520", text: "1" }, // Gold
    2: { main: "#C0C0C0", shadow: "#A8A8A8", text: "2" }, // Silver
    3: { main: "#CD7F32", shadow: "#B8732D", text: "3" }, // Bronze
  };
  const medal = medalColors[rank as 1 | 2 | 3];

  const rankText = `#${rank} Trending Startup`;

  return (
    <a
      href={companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", textDecoration: "none" }}
    >
      <svg
        width="280"
        height="60"
        viewBox="0 0 280 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background with more rounded corners */}
        <rect width="280" height="60" rx="16" fill={bgColor} />
        <rect
          x="1"
          y="1"
          width="278"
          height="58"
          rx="15"
          stroke={borderColor}
          strokeWidth="2"
        />

        {/* Medal Icon (replacing logo) */}
        <g transform="translate(16, 15)">
          {/* Ribbon */}
          <path d="M 8 0 L 12 8 L 15 6 L 15 0 Z" fill={medal.main} />
          <path d="M 22 0 L 18 8 L 15 6 L 15 0 Z" fill={medal.shadow} />
          {/* Medal circle */}
          <circle cx="15" cy="15" r="12" fill={medal.main} />
          <circle cx="15" cy="15" r="10" fill={medal.shadow} />
          {/* Number */}
          <text
            x="15"
            y="21"
            fill={bgColor}
            fontSize="14"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            textAnchor="middle"
          >
            {medal.text}
          </text>
        </g>

        {/* Tech Startups text (replacing "Built On") */}
        <text
          x="52"
          y="22"
          fill={textSecondary}
          fontSize="10"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          letterSpacing="0.5"
        >
          TECH STARTUPS
        </text>

        {/* Rank text (replacing "TechStartups") */}
        <text
          x="52"
          y="44"
          fill={textPrimary}
          fontSize="20"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
        >
          {rankText}
        </text>
      </svg>
    </a>
  );
}
