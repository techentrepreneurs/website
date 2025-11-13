import { NextRequest } from "next/server";
import { CompanyMetadata } from "@/lib/models/CompanyMetadata";
import { ChannelSubscription } from "@/lib/models/ChannelSubscription";
import { connectDB } from "@/lib/db";
import { createSlug } from "@/lib/utils";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const theme = searchParams.get("theme") || "dark";

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  try {
    await connectDB();

    // Get all companies to calculate rankings
    const allCompanies = await CompanyMetadata.find({}).lean().exec();
    const company = allCompanies.find((c) => createSlug(c.name) === slug);

    if (!company) {
      return new Response("Company not found", { status: 404 });
    }

    // Get subscriber counts for all companies
    const subscriberCounts = await ChannelSubscription.aggregate([
      { $match: { subscribed: true } },
      { $group: { _id: "$channel_id", count: { $sum: 1 } } },
    ]);

    const countMap = new Map(
      subscriberCounts.map((item) => [item._id.toString(), item.count])
    );

    const subscriberCount = countMap.get(company.channel_id.toString()) || 0;

    // Calculate company rank
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

    const companyRank =
      companiesWithCounts.findIndex(
        (c) => c.channel_id === company.channel_id.toString()
      ) + 1;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://techstartups.gg";
    const companyUrl = `${baseUrl}/company/${slug}`;

    // Theme colors
    const isDark = theme === "dark";
    const bgColor = isDark ? "#1a1a1a" : "#ffffff";
    const borderColor = isDark ? "#2a2a2a" : "#e5e5e5";
    const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
    const textSecondary = isDark ? "#9CA3AF" : "#6B7280";

    let svg: string;

    // If top 3, render ranking badge
    if (companyRank <= 3) {
      // Medal colors based on rank
      const medalColors = {
        1: { main: "#FFD700", shadow: "#DAA520", text: "1" }, // Gold
        2: { main: "#C0C0C0", shadow: "#A8A8A8", text: "2" }, // Silver
        3: { main: "#CD7F32", shadow: "#B8732D", text: "3" }, // Bronze
      };
      const medal = medalColors[companyRank as 1 | 2 | 3];

      const rankText = `#${companyRank} Trending Startup`;

      svg = `<svg width="280" height="60" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <a href="${companyUrl}" target="_blank" rel="noopener noreferrer">
    <rect width="280" height="60" rx="16" fill="${bgColor}"/>
    <rect x="1" y="1" width="278" height="58" rx="15" stroke="${borderColor}" stroke-width="2"/>

    <!-- Medal Icon (replacing logo) -->
    <g transform="translate(16, 15)">
      <!-- Ribbon -->
      <path d="M 8 0 L 12 8 L 15 6 L 15 0 Z" fill="${medal.main}"/>
      <path d="M 22 0 L 18 8 L 15 6 L 15 0 Z" fill="${medal.shadow}"/>
      <!-- Medal circle -->
      <circle cx="15" cy="15" r="12" fill="${medal.main}"/>
      <circle cx="15" cy="15" r="10" fill="${medal.shadow}"/>
      <!-- Number -->
      <text x="15" y="21" fill="${bgColor}" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">${medal.text}</text>
    </g>

    <text x="52" y="22" fill="${textSecondary}" font-size="10" font-family="system-ui, -apple-system, sans-serif" font-weight="500" letter-spacing="0.5">TECHSTARTUPS</text>
    <text x="52" y="44" fill="${textPrimary}" font-size="20" font-family="system-ui, -apple-system, sans-serif" font-weight="700">${rankText}</text>
  </a>
</svg>`;
    } else {
      // Otherwise, render built-on badge
      // Read logo files and convert to base64 data URIs
      const logoPath = isDark
        ? path.join(process.cwd(), "public", "logo-white.svg")
        : path.join(process.cwd(), "public", "logo-tp.png");

      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString("base64");
      const logoMimeType = isDark ? "image/svg+xml" : "image/png";
      const logoDataUri = `data:${logoMimeType};base64,${logoBase64}`;

      const logoSize = isDark ? 24 : 36;
      const logoX = isDark ? 16 : 10;
      const logoY = isDark ? 18 : 12;

      svg = `<svg width="280" height="60" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <a href="${companyUrl}" target="_blank" rel="noopener noreferrer">
    <rect width="280" height="60" rx="16" fill="${bgColor}"/>
    <rect x="1" y="1" width="278" height="58" rx="15" stroke="${borderColor}" stroke-width="2"/>
    <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoDataUri}"/>
    <text x="52" y="22" fill="${textSecondary}" font-size="10" font-family="system-ui, -apple-system, sans-serif" font-weight="500" letter-spacing="0.5">FEATURED ON</text>
    <text x="52" y="44" fill="${textPrimary}" font-size="20" font-family="system-ui, -apple-system, sans-serif" font-weight="700">TechStartups</text>

    <!-- Subscriber count with upvote icon (Product Hunt style) -->
    <!-- Upvote triangle - larger -->
    <path d="M 252 15 L 246 25 L 258 25 Z" fill="${textSecondary}"/>
    <!-- Count - smaller -->
    <text x="252" y="44" fill="${textPrimary}" font-size="20" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">${subscriberCount}</text>
  </a>
</svg>`;
    }

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
    });
  } catch (error) {
    console.error("Error generating badge:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

