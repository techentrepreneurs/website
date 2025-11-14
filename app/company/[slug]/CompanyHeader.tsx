"use client";

import Link from "next/link";
import { CompanyFavicon } from "@/components/CompanyFavicon";
import { getFaviconUrl } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

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
      {/* Back to Directory Button */}
      <Link
        href="/directory"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        View All Companies
      </Link>

      {/* Banner with blurred favicon background */}
      <div className="relative overflow-hidden rounded-lg border border-border mb-4 sm:mb-6">
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
        <div className="relative flex items-center gap-3 sm:gap-6 p-4 sm:p-8">
          {/* Company Favicon */}
          <CompanyFavicon
            websiteUrl={websiteUrl}
            companyName={name}
            size={60}
            className="shadow-lg sm:w-[100px] sm:h-[100px]"
          />

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-4xl font-bold break-words">
              {name}
            </h1>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
        {description}
      </p>

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
