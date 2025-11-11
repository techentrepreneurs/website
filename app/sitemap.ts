import { MetadataRoute } from "next";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { connectDB } from "@/lib/db";
import { createSlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://techstartups.gg";

  try {
    await connectDB();
    const companies = await CompanyMetadata.find({}).lean().exec();

    // Generate company page URLs
    const companyUrls = companies.map((company) => ({
      url: `${baseUrl}/company/${createSlug(company.name)}`,
      lastModified: company.last_updated,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/directory`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      ...companyUrls,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return basic sitemap if database fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/directory`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}

