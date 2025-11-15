// utils/worksheetGenerator.ts
import { generateExercises } from '@/utils/exerciseGenerators/index';

export interface WorksheetProblem {
  question: string;
  type: string;
  difficulty: string;
  answer?: string;
  options?: string[];
  hints?: string[];
  visualAid?: string;
}

export async function generateWorksheetProblems(gradeId: string, topicId: string, currencyCode?: string): Promise<WorksheetProblem[]> {
  try {
    // Generate exercises using your existing exercise generators
    const exercises = await generateExercises(gradeId, topicId, 10, currencyCode);
    
    // Convert ExerciseTemplate to WorksheetProblem
    const worksheetProblems: WorksheetProblem[] = exercises.map(exercise => ({
      question: exercise.question,
      type: exercise.type,
      difficulty: getDifficultyFromGrade(gradeId),
      answer: exercise.correctAnswer,
      options: exercise.options,
      hints: exercise.hints,
      visualAid: exercise.visualAid
    }));
    
    return worksheetProblems;
  } catch (error) {
    console.error('Error generating worksheet problems:', error);
    
    // Fallback to basic math problems if exercise generation fails
    return generateBasicMathProblems(gradeId);
  }
}

function getDifficultyFromGrade(gradeId: string): string {
  const difficultyMap: { [key: string]: string } = {
    'kindergarten': 'beginner',
    'grade1': 'beginner',
    'grade2': 'beginner',
    'grade3': 'intermediate',
    'grade4': 'intermediate',
    'grade5': 'advanced',
    'grade6': 'advanced',
    'grade7': 'advanced',
    'grade8': 'advanced'
  };
  
  return difficultyMap[gradeId] || 'beginner';
}

// Keep the original functions as fallbacks
function generateMultiplicationProblems(gradeId: string): WorksheetProblem[] {
  const problems: WorksheetProblem[] = [];
  
  for (let i = 0; i < 10; i++) {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    
    problems.push({
      question: `${num1} × ${num2} = ?`,
      type: 'multiplication',
      difficulty: 'beginner',
      answer: (num1 * num2).toString()
    });
  }
  
  return problems;
}

function generateAdditionProblems(gradeId: string): WorksheetProblem[] {
  const problems: WorksheetProblem[] = [];
  const maxNumber = gradeId === 'grade1' ? 20 : gradeId === 'grade2' ? 100 : 1000;
  
  for (let i = 0; i < 10; i++) {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    
    problems.push({
      question: `${num1} + ${num2} = ?`,
      type: 'addition',
      difficulty: 'beginner',
      answer: (num1 + num2).toString()
    });
  }
  
  return problems;
}

function generateFractionProblems(gradeId: string): WorksheetProblem[] {
  const problems: WorksheetProblem[] = [];
  const fractions = ['½', '⅓', '¼', '⅔', '¾', '⅛'];
  
  for (let i = 0; i < 8; i++) {
    const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
    const frac2 = fractions[Math.floor(Math.random() * fractions.length)];
    
    problems.push({
      question: `Shade ${frac1} of the circle below:`,
      type: 'fraction-visual',
      difficulty: 'intermediate'
    });
  }
  
  return problems;
}

function generateGeometryProblems(gradeId: string): WorksheetProblem[] {
  return [
    {
      question: "Calculate the area of a rectangle with length 8cm and width 5cm",
      type: 'area',
      difficulty: 'intermediate',
      answer: '40 cm²'
    },
    {
      question: "How many sides does a hexagon have?",
      type: 'shape-properties',
      difficulty: 'beginner',
      answer: '6'
    },
    {
      question: "Draw a triangle with all sides equal",
      type: 'drawing',
      difficulty: 'beginner'
    }
  ];
}

function generateBasicMathProblems(gradeId: string): WorksheetProblem[] {
  const problems: WorksheetProblem[] = [];
  const operations = ['+', '-', '×', '÷'];
  
  for (let i = 0; i < 12; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    let question = '';
    let answer = '';
    
    switch (operation) {
      case '+':
        question = `${num1} + ${num2} = ?`;
        answer = (num1 + num2).toString();
        break;
      case '-':
        question = `${num1 + num2} - ${num2} = ?`;
        answer = num1.toString();
        break;
      case '×':
        question = `${num1} × ${num2} = ?`;
        answer = (num1 * num2).toString();
        break;
      case '÷':
        question = `${num1 * num2} ÷ ${num1} = ?`;
        answer = num2.toString();
        break;
    }
    
    problems.push({
      question,
      type: 'mixed',
      difficulty: 'beginner',
      answer
    });
  }
  
  return problems;
}

// Additional utility function to generate worksheets with specific counts
export async function generateCustomWorksheet(
  gradeId: string, 
  topicId: string, 
  problemCount: number = 10,
  currencyCode?: string
): Promise<WorksheetProblem[]> {
  try {
    const exercises = await generateExercises(gradeId, topicId, problemCount, currencyCode);
    
    return exercises.map(exercise => ({
      question: exercise.question,
      type: exercise.type,
      difficulty: getDifficultyFromGrade(gradeId),
      answer: exercise.correctAnswer,
      options: exercise.options,
      hints: exercise.hints,
      visualAid: exercise.visualAid
    }));
  } catch (error) {
    console.error('Error generating custom worksheet:', error);
    return [];
  }
}