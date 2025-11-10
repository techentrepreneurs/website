import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { connectDB } from '@/lib/db'
import { CompanyChannel } from '@/lib/models/CompanyChannel'

export const dynamic = 'force-dynamic'

async function getCompanies() {
  try {
    await connectDB()
    const companies = await CompanyChannel.find({ is_retired: false })
      .sort({ channel_name: 1 })
      .lean()
      .exec()

    return companies.map(company => ({
      id: company._id.toString(),
      name: company.channel_name,
    }))
  } catch (error) {
    console.error('Error fetching companies:', error)
    return []
  }
}

export default async function DirectoryPage() {
  const companies = await getCompanies()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Company Directory</h1>
            <p className="text-muted-foreground">
              Browse our community of tech companies and startups
            </p>
          </div>

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
        </div>
      </main>
      <Footer />
    </div>
  )
}
