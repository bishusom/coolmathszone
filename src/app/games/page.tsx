import type { Metadata } from 'next'
import GamesDirectoryClient from '@/components/games/GamesDirectoryClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'

export const metadata: Metadata = {
  title: 'Math Games for Kids | CoolMathsZone',
  description: 'Play interactive math games for arithmetic, fractions, algebra, logic, primes, binary, angles, roots, and more at CoolMathsZone.',
  alternates: {
    canonical: `${siteUrl}/games`,
  },
  openGraph: {
    title: 'Math Games for Kids | CoolMathsZone',
    description: 'Play interactive math games for arithmetic, fractions, algebra, logic, primes, binary, angles, roots, and more at CoolMathsZone.',
    url: `${siteUrl}/games`,
    type: 'website',
    images: ['/cmz-og.png'],
  },
}

export default function GamesDirectoryPage() {
  return <GamesDirectoryClient />
}
