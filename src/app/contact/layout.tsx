// app/contact/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | CoolMathsZone',
  description: 'Get in touch with the CoolMathsZone team - Bishu Som and Shubhang Som. We love hearing from our users!',
  alternates: {
    canonical: 'https://coolmathszone.com/contact'
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}