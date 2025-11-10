import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DirectoryList } from './DirectoryList'
import { connectDB } from '@/lib/db'
import { CompanyChannel } from '@/lib/models/CompanyChannel'

interface Company {
  id: string
  name: string
}

async function getCompanies(): Promise<Company[]> {
  try {
    await connectDB()
    const companies = await CompanyChannel.find({
      $or: [
        { is_retired: false },
        { is_retired: { $exists: false } }
      ]
    })
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

          <DirectoryList companies={companies} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
