'use client'

interface Company {
  id: string
  name: string
}

interface DirectoryListProps {
  companies: Company[]
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
          <ul className="space-y-3">
            {companies.map((company) => (
              <li
                key={company.id}
                className="border-b border-border last:border-0 pb-3 last:pb-0"
              >
                <div className="text-foreground font-medium">
                  {company.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {companies.length} {companies.length === 1 ? 'company' : 'companies'} listed
      </div>
    </>
  )
}
