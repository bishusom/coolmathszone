// app/worksheets/[grade]/[topic]/layout.tsx
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string; topic: string }>;
}): Promise<Metadata> {
  const { grade, topic } = await params;
  
  // Format topic for display (convert kebab-case to Title Case)
  const formattedTopic = topic.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  const title = `${formattedTopic} Worksheets - Grade ${grade} | CoolMathsZone`;
  const description = `Generate and download printable ${formattedTopic} worksheets for Grade ${grade}. Perfect for extra practice and offline learning.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://coolmathszone.com/worksheets/${grade}/${topic}`,
    },
    openGraph: {
      title,
      description,
      url: `https://coolmathszone.com/worksheets/${grade}/${topic}`,
    },
  };
}

export default function TopicWorksheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}