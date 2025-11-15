// src/utils/questionGenerators.ts

// Grade 1 Question Generators
export const generateGrade1OperationsQuestion = () => {
  const types = ['addition', 'subtraction', 'missing-addend'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'addition':
      const add1 = Math.floor(Math.random() * 10) + 5;
      const add2 = Math.floor(Math.random() * 10) + 5;
      return {
        question: `${add1} + ${add2} = ?`,
        answer: add1 + add2,
        options: generateOptions(add1 + add2, 20)
      };
    
    case 'subtraction':
      const sub1 = Math.floor(Math.random() * 15) + 10;
      const sub2 = Math.floor(Math.random() * (sub1 - 5)) + 5;
      return {
        question: `${sub1} - ${sub2} = ?`,
        answer: sub1 - sub2,
        options: generateOptions(sub1 - sub2, 20)
      };
    
    case 'missing-addend':
      const total = Math.floor(Math.random() * 15) + 10;
      const known = Math.floor(Math.random() * (total - 1)) + 1;
      return {
        question: `${known} + ? = ${total}`,
        answer: total - known,
        options: generateOptions(total - known, 20)
      };
  }
};

export const generateGrade1PlaceValueQuestion = () => {
  const number = Math.floor(Math.random() * 90) + 10;
  const tens = Math.floor(number / 10);
  const ones = number % 10;
  
  const types = ['tens-ones', 'value', 'comparison'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'tens-ones':
      return {
        question: `How many tens and ones in ${number}?`,
        answer: `${tens} tens and ${ones} ones`,
        options: [
          `${tens} tens and ${ones} ones`,
          `${ones} tens and ${tens} ones`,
          `${tens + 1} tens and ${ones} ones`,
          `${tens} tens and ${ones + 1} ones`
        ]
      };
    
    case 'value':
      const place = Math.random() > 0.5 ? 'tens' : 'ones';
      const value = place === 'tens' ? tens : ones;
      return {
        question: `What is the ${place} place digit in ${number}?`,
        answer: value,
        options: generateOptions(value, 10)
      };
  }
};

// Grade 2 Question Generators
export const generateGrade2OperationsQuestion = () => {
  const types = ['addition', 'subtraction', 'two-step', 'arrays'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'addition':
      const add1 = Math.floor(Math.random() * 50) + 25;
      const add2 = Math.floor(Math.random() * 50) + 25;
      return {
        question: `${add1} + ${add2} = ?`,
        answer: add1 + add2,
        options: generateOptions(add1 + add2, 100)
      };
    
    case 'subtraction':
      const sub1 = Math.floor(Math.random() * 80) + 20;
      const sub2 = Math.floor(Math.random() * (sub1 - 10)) + 10;
      return {
        question: `${sub1} - ${sub2} = ?`,
        answer: sub1 - sub2,
        options: generateOptions(sub1 - sub2, 100)
      };
    
    case 'two-step':
      const step1 = Math.floor(Math.random() * 30) + 20;
      const step2 = Math.floor(Math.random() * 20) + 10;
      const step3 = Math.floor(Math.random() * 15) + 5;
      return {
        question: `Start with ${step1}, add ${step2}, then subtract ${step3}. What's the result?`,
        answer: step1 + step2 - step3,
        options: generateOptions(step1 + step2 - step3, 100)
      };
    
    case 'arrays':
      const rows = Math.floor(Math.random() * 4) + 2;
      const cols = Math.floor(Math.random() * 4) + 2;
      return {
        question: `An array has ${rows} rows and ${cols} columns. How many total items?`,
        answer: rows * cols,
        options: generateOptions(rows * cols, 25)
      };
  }
};

export const generateGrade2PlaceValueQuestion = () => {
  const number = Math.floor(Math.random() * 900) + 100;
  const hundreds = Math.floor(number / 100);
  const tens = Math.floor((number % 100) / 10);
  const ones = number % 10;
  
  const types = ['hundreds-tens-ones', 'value', 'comparison', 'skip-counting'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch (type) {
    case 'hundreds-tens-ones':
      return {
        question: `How many hundreds, tens, and ones in ${number}?`,
        answer: `${hundreds} hundreds, ${tens} tens, ${ones} ones`,
        options: [
          `${hundreds} hundreds, ${tens} tens, ${ones} ones`,
          `${tens} hundreds, ${hundreds} tens, ${ones} ones`,
          `${hundreds} hundreds, ${ones} tens, ${tens} ones`,
          `${ones} hundreds, ${tens} tens, ${hundreds} ones`
        ]
      };
    
    case 'value':
      const places = ['hundreds', 'tens', 'ones'];
      const place = places[Math.floor(Math.random() * places.length)];
      const value = place === 'hundreds' ? hundreds : place === 'tens' ? tens : ones;
      return {
        question: `What is the ${place} place digit in ${number}?`,
        answer: value,
        options: generateOptions(value, 10)
      };
    
    case 'skip-counting':
      const skipBy = [5, 10, 100][Math.floor(Math.random() * 3)];
      const start = Math.floor(Math.random() * 100) + 1;
      const position = Math.floor(Math.random() * 3) + 1;
      const missingNumber = start + (skipBy * position);
      return {
        question: `Complete the pattern: ${start}, ${start + skipBy}, ?, ${start + skipBy * 3}`,
        answer: missingNumber,
        options: generateOptions(missingNumber, 400)
      };
  }
};

// Kindergarten Question Generators
export const generateKindergartenCountingQuestion = () => {
  const count = Math.floor(Math.random() * 15) + 5;
  const objects = ['🐟', '🐚', '⭐', '🐢', '🦀'];
  const object = objects[Math.floor(Math.random() * objects.length)];
  
  return {
    question: `How many ${object} do you see?`,
    answer: count,
    options: generateOptions(count, 20),
    visual: object.repeat(count)
  };
};

export const generateKindergartenComparisonQuestion = () => {
  const leftCount = Math.floor(Math.random() * 10) + 1;
  const rightCount = Math.floor(Math.random() * 10) + 1;
  
  let correctAnswer: 'left' | 'right' | 'equal';
  if (leftCount > rightCount) {
    correctAnswer = 'left';
  } else if (rightCount > leftCount) {
    correctAnswer = 'right';
  } else {
    correctAnswer = 'equal';
  }

  return {
    visual: {
      left: '🎈'.repeat(leftCount),
      right: '🎈'.repeat(rightCount)
    },
    correctAnswer
  };
};

// Helper function to generate plausible wrong options
const generateOptions = (correctAnswer: number, max: number) => {
  const options = new Set<number>([correctAnswer]);
  
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const wrongAnswer = correctAnswer + (offset * direction);
    
    if (wrongAnswer >= 0 && wrongAnswer <= max && wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
};