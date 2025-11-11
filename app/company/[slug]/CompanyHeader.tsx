"use client";

import { CompanyFavicon } from "@/components/CompanyFavicon";
import { getFaviconUrl } from "@/lib/utils";

interface CompanyHeaderProps {
  name: string;
  description: string;
  websiteUrl: string;
}

export function CompanyHeader({
  name,
  description,
  websiteUrl,
}: CompanyHeaderProps) {
  const faviconUrl = getFaviconUrl(websiteUrl);

  return (
    <div className="mb-12">
      {/* Banner with blurred favicon background */}
      <div className="relative overflow-hidden rounded-lg border border-border mb-8">
        {/* Blurred background */}
        {faviconUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${faviconUrl})`,
              filter: "blur(40px)",
              transform: "scale(1.2)",
            }}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/30 to-background/50" />

        {/* Content */}
        <div className="relative flex items-center gap-6 p-8">
          {/* Company Favicon */}
          <CompanyFavicon
            websiteUrl={websiteUrl}
            companyName={name}
            size={100}
            className="shadow-lg"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">{name}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Visit Website
        </a>
      )}
    </div>
  );
}
