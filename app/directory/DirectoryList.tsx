"use client";

import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";
import { createSlug, getFaviconUrl } from "@/lib/utils";
import { CompanyFavicon } from "@/components/CompanyFavicon";

interface Company {
  id: string;
  name: string;
  description: string;
  website_url: string;
  subscriber_count: number;
  rank: number;
}

interface DirectoryListProps {
  companies: Company[];
}

export function DirectoryList({ companies }: DirectoryListProps) {
  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        {companies.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No companies found
          </p>
        ) : (
          <ul className="space-y-4">
            {companies.map((company) => {
              const faviconUrl = getFaviconUrl(company.website_url);

              return (
                <li key={company.id}>
                  <div className="flex items-stretch group rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50">
                    {/* Rank Section - Left Side */}
                    <div className="flex-shrink-0 w-16 bg-primary/10 flex items-center justify-center border-r border-border">
                      <span className="text-2xl font-bold text-primary">
                        {company.rank}
                      </span>
                    </div>

                    {/* Favicon Background Section */}
                    <div className="flex-shrink-0 w-20 relative overflow-hidden border-r border-border">
                      {/* Blurred background */}
                      {faviconUrl && (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${faviconUrl})`,
                            filter: "blur(10px)",
                            transform: "scale(1.5)",
                          }}
                        />
                      )}

                      {/* Favicon on top */}
                      <div className="relative flex items-center justify-center h-full">
                        <CompanyFavicon
                          websiteUrl={company.website_url}
                          companyName={company.name}
                          size={40}
                        />
                      </div>
                    </div>

                    {/* Company Info - Main Link */}
                    <Link
                      href={`/company/${createSlug(company.name)}`}
                      className="flex-1 flex items-center gap-4 p-4 bg-card cursor-pointer"
                    >
                      <div className="flex-1 flex flex-col gap-2">
                        <h3 className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {company.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground flex-shrink-0">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {company.subscriber_count}
                        </span>
                      </div>
                    </Link>

                    {/* External Link Button */}
                    {company.website_url && (
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-12 bg-card border-l border-border flex items-center justify-center hover:bg-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="Visit website"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {companies.length} {companies.length === 1 ? "company" : "companies"}{" "}
        listed
      </div>
    </>
  );
}
