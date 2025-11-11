"use client";

interface Company {
  id: string;
  name: string;
  description: string;
  website_url: string;
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
          <ul className="space-y-6">
            {companies.map((company) => (
              <li
                key={company.id}
                className="border-b border-border last:border-0 pb-6 last:pb-0"
              >
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 group cursor-pointer -mx-4 -my-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h3 className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {company.description}
                  </p>
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
