// utils/exerciseGenerators/grade4.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { getCurrency } from '@/utils/currencyHelper';

export const grade4Generators = {
  'place-value': (): ExerciseTemplate => {
    const numberRanges = [
      { min: 1000, max: 9999, places: ['thousands', 'hundreds', 'tens', 'ones'] },
      { min: 10000, max: 99999, places: ['ten thousands', 'thousands', 'hundreds', 'tens', 'ones'] },
      { min: 100000, max: 999999, places: ['hundred thousands', 'ten thousands', 'thousands', 'hundreds', 'tens', 'ones'] }
    ];
    
    const range = numberRanges[Math.floor(Math.random() * numberRanges.length)];
    const number = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const place = range.places[Math.floor(Math.random() * range.places.length)];
    const placeIndex = range.places.indexOf(place);
    
    let correctValue = '';
    let divisor = Math.pow(10, range.places.length - 1 - placeIndex);
    correctValue = Math.floor((number / divisor) % 10).toString();
    
    const questionVariations = [
      `What is the value of the ${place} place in ${number.toLocaleString()}?`,
      `In the number ${number.toLocaleString()}, what digit is in the ${place} place?`,
      `Identify the ${place} place digit in ${number.toLocaleString()}`,
      `Which digit represents the ${place} in ${number.toLocaleString()}?`
    ];
    
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    const options = ensureFourOptions(correctValue, 0, 9);
    
    return {
      id: `placeval-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctValue,
      hints: [
        `Count the places from right to left: ones, tens, hundreds...`,
        `The ${place} place is ${range.places.length - 1 - placeIndex} places from the right`
      ],
      visualAid: '🔢'
    };
  },

  'multi-digit': (): ExerciseTemplate => {
    const operations = [
      { symbol: '+', name: 'addition', range1: [100, 999], range2: [100, 999] },
      { symbol: '-', name: 'subtraction', range1: [500, 999], range2: [100, 499] },
      { symbol: '×', name: 'multiplication', range1: [10, 99], range2: [2, 9] },
      { symbol: '÷', name: 'division', range1: [20, 100], range2: [2, 9] }
    ];
    
    const op = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * (op.range1[1] - op.range1[0] + 1)) + op.range1[0];
    const num2 = Math.floor(Math.random() * (op.range2[1] - op.range2[0] + 1)) + op.range2[0];
    
    let question = '';
    let correctAnswer = '';
    let calculation = 0;
    
    if (op.symbol === '+') {
      calculation = num1 + num2;
      question = `${num1.toLocaleString()} + ${num2.toLocaleString()} = ?`;
    } else if (op.symbol === '-') {
      calculation = num1 - num2;
      question = `${num1.toLocaleString()} - ${num2.toLocaleString()} = ?`;
    } else if (op.symbol === '×') {
      calculation = num1 * num2;
      question = `${num1} × ${num2} = ?`;
    } else {
      calculation = Math.floor(num1 / num2);
      const remainder = num1 % num2;
      question = `${num1} ÷ ${num2} = ?`;
      correctAnswer = remainder === 0 ? calculation.toString() : `${calculation} remainder ${remainder}`;
    }
    
    if (op.symbol !== '÷') {
      correctAnswer = calculation.toString();
    }
    
    const maxVal = Math.max(calculation * 2, 1000);
    const options = ensureFourOptions(correctAnswer, Math.floor(calculation * 0.5), maxVal);
    
    const hints = {
      '+': ['Add the ones place first, then tens, then hundreds', 'Remember to carry over when sum is 10 or more'],
      '-': ['Subtract the ones place first', 'Borrow from the next place when needed'],
      '×': ['Multiply the ones place first', 'Add a zero when multiplying by tens'],
      '÷': ['How many times does the divisor fit into the dividend?', 'Check your multiplication facts']
    };
    
    return {
      id: `multidigit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: hints[op.symbol as keyof typeof hints],
      visualAid: '🦑'
    };
  },

  'fractions': (): ExerciseTemplate => {
    const fractionTypes = [
      { type: 'addition', denomRange: [2, 8] },
      { type: 'subtraction', denomRange: [2, 8] },
      { type: 'multiplication', denomRange: [2, 5] },
      { type: 'equivalent', denomRange: [2, 6] }
    ];
    
    const fracType = fractionTypes[Math.floor(Math.random() * fractionTypes.length)];
    const denominator = Math.floor(Math.random() * (fracType.denomRange[1] - fracType.denomRange[0] + 1)) + fracType.denomRange[0];
    
    let question = '';
    let correctAnswer = '';
    let options: string[] = [];
    
    if (fracType.type === 'addition') {
      const num1 = Math.floor(Math.random() * (denominator - 1)) + 1;
      const num2 = Math.floor(Math.random() * (denominator - 1)) + 1;
      const sum = num1 + num2;
      
      question = `${num1}/${denominator} + ${num2}/${denominator} = ?`;
      correctAnswer = sum <= denominator ? `${sum}/${denominator}` : `${sum - denominator} ${denominator - (sum - denominator)}/${denominator}`;
      
      options = [
        correctAnswer,
        `${num1 + num2}/${denominator * 2}`,
        `${Math.abs(num1 - num2)}/${denominator}`,
        `${num1 * num2}/${denominator}`
      ];
    } else if (fracType.type === 'subtraction') {
      const num1 = Math.floor(Math.random() * (denominator - 1)) + 2;
      const num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      
      question = `${num1}/${denominator} - ${num2}/${denominator} = ?`;
      correctAnswer = `${num1 - num2}/${denominator}`;
      
      options = [
        correctAnswer,
        `${num1 + num2}/${denominator}`,
        `${num1 - num2}/${denominator * 2}`,
        `${num2}/${denominator}`
      ];
    } else if (fracType.type === 'multiplication') {
      const wholeNumber = Math.floor(Math.random() * 4) + 2; // 2-5
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      
      question = `${wholeNumber} × ${numerator}/${denominator} = ?`;
      const product = wholeNumber * numerator;
      correctAnswer = product <= denominator ? `${product}/${denominator}` : `${Math.floor(product / denominator)} ${product % denominator}/${denominator}`;
      
      options = [
        correctAnswer,
        `${wholeNumber * numerator}/${denominator * wholeNumber}`,
        `${wholeNumber + numerator}/${denominator}`,
        `${numerator}/${denominator * wholeNumber}`
      ];
    } else {
      // Equivalent fractions
      const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
      const multiplier = Math.floor(Math.random() * 3) + 2; // 2-4
      
      question = `Which fraction is equivalent to ${numerator}/${denominator}?`;
      correctAnswer = `${numerator * multiplier}/${denominator * multiplier}`;
      
      options = [
        correctAnswer,
        `${numerator + 1}/${denominator + 1}`,
        `${numerator - 1}/${denominator - 1}`,
        `${numerator * 2}/${denominator}`
      ].filter(opt => !opt.includes('0/') && !opt.includes('/0'));
    }
    
    return {
      id: `frac4-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: correctAnswer,
      hints: [
        "Remember: when adding/subtracting, denominators must be the same",
        "To multiply fraction by whole number, multiply numerator only",
        "Equivalent fractions have the same value but different numbers"
      ],
      visualAid: '🪸'
    };
  },

  'decimals': (): ExerciseTemplate => {
    const decimalTypes = [
      { type: 'fraction-conversion', places: 1 },
      { type: 'fraction-conversion', places: 2 },
      { type: 'comparison', places: 1 },
      { type: 'addition', places: 1 }
    ];
    
    const decType = decimalTypes[Math.floor(Math.random() * decimalTypes.length)];
    
    let question = '';
    let correctAnswer = '';
    let options: string[] = [];
    
    if (decType.type === 'fraction-conversion') {
      const whole = Math.floor(Math.random() * 5); // 0-4
      const decimalPart = Math.floor(Math.random() * Math.pow(10, decType.places));
      const decimalValue = whole + decimalPart / Math.pow(10, decType.places);
      
      question = `What is ${decimalValue.toFixed(decType.places)} as a fraction?`;
      
      if (decType.places === 1) {
        correctAnswer = `${whole * 10 + decimalPart}/10`;
        options = [
          correctAnswer,
          `${whole * 10 + decimalPart}/100`,
          `${decimalPart}/10`,
          `${whole}${decimalPart}/10`
        ];
      } else {
        correctAnswer = `${whole * 100 + decimalPart}/100`;
        options = [
          correctAnswer,
          `${whole * 100 + decimalPart}/10`,
          `${decimalPart}/100`,
          `${whole}${decimalPart}/100`
        ];
      }
    } else if (decType.type === 'comparison') {
      const dec1 = (Math.random() * 10).toFixed(1);
      const dec2 = (Math.random() * 10).toFixed(1);
      
      question = `Compare: ${dec1} ? ${dec2}`;
      const comparison = parseFloat(dec1) > parseFloat(dec2) ? '>' : 
                        parseFloat(dec1) < parseFloat(dec2) ? '<' : '=';
      correctAnswer = comparison;
      
      options = ['>', '<', '=', '≠'];
    } else {
      const dec1 = (Math.random() * 5).toFixed(1);
      const dec2 = (Math.random() * 5).toFixed(1);
      
      question = `${dec1} + ${dec2} = ?`;
      correctAnswer = (parseFloat(dec1) + parseFloat(dec2)).toFixed(1);
      
      options = [
        correctAnswer,
        (parseFloat(dec1) + parseFloat(dec2) + 0.1).toFixed(1),
        (parseFloat(dec1) + parseFloat(dec2) - 0.1).toFixed(1),
        (parseFloat(dec1) * parseFloat(dec2)).toFixed(1)
      ];
    }
    
    return {
      id: `decimal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: correctAnswer,
      hints: [
        "Tenths place = /10, Hundredths place = /100",
        "Line up decimal points when adding",
        "Compare digit by digit from left to right"
      ],
      visualAid: '💎'
    };
  },

  'factors-multiples': (): ExerciseTemplate => {
      const number = Math.floor(Math.random() * 30) + 10; // 10-39
      const questionTypes = [
        {
          type: 'factors',
          question: `What are the factors of ${number}?`,
          getAnswer: () => {
            const factors: number[] = [];
            for (let i = 1; i <= number; i++) {
              if (number % i === 0) factors.push(i);
            }
            return factors.slice(0, 3).join(', ');
          }
        },
        {
          type: 'multiples',
          question: `What is a multiple of ${number}?`,
          getAnswer: () => (number * (Math.floor(Math.random() * 3) + 2)).toString()
        },
        {
          type: 'prime',
          question: `Is ${number} a prime or composite number?`,
          getAnswer: () => {
            let isPrime = true;
            for (let i = 2; i <= Math.sqrt(number); i++) {
              if (number % i === 0) {
                isPrime = false;
                break;
              }
            }
            return isPrime ? 'prime' : 'composite';
          }
        }
      ];
      
      const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const correctAnswer = qType.getAnswer();
      
      let options: string[] = [];
      if (qType.type === 'factors') {
        const wrongFactors = [
          Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1).join(', '),
          Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + number).join(', '),
          '1, 2, 3'
        ];
        options = [correctAnswer, ...wrongFactors];
      } else if (qType.type === 'multiples') {
        options = ensureFourOptions(correctAnswer, number, number * 5);
      } else {
        // FIX: For prime/composite questions, only use prime/composite as options
        // to avoid ambiguity with even/odd classification
        const wrongAnswers = [
          correctAnswer === 'prime' ? 'composite' : 'prime',
          'neither',
          'both'
        ];
        options = [correctAnswer, ...wrongAnswers];
      }
      
      return {
        id: `factors-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'multiple-choice',
        question: qType.question,
        options: options.sort(() => Math.random() - 0.5),
        correctAnswer: correctAnswer,
        hints: [
          "Factors are numbers that divide evenly into another number",
          "Multiples are the result of multiplying a number by integers",
          "Prime numbers have exactly two factors: 1 and itself"
        ],
        visualAid: '🐠'
      };
  },

  'measurement-conversion': (): ExerciseTemplate => {
    const conversions = [
      { from: 'meters', to: 'centimeters', factor: 100, examples: [2, 3, 4, 5] },
      { from: 'kilometers', to: 'meters', factor: 1000, examples: [1, 2, 3, 4] },
      { from: 'feet', to: 'inches', factor: 12, examples: [3, 4, 5, 6] },
      { from: 'yards', to: 'feet', factor: 3, examples: [2, 3, 4, 5] },
      { from: 'pounds', to: 'ounces', factor: 16, examples: [2, 3, 4, 5] },
      { from: 'hours', to: 'minutes', factor: 60, examples: [2, 3, 4, 5] }
    ];
    
    const conversion = conversions[Math.floor(Math.random() * conversions.length)];
    const value = conversion.examples[Math.floor(Math.random() * conversion.examples.length)];
    const convertedValue = value * conversion.factor;
    
    const questionVariations = [
      `Convert ${value} ${conversion.from} to ${conversion.to}:`,
      `How many ${conversion.to} are in ${value} ${conversion.from}?`,
      `${value} ${conversion.from} = ? ${conversion.to}`
    ];
    
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    const correctAnswer = convertedValue.toString();
    
    const options = ensureFourOptions(correctAnswer, Math.floor(convertedValue * 0.5), convertedValue * 2);
    
    return {
      id: `measure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: [
        `Remember: 1 ${conversion.from} = ${conversion.factor} ${conversion.to}`,
        `Multiply the number by ${conversion.factor}`,
        `Check your multiplication carefully`
      ],
      visualAid: '🐋'
    };
  },

  'geometry-lines': (): ExerciseTemplate => {
    const geometryConcepts = [
      {
        type: 'lines',
        question: 'Which has two endpoints?',
        options: ['line segment', 'line', 'ray', 'point'],
        answer: 'line segment'
      },
      {
        type: 'angles',
        question: 'What type of angle is 90 degrees?',
        options: ['right angle', 'acute angle', 'obtuse angle', 'straight angle'],
        answer: 'right angle'
      },
      {
        type: 'parallel',
        question: 'What do you call lines that never meet?',
        options: ['parallel lines', 'perpendicular lines', 'intersecting lines', 'curved lines'],
        answer: 'parallel lines'
      },
      {
        type: 'perpendicular',
        question: 'What do you call lines that form right angles?',
        options: ['perpendicular lines', 'parallel lines', 'diagonal lines', 'horizontal lines'],
        answer: 'perpendicular lines'
      }
    ];
    
    const concept = geometryConcepts[Math.floor(Math.random() * geometryConcepts.length)];
    
    return {
      id: `geometry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: concept.question,
      options: concept.options.sort(() => Math.random() - 0.5),
      correctAnswer: concept.answer,
      hints: [
        "Line segment: two endpoints, Line: goes forever, Ray: one endpoint",
        "Right angle = 90°, Acute < 90°, Obtuse > 90°, Straight = 180°",
        "Parallel: same direction, Perpendicular: right angles"
      ],
      visualAid: '📐'
    };
  },

  'patterns-sequences': (): ExerciseTemplate => {
    const patternTypes = [
      {
        type: 'arithmetic',
        sequence: [2, 4, 6, 8, '?'],
        difference: 2,
        answer: '10'
      },
      {
        type: 'arithmetic',
        sequence: [5, 10, 15, 20, '?'],
        difference: 5,
        answer: '25'
      },
      {
        type: 'geometric',
        sequence: [3, 6, 12, 24, '?'],
        multiplier: 2,
        answer: '48'
      },
      {
        type: 'geometric', 
        sequence: [2, 4, 8, 16, '?'],
        multiplier: 2,
        answer: '32'
      }
    ];
    
    const pattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    const question = `What number comes next in this pattern: ${pattern.sequence.join(', ')}`;
    
    const options = ensureFourOptions(pattern.answer, 
      parseInt(pattern.answer) - 5, 
      parseInt(pattern.answer) + 5);
    
    return {
      id: `pattern-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: pattern.answer,
      hints: [
        "Look for the pattern: is it adding, subtracting, multiplying?",
        "Check the difference between consecutive numbers",
        "Test your pattern on the first few numbers"
      ],
      visualAid: '🎭'
    };
  },

  'data-interpretation': (): ExerciseTemplate => {
    const dataSets = [
      {
        type: 'bar-graph',
        question: 'A bar graph shows: Monday=5, Tuesday=8, Wednesday=6, Thursday=9, Friday=7. What is the total?',
        data: [5, 8, 6, 9, 7],
        answer: '35',
        operation: 'sum'
      },
      {
        type: 'bar-graph',
        question: 'A bar graph shows: Monday=5, Tuesday=8, Wednesday=6, Thursday=9, Friday=7. Which day has the most?',
        data: [5, 8, 6, 9, 7],
        answer: 'Thursday',
        operation: 'max'
      },
      {
        type: 'line-plot',
        question: 'A line plot shows: X X X X X (at values 2,3,3,4,5). What is the mode?',
        data: [2, 3, 3, 4, 5],
        answer: '3',
        operation: 'mode'
      }
    ];
    
    const dataSet = dataSets[Math.floor(Math.random() * dataSets.length)];
    
    let options: string[] = [];
    if (dataSet.operation === 'sum') {
      options = ensureFourOptions(dataSet.answer, 20, 50);
    } else if (dataSet.operation === 'max') {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      options = [...days].sort(() => Math.random() - 0.5);
    } else {
      options = ensureFourOptions(dataSet.answer, 1, 6);
    }
    
    return {
      id: `data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: dataSet.question,
      options: options,
      correctAnswer: dataSet.answer,
      hints: [
        "Total means add all the values together",
        "Mode is the number that appears most often",
        "Maximum is the largest value"
      ],
      visualAid: '📊'
    };
  },

  'money-operations': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const moneyProblemTypes = [
      {
        type: 'decimal-addition',
        generate: () => {
          const amount1 = (Math.random() * 20 + 5).toFixed(2); // $5-$25
          const amount2 = (Math.random() * 15 + 3).toFixed(2); // $3-$18
          const total = (parseFloat(amount1) + parseFloat(amount2)).toFixed(2);
          
          return {
            question: `Add: ${currency.symbol}${amount1} + ${currency.symbol}${amount2}`,
            correctAnswer: `${currency.symbol}${total}`,
            calculation: total
          };
        }
      },
      {
        type: 'decimal-subtraction',
        generate: () => {
          const amount1 = (Math.random() * 30 + 10).toFixed(2); // $10-$40
          const amount2 = (Math.random() * 15 + 5).toFixed(2);  // $5-$20
          const difference = (parseFloat(amount1) - parseFloat(amount2)).toFixed(2);
          
          return {
            question: `Subtract: ${currency.symbol}${amount1} - ${currency.symbol}${amount2}`,
            correctAnswer: `${currency.symbol}${difference}`,
            calculation: difference
          };
        }
      },
      {
        type: 'money-multiplication',
        generate: () => {
          const price = (Math.random() * 10 + 2).toFixed(2); // $2-$12
          const quantity = Math.floor(Math.random() * 8) + 3; // 3-10 items
          const total = (parseFloat(price) * quantity).toFixed(2);
          
          return {
            question: `If one item costs ${currency.symbol}${price}, how much do ${quantity} items cost?`,
            correctAnswer: `${currency.symbol}${total}`,
            calculation: total
          };
        }
      },
      {
        type: 'making-change',
        generate: () => {
          const price = (Math.random() * 15 + 5).toFixed(2); // $5-$20
          const paid = Math.ceil(parseFloat(price) / 10) * 10 + 5; // Pay with next $5 increment
          const change = (paid - parseFloat(price)).toFixed(2);
          
          return {
            question: `An item costs ${currency.symbol}${price}. You pay with ${currency.symbol}${paid}. How much change do you get?`,
            correctAnswer: `${currency.symbol}${change}`,
            calculation: change
          };
        }
      },
      {
        type: 'multi-step-problem',
        generate: () => {
          const item1 = { name: 'book', price: (Math.random() * 8 + 7).toFixed(2) }; // $7-$15
          const item2 = { name: 'pen', price: (Math.random() * 3 + 2).toFixed(2) };  // $2-$5
          const discount = 5; // $5 off
          
          const total = (parseFloat(item1.price) + parseFloat(item2.price) - discount).toFixed(2);
          
          return {
            question: `You buy a ${item1.name} for ${currency.symbol}${item1.price} and a ${item2.name} for ${currency.symbol}${item2.price}. You have a ${currency.symbol}5 coupon. How much do you pay?`,
            correctAnswer: `${currency.symbol}${total}`,
            calculation: total
          };
        }
      }
    ];

    const problemType = moneyProblemTypes[Math.floor(Math.random() * moneyProblemTypes.length)];
    const generated = problemType.generate();

    // Generate options with proper currency formatting
    const numericAnswer = parseFloat(generated.calculation);
    const options = ensureFourOptions(
      numericAnswer.toString(),
      Math.max(0, numericAnswer - 10),
      numericAnswer + 10
    ).map(opt => `${currency.symbol}${parseFloat(opt).toFixed(2)}`);

    const hints = [
      'Line up decimal points when adding/subtracting money',
      'Remember to include the cents (two decimal places)',
      'Double-check your calculations'
    ];

    return {
      id: `money4-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: hints,
      visualAid: '💰'
    };
  },
  'area-perimeter': (): ExerciseTemplate => {
    const problemTypes = [
      {
        type: 'area-rectangle',
        generate: () => {
          const length = Math.floor(Math.random() * 12) + 3; // 3-14
          const width = Math.floor(Math.random() * 8) + 2;  // 2-9
          const area = length * width;
          return {
            question: `A rectangular coral reef is ${length} units long and ${width} units wide. What is its area?`,
            correctAnswer: area.toString(),
            calculation: area
          };
        }
      },
      {
        type: 'perimeter-rectangle',
        generate: () => {
          const length = Math.floor(Math.random() * 10) + 5; // 5-14
          const width = Math.floor(Math.random() * 6) + 3;   // 3-8
          const perimeter = 2 * (length + width);
          return {
            question: `A rectangular island is ${length} units long and ${width} units wide. What is its perimeter?`,
            correctAnswer: perimeter.toString(),
            calculation: perimeter
          };
        }
      },
      {
        type: 'missing-side-area',
        generate: () => {
          const area = Math.floor(Math.random() * 48) + 12; // 12-59
          const givenSide = Math.floor(Math.random() * 6) + 3; // 3-8
          const missingSide = area / givenSide;
          return {
            question: `The area of a rectangular seaweed bed is ${area} square units. If one side is ${givenSide} units, what is the length of the other side?`,
            correctAnswer: missingSide.toString(),
            calculation: missingSide
          };
        }
      },
      {
        type: 'missing-side-perimeter',
        generate: () => {
          const perimeter = Math.floor(Math.random() * 30) + 20; // 20-49
          const givenSide = Math.floor(Math.random() * 8) + 5; // 5-12
          const missingSide = (perimeter - 2 * givenSide) / 2;
          return {
            question: `The perimeter of a rectangular treasure chest is ${perimeter} units. If the length is ${givenSide} units, what is the width?`,
            correctAnswer: missingSide.toString(),
            calculation: missingSide
          };
        }
      }
    ];

    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const generated = problemType.generate();

    const options = ensureFourOptions(generated.correctAnswer, 
      Math.max(1, Math.floor(generated.calculation * 0.5)), 
      Math.floor(generated.calculation * 1.5));

    return {
      id: `area-perimeter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Area = length × width",
        "Perimeter = 2 × (length + width)",
        "For missing sides: use the formula backwards"
      ],
      visualAid: '🏝️'
    };
  },

  'multiplicative-comparison': (): ExerciseTemplate => {
    const comparisonTypes = [
      {
        type: 'times-as-many',
        generate: () => {
          const multiplier = Math.floor(Math.random() * 4) + 2; // 2-5
          const smaller = Math.floor(Math.random() * 8) + 3; // 3-10
          const larger = smaller * multiplier;
          return {
            question: `A blue whale saw ${larger} fish. A dolphin saw ${smaller} fish. The whale saw ___ times as many fish as the dolphin.`,
            correctAnswer: multiplier.toString(),
            calculation: multiplier
          };
        }
      },
      {
        type: 'find-total',
        generate: () => {
          const times = Math.floor(Math.random() * 4) + 2; // 2-5
          const base = Math.floor(Math.random() * 7) + 4; // 4-10
          const total = base * times;
          return {
            question: `An octopus has ${times} times as many shells as a crab. If the crab has ${base} shells, how many shells does the octopus have?`,
            correctAnswer: total.toString(),
            calculation: total
          };
        }
      },
      {
        type: 'find-base',
        generate: () => {
          const times = Math.floor(Math.random() * 4) + 2; // 2-5
          const total = Math.floor(Math.random() * 30) + 10; // 10-39
          const base = Math.floor(total / times);
          return {
            question: `A mermaid collected ${total} pearls. This is ${times} times as many pearls as a seahorse collected. How many pearls did the seahorse collect?`,
            correctAnswer: base.toString(),
            calculation: base
          };
        }
      }
    ];

    const comparisonType = comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)];
    const generated = comparisonType.generate();

    const options = ensureFourOptions(generated.correctAnswer, 
      Math.max(1, generated.calculation - 3), 
      generated.calculation + 3);

    return {
      id: `comparison-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Look for 'times as many' or 'times as much'",
        "Use multiplication to find the larger quantity",
        "Use division to find the smaller quantity"
      ],
      visualAid: '🐋'
    };
  },

  'angle-measurement': (): ExerciseTemplate => {
    const angleTypes = [
      {
        type: 'identify',
        angles: [
          { measure: 90, name: 'right angle' },
          { measure: 45, name: 'acute angle' },
          { measure: 120, name: 'obtuse angle' },
          { measure: 180, name: 'straight angle' }
        ]
      },
      {
        type: 'measure',
        angles: [30, 60, 90, 120, 150, 45, 135]
      },
      {
        type: 'draw',
        angles: [25, 50, 75, 100, 125, 150]
      }
    ];

    const angleType = angleTypes[Math.floor(Math.random() * angleTypes.length)];
    
    let question = '';
    let correctAnswer = '';
    let options: string[] = [];

    if (angleType.type === 'identify') {
      const angle = angleType.angles[Math.floor(Math.random() * angleType.angles.length)];
      if (typeof angle === 'object' && 'measure' in angle) {
        question = `What type of angle measures ${angle.measure}°?`;
        correctAnswer = angle.name;
      } else {
        // fallback for unexpected type
        question = `What type of angle measures ${angle}°?`;
        correctAnswer = '';
      }
      options = ['acute angle', 'right angle', 'obtuse angle', 'straight angle'].sort(() => Math.random() - 0.5);
    } else if (angleType.type === 'measure') {
      const angle = angleType.angles[Math.floor(Math.random() * angleType.angles.length)];
      question = `An angle in a coral formation measures ${angle}°. What type of angle is this?`;
      let angleValue: number;
      if (typeof angle === 'object' && 'measure' in angle) {
        angleValue = angle.measure;
      } else {
        angleValue = angle as number;
      }
      if (angleValue < 90) correctAnswer = 'acute';
      else if (angleValue === 90) correctAnswer = 'right';
      else if (angleValue < 180) correctAnswer = 'obtuse';
      else correctAnswer = 'straight';
      options = ['acute', 'right', 'obtuse', 'straight'];
    } else {
      const angle = angleType.angles[Math.floor(Math.random() * angleType.angles.length)];
      question = `A mermaid needs to draw an angle of ${angle}°. What type of angle should she draw?`;
      let angleValue: number;
      if (typeof angle === 'object' && 'measure' in angle) {
        angleValue = angle.measure;
      } else {
        angleValue = angle as number;
      }
      if (angleValue < 90) correctAnswer = 'acute';
      else if (angleValue === 90) correctAnswer = 'right';
      else if (angleValue < 180) correctAnswer = 'obtuse';
      else correctAnswer = 'straight';
      options = ['acute', 'right', 'obtuse', 'straight'];
    }

    return {
      id: `angle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: [
        "Acute angle: less than 90°",
        "Right angle: exactly 90°",
        "Obtuse angle: more than 90° but less than 180°",
        "Straight angle: exactly 180°"
      ],
      visualAid: '📐'
    };
  },

  'symmetry': (): ExerciseTemplate => {
    const symmetryConcepts = [
      {
        question: 'How many lines of symmetry does a square have?',
        answer: '4',
        options: ['1', '2', '3', '4']
      },
      {
        question: 'Which shape has exactly one line of symmetry?',
        answer: 'isosceles triangle',
        options: ['square', 'circle', 'isosceles triangle', 'rectangle']
      },
      {
        question: 'How many lines of symmetry does a circle have?',
        answer: 'infinite',
        options: ['1', '2', '4', 'infinite']
      },
      {
        question: 'Which sea creature is typically symmetrical?',
        answer: 'starfish',
        options: ['octopus', 'jellyfish', 'starfish', 'eel']
      },
      {
        question: 'How many lines of symmetry does a regular pentagon have?',
        answer: '5',
        options: ['3', '4', '5', '6']
      }
    ];

    const concept = symmetryConcepts[Math.floor(Math.random() * symmetryConcepts.length)];

    return {
      id: `symmetry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: concept.question,
      options: concept.options.sort(() => Math.random() - 0.5),
      correctAnswer: concept.answer,
      hints: [
        "Line of symmetry: a line that divides a shape into two mirror images",
        "Regular polygons have as many lines of symmetry as they have sides",
        "Circles have infinite lines of symmetry through their center"
      ],
      visualAid: '🦋'
    };
  },

  'multi-step-problems': (): ExerciseTemplate => {
    const problemTypes = [
      {
        type: 'addition-multiplication',
        generate: () => {
          const groups = Math.floor(Math.random() * 4) + 3; // 3-6
          const perGroup = Math.floor(Math.random() * 5) + 4; // 4-8
          const extra = Math.floor(Math.random() * 6) + 2; // 2-7
          const total = groups * perGroup + extra;
          return {
            question: `A fisherman caught ${groups} buckets of fish. Each bucket had ${perGroup} fish. He also caught ${extra} extra fish. How many fish did he catch in total?`,
            correctAnswer: total.toString(),
            calculation: total
          };
        }
      },
      {
        type: 'multiplication-division',
        generate: () => {
          const total = Math.floor(Math.random() * 40) + 20; // 20-59
          const perPerson = Math.floor(Math.random() * 5) + 3; // 3-7
          const people = Math.floor(total / perPerson);
          const remainder = total % perPerson;
          const answer = remainder === 0 ? people.toString() : `${people} remainder ${remainder}`;
          return {
            question: `A mermaid has ${total} pearls. She wants to share them equally among ${perPerson} friends. How many pearls will each friend get?`,
            correctAnswer: answer,
            calculation: total
          };
        }
      },
      {
        type: 'addition-subtraction',
        generate: () => {
          const start = Math.floor(Math.random() * 50) + 50; // 50-99
          const add = Math.floor(Math.random() * 30) + 20; // 20-49
          const subtract = Math.floor(Math.random() * 25) + 15; // 15-39
          const result = start + add - subtract;
          return {
            question: `A submarine started at ${start} meters deep. It went down ${add} meters, then came up ${subtract} meters. How deep is it now?`,
            correctAnswer: result.toString(),
            calculation: result
          };
        }
      }
    ];

    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const generated = problemType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer.includes('remainder') ? generated.correctAnswer.split(' ')[0] : generated.correctAnswer,
      Math.max(1, Math.floor(generated.calculation * 0.6)),
      Math.floor(generated.calculation * 1.4)
    );

    // Handle remainder answers specially
    if (generated.correctAnswer.includes('remainder')) {
      const [quotient, , remainder] = generated.correctAnswer.split(' ');
      options[0] = generated.correctAnswer;
      options[1] = `${parseInt(quotient) + 1}`;
      options[2] = `${parseInt(quotient) - 1}`;
      options[3] = `${parseInt(quotient)} remainder ${parseInt(remainder) + 1}`;
    }

    return {
      id: `multistep-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Read the problem carefully and identify each step",
        "Write down what you know and what you need to find",
        "Check if your answer makes sense in the context"
      ],
      visualAid: '🤿'
    };
  },
  
  'metric-system': (): ExerciseTemplate => {
    const metricConversions = [
      { from: 'meters', to: 'centimeters', factor: 100, examples: [2, 3, 4, 5] },
      { from: 'kilometers', to: 'meters', factor: 1000, examples: [1, 2, 3, 4] },
      { from: 'centimeters', to: 'millimeters', factor: 10, examples: [5, 6, 7, 8] },
      { from: 'meters', to: 'millimeters', factor: 1000, examples: [1, 2, 3, 4] },
      { from: 'kilograms', to: 'grams', factor: 1000, examples: [2, 3, 4, 5] },
      { from: 'liters', to: 'milliliters', factor: 1000, examples: [1, 2, 3, 4] }
    ];

    const conversion = metricConversions[Math.floor(Math.random() * metricConversions.length)];
    const value = conversion.examples[Math.floor(Math.random() * conversion.examples.length)];
    const convertedValue = value * conversion.factor;

    const questionVariations = [
      `Convert ${value} ${conversion.from} to ${conversion.to}:`,
      `How many ${conversion.to} are in ${value} ${conversion.from}?`,
      `${value} ${conversion.from} = ? ${conversion.to}`
    ];

    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    const correctAnswer = convertedValue.toString();

    const options = ensureFourOptions(correctAnswer, Math.floor(convertedValue * 0.5), convertedValue * 2);

    return {
      id: `metric-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: [
        `Remember: 1 ${conversion.from} = ${conversion.factor} ${conversion.to}`,
        "Metric conversions use powers of 10",
        "Use multiplication to convert to smaller units"
      ],
      visualAid: '🧜‍♀️'
    };
  }
};