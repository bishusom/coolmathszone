// utils/exerciseGenerators/grades.ts - KEEP ONLY THESE

export interface ExerciseTemplate {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string;
  hints: string[];
  visualAid?: string;
}

export interface ExerciseSession {
  usedQuestions: Set<string>;
  getNextExercise: (grade: string, topic: string, currencyCode?: string) => Promise<ExerciseTemplate | null>;
}

// Helper function to ensure 4 distinct options
export function ensureFourOptions(correctAnswer: string, min: number = 1, max: number = 10): string[] {
  const options = new Set<string>();
  options.add(correctAnswer);
  
  while (options.size < 4) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    options.add(randomNum.toString());
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
}

export function getCompletionMessage(score: { correct: number; total: number }): string {
  const percentage = (score.correct / score.total) * 100;
  
  if (percentage === 100) {
    return 'Perfect! You got all questions right! 🎉';
  } else if (percentage >= 80) {
    return 'Excellent work! You\'re doing great! 🌟';
  } else if (percentage >= 60) {
    return 'Good job! Keep practicing! 👍';
  } else {
    return 'Nice try! Practice makes perfect! 💪';
  }
}

// Helper functions
export function getVisualAidForObjects(object1: string, object2: string): string {
  const visualMap: { [key: string]: string } = {
    'cows': '🐄', 'chickens': '🐔', 'dogs': '🐕', 'cats': '🐈', 
    'fish': '🐠', 'turtles': '🐢', 'birds': '🐦', 'butterflies': '🦋',
    'bees': '🐝', 'squirrels': '🐿️', 'puppies': '🐶',
    'balloons': '🎈', 'marbles': '🔴', 'crayons': '🖍️', 'stars': '⭐',
    'cars': '🚗', 'trucks': '🚚', 'books': '📚', 'cookies': '🍪',
    'toys': '🧸', 'stickers': '🏷️', 'cards': '🃏', 'coins': '🪙',
    'pencils': '✏️', 'chocolates': '🍫', 'cupcakes': '🧁', 'fruits': '🍎',
    'flowers': '🌼', 'students': '👨‍🎓', 'boys': '👦', 'girls': '👧', 'children': '👧👦'
  };

  const emoji1 = visualMap[object1] || '🤔';
  const emoji2 = visualMap[object2] || '🤔';
  
  return emoji1 === emoji2 ? emoji1 : `${emoji1}${emoji2}`;
}

export function getTimeInWords(hour: number, minute: number): string {
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 30) return `half past ${hour}`;
  if (minute === 45) return `quarter to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 5) return `five past ${hour}`;
  if (minute === 10) return `ten past ${hour}`;
  if (minute === 20) return `twenty past ${hour}`;
  if (minute === 25) return `twenty-five past ${hour}`;
  if (minute === 35) return `twenty-five to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 40) return `twenty to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 50) return `ten to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 55) return `five to ${hour + 1 > 12 ? 1 : hour + 1}`;
  return `${minute} minutes past ${hour}`;
}

// Enhanced question key generation for better uniqueness
export function generateQuestionKey(exercise: ExerciseTemplate, grade: string, topic: string): string {
  // Include ALL exercise properties for maximum uniqueness
  const sortedOptions = exercise.options ? [...exercise.options].sort().join('|') : '';
  const hintsKey = exercise.hints ? exercise.hints.join('|') : '';
  const visualAidKey = exercise.visualAid || '';
  const typeKey = exercise.type || '';
  
  // Create a comprehensive content string with timestamp for dynamic content
  const timestamp = Date.now().toString(36);
  const content = `${grade}-${topic}-${exercise.question}-${exercise.correctAnswer}-${sortedOptions}-${hintsKey}-${visualAidKey}-${typeKey}-${timestamp}`;
  
  return enhancedHash(content);
}

// Much better hash function for maximum uniqueness
function enhancedHash(str: string): string {
  let hash1 = 0;
  let hash2 = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = ((hash1 << 5) - hash1) + char;
    hash1 = hash1 & hash1;
    
    hash2 = ((hash2 << 7) - hash2) + char;
    hash2 = hash2 & hash2;
  }
  
  // Combine two different hash computations
  return Math.abs(hash1).toString(36) + Math.abs(hash2).toString(36) + str.length.toString(36);
}

// Better hash function for more unique keys
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36) + str.length.toString(36);
}