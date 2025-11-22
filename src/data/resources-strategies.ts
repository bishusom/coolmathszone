// src/data/resources-strategies.ts
export interface Strategy {
  name: string;
  description: string;
  example: string;
  emoji: string;
}

export interface ResourceData {
  title: string;
  emoji: string;
  description: string;
  color: string;
  strategies?: Strategy[];
  multiplicationTable?: number[];
}

export const resourceData: { [key: string]: ResourceData } = {
  'addition-strategies': {
    title: 'Addition Strategies',
    emoji: '➕',
    description: 'Learn different methods to master addition',
    color: 'from-green-500 to-emerald-500',
    strategies: [
      {
        name: 'Counting On',
        description: 'Start with the larger number and count up',
        example: '5 + 3: Start at 5, count up 3: 6, 7, 8 → Answer: 8',
        emoji: '5️⃣ → 6️⃣, 7️⃣, 8️⃣'
      },
      {
        name: 'Using Objects',
        description: 'Use physical objects like blocks or drawings',
        example: '4 + 2: Draw 4 apples 🍎🍎🍎🍎 + 2 more 🍎🍎 = 6 apples',
        emoji: '🍎🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎🍎'
      },
      {
        name: 'Number Line',
        description: 'Jump forward on a number line',
        example: '3 + 4: Start at 3 → jump 4 → land on 7',
        emoji: '[3]→(4)→[7]'
      },
      {
        name: 'Doubles Facts',
        description: 'Memorize special doubles combinations',
        example: '1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10',
        emoji: '✨ Double Power! ✨'
      },
      {
        name: 'Making Ten',
        description: 'Break numbers to make 10 first',
        example: '8 + 5 = (8 + 2) + 3 = 10 + 3 = 13',
        emoji: '8️⃣ + 5️⃣ = (8️⃣+2️⃣)+3️⃣ = 10️⃣+3️⃣ = 13️⃣'
      }
    ]
  },
  'subtraction-strategies': {
    title: 'Subtraction Strategies',
    emoji: '➖',
    description: 'Various techniques for subtraction problems',
    color: 'from-blue-500 to-cyan-500',
    strategies: [
      {
        name: 'Counting Back',
        description: 'Start with the first number and count backwards',
        example: '7 - 3: Start at 7, count back 3: 6, 5, 4 → Answer: 4',
        emoji: '7️⃣ ← 6️⃣, 5️⃣, 4️⃣'
      },
      {
        name: 'Using Objects',
        description: 'Remove objects from a group',
        example: '5 - 2: Start with 5 cookies 🍪🍪🍪🍪🍪, take away 2 → 3 left',
        emoji: '🍪🍪🍪🍪🍪 - 🍪🍪 = 🍪🍪🍪'
      },
      {
        name: 'Number Line',
        description: 'Jump backward on a number line',
        example: '9 - 4: Start at 9 ← jump 4 ← land on 5',
        emoji: '[9]←(4)←[5]'
      },
      {
        name: 'Related Facts',
        description: 'Use addition facts you know',
        example: '10 - 7: Think "7 + what = 10?" → 7 + 3 = 10, so answer is 3',
        emoji: '7️⃣ + ? = 10️⃣ → 3️⃣'
      },
      {
        name: 'Subtracting Zero',
        description: 'Special rule for subtracting zero',
        example: '8 - 0 = 8 (Any number minus zero is itself)',
        emoji: '8️⃣ - 0️⃣ = 8️⃣ (Magic!)'
      }
    ]
  },
  'multiplication-strategies': {
    title: 'Multiplication Strategies',
    emoji: '✖️',
    description: 'Master multiplication with fun methods',
    color: 'from-purple-500 to-pink-500',
    strategies: [
      {
        name: 'Repeated Addition',
        description: 'Add equal groups repeatedly',
        example: '3 × 4 = 4 + 4 + 4 = 12',
        emoji: '4️⃣ + 4️⃣ + 4️⃣ = 12️⃣'
      },
      {
        name: 'Arrays',
        description: 'Create rows and columns',
        example: '5 × 3 = 5 rows × 3 columns = 15 squares',
        emoji: '5 rows × 3 cols = 15'
      },
      {
        name: 'Skip Counting',
        description: 'Count by the multiplier',
        example: '6 × 4: Count by 4s six times: 4, 8, 12, 16, 20, 24',
        emoji: '4️⃣→8️⃣→12️⃣→16️⃣→20️⃣→24️⃣'
      },
      {
        name: 'Doubling',
        description: 'Double known facts',
        example: '4 × 6: 2 × 6 = 12, so 4 × 6 = 12 + 12 = 24',
        emoji: '2×6=12 → 4×6=24'
      },
      {
        name: 'Zero Property',
        description: 'Special rule for multiplying by zero',
        example: '7 × 0 = 0 (Any number times zero is zero)',
        emoji: '7️⃣ × 0️⃣ = 0️⃣ (Poof!)'
      }
    ]
  },
  'division-strategies': {
    title: 'Division Strategies',
    emoji: '➗',
    description: 'Learn division through different approaches',
    color: 'from-orange-500 to-red-500',
    strategies: [
      {
        name: 'Equal Sharing',
        description: 'Share equally into groups',
        example: '12 ÷ 3: Share 12 cookies among 3 friends → 4 each',
        emoji: '12🍪 ÷ 3 = 4🍪 each'
      },
      {
        name: 'Repeated Subtraction',
        description: 'Subtract the divisor repeatedly',
        example: '15 ÷ 5: 15-5=10 (1), 10-5=5 (2), 5-5=0 (3) → Answer: 3',
        emoji: '15 - 5 - 5 - 5=0 → 3 times'
      },
      {
        name: 'Using Multiplication Facts',
        description: 'Think of related multiplication',
        example: '24 ÷ 6: Think "What times 6 equals 24?" → 6 × 4 = 24',
        emoji: '6 × ? = 24 → 4'
      },
      {
        name: 'Arrays',
        description: 'Organize into rows/columns',
        example: '18 ÷ 3: 18 squares in 3 rows = 6 per row',
        emoji: '18 in 3 rows → 6 each'
      },
      {
        name: 'Dividing by One',
        description: 'Special rule for dividing by one',
        example: '9 ÷ 1 = 9 (Any number divided by 1 is itself)',
        emoji: '9️⃣ ÷ 1️⃣ = 9️⃣ (Easy!)'
      }
    ]
  },
  'multiplication-tables': {
    title: 'Multiplication Tables',
    emoji: '🔢',
    description: 'Quick reference for multiplication facts 2-19',
    color: 'from-indigo-500 to-purple-500',
    multiplicationTable: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  },
  'problem-solving': {
    title: 'Problem Solving',
    emoji: '🤔',
    description: 'Strategies for tackling word problems',
    color: 'from-yellow-500 to-amber-500',
    strategies: [
      {
        name: 'Understand the Problem',
        description: 'Read carefully and identify what is being asked',
        example: 'Underline key numbers and questions. What do you need to find?',
        emoji: '📖'
      },
      {
        name: 'Make a Plan',
        description: 'Choose the right strategy to solve the problem',
        example: 'Will you add, subtract, multiply, or divide? Draw a picture?',
        emoji: '📝'
      },
      {
        name: 'Solve Step by Step',
        description: 'Work through the problem carefully',
        example: 'Show your work and check each step as you go',
        emoji: '🔍'
      },
      {
        name: 'Check Your Answer',
        description: 'Verify that your solution makes sense',
        example: 'Does the answer seem reasonable? Try a different method to confirm',
        emoji: '✅'
      },
      {
        name: 'Look for Patterns',
        description: 'Identify repeating elements or relationships',
        example: 'Do numbers increase by the same amount? Is there a sequence?',
        emoji: '🔄'
      }
    ]
  },
  'study-tips': {
    title: 'Study Tips',
    emoji: '📚',
    description: 'Effective ways to learn and remember math',
    color: 'from-teal-500 to-blue-500',
    strategies: [
      {
        name: 'Daily Practice',
        description: 'Short, consistent practice sessions work best',
        example: 'Practice 15 minutes every day instead of 2 hours once a week',
        emoji: '📅'
      },
      {
        name: 'Use Flashcards',
        description: 'Create cards for quick fact practice',
        example: 'Make multiplication fact cards and quiz yourself regularly',
        emoji: '🎴'
      },
      {
        name: 'Math Games',
        description: 'Learn through fun and interactive games',
        example: 'Play math board games, online games, or create your own challenges',
        emoji: '🎮'
      },
      {
        name: 'Real-World Applications',
        description: 'Connect math to everyday situations',
        example: 'Practice fractions while cooking, money math while shopping',
        emoji: '🌍'
      },
      {
        name: 'Teach Someone Else',
        description: 'Explaining concepts helps you understand better',
        example: 'Teach a family member or friend what you learned today',
        emoji: '👨‍🏫'
      }
    ]
  },
  'fractions-decimals': {
    title: 'Fractions & Decimals',
    emoji: '½',
    description: 'Master fractions, decimals, and their relationships',
    color: 'from-pink-500 to-rose-500',
    strategies: [
      {
        name: 'Visual Fractions',
        description: 'Use pictures to understand fraction parts',
        example: 'Draw circles divided into equal parts to see 1/4, 1/2, 3/4',
        emoji: '🎨'
      },
      {
        name: 'Equivalent Fractions',
        description: 'Find different fractions that equal the same amount',
        example: '1/2 = 2/4 = 3/6 = 4/8 - they all represent half',
        emoji: '🟰'
      },
      {
        name: 'Fraction to Decimal',
        description: 'Convert fractions to decimal numbers',
        example: '1/4 = 0.25, 1/2 = 0.5, 3/4 = 0.75',
        emoji: '➡️'
      },
      {
        name: 'Comparing Fractions',
        description: 'Determine which fraction is larger or smaller',
        example: '1/3 vs 1/4: When divided into more pieces, each piece is smaller',
        emoji: '⚖️'
      },
      {
        name: 'Real-World Fractions',
        description: 'Apply fractions to everyday situations',
        example: 'Pizza slices (1/8), measuring cups (1/4 cup), time (quarter hour)',
        emoji: '🍕'
      }
    ]
  }
};

// Helper function to generate multiplication table for a number
export function generateMultiplicationTable(number: number): { multiplier: number; result: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    multiplier: i + 1,
    result: number * (i + 1)
  }));
}

// All multiplication tables 2-19
export const allMultiplicationTables = resourceData['multiplication-tables'].multiplicationTable!.map(num => ({
  number: num,
  table: generateMultiplicationTable(num)
}));