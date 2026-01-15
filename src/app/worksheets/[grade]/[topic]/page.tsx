// app/worksheets/[grade]/[topic]/page.tsx - NEW SERVER COMPONENT
import { generateWorksheetProblems } from '@/utils/worksheetGenerator';
import TopicWorksheetClient from './client-page';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    grade: string;
    topic: string;
  }>;
}

export default async function TopicWorksheetPage({ params }: PageProps) {
  const { grade, topic } = await params;
  
  try {
    // Generate worksheet immediately on server
    const initialWorksheet = await generateWorksheetProblems(grade, topic);
    
    // Format topic for display
    const formattedTopic = topic.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
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