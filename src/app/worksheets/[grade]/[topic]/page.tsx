// app/worksheets/[grade]/[topic]/page.tsx - NEW SERVER COMPONENT
import type { Metadata } from 'next';
import { generateWorksheetProblems } from '@/utils/worksheetGenerator';
import TopicWorksheetClient from './client-page';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    grade: string;
    topic: string;
  }>;
}

import { getMetadataAlternates, getCanonicalUrl } from '@/utils/seo';

function formatTopic(topic: string) {
  if (!topic) return '';
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade, topic } = await params;
  const formattedTopic = formatTopic(topic);
  const title = `${formattedTopic} Worksheets - Grade ${grade} | CoolMathsZone`;
  const description = `Generate and download printable ${formattedTopic} worksheets for Grade ${grade}. Perfect for extra practice and offline learning.`;

  return {
    title,
    description,
    alternates: getMetadataAlternates(`worksheets/${grade}/${topic}`),
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(`worksheets/${grade}/${topic}`),
    },
  };
}

export default async function TopicWorksheetPage({ params }: PageProps) {
  const { grade, topic } = await params;
  
  try {
    // Generate worksheet immediately on server
    const initialWorksheet = await generateWorksheetProblems(grade, topic);
    
    // Format topic for display
    const formattedTopic = formatTopic(topic);
      
    // Get grade display name
    const gradeDisplay = grade === 'kindergarten' ? 'Kindergarten' : 
                       grade.startsWith('grade') ? `Grade ${grade.replace('grade', '')}` : 
                       grade.charAt(0).toUpperCase() + grade.slice(1);

    return (
      <TopicWorksheetClient 
        grade={grade}
        gradeDisplay={gradeDisplay}
        topic={topic}
        topicDisplay={formattedTopic}
        initialWorksheet={initialWorksheet}
      />
    );
  } catch (error) {
    console.error('Error generating worksheet:', error);
    notFound();
  }
}
