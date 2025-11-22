// src/data/resources.ts
export interface ResourceCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  topics: string[];
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'addition-strategies',
    title: 'Addition Strategies',
    emoji: '➕',
    description: 'Learn different methods to master addition',
    color: 'from-green-500 to-emerald-500',
    topics: ['Counting On', 'Using Objects', 'Number Line', 'Doubles Facts', 'Making Ten']
  },
  {
    id: 'subtraction-strategies',
    title: 'Subtraction Strategies',
    emoji: '➖',
    description: 'Various techniques for subtraction problems',
    color: 'from-blue-500 to-cyan-500',
    topics: ['Counting Back', 'Using Objects', 'Number Line', 'Related Facts', 'Subtracting Zero']
  },
  {
    id: 'multiplication-strategies',
    title: 'Multiplication Strategies',
    emoji: '✖️',
    description: 'Master multiplication with fun methods',
    color: 'from-purple-500 to-pink-500',
    topics: ['Repeated Addition', 'Arrays', 'Skip Counting', 'Doubling', 'Zero Property']
  },
  {
    id: 'division-strategies',
    title: 'Division Strategies',
    emoji: '➗',
    description: 'Learn division through different approaches',
    color: 'from-orange-500 to-red-500',
    topics: ['Equal Sharing', 'Repeated Subtraction', 'Multiplication Facts', 'Arrays', 'Dividing by One']
  },
  {
    id: 'multiplication-tables',
    title: 'Multiplication Tables',
    emoji: '🔢',
    description: 'Quick reference for multiplication facts 2-19',
    color: 'from-indigo-500 to-purple-500',
    topics: ['Tables 2-12', 'Tables 13-19', 'Quick Facts', 'Practice Drills']
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    emoji: '🤔',
    description: 'Strategies for tackling word problems',
    color: 'from-yellow-500 to-amber-500',
    topics: ['Understand the Problem', 'Make a Plan', 'Solve', 'Check Your Work']
  },
  {
    id: 'study-tips',
    title: 'Study Tips',
    emoji: '📚',
    description: 'Effective ways to learn and remember math',
    color: 'from-teal-500 to-blue-500',
    topics: ['Daily Practice', 'Flashcards', 'Math Games', 'Real-World Applications']
  },
  {
    id: 'fractions-decimals',
    title: 'Fractions & Decimals',
    emoji: '½',
    description: 'Master fractions, decimals, and their relationships',
    color: 'from-pink-500 to-rose-500',
    topics: ['Visual Fractions', 'Equivalent Fractions', 'Comparing', 'Real-World Use']
  }
];