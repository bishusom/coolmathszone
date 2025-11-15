// components/DownloadWorksheet.tsx
'use client';

import { useState } from 'react';
import { pdf, BlobProvider } from '@react-pdf/renderer';
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

  const handleDownload = async () => {
    setIsGenerating(true);
    // The download will be handled by BlobProvider
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="text-center">
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
            {!loading && blob && url && (
              <a
                href={url}
                download={`${gradeId}-${topicId}-worksheet.pdf`}
                onClick={handleDownload}
              >
                <MagicButton disabled={isGenerating} className="text-lg">
                  {isGenerating ? '📄 Generating...' : '📥 Download PDF Worksheet'}
                </MagicButton>
              </a>
            )}
            {loading && (
              <MagicButton disabled className="text-lg">
                ⏳ Preparing Worksheet...
              </MagicButton>
            )}
            {error && (
              <div className="text-red-400">
                Error generating worksheet. Please try again.
              </div>
            )}
          </div>
        )}
      </BlobProvider>
      
      <p className="text-white/60 mt-2 text-sm">
        Printable worksheet with problems and answer space
      </p>
    </div>
  );
}