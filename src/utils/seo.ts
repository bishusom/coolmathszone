// src/utils/seo.ts

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com';

/**
 * Generates a standardized canonical URL.
 * Ensures the protocol is https, domain is correct, and path is lowercase without trailing slash.
 */
export function getCanonicalUrl(path: string): string {
  // Remove leading/trailing slashes for consistency
  const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  
  // Return the full canonical URL
  return `${baseUrl}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Generates metadata alternates object with a canonical URL.
 */
export function getMetadataAlternates(path: string) {
  return {
    canonical: getCanonicalUrl(path),
  };
}
