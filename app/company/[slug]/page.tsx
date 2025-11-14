import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { connectDB } from "@/lib/db";
import { createSlug } from "@/lib/utils";
import mongoose from "mongoose";
import { CompanyHeader } from "./CompanyHeader";

// Revalidate every hour
export const revalidate = 3600;

interface CompanyPageProps {
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
}: CompanyPageProps): Promise<Metadata> {
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
      title: `${company.name} - Tech Startups`,
      description: company.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Company - Tech Startups",
    };
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  try {
    await connectDB();

    // Find company by slug
    const companies = await CompanyMetadata.find({}).lean().exec();
    const company = companies.find((c) => createSlug(c.name) === slug);

    if (!company) {
      notFound();
    }

    // Fetch latest 3 builder posts for this company
    // Use raw MongoDB connection to avoid Mongoose type casting issues with Long values
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established");
    }

    // Query using the raw channel_id (MongoDB Long object) to match the database type
    // Filter out soft-deleted updates (where deleted_at is not null)
    const updates = await db
      .collection("company_updates")
      .find({
        original_channel_id: company.channel_id,
        deleted_at: null, // Only fetch non-deleted updates
      })
      .sort({ created_at: -1 })
      .limit(3)
      .toArray();

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 max-w-4xl">
            {/* Company Header */}
            <CompanyHeader
              name={company.name}
              description={company.description}
              websiteUrl={company.website_url}
            />

            {/* Latest Updates */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Latest Updates
              </h2>
              {updates.length === 0 ? (
                <p className="text-muted-foreground">No updates yet.</p>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {updates.map((update) => (
                    <article
                      key={update._id.toString()}
                      className="bg-card border border-border rounded-lg p-4 sm:p-6"
                    >
                      {/* Author Info */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        {update.author.avatar_url && (
                          <img
                            src={update.author.avatar_url}
                            alt={update.author.display_name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base truncate">
                            {update.author.display_name}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {new Date(update.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="prose prose-sm sm:prose-base prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-accent prose-pre:text-foreground break-words">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {update.content}
                        </ReactMarkdown>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error loading company page:", error);
    notFound();
  }
}
