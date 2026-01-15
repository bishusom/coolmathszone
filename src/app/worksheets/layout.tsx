// app/contact/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Worksheets | CoolMathsZone',
  description: 'Printable math worksheets for all grade levels. Practice addition, subtraction, multiplication, division and more.',
  alternates: {
    canonical: 'https://coolmathszone.com/worksheets'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}