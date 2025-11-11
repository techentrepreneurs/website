"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { getFaviconUrl } from "@/lib/utils";

interface CompanyFaviconProps {
  websiteUrl: string;
  companyName: string;
  size?: number;
  className?: string;
}

export function CompanyFavicon({
  websiteUrl,
  companyName,
  size = 40,
  className = "",
}: CompanyFaviconProps) {
  const [imageError, setImageError] = useState(false);
  const faviconUrl = getFaviconUrl(websiteUrl);

  // If no website URL or image failed to load, show fallback
  if (!websiteUrl || !faviconUrl || imageError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-primary/10 flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Building2 className="text-primary" style={{ width: size * 0.5, height: size * 0.5 }} />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-card border border-border overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={faviconUrl}
        alt={`${companyName} favicon`}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

