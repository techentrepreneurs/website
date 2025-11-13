"use client";

import { useState, useEffect } from "react";
import { BadgeCodeBlock } from "./BadgeCodeBlock";

interface BadgePreviewProps {
  companyName: string;
  companySlug: string;
  rank?: number;
  subscriberCount?: number;
  baseUrl: string;
  title: string;
  description: string;
}

export function BadgePreview({
  companyName,
  companySlug,
  rank,
  subscriberCount,
  baseUrl,
  title,
  description,
}: BadgePreviewProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentOrigin, setCurrentOrigin] = useState(baseUrl);

  // Update origin on client side after hydration
  useEffect(() => {
    setCurrentOrigin(window.location.origin);
  }, []);

  // Generate embed code (uses baseUrl for production URLs)
  const apiEndpoint = `${baseUrl}/api/badge`;
  const embedCodeUrl = `${apiEndpoint}?slug=${companySlug}&theme=${theme}`;
  const companyUrl = `${baseUrl}/company/${companySlug}`;

  // Preview uses current origin (localhost or production)
  const previewApiEndpoint = `${currentOrigin}/api/badge`;
  const previewImageUrl = `${previewApiEndpoint}?slug=${companySlug}&theme=${theme}`;

  const embedCode = `<a href="${companyUrl}" target="_blank"><img src="${embedCodeUrl}" alt="${companyName} - TechStartups" style="width: 250px; height: 54px;" width="250" height="54" /></a>`;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              theme === "dark"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              theme === "light"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Light
          </button>
        </div>
      </div>

      <p className="text-muted-foreground mb-6">{description}</p>

      {/* Preview */}
      <div
        className={`rounded-lg p-8 mb-6 flex items-center justify-center transition-colors ${
          theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-100"
        }`}
      >
        <a href={companyUrl} target="_blank" rel="noopener noreferrer">
          <img
            key={previewImageUrl}
            src={previewImageUrl}
            alt={`${companyName} - TechStartups`}
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>

      {/* Code Snippet */}
      <BadgeCodeBlock code={embedCode} />
    </div>
  );
}
