// components/DownloadWorksheet.tsx - UPDATED
'use client';

import { useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { WorksheetPDF } from './WorksheetPDF';
import { MagicButton } from '@/components/ui/PageContainer';

interface DownloadWorksheetProps {
  gradeId: string;
  topicId: string;
  problems: Array<{
    question: string;
    type: string;
    difficulty: string;
  }>;
  studentName?: string;
}

export default function DownloadWorksheet({ 
  gradeId, 
  topicId, 
  problems, 
  studentName 
}: DownloadWorksheetProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    // Reset after 3 seconds (PDF generation complete)
    setTimeout(() => setIsGenerating(false), 3000);
  };

  // Format filename
  const formatTopic = topicId.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  const filename = `coolmathszone-${gradeId}-${formatTopic.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <div>
      <BlobProvider
        document={
          <WorksheetPDF
            gradeId={gradeId}
            topicId={topicId}
            problems={problems}
            studentName={studentName}
          />
        }
      >
        {({ blob, url, loading, error }) => (
          <div>
            {!loading && blob && url ? (
              <a
                href={url}
                download={filename}
                onClick={handleDownload}
                className="block"
              >
                <MagicButton 
                  disabled={isGenerating} 
                  className={`w-full text-lg flex items-center justify-center gap-2 ${
                    isGenerating ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Creating PDF...
                    </>
                  ) : (
                    <>
                      📥 Download PDF
                    </>
                  )}
                </MagicButton>
              </a>
            ) : (
              <MagicButton disabled className="w-full text-lg bg-gradient-to-r from-gray-600 to-gray-700">
                {loading ? '📄 Preparing PDF...' : 'Error generating PDF'}
              </MagicButton>
            )}
          </div>
        )}
      </BlobProvider>
    </div>
  );
}