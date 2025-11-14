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
 * Convert MongoDB Long object to JavaScript number
 * MongoDB stores large integers as Long objects with {low, high, unsigned} properties
 * This function converts them back to JavaScript numbers
 *
 * @param long - MongoDB Long object or number
 * @returns JavaScript number representation
 */
export function longToNumber(long: any): number {
  // If it's already a number, return it
  if (typeof long === "number") return long;

  // If it's a MongoDB Long object, convert it
  if (long && typeof long === "object" && "low" in long && "high" in long) {
    // Convert MongoDB Long to JavaScript number
    // Formula: (high * 2^32) + low (unsigned)
    // Note: This may lose precision for very large numbers (> Number.MAX_SAFE_INTEGER)
    const value = long.high * Math.pow(2, 32) + (long.low >>> 0);
    return value;
  }

  // Default to 0 for invalid values
  return 0;
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
