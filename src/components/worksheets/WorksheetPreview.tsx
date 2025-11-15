'use client';

import { WorksheetProblem } from '@/utils/worksheetGenerator';

interface WorksheetPreviewProps {
  problems: WorksheetProblem[];
  grade: string;
  topic: string;
}

export default function WorksheetPreview({ problems, grade, topic }: WorksheetPreviewProps) {
  const downloadWorksheet = () => {
    const worksheetContent = `
      Math Worksheet - ${grade} - ${topic}
      Generated on: ${new Date().toLocaleDateString()}
      
      ${problems.map((problem, index) => `
      ${index + 1}. ${problem.question}
         ${problem.options ? `Options: ${problem.options.join(', ')}` : ''}
         Answer: ${problem.answer || 'See solutions'}
         ${problem.hints ? `Hint: ${problem.hints[0]}` : ''}
      `).join('\n')}
      
      Solutions:
      ${problems.map((problem, index) => `${index + 1}. ${problem.answer || 'N/A'}`).join('\n')}
    `;

    const blob = new Blob([worksheetContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worksheet-${grade}-${topic}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Worksheet Preview</h2>
        <button
          onClick={downloadWorksheet}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Download Worksheet
        </button>
      </div>
      
      <div className="space-y-4">
        {problems.map((problem, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p className="font-semibold">{index + 1}. {problem.question}</p>
            {problem.visualAid && (
              <div className="my-2 text-2xl">{problem.visualAid}</div>
            )}
            {problem.options && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Options: {problem.options.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}