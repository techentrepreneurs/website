"use client";

import { Users } from "lucide-react";

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
            {companies.map((company) => (
              <li key={company.id}>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-stretch group cursor-pointer rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50"
                >
                  {/* Rank Section - Left Side */}
                  <div className="flex-shrink-0 w-16 bg-primary/10 flex items-center justify-center border-r border-border">
                    <span className="text-2xl font-bold text-primary">
                      {company.rank}
                    </span>
                  </div>

                  {/* Company Info - Right Side */}
                  <div className="flex-1 flex items-center gap-4 p-4 bg-card">
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
                  </div>
                </a>
              </li>
            ))}
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
