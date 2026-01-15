// app/worksheets/[grade]/[topic]/client-page.tsx - UPDATED
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateWorksheetProblems } from '@/utils/worksheetGenerator';
import WorksheetPreview from '@/components/worksheets/WorksheetPreview';
import DownloadWorksheet from '@/components/worksheets/DownloadWorksheet';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

interface TopicWorksheetClientProps {
  grade: string;
  gradeDisplay: string;
  topic: string;
  topicDisplay: string;
  initialWorksheet: any[];
}

export default function TopicWorksheetClient({ 
  grade,
  gradeDisplay,
  topic,
  topicDisplay,
  initialWorksheet 
}: TopicWorksheetClientProps) {
  const [worksheet, setWorksheet] = useState<any[]>(initialWorksheet);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const generateNewWorksheet = async () => {
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

  // Transform problems for PDF format
  const pdfProblems = worksheet.map(problem => ({
    question: problem.question,
    type: problem.type || topic,
    difficulty: problem.difficulty || 'medium'
  }));

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href={`/worksheets/${grade}`} className="inline-block mb-4">
            <MagicButton className="text-lg">
              📄 Back to {gradeDisplay} Worksheets
            </MagicButton>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            {topicDisplay} Worksheet
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Printable worksheet for {gradeDisplay}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Generate New Worksheet */}
          <ContentCard className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Generate New</h3>
            <button
              onClick={generateNewWorksheet}
              disabled={isGenerating}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-lg font-semibold w-full flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">🔄</span>
                  Generating...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Generate New
                </>
              )}
            </button>
            <p className="text-white/70 text-sm mt-2">
              Create fresh problems
            </p>
          </ContentCard>
          
          {/* Download PDF */}
          <ContentCard className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Download PDF</h3>
            <DownloadWorksheet 
              gradeId={grade}
              topicId={topic}
              problems={pdfProblems}
            />
          </ContentCard>
          
          {/* Toggle Answers */}
          <ContentCard className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Answer Key</h3>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 text-lg font-semibold w-full flex items-center justify-center gap-2"
            >
              {showAnswers ? '🙈 Hide Answers' : '👁️ Show Answers'}
            </button>
            <p className="text-white/70 text-sm mt-2">
              {showAnswers ? 'Answers are visible' : 'Answers are hidden'}
            </p>
          </ContentCard>
        </div>

        {/* Worksheet Count and Info */}
        <div className="flex justify-between items-center mb-4 text-white">
          <div className="text-lg">
            <span className="font-bold">{worksheet.length}</span> problems generated
          </div>
          <div className="text-sm text-white/70">
            Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>

        {/* Worksheet Preview - Now always visible */}
        <WorksheetPreview 
          problems={worksheet} 
          grade={grade}
          topic={topic}
          showAnswers={showAnswers}
          key={worksheet.length} // Force re-render on new generation
        />

        {/* Quick Navigation */}
        <ContentCard className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">More Worksheets</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/worksheets/${grade}/addition`}>
              <MagicButton className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600">
                ➕ Addition
              </MagicButton>
            </Link>
            <Link href={`/worksheets/${grade}/subtraction`}>
              <MagicButton className="text-sm bg-gradient-to-r from-green-600 to-emerald-600">
                ➖ Subtraction
              </MagicButton>
            </Link>
            <Link href={`/worksheets/${grade}/multiplication`}>
              <MagicButton className="text-sm bg-gradient-to-r from-orange-600 to-red-600">
                ✖️ Multiplication
              </MagicButton>
            </Link>
            <Link href={`/worksheets/${grade}/division`}>
              <MagicButton className="text-sm bg-gradient-to-r from-purple-600 to-pink-600">
                ➗ Division
              </MagicButton>
            </Link>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}