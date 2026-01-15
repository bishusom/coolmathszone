// components/worksheets/WorksheetPreview.tsx - UPDATED
'use client';

import { useState } from 'react';
import { WorksheetProblem } from '@/utils/worksheetGenerator';

interface WorksheetPreviewProps {
  problems: WorksheetProblem[];
  grade: string;
  topic: string;
  showAnswers?: boolean;
}

export default function WorksheetPreview({ 
  problems, 
  grade, 
  topic,
  showAnswers = false 
}: WorksheetPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyWorksheetText = () => {
    const worksheetText = problems.map((p, i) => 
      `${i + 1}. ${p.question}${p.answer && showAnswers ? ` (Answer: ${p.answer})` : ''}`
    ).join('\n');
    
    navigator.clipboard.writeText(worksheetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format topic for display
  const formattedTopic = topic.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg print:shadow-none print:border print:border-gray-300">
      {/* Worksheet Header */}
      <div className="text-center mb-8 print:mb-4">
        <h1 className="text-3xl font-bold text-gray-800 print:text-2xl">
          {formattedTopic} Worksheet
        </h1>
        <div className="text-gray-600 mt-2">
          <span className="font-semibold">Grade:</span> {grade} • 
          <span className="font-semibold ml-2">Date:</span> {new Date().toLocaleDateString()} • 
          <span className="font-semibold ml-2">Problems:</span> {problems.length}
        </div>
        <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-3"></div>
      </div>

      {/* Problems Section */}
      <div className="space-y-8 print:space-y-6">
        {problems.map((problem, index) => (
          <div 
            key={index} 
            className="p-6 border-2 border-gray-200 rounded-xl print:p-4 print:border print:border-gray-300"
          >
            <div className="flex items-start">
              {/* Problem Number */}
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
              </div>
              
              {/* Problem Content */}
              <div className="flex-grow">
                <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-800 print:text-lg">
                    {problem.question}
                  </p>
                  
                  {/* Visual Aid */}
                  {problem.visualAid && (
                    <div className="my-4 text-4xl text-center print:my-2 print:text-3xl">
                      {problem.visualAid}
                    </div>
                  )}
                  
                  {/* Options */}
                  {problem.options && (
                    <div className="mt-4 grid grid-cols-2 gap-3 print:grid-cols-2 print:gap-2">
                      {problem.options.map((option, i) => (
                        <div 
                          key={i} 
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center print:p-2"
                        >
                          <span className="font-bold text-blue-600 mr-2">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Answer Space (only when answers are hidden) */}
                  {!showAnswers && (
                    <div className="mt-6 print:mt-4">
                      <div className="h-12 border-b-2 border-dashed border-gray-300"></div>
                      <p className="text-sm text-gray-500 mt-1 text-right">Show your work here</p>
                    </div>
                  )}
                </div>
                
                {/* Answer (only shown when showAnswers is true) */}
                {showAnswers && problem.answer && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <span className="text-green-600 font-bold mr-2">✅ Answer:</span>
                      <span className="text-gray-800 font-semibold">{problem.answer}</span>
                    </div>
                    {problem.hints && problem.hints.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Hint:</span> {problem.hints[0]}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Key Section (print only) */}
      <div className="hidden print:block mt-12 pt-8 border-t border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Answer Key</h2>
        <div className="grid grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <div key={index} className="text-sm">
              <span className="font-bold mr-2">{index + 1}.</span>
              <span>{problem.answer || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm print:mt-12">
        <p>Generated by CoolMathsZone • www.coolmathszone.com</p>
        <p className="mt-1">Practice makes perfect! 🌟</p>
      </div>
    </div>
  );
}