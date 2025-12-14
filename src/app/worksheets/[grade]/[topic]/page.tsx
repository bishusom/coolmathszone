'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { generateWorksheetProblems } from '@/utils/worksheetGenerator';
import WorksheetPreview from '@/components/worksheets/WorksheetPreview';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

interface PageProps {
  params: Promise<{
    grade: string;
    topic: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<{ title: string; description: string; alternates: { canonical: string } }> {
  const { grade, topic } = await params;
  const title = `Worksheets for ${topic} - ${grade} | CoolMathsZone`;
  const description = `Generate and download printable worksheets for ${topic} in ${grade}. Perfect for extra practice and offline learning.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://coolmathszone.com/worksheets/${grade}/${topic}`,
    },
  };
}

export default function TopicWorksheetPage({ params }: PageProps) {
  // Unwrap the params Promise using React.use()
  const { grade, topic } = use(params);
  const [worksheet, setWorksheet] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWorksheet = async () => {
    setIsGenerating(true);
    try {
      const problems = await generateWorksheetProblems(grade, topic);
      setWorksheet(problems);
    } catch (error) {
      console.error('Error generating worksheet:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href={`/worksheets/${grade}`} className="inline-block mb-6">
            <MagicButton className="text-lg">
              📄 Back to Worksheets
            </MagicButton>
          </Link>
          
          <h1 className="text-5xl font-black text-white mb-2">Worksheet Generator</h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Generate printable worksheets for practice
          </p>
        </div>

        {/* Generate Button */}
        <ContentCard className="p-8 text-center mb-8">
          <button
            onClick={generateWorksheet}
            disabled={isGenerating}
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 text-lg font-semibold"
          >
            {isGenerating ? '🔄 Generating Worksheet...' : '🎲 Generate Worksheet'}
          </button>
        </ContentCard>

        {/* Worksheet Preview */}
        {worksheet.length > 0 && (
          <WorksheetPreview 
            problems={worksheet} 
            grade={grade}
            topic={topic}
          />
        )}
      </div>
    </PageContainer>
  );
}