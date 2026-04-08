export type MathProblem = {
  question: string;
  answer: number;
  options: number[];
};

export const generateProblem = (score: number): MathProblem => {
  let a: number, b: number, answer: number, question: string;
  let operator: '+' | '-' | '×' | '÷';

  // --- DIFFICULTY GATES ---
  
  if (score < 1000) {
    // Phase 1: Simple Addition (0-1000 score)
    operator = '+';
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
    answer = a + b;
    question = `${a} + ${b}`;

  } else if (score < 3000) {
    // Phase 2: Add Subtraction (1000-3000 score)
    const type = Math.random() > 0.5 ? '+' : '-';
    operator = type;
    a = Math.floor(Math.random() * 20) + 5;
    b = Math.floor(Math.random() * a) + 1; // Ensure no negative results for kids
    answer = operator === '+' ? a + b : a - b;
    question = `${a} ${operator} ${b}`;

  } else if (score < 6000) {
    // Phase 3: Add Multiplication (3000-6000 score)
    const rand = Math.random();
    if (rand < 0.3) {
      operator = '+'; a = Math.floor(Math.random() * 50); b = Math.floor(Math.random() * 50);
    } else if (rand < 0.6) {
      operator = '-'; a = Math.floor(Math.random() * 50); b = Math.floor(Math.random() * a);
    } else {
      operator = '×'; a = Math.floor(Math.random() * 10) + 1; b = Math.floor(Math.random() * 10) + 1;
    }
    answer = operator === '+' ? a + b : operator === '-' ? a - b : a * b;
    question = `${a} ${operator} ${b}`;

  } else {
    // Phase 4: Full Chaos - Add Division (6000+ score)
    const types: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
    operator = types[Math.floor(Math.random() * types.length)];

    if (operator === '÷') {
      b = Math.floor(Math.random() * 10) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      a = b * answer; // Ensures whole number results
    } else if (operator === '×') {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      answer = a * b;
    } else {
      a = Math.floor(Math.random() * 100);
      b = Math.floor(Math.random() * 100);
      answer = operator === '+' ? a + b : Math.abs(a - b);
      if (operator === '-') a = Math.max(a, b), b = Math.min(a, b);
    }
    question = `${a} ${operator} ${b}`;
  }

  // --- DISTRACTOR GENERATION ---
  // Generates 2 wrong answers that are close to the right one to keep it challenging
  const options = new Set<number>([answer]);
  while (options.size < 3) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const distractor = Math.random() > 0.5 ? answer + offset : answer - offset;
    if (distractor >= 0) options.add(distractor);
  }

  return {
    question,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
};