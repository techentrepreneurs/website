import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a company name to a URL-safe slug
 * @param name - The company name to convert
 * @returns A URL-safe slug
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Get the favicon URL for a website using Google's favicon service
 * @param websiteUrl - The company website URL
 * @returns The favicon URL
 */
export function getFaviconUrl(websiteUrl: string): string {
  if (!websiteUrl) return "";

  try {
    const url = new URL(websiteUrl);
    const domain = url.hostname;
    // Use Google's favicon service for reliable favicon fetching
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return "";
  }
}
