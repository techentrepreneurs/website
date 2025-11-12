'use client';

interface CompanyBadgeProps {
  variant: 'built-on' | 'ranking';
  companyName: string;
  rank?: number;
  companySlug: string;
}

export function CompanyBadge({ variant, companyName, rank, companySlug }: CompanyBadgeProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://techstartups.com';
  const companyUrl = `${baseUrl}/company/${companySlug}`;

  if (variant === 'built-on') {
    return (
      <a href={companyUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
        <svg width="250" height="54" viewBox="0 0 250 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="250" height="54" rx="6" fill="#121212"/>
          <rect x="0.5" y="0.5" width="249" height="53" rx="5.5" stroke="#1e1e1e"/>

          {/* Globe Icon */}
          <g transform="translate(12, 15)">
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5" fill="none"/>
            <ellipse cx="12" cy="12" rx="5" ry="11" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="1" y1="12" x2="23" y2="12" stroke="white" strokeWidth="1.5"/>
            <path d="M12 1 Q16 6 16 12 Q16 18 12 23" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M12 1 Q8 6 8 12 Q8 18 12 23" stroke="white" strokeWidth="1.5" fill="none"/>
          </g>

          {/* Text */}
          <text x="45" y="22" fill="#9CA3AF" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
            BUILT ON
          </text>
          <text x="45" y="38" fill="white" fontSize="14" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
            TechStartups
          </text>
        </svg>
      </a>
    );
  }

  // Ranking variant
  const rankText = rank ? `#${rank}` : '#?';
  const onText = rank ? 'ON' : 'ON';

  return (
    <a href={companyUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
      <svg width="250" height="54" viewBox="0 0 250 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="250" height="54" rx="6" fill="#121212"/>
        <rect x="0.5" y="0.5" width="249" height="53" rx="5.5" stroke="#1e1e1e"/>

        {/* Trophy Icon */}
        <g transform="translate(12, 15)">
          <path d="M7 8h10M7 8c-2 0-3-1-3-3s1-3 3-3M7 8v7c0 2 1.5 4 5 4s5-2 5-4V8M17 8c2 0 3-1 3-3s-1-3-3-3"
                stroke="#FFD700" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 19h6l1 3H8l1-3z" stroke="#FFD700" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* Rank Number */}
        <text x="45" y="27" fill="white" fontSize="18" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700">
          {rankText}
        </text>

        {/* On TechStartups text */}
        <text x="45" y="40" fill="#9CA3AF" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
          {onText} TECHSTARTUPS
        </text>
      </svg>
    </a>
  );
}

export function getBuiltOnBadgeHTML(companyName: string, companySlug: string, baseUrl: string = 'https://techstartups.com'): string {
  const companyUrl = `${baseUrl}/company/${companySlug}`;

  return `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
  <svg width="250" height="54" viewBox="0 0 250 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="250" height="54" rx="6" fill="#121212"/>
    <rect x="0.5" y="0.5" width="249" height="53" rx="5.5" stroke="#1e1e1e"/>
    <g transform="translate(12, 15)">
      <circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5" fill="none"/>
      <ellipse cx="12" cy="12" rx="5" ry="11" stroke="white" stroke-width="1.5" fill="none"/>
      <line x1="1" y1="12" x2="23" y2="12" stroke="white" stroke-width="1.5"/>
      <path d="M12 1 Q16 6 16 12 Q16 18 12 23" stroke="white" stroke-width="1.5" fill="none"/>
      <path d="M12 1 Q8 6 8 12 Q8 18 12 23" stroke="white" stroke-width="1.5" fill="none"/>
    </g>
    <text x="45" y="22" fill="#9CA3AF" font-size="11" font-family="system-ui, -apple-system, sans-serif" font-weight="500">BUILT ON</text>
    <text x="45" y="38" fill="white" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="600">TechStartups</text>
  </svg>
</a>`;
}

export function getRankingBadgeHTML(companyName: string, companySlug: string, rank: number, baseUrl: string = 'https://techstartups.com'): string {
  const companyUrl = `${baseUrl}/company/${companySlug}`;
  const rankText = `#${rank}`;

  return `<a href="${companyUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;">
  <svg width="250" height="54" viewBox="0 0 250 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="250" height="54" rx="6" fill="#121212"/>
    <rect x="0.5" y="0.5" width="249" height="53" rx="5.5" stroke="#1e1e1e"/>
    <g transform="translate(12, 15)">
      <path d="M7 8h10M7 8c-2 0-3-1-3-3s1-3 3-3M7 8v7c0 2 1.5 4 5 4s5-2 5-4V8M17 8c2 0 3-1 3-3s-1-3-3-3"
            stroke="#FFD700" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 19h6l1 3H8l1-3z" stroke="#FFD700" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="45" y="27" fill="white" font-size="18" font-family="system-ui, -apple-system, sans-serif" font-weight="700">${rankText}</text>
    <text x="45" y="40" fill="#9CA3AF" font-size="10" font-family="system-ui, -apple-system, sans-serif" font-weight="500">ON TECHSTARTUPS</text>
  </svg>
</a>`;
}
