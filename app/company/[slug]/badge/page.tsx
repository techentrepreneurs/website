import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { ChannelSubscription } from "@/lib/models/ChannelSubscription";
import { connectDB } from "@/lib/db";
import { createSlug } from "@/lib/utils";
import { BadgePreview } from "./BadgePreview";

// Revalidate every hour
export const revalidate = 3600;

interface BadgePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all companies
export async function generateStaticParams() {
  try {
    await connectDB();
    const companies = await CompanyMetadata.find({}).lean().exec();

    return companies.map((company) => ({
      slug: createSlug(company.name),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BadgePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    await connectDB();
    const companies = await CompanyMetadata.find({}).lean().exec();
    const company = companies.find((c) => createSlug(c.name) === slug);

    if (!company) {
      return {
        title: "Company Not Found - Tech Startups",
      };
    }

    return {
      title: `${company.name} Badges - Tech Startups`,
      description: `Embeddable badges for ${company.name} on Tech Startups`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Company Badges - Tech Startups",
    };
  }
}

export default async function BadgePage({ params }: BadgePageProps) {
  const { slug } = await params;

  try {
    await connectDB();

    // Find company by slug
    const companies = await CompanyMetadata.find({}).lean().exec();
    const company = companies.find((c) => createSlug(c.name) === slug);

    if (!company) {
      notFound();
    }

    // Get all companies to calculate proper rankings
    const allCompanies = await CompanyMetadata.find({}).lean().exec();

    // Get subscriber counts
    const subscriberCounts = await ChannelSubscription.aggregate([
      { $match: { subscribed: true } },
      { $group: { _id: "$channel_id", count: { $sum: 1 } } },
    ]);

    // Create a map of channel_id to subscriber count
    const countMap = new Map(
      subscriberCounts.map((item) => [item._id.toString(), item.count])
    );

    // Combine companies with their subscriber counts
    const companiesWithCounts = allCompanies.map((c) => ({
      channel_id: c.channel_id.toString(),
      name: c.name,
      subscriber_count: countMap.get(c.channel_id.toString()) || 0,
    }));

    // Sort by subscriber count (descending), then by name (ascending) for consistent ordering
    companiesWithCounts.sort((a, b) => {
      if (b.subscriber_count !== a.subscriber_count) {
        return b.subscriber_count - a.subscriber_count;
      }
      return a.name.localeCompare(b.name);
    });

    // Find company rank and subscriber count
    const companyRank =
      companiesWithCounts.findIndex(
        (c) => c.channel_id === company.channel_id.toString()
      ) + 1;

    const companySubscriberCount =
      countMap.get(company.channel_id.toString()) || 0;

    const companySlug = createSlug(company.name);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://techstartups.gg";

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{company.name} Badges</h1>
              <p className="text-muted-foreground">
                Embeddable badges to showcase your company on TechStartups
              </p>
            </div>

            {/* Badge */}
            <div className="space-y-12">
              <BadgePreview
                companyName={company.name}
                companySlug={companySlug}
                rank={companyRank}
                subscriberCount={companySubscriberCount}
                baseUrl={baseUrl}
                title={
                  companyRank <= 3
                    ? `#${companyRank} Trending Startup Badge`
                    : "TechStartups Badge"
                }
                description={
                  companyRank <= 3
                    ? "Display your top 3 ranking with a medal badge"
                    : "Show that your company is featured on TechStartups"
                }
              />
            </div>

            {/* Usage Instructions */}
            <div className="mt-12 bg-accent border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How to Use</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Click the "Copy HTML" button on any badge above</li>
                <li>
                  Paste the HTML code into your website, README, or
                  documentation
                </li>
                <li>
                  The badge will automatically link back to your company page on
                  TechStartups
                </li>
                <li>Badges are updated hourly to reflect current rankings</li>
              </ol>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading badge page:", error);
    notFound();
  }
}
