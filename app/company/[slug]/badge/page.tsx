import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { ChannelSubscription } from "@/lib/models/ChannelSubscription";
import { connectDB } from "@/lib/db";
import { createSlug } from "@/lib/utils";
import { CompanyBadge, getBuiltOnBadgeHTML, getRankingBadgeHTML } from "@/components/CompanyBadge";
import { BadgeCodeBlock } from "./BadgeCodeBlock";

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

    // Get subscriber counts and calculate rankings
    const subscriberCounts = await ChannelSubscription.aggregate([
      { $match: { subscribed: true } },
      { $group: { _id: "$channel_id", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Find company rank
    const companyRank = subscriberCounts.findIndex(
      (item) => item._id === company.channel_id
    ) + 1;

    const companySlug = createSlug(company.name);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://techstartups.com';

    const builtOnHTML = getBuiltOnBadgeHTML(company.name, companySlug, baseUrl);
    const rankingHTML = getRankingBadgeHTML(company.name, companySlug, companyRank, baseUrl);

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

            {/* Badge Variants */}
            <div className="space-y-12">
              {/* Built On Badge */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Built on TechStartups Badge</h2>
                <p className="text-muted-foreground mb-6">
                  Show that your company is featured on TechStartups
                </p>

                {/* Preview */}
                <div className="bg-secondary rounded-lg p-8 mb-6 flex items-center justify-center">
                  <CompanyBadge
                    variant="built-on"
                    companyName={company.name}
                    companySlug={companySlug}
                  />
                </div>

                {/* Code Snippet */}
                <BadgeCodeBlock code={builtOnHTML} />
              </div>

              {/* Ranking Badge */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  #{companyRank} on TechStartups Badge
                </h2>
                <p className="text-muted-foreground mb-6">
                  Display your ranking on TechStartups based on subscriber count
                </p>

                {/* Preview */}
                <div className="bg-secondary rounded-lg p-8 mb-6 flex items-center justify-center">
                  <CompanyBadge
                    variant="ranking"
                    companyName={company.name}
                    rank={companyRank}
                    companySlug={companySlug}
                  />
                </div>

                {/* Code Snippet */}
                <BadgeCodeBlock code={rankingHTML} />
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="mt-12 bg-accent border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How to Use</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Click the "Copy HTML" button on any badge above</li>
                <li>Paste the HTML code into your website, README, or documentation</li>
                <li>The badge will automatically link back to your company page on TechStartups</li>
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
