/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Recommended for Netlify
  images: {
    domains: [], // Add any external image domains here if needed
    formats: ['image/webp', 'image/avif'],
    unoptimized: process.env.NODE_ENV === 'development' ? false : true,
  },
  experimental: {
    optimizeCss: true,
  },
  trailingSlash: false,
  poweredByHeader: false,
}

module.exports = nextConfig