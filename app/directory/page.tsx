import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DirectoryList } from "./DirectoryList";
import { connectDB } from "@/lib/db";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { ChannelSubscription } from "@/lib/models/ChannelSubscription";

// Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

interface Company {
  id: string;
  name: string;
  description: string;
  website_url: string;
  subscriber_count: number;
  rank: number;
}

async function getCompanies(): Promise<Company[]> {
  try {
    await connectDB();

    // Get all companies with website URLs
    const companies = await CompanyMetadata.find({
      website_url: { $ne: "" }, // Only include companies with a website URL
    })
      .lean()
      .exec();

    // Get subscriber counts for all channels
    const subscriberCounts = await ChannelSubscription.aggregate([
      {
        $match: { subscribed: true }, // Only count active subscriptions
      },
      {
        $group: {
          _id: "$channel_id",
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a map of channel_id to subscriber count
    // Convert Long objects to strings for proper Map key comparison
    const countMap = new Map(
      subscriberCounts.map((item) => [item._id.toString(), item.count])
    );

    // Combine company data with subscriber counts
    const companiesWithCounts = companies.map((company) => ({
      id: company._id.toString(),
      name: company.name,
      description: company.description,
      website_url: company.website_url,
      subscriber_count: countMap.get(company.channel_id.toString()) || 0,
      rank: 0, // Will be set after sorting
    }));

    // Sort by subscriber count (descending) and assign ranks
    companiesWithCounts.sort((a, b) => b.subscriber_count - a.subscriber_count);
    companiesWithCounts.forEach((company, index) => {
      company.rank = index + 1;
    });

    return companiesWithCounts;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export default async function DirectoryPage() {
  const companies = await getCompanies();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Company Directory</h1>
            <p className="text-muted-foreground">
              Discover companies building on TechStartups
            </p>
          </div>

          <DirectoryList companies={companies} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
