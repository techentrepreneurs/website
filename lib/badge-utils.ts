/**
 * Utility functions for generating badge HTML
 * These are server-side utilities that generate embeddable HTML for badges
 */

export function getBuiltOnBadgeHTML(
  companyName: string,
  companySlug: string,
  baseUrl: string = "https://techstartups.gg",
  theme: "light" | "dark" = "dark"
): string {
  const companyUrl = `${baseUrl}/company/${companySlug}`;

  // Theme colors
  const isDark = theme === "dark";
  const bgColor = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "#2a2a2a" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textSecondary = isDark ? "#9CA3AF" : "#6B7280";
  const logoUrl = isDark
    ? "https://techstartups.gg/logo-white.svg"
    : "https://techstartups.gg/logo-tp.png";
  const logoSize = isDark ? 24 : 36; // 50% larger for light mode
  const logoX = isDark ? 16 : 10;
  const logoY = isDark ? 18 : 12;

  return `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
  <svg width="280" height="60" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="60" rx="16" fill="${bgColor}"/>
    <rect x="1" y="1" width="278" height="58" rx="15" stroke="${borderColor}" stroke-width="2"/>
    <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoUrl}"/>
    <text x="52" y="22" fill="${textSecondary}" font-size="10" font-family="system-ui, -apple-system, sans-serif" font-weight="500" letter-spacing="0.5">BUILT ON</text>
    <text x="52" y="44" fill="${textPrimary}" font-size="20" font-family="system-ui, -apple-system, sans-serif" font-weight="700">TechStartups</text>
  </svg>
</a>`;
}

export function getRankingBadgeHTML(
  companyName: string,
  companySlug: string,
  rank: number,
  baseUrl: string = "https://techstartups.gg",
  theme: "light" | "dark" = "dark"
): string {
  const companyUrl = `${baseUrl}/company/${companySlug}`;
  const rankText = `#${rank}`;

  // Theme colors
  const isDark = theme === "dark";
  const bgColor = isDark ? "#1a1a1a" : "#ffffff";
  const borderColor = isDark ? "#2a2a2a" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#1a1a1a";
  const textSecondary = isDark ? "#9CA3AF" : "#6B7280";
  const logoUrl = isDark
    ? "https://techstartups.gg/logo-white.svg"
    : "https://techstartups.gg/logo-tp.png";
  const logoSize = isDark ? 24 : 36; // 50% larger for light mode
  const logoX = isDark ? 16 : 10;
  const logoY = isDark ? 18 : 12;

  return `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
  <svg width="280" height="60" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="60" rx="16" fill="${bgColor}"/>
    <rect x="1" y="1" width="278" height="58" rx="15" stroke="${borderColor}" stroke-width="2"/>
    <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoUrl}"/>
    <text x="52" y="30" fill="${textPrimary}" font-size="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700">${rankText}</text>
    <text x="52" y="48" fill="${textSecondary}" font-size="13" font-family="system-ui, -apple-system, sans-serif" font-weight="500" letter-spacing="0.5">ON TECHSTARTUPS</text>
  </svg>
</a>`;
}
