"use client";

import { CompanyFavicon } from "@/components/CompanyFavicon";

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
  return (
    <div className="mb-12">
      <div className="flex items-start gap-6 mb-6">
        {/* Company Favicon */}
        <CompanyFavicon
          websiteUrl={websiteUrl}
          companyName={name}
          size={80}
        />
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
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

