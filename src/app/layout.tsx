// src/app/layout.tsx - USING NEXT.JS SCRIPT COMPONENT
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Cool Maths Zone ✖️➗➕➖🟰 | Fun Math Games & Learning Resources for Kids',
  description: 'Cool Maths Zone - Fun math games and educational resources for all ages! Enjoy interactive number games, arithmetic challenges, math worksheets, and learning guides. Perfect for kindergarten to middle & secondary school students learning mathematics.',
  keywords:  'cool math games, fun math games, math learning, math worksheets, number games, math puzzles, arithmetic games, algebra games, kids math games, math education',
  openGraph: {
    title: 'Cool Maths Zone ✖️➗➕➖🟰 | Fun Math Games & Learning Resources for Kids',
    description: 'Cool Maths Zone - Fun math games and educational resources for all ages! Enjoy interactive number games, arithmetic challenges, math worksheets, and learning guides. Perfect for kindergarten to middle & secondary school students learning mathematics.',
    url: 'https://coolmathszone.com',
    siteName: 'Cool Maths Zone',
    images: [
      {
        url: 'https://coolmathszone.com/cmz-og.png',
        width: 1200,
        height: 630,
        alt: 'Cool Maths Zone Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cool Maths Zone ✖️➗➕➖🟰 | Fun Math Games & Learning Resources for Kids',
    description: 'Cool Maths Zone - Fun math games and educational resources for all ages! Enjoy interactive number games, arithmetic challenges, math worksheets, and learning guides. Perfect for kindergarten to middle & secondary school students learning mathematics.',
    images: ['https://coolmathszone.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://coolmathszone.com',
  },
};

// Replace with your actual Google Analytics measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-24LDGPFLX4';

// Schema.org Structured Data - Organized as a JavaScript object
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cool Maths Zone",
  "url": "https://coolmathszone.com/",
  "description": "Interactive mathematics game platform offering fun math challenges and educational resources for children aged 4-14 years.",
  "operatingSystem": "Web",
  "applicationCategory": "EducationalGame",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1500"
  },
  "screenshot": [
    "https://coolmathszone.com/images/screenshot1.jpg",
    "https://coolmathszone.com/images/screenshot2.jpg"
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Cool Maths Zone",
    "logo": {
      "@type": "ImageObject",
      "url": "https://coolmathszone.com/images/cmz-logo-light.png"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Structured Data using Next.js Script Component */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(structuredData)}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}