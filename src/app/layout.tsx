// src/app/layout.tsx - USING NEXT.JS SCRIPT COMPONENT
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google'
import { AuthProvider } from "@/context/AuthContext";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'),
  title: 'Cool Maths Zone | Fun Math Games and Learning Resources for Kids',
  description: 'Cool Maths Zone - also searched as Cool Math Zone and CoolMathZone - offers fun math games, worksheets, and learning resources for kindergarten to 8th grade.',
  keywords:  'cool maths, cool math, cool maths zone, cool math zone, coolmathzone, coolmathszone, cool math games, fun math games, math learning, math worksheets, number games, math puzzles, arithmetic games, algebra games, kids math games, math education',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cool Maths Zone | Fun Math Games and Learning Resources for Kids',
    description: 'Cool Maths Zone - also searched as Cool Math Zone and CoolMathZone - offers fun math games, worksheets, and learning resources for kindergarten to 8th grade.',
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
    title: 'Cool Maths Zone | Fun Math Games and Learning Resources for Kids',
    description: 'Cool Maths Zone - also searched as Cool Math Zone and CoolMathZone - offers fun math games, worksheets, and learning resources for kindergarten to 8th grade.',
    images: ['https://coolmathszone.com/cmz-og.png'],
  },
  alternates: {
    canonical: 'https://coolmathszone.com',
  },
};

// Replace with your actual Google Analytics measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-24LDGPFLX4';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'

// Keep schema conservative and tied to real assets.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "name": "Cool Maths Zone",
      "alternateName": ["Cool Math Zone", "CoolMathZone", "CoolMathsZone"],
      "url": `${siteUrl}/`,
      "description": "Fun math games and learning resources for kids.",
      "publisher": {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Cool Maths Zone",
      "alternateName": ["Cool Math Zone", "CoolMathZone", "CoolMathsZone"],
      "url": `${siteUrl}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/cmz-logo.webp`
      }
    }
  ]
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

        {/* Google AdSense Script */}
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4386714040098164"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
