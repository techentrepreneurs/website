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
    const updates = await db
      .collection("company_updates")
      .find({
        original_channel_id: company.channel_id,
      })
      .sort({ created_at: -1 })
      .limit(3)
      .toArray();

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
            {/* Company Header */}
            <CompanyHeader
              name={company.name}
              description={company.description}
              websiteUrl={company.website_url}
            />

            {/* Latest Updates */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
              {updates.length === 0 ? (
                <p className="text-muted-foreground">No updates yet.</p>
              ) : (
                <div className="space-y-6">
                  {updates.map((update) => (
                    <article
                      key={update._id.toString()}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        {update.author.avatar_url && (
                          <img
                            src={update.author.avatar_url}
                            alt={update.author.display_name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-medium">
                            {update.author.display_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
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
                      <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-accent prose-pre:text-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {update.content}
                        </ReactMarkdown>
                      </div>

                      {/* Attachments */}
                      {update.attachments && update.attachments.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {update.attachments.map((attachment) => (
                            <a
                              key={attachment.id}
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              {attachment.content_type?.startsWith("image/") ? (
                                <img
                                  src={attachment.url}
                                  alt={attachment.filename}
                                  className="rounded-lg w-full h-auto"
                                />
                              ) : (
                                <div className="flex items-center gap-2 p-3 bg-accent rounded-lg">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  <span className="text-sm truncate">
                                    {attachment.filename}
                                  </span>
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
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
