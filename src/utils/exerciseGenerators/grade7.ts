// utils/exerciseGenerators/grade7.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { getCurrency } from '@/utils/currencyHelper';

export const grade7Generators = {
  'rational-numbers': (): ExerciseTemplate => {
    const rationalTypes = [
      {
        type: 'addition',
        generate: () => {
          const num1 = (Math.random() * 10 - 5).toFixed(1); // -5.0 to 4.9
          const num2 = (Math.random() * 10 - 5).toFixed(1); // -5.0 to 4.9
          const result = (parseFloat(num1) + parseFloat(num2)).toFixed(1);
          
          return {
            question: `Calculate: ${num1} + ${num2}`,
            correctAnswer: result,
            calculation: parseFloat(result)
          };
        }
      },
      {
        type: 'subtraction',
        generate: () => {
          const num1 = (Math.random() * 10 - 5).toFixed(1);
          const num2 = (Math.random() * 10 - 5).toFixed(1);
          const result = (parseFloat(num1) - parseFloat(num2)).toFixed(1);
          
          return {
            question: `Calculate: ${num1} - ${num2}`,
            correctAnswer: result,
            calculation: parseFloat(result)
          };
        }
      },
      {
        type: 'multiplication',
        generate: () => {
          const num1 = (Math.random() * 6 - 3).toFixed(1); // -3.0 to 2.9
          const num2 = (Math.random() * 6 - 3).toFixed(1); // -3.0 to 2.9
          const result = (parseFloat(num1) * parseFloat(num2)).toFixed(1);
          
          return {
            question: `Calculate: ${num1} × ${num2}`,
            correctAnswer: result,
            calculation: parseFloat(result)
          };
        }
      },
      {
        type: 'division',
        generate: () => {
          const num1 = (Math.random() * 8 - 4).toFixed(1); // -4.0 to 3.9
          const num2 = (Math.random() * 4 + 0.5).toFixed(1); // 0.5 to 4.4 (avoid zero)
          const result = (parseFloat(num1) / parseFloat(num2)).toFixed(2);
          
          return {
            question: `Calculate: ${num1} ÷ ${num2}`,
            correctAnswer: result,
            calculation: parseFloat(result)
          };
        }
      }
    ];

    const rationalType = rationalTypes[Math.floor(Math.random() * rationalTypes.length)];
    const generated = rationalType.generate();

    const options = ensureFourOptions(
        generated.correctAnswer, // Use the string directly
        parseFloat(generated.correctAnswer) - 5,
        parseFloat(generated.correctAnswer) + 5
        );

    return {
      id: `rational7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Same signs: add and keep the sign",
        "Different signs: subtract and take the sign of the larger absolute value",
        "For multiplication/division: same signs = positive, different signs = negative"
      ],
      visualAid: '🧮'
    };
  },

  'algebraic-expressions': (): ExerciseTemplate => {
    const expressionTypes = [
      {
        type: 'combine-like-terms',
        generate: () => {
          const xCoeff = Math.floor(Math.random() * 3) + 2; // 2-4
          const yCoeff = Math.floor(Math.random() * 3) + 1; // 1-3
          const constant = Math.floor(Math.random() * 5) + 1; // 1-5
          const simplified = `${xCoeff + 2}x + ${yCoeff + 1}y + ${constant}`;
          
          return {
            question: `Simplify: 2x + ${xCoeff}x + y + ${yCoeff}y + ${constant}`,
            correctAnswer: simplified,
            calculation: xCoeff + yCoeff
          };
        }
      },
      {
        type: 'distributive-property',
        generate: () => {
          const factor = Math.floor(Math.random() * 3) + 2; // 2-4
          const xCoeff = Math.floor(Math.random() * 2) + 1; // 1-2
          const constant = Math.floor(Math.random() * 4) + 1; // 1-4
          const distributed = `${factor * xCoeff}x + ${factor * constant}`;
          
          return {
            question: `Apply the distributive property: ${factor}(${xCoeff}x + ${constant})`,
            correctAnswer: distributed,
            calculation: factor * xCoeff
          };
        }
      },
      {
        type: 'evaluate-complex',
        generate: () => {
          const x = Math.floor(Math.random() * 4) + 2; // 2-5
          const y = Math.floor(Math.random() * 4) + 1; // 1-4
          
          const patterns = [
            {
              expression: `2x + 3y + 5`,
              calculate: () => 2*x + 3*y + 5
            },
            {
              expression: `4x - 2y + 3`, 
              calculate: () => 4*x - 2*y + 3
            },
            {
              expression: `3x + y - 2`,
              calculate: () => 3*x + y - 2
            },
            {
              expression: `x + 4y + 6`,
              calculate: () => x + 4*y + 6
            },
            {
              expression: `5x - 3y + 1`,
              calculate: () => 5*x - 3*y + 1
            }
          ];
          
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          const result = pattern.calculate();
          
          return {
            question: `Evaluate ${pattern.expression} when x = ${x} and y = ${y}`,
            correctAnswer: result.toString(),
            calculation: result
          };
        }
      }
    ];

    // Add proper null checking
    const randomIndex = Math.floor(Math.random() * expressionTypes.length);
    const expressionType = expressionTypes[randomIndex];
    
    if (!expressionType || !expressionType.generate) {
      // Fallback to a default problem if something goes wrong
      return {
        id: `algexpr7-fallback-${Date.now()}`,
        type: 'multiple-choice',
        question: 'Simplify: 2x + 3x + 5',
        options: ['5x + 5', '6x', '5x', '6x + 5'],
        correctAnswer: '5x + 5',
        hints: ['Combine like terms: terms with the same variable'],
        visualAid: '📝'
      };
    }

    const generated = expressionType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('x')) {
      // Check if it's a distributive property problem
      if (generated.question.includes('distributive property')) {
        // Parse the values from the question text
        const match = generated.question.match(/(\d+)\((\d+)x \+ (\d+)\)/);
        if (match) {
          const factor = parseInt(match[1]);
          const xCoeff = parseInt(match[2]);
          const constant = parseInt(match[3]);
          
          // Create better distractors for distributive property
          const wrong1 = `${factor * xCoeff}x + ${constant}`; // Forgot to multiply constant
          const wrong2 = `${xCoeff}x + ${factor * constant}`; // Forgot to multiply x coefficient
          const wrong3 = `${factor * (xCoeff + constant)}x`; // Added instead of distributing
          
          options = [
            generated.correctAnswer,
            wrong1,
            wrong2,
            wrong3
          ];
        } else {
          // Fallback to original logic if parsing fails
          const parts = generated.correctAnswer.split(' + ');
          options = [
            generated.correctAnswer,
            parts.reverse().join(' + '),
            generated.correctAnswer.replace('+', '-'),
            generated.correctAnswer.replace(/x/g, 'y').replace(/y/g, 'x')
          ];
        }
      } else if (generated.question.includes('Simplify:')) {
        // For combine-like-terms problems, create better distractors
        const parts = generated.correctAnswer.split(' + ');
        const xTerm = parts.find(part => part.includes('x'));
        const yTerm = parts.find(part => part.includes('y'));
        const constantTerm = parts.find(part => !part.includes('x') && !part.includes('y'));
        
        const wrong1 = generated.correctAnswer.replace('+', '-'); // Wrong sign
        const wrong2 = generated.correctAnswer.replace(/x/g, 'y').replace(/y/g, 'x'); // Swapped variables
        
        // Create wrong coefficient option safely
        let wrong3 = '';
        if (xTerm) {
          const xCoeff = parseInt(xTerm) || 1;
          wrong3 = `${xCoeff + 2}${xTerm.replace(xCoeff.toString(), '')}`;
          if (yTerm) wrong3 += ` + ${yTerm}`;
          if (constantTerm) wrong3 += ` + ${constantTerm}`;
        } else {
          wrong3 = generated.correctAnswer.replace(/\d+/g, match => (parseInt(match) + 2).toString());
        }
        
        options = [
          generated.correctAnswer,
          wrong1,
          wrong2,
          wrong3
        ];
      } else {
        // For other expression types, use the original logic
        const parts = generated.correctAnswer.split(' + ');
        options = [
          generated.correctAnswer,
          parts.reverse().join(' + '),
          generated.correctAnswer.replace('+', '-'),
          generated.correctAnswer.replace(/x/g, 'y').replace(/y/g, 'x')
        ];
      }
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `algexpr7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Combine like terms: terms with the same variable",
        "Distributive property: a(b + c) = ab + ac",
        "Substitute values for all variables before calculating"
      ],
      visualAid: '📝'
    };
  },

  'equations-inequalities': (): ExerciseTemplate => {
    const equationTypes = [
      {
        type: 'multi-step-equation',
        generate: () => {
          const solution = Math.floor(Math.random() * 8) + 3; // 3-10
          const coefficient = Math.floor(Math.random() * 3) + 2; // 2-4
          const constant = Math.floor(Math.random() * 5) + 1; // 1-5
          const equation = `${coefficient}x + ${constant} = ${coefficient * solution + constant}`;
          
          return {
            question: `Solve: ${equation}`,
            correctAnswer: solution.toString(),
            calculation: solution
          };
        }
      },
      {
        type: 'rational-equation',
        generate: () => {
          const solution = Math.floor(Math.random() * 6) + 2; // 2-7
          const numerator = Math.floor(Math.random() * 3) + 1; // 1-3
          const equation = `(x + ${solution})/${numerator} = ${solution/numerator + 1}`;
          
          return {
            question: `Solve: ${equation}`,
            correctAnswer: solution.toString(),
            calculation: solution
          };
        }
      },
      {
        type: 'inequality',
        generate: () => {
          const solution = Math.floor(Math.random() * 8) + 3; // 3-10
          const coefficient = Math.floor(Math.random() * 2) + 2; // 2-3
          const symbol = ['>', '<', '≥', '≤'][Math.floor(Math.random() * 4)];
          const equation = `${coefficient}x ${symbol} ${coefficient * solution}`;
          
          return {
            question: `Solve: ${equation}`,
            correctAnswer: `x ${symbol} ${solution}`,
            calculation: solution
          };
        }
      }
    ];

    const equationType = equationTypes[Math.floor(Math.random() * equationTypes.length)];
    const generated = equationType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('x')) {
      const symbols = ['>', '<', '≥', '≤'];
      const currentSymbol = generated.correctAnswer.split(' ')[1];
      options = symbols.map(sym => `x ${sym} ${generated.calculation}`);
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, 15);
    }

    return {
      id: `equation7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "For multi-step: undo addition/subtraction first, then multiplication/division",
        "For rational equations: multiply both sides by the denominator",
        "For inequalities: flip the sign if multiplying/dividing by negative"
      ],
      visualAid: '⚖️'
    };
  },

  'ratio-proportions': (): ExerciseTemplate => {
    const ratioTypes = [
      {
        type: 'proportional-relationship',
        generate: () => {
          const ratio1 = Math.floor(Math.random() * 5) + 2; // 2-6
          const ratio2 = Math.floor(Math.random() * 5) + 3; // 3-7
          const multiplier = Math.floor(Math.random() * 4) + 2; // 2-5
          
          return {
            question: `Which ratio is equivalent to ${ratio1}:${ratio2}?`,
            correctAnswer: `${ratio1 * multiplier}:${ratio2 * multiplier}`,
            calculation: ratio1 * multiplier
          };
        }
      },
      {
        type: 'unit-rate',
        generate: () => {
          const amount = Math.floor(Math.random() * 40) + 30; // 30-69
          const units = Math.floor(Math.random() * 6) + 4; // 4-9
          const unitRate = (amount / units).toFixed(2);
          
          return {
            question: `Find the unit rate: ${amount} miles in ${units} hours`,
            correctAnswer: `${unitRate} miles per hour`,
            calculation: parseFloat(unitRate)
          };
        }
      },
      {
        type: 'scale-drawing',
        generate: () => {
          const scale = Math.floor(Math.random() * 3) + 2; // 2-4
          const drawingMeasurement = Math.floor(Math.random() * 8) + 2; // 2-9
          const actualMeasurement = drawingMeasurement * scale;
          
          return {
            question: `A map scale is 1:${scale}. If two islands are ${drawingMeasurement} cm apart on the map, how far are they actually?`,
            correctAnswer: `${actualMeasurement} cm`,
            calculation: actualMeasurement
          };
        }
      }
    ];

    const ratioType = ratioTypes[Math.floor(Math.random() * ratioTypes.length)];
    const generated = ratioType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(':')) {
      const [a, b] = generated.correctAnswer.split(':').map(Number);
      options = [
        generated.correctAnswer,
        `${a + 1}:${b}`,
        `${a}:${b + 1}`,
        `${a * 2}:${b * 3}`
      ];
    } else if (generated.correctAnswer.includes('miles per hour')) {
      const rateValue = parseFloat(generated.correctAnswer.split(' ')[0]);
      options = ensureFourOptions(rateValue.toString(), rateValue * 0.5, rateValue * 1.5)
        .map(opt => `${parseInt(opt).toFixed(2)} miles per hour`);
    } else {
      const numValue = parseInt(generated.correctAnswer.split(' ')[0]);
      options = ensureFourOptions(generated.correctAnswer, numValue - 5, numValue + 5)
         .map(opt => `${opt} cm`);
    }

    return {
      id: `ratio7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Equivalent ratios can be found by multiplying or dividing both numbers by the same value",
        "Unit rate = Total amount ÷ Number of units",
        "Scale: drawing measurement × scale factor = actual measurement"
      ],
      visualAid: '🪸'
    };
  },

  'percent-applications': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const percentTypes = [
      {
        type: 'percent-increase-decrease',
        generate: () => {
          const original = Math.floor(Math.random() * 50) + 50; // 50-99
          const percent = Math.floor(Math.random() * 4) * 10 + 10; // 10%, 20%, 30%, 40%
          const isIncrease = Math.random() > 0.5;
          const change = original * percent / 100;
          const newAmount = isIncrease ? original + change : original - change;
          
          // Use toFixed(2) for currency to show cents, but remove trailing .00 if whole number
          const formattedAmount = newAmount % 1 === 0 
            ? newAmount.toFixed(0) 
            : newAmount.toFixed(2);
          
          return {
            question: `${currency.symbol}${original} ${isIncrease ? 'increased' : 'decreased'} by ${percent}% is?`,
            correctAnswer: `${currency.symbol}${formattedAmount}`,
            calculation: newAmount
          };
        }
      },
      {
        type: 'tax-tip',
        generate: () => {
          const mealPrice = Math.floor(Math.random() * 40) + 20; // 20-59
          const taxRate = Math.floor(Math.random() * 3) + 7; // 7-9%
          const tipPercent = Math.floor(Math.random() * 5) + 15; // 15-19%
          const taxAmount = mealPrice * taxRate / 100;
          const totalWithTax = mealPrice + taxAmount;
          const tipAmount = totalWithTax * tipPercent / 100;
          const finalTotal = totalWithTax + tipAmount;
          
          const formattedTotal = finalTotal % 1 === 0 
            ? finalTotal.toFixed(0) 
            : finalTotal.toFixed(2);
          
          return {
            question: `A ${currency.symbol}${mealPrice} meal with ${taxRate}% tax and ${tipPercent}% tip costs?`,
            correctAnswer: `${currency.symbol}${formattedTotal}`,
            calculation: finalTotal
          };
        }
      },
      {
        type: 'percent-error',
        generate: () => {
          const actual = Math.floor(Math.random() * 20) + 30; // 30-49
          const measured = actual + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 2); // 2-6 difference
          const percentError = (Math.abs(measured - actual) / actual * 100).toFixed(1);
          
          return {
            question: `Actual: ${actual}cm, Measured: ${measured}cm. Percent error?`,
            correctAnswer: `${percentError}%`,
            calculation: parseFloat(percentError)
          };
        }
      },
      {
        type: 'discount-problem',
        generate: () => {
          const originalPrice = Math.floor(Math.random() * 100) + 50; // 50-149
          const discountPercent = Math.floor(Math.random() * 6) * 5 + 10; // 10%, 15%, 20%, 25%, 30%, 35%
          const discountAmount = originalPrice * discountPercent / 100;
          const salePrice = originalPrice - discountAmount;
          
          const formattedPrice = salePrice % 1 === 0 
            ? salePrice.toFixed(0) 
            : salePrice.toFixed(2);
          
          return {
            question: `Original price: ${currency.symbol}${originalPrice}. ${discountPercent}% off. Sale price?`,
            correctAnswer: `${currency.symbol}${formattedPrice}`,
            calculation: salePrice
          };
        }
      },
      {
        type: 'simple-interest',
        generate: () => {
          const principal = Math.floor(Math.random() * 1000) + 500; // 500-1499
          const rate = Math.floor(Math.random() * 8) + 3; // 3-10%
          const time = Math.floor(Math.random() * 5) + 1; // 1-5 years
          const interest = principal * rate * time / 100;
          const total = principal + interest;
          
          const formattedTotal = total % 1 === 0 
            ? total.toFixed(0) 
            : total.toFixed(2);
          
          return {
            question: `${currency.symbol}${principal} at ${rate}% simple interest for ${time} year${time > 1 ? 's' : ''}. Total amount?`,
            correctAnswer: `${currency.symbol}${formattedTotal}`,
            calculation: total
          };
        }
      },
      {
        type: 'exact-percent-calculation',
        generate: () => {
          const original = Math.floor(Math.random() * 40) * 5 + 50; // 50, 55, 60, ..., 240 (multiples of 5)
          const percent = 10; // Always 10% for exact calculations
          const isIncrease = Math.random() > 0.5;
          const change = original * percent / 100;
          const newAmount = isIncrease ? original + change : original - change;
          
          // This will always give exact decimal values like 67.50, 82.50, etc.
          const formattedAmount = newAmount.toFixed(2);
          
          return {
            question: `${currency.symbol}${original} ${isIncrease ? 'increased' : 'decreased'} by ${percent}% is?`,
            correctAnswer: `${currency.symbol}${formattedAmount}`,
            calculation: newAmount
          };
        }
      }
    ];

    const percentType = percentTypes[Math.floor(Math.random() * percentTypes.length)];
    const generated = percentType.generate();

    // Safely extract numeric value from correct answer
    let numericValue: number;
    if (generated.correctAnswer.includes(currency.symbol)) {
      numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
    } else if (generated.correctAnswer.includes('%')) {
      numericValue = parseFloat(generated.correctAnswer.replace('%', ''));
    } else {
      numericValue = parseFloat(generated.correctAnswer);
    }

    // Handle NaN cases
    if (isNaN(numericValue)) {
      numericValue = generated.calculation;
    }

    // Generate options with proper decimal handling
    let options: string[] = [];
    
    if (generated.correctAnswer.includes(currency.symbol)) {
      // For currency values, create options that make sense
      const correctNum = numericValue;
      
      // Create plausible wrong answers based on common mistakes
      const wrongOptions = new Set<string>();
      
      // Add the correct answer
      wrongOptions.add(generated.correctAnswer);
      
      // Common mistakes for percent problems
      const commonMistakes = [
        correctNum * 1.1, // Added instead of subtracted (or vice versa)
        correctNum * 0.9, // Wrong percentage calculation
        Math.round(correctNum), // Rounded incorrectly
        correctNum + 5, // Simple offset
        correctNum - 5  // Simple offset
      ];
      
      for (const mistake of commonMistakes) {
        if (wrongOptions.size >= 4) break;
        
        let formattedMistake: string;
        if (mistake % 1 === 0) {
          formattedMistake = `${currency.symbol}${mistake.toFixed(0)}`;
        } else {
          formattedMistake = `${currency.symbol}${mistake.toFixed(2)}`;
        }
        
        if (formattedMistake !== generated.correctAnswer) {
          wrongOptions.add(formattedMistake);
        }
      }
      
      // Fill remaining slots if needed
      while (wrongOptions.size < 4) {
        const randomOffset = (Math.random() * 20 - 10); // -10 to +10
        const randomOption = correctNum + randomOffset;
        
        let formattedOption: string;
        if (randomOption % 1 === 0) {
          formattedOption = `${currency.symbol}${randomOption.toFixed(0)}`;
        } else {
          formattedOption = `${currency.symbol}${randomOption.toFixed(2)}`;
        }
        
        if (formattedOption !== generated.correctAnswer) {
          wrongOptions.add(formattedOption);
        }
      }
      
      options = Array.from(wrongOptions);
    } else {
      // For non-currency values (like percentages), use the standard approach
      options = ensureFourOptions(
        numericValue.toString(),
        Math.max(0, numericValue * 0.5),
        numericValue * 1.5
      ).map(opt => {
        const num = parseFloat(opt);
        if (generated.correctAnswer.includes('%')) {
          return `${num.toFixed(1)}%`;
        } else {
          return num.toString();
        }
      });
    }

    // Ensure correct answer is in options
    if (!options.includes(generated.correctAnswer)) {
      // Replace the option that's farthest from correct answer
      let farthestIndex = 0;
      let maxDistance = 0;
      
      options.forEach((opt, index) => {
        const optNum = parseFloat(opt.replace(/[^0-9.]/g, ''));
        const distance = Math.abs(optNum - numericValue);
        if (distance > maxDistance) {
          maxDistance = distance;
          farthestIndex = index;
        }
      });
      
      options[farthestIndex] = generated.correctAnswer;
    }

    const hints = [
      "Percent change = (Change ÷ Original) × 100",
      "For tax/tip: calculate tax first, then tip on the total with tax",
      "Percent error = |Measured - Actual| ÷ Actual × 100",
      "Sale price = Original price - (Original price × Discount %)",
      "Simple interest = Principal × Rate × Time",
      "Remember to handle decimal values correctly for money"
    ];

    return {
      id: `percent7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [hints[percentTypes.indexOf(percentType)], ...hints.slice(0, 2)],
      visualAid: '📊'
    };
  },

  'geometry-area': (): ExerciseTemplate => {
    const areaTypes = [
      {
        type: 'triangle-area',
        generate: () => {
          const base = Math.floor(Math.random() * 8) + 5; // 5-12
          const height = Math.floor(Math.random() * 6) + 4; // 4-9
          const area = (base * height / 2).toFixed(1);
          
          return {
            question: `Find the area of a triangle with base ${base} and height ${height}`,
            correctAnswer: area,
            calculation: parseFloat(area)
          };
        }
      },
      {
        type: 'parallelogram-area',
        generate: () => {
          const base = Math.floor(Math.random() * 8) + 6; // 6-13
          const height = Math.floor(Math.random() * 7) + 4; // 4-10
          const area = base * height;
          
          return {
            question: `Find the area of a parallelogram with base ${base} and height ${height}`,
            correctAnswer: area.toString(),
            calculation: area
          };
        }
      },
      {
        type: 'trapezoid-area',
        generate: () => {
          const base1 = Math.floor(Math.random() * 6) + 5; // 5-10
          const base2 = Math.floor(Math.random() * 6) + 7; // 7-12
          const height = Math.floor(Math.random() * 5) + 4; // 4-8
          const area = ((base1 + base2) * height / 2).toFixed(1);
          
          return {
            question: `Find the area of a trapezoid with bases ${base1} and ${base2}, height ${height}`,
            correctAnswer: area,
            calculation: parseFloat(area)
          };
        }
      }
    ];

    const areaType = areaTypes[Math.floor(Math.random() * areaTypes.length)];
    const generated = areaType.generate();

    const options = ensureFourOptions(
        generated.correctAnswer, // Use string directly
        Math.floor(parseFloat(generated.correctAnswer) * 0.5),
        Math.floor(parseFloat(generated.correctAnswer) * 1.5)
        );

    return {
      id: `area7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Triangle area = ½ × base × height",
        "Parallelogram area = base × height",
        "Trapezoid area = ½ × (base1 + base2) × height"
      ],
      visualAid: '🔷'
    };
  },

  'surface-area-volume': (): ExerciseTemplate => {
    const geometryTypes = [
      {
        type: 'rectangular-prism-volume',
        generate: () => {
          const length = Math.floor(Math.random() * 5) + 4; // 4-8
          const width = Math.floor(Math.random() * 5) + 3; // 3-7
          const height = Math.floor(Math.random() * 5) + 3; // 3-7
          const volume = length * width * height;
          
          return {
            question: `Find the volume of a rectangular prism with dimensions ${length} × ${width} × ${height}`,
            correctAnswer: volume.toString(),
            calculation: volume
          };
        }
      },
      {
        type: 'rectangular-prism-surface-area',
        generate: () => {
          const length = Math.floor(Math.random() * 5) + 4; // 4-8
          const width = Math.floor(Math.random() * 5) + 3; // 3-7
          const height = Math.floor(Math.random() * 5) + 3; // 3-7
          const surfaceArea = 2 * (length*width + length*height + width*height);
          
          return {
            question: `Find the surface area of a rectangular prism with dimensions ${length} × ${width} × ${height}`,
            correctAnswer: surfaceArea.toString(),
            calculation: surfaceArea
          };
        }
      },
      {
        type: 'triangular-prism-volume',
        generate: () => {
          const base = Math.floor(Math.random() * 4) + 3; // 3-6
          const height = Math.floor(Math.random() * 4) + 2; // 2-5
          const length = Math.floor(Math.random() * 5) + 4; // 4-8
          const volume = (base * height / 2) * length;
          
          return {
            question: `Find the volume of a triangular prism with triangle base ${base}, height ${height}, and prism length ${length}`,
            correctAnswer: volume.toString(),
            calculation: volume
          };
        }
      }
    ];

    const geometryType = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
    const generated = geometryType.generate();

    const options = ensureFourOptions(
        generated.correctAnswer,
        Math.floor(parseInt(generated.correctAnswer) * 0.6),
        Math.floor(parseInt(generated.correctAnswer) * 1.4)
        );

    return {
      id: `volume7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Volume of prism = Base area × Height",
        "Surface area = sum of areas of all faces",
        "For triangular prism: base area = ½ × triangle base × triangle height"
      ],
      visualAid: '📦'
    };
  },

  'circle-geometry': (): ExerciseTemplate => {
    const circleTypes = [
      {
        type: 'circumference',
        generate: () => {
          const radius = Math.floor(Math.random() * 6) + 3; // 3-8
          const circumference = (2 * Math.PI * radius).toFixed(1);
          
          return {
            question: `Find the circumference of a circle with radius ${radius} (use π = 3.14)`,
            correctAnswer: circumference,
            calculation: parseFloat(circumference)
          };
        }
      },
      {
        type: 'area-circle',
        generate: () => {
          const radius = Math.floor(Math.random() * 5) + 2; // 2-6
          const area = (Math.PI * radius * radius).toFixed(1);
          
          return {
            question: `Find the area of a circle with radius ${radius} (use π = 3.14)`,
            correctAnswer: area,
            calculation: parseFloat(area)
          };
        }
      },
      {
        type: 'diameter-from-circumference',
        generate: () => {
          const circumference = Math.floor(Math.random() * 30) + 20; // 20-49
          const diameter = (circumference / Math.PI).toFixed(1);
          
          return {
            question: `A circle has circumference ${circumference}. Find its diameter (use π = 3.14)`,
            correctAnswer: diameter,
            calculation: parseFloat(diameter)
          };
        }
      }
    ];

    const circleType = circleTypes[Math.floor(Math.random() * circleTypes.length)];
    const generated = circleType.generate();

    const options = ensureFourOptions(
        generated.correctAnswer,
        Math.floor(parseFloat(generated.correctAnswer) * 0.7),
        Math.floor(parseFloat(generated.correctAnswer) * 1.3)
        ).map(opt => parseFloat(opt).toFixed(1));

    return {
      id: `circle7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Circumference = 2πr or πd",
        "Area of circle = πr²",
        "Diameter = Circumference ÷ π"
      ],
      visualAid: '⭕'
    };
  },

  'angle-relationships': (): ExerciseTemplate => {
    const angleTypes = [
      {
        type: 'complementary',
        generate: () => {
          const angle1 = Math.floor(Math.random() * 60) + 20; // 20-79
          const angle2 = 90 - angle1;
          
          return {
            question: `Two complementary angles. One is ${angle1}°. Find the other.`,
            correctAnswer: angle2.toString(),
            calculation: angle2
          };
        }
      },
      {
        type: 'supplementary',
        generate: () => {
          const angle1 = Math.floor(Math.random() * 120) + 30; // 30-149
          const angle2 = 180 - angle1;
          
          return {
            question: `Two supplementary angles. One is ${angle1}°. Find the other.`,
            correctAnswer: angle2.toString(),
            calculation: angle2
          };
        }
      },
      {
        type: 'vertical-angles',
        generate: () => {
          const angle = Math.floor(Math.random() * 120) + 30; // 30-149
          
          return {
            question: `Two lines intersect. One angle is ${angle}°. Find its vertical angle.`,
            correctAnswer: angle.toString(),
            calculation: angle
          };
        }
      }
    ];

    const angleType = angleTypes[Math.floor(Math.random() * angleTypes.length)];
    const generated = angleType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      parseInt(generated.correctAnswer) - 15,
      parseInt(generated.correctAnswer) + 15
    );

    return {
      id: `angle7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Complementary angles sum to 90°",
        "Supplementary angles sum to 180°",
        "Vertical angles are equal"
      ],
      visualAid: '📐'
    };
  },

  'probability': (): ExerciseTemplate => {
    const probabilityTypes = [
      {
        type: 'theoretical',
        generate: () => {
          const favorable = Math.floor(Math.random() * 3) + 1; // 1-3
          const total = Math.floor(Math.random() * 3) + 4; // 4-6
          const probability = `${favorable}/${total}`;
          
          return {
            question: `A bag has ${favorable} red marbles and ${total - favorable} blue marbles. What's P(red)?`,
            correctAnswer: probability,
            calculation: favorable
          };
        }
      },
      {
        type: 'compound-events',
        generate: () => {
          const prob1 = Math.floor(Math.random() * 2) + 2; // 2-3 out of 6
          const prob2 = Math.floor(Math.random() * 2) + 1; // 1-2 out of 6
          const compound = `${prob1 * prob2}/36`;
          
          return {
            question: `Roll two dice. P(first die ${prob1} AND second die ${prob2})?`,
            correctAnswer: compound,
            calculation: prob1 * prob2
          };
        }
      },
      {
        type: 'complement',
        generate: () => {
          const probability = Math.floor(Math.random() * 3) + 2; // 2-4 out of 6
          const complement = `${6 - probability}/6`;
          
          return {
            question: `P(rain) = ${probability}/6. What's P(no rain)?`,
            correctAnswer: complement,
            calculation: 6 - probability
          };
        }
      }
    ];

    const probabilityType = probabilityTypes[Math.floor(Math.random() * probabilityTypes.length)];
    const generated = probabilityType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('/')) {
      const [num, den] = generated.correctAnswer.split('/').map(Number);
      options = [
        generated.correctAnswer,
        `${num + 1}/${den}`,
        `${num}/${den + 1}`,
        `${num - 1}/${den}`
      ].filter(opt => !opt.includes('0/'));
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, 6);
    }

    return {
      id: `prob7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Probability = Favorable outcomes ÷ Total possible outcomes",
        "For compound events: multiply the probabilities",
        "P(not A) = 1 - P(A)"
      ],
      visualAid: '🎲'
    };
  },

  'statistics': (): ExerciseTemplate => {
    const statsTypes = [
      {
        type: 'mean',
        generate: () => {
          const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 10); // 10-29
          const mean = (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1);
          
          return {
            question: `Find the mean of: ${numbers.join(', ')}`,
            correctAnswer: mean,
            calculation: parseFloat(mean)
          };
        }
      },
      {
        type: 'median',
        generate: () => {
          const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 5); // 5-24
          const sorted = [...numbers].sort((a, b) => a - b);
          const median = sorted[2]; // Middle of 5 numbers
          
          return {
            question: `Find the median of: ${numbers.join(', ')}`,
            correctAnswer: median.toString(),
            calculation: median
          };
        }
      },
      {
        type: 'range',
        generate: () => {
          const numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 15) + 10); // 10-24
          const range = Math.max(...numbers) - Math.min(...numbers);
          
          return {
            question: `Find the range of: ${numbers.join(', ')}`,
            correctAnswer: range.toString(),
            calculation: range
          };
        }
      }
    ];

    const statsType = statsTypes[Math.floor(Math.random() * statsTypes.length)];
    const generated = statsType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      Math.floor(parseFloat(generated.correctAnswer) * 0.5),
      Math.floor(parseFloat(generated.correctAnswer) * 1.5)
    ).map(opt => opt.toString());

    return {
      id: `stats7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Mean = Sum of all numbers ÷ Count of numbers",
        "Median = Middle number when ordered",
        "Range = Largest number - Smallest number"
      ],
      visualAid: '📈'
    };
  },

  'scale-drawings': (): ExerciseTemplate => {
    const scaleTypes = [
      {
        type: 'scale-factor',
        generate: () => {
          const scale = Math.floor(Math.random() * 3) + 2; // 2-4
          const drawingMeasurement = Math.floor(Math.random() * 8) + 2; // 2-9
          const actualMeasurement = drawingMeasurement * scale;
          
          return {
            question: `A map scale is 1:${scale}. If two islands are ${drawingMeasurement} cm apart on the map, how far are they actually?`,
            correctAnswer: `${actualMeasurement} cm`,
            calculation: actualMeasurement
          };
        }
      },
      {
        type: 'reverse-scale',
        generate: () => {
          const actualMeasurement = Math.floor(Math.random() * 20) + 10; // 10-29
          const scale = Math.floor(Math.random() * 3) + 2; // 2-4
          const drawingMeasurement = (actualMeasurement / scale).toFixed(1);
          
          return {
            question: `Actual distance: ${actualMeasurement} cm. Scale: 1:${scale}. What is the map distance?`,
            correctAnswer: `${drawingMeasurement} cm`,
            calculation: parseFloat(drawingMeasurement)
          };
        }
      },
      {
        type: 'area-scale',
        generate: () => {
          const scale = Math.floor(Math.random() * 2) + 2; // 2-3
          const drawingArea = Math.floor(Math.random() * 10) + 5; // 5-14
          const actualArea = drawingArea * scale * scale;
          
          return {
            question: `Scale: 1:${scale}. Map area: ${drawingArea} cm². Actual area?`,
            correctAnswer: `${actualArea} cm²`,
            calculation: actualArea
          };
        }
      }
    ];

    const scaleType = scaleTypes[Math.floor(Math.random() * scaleTypes.length)];
    const generated = scaleType.generate();

    const numValue = parseFloat(generated.correctAnswer.split(' ')[0]);
    const options = ensureFourOptions(numValue.toString(), numValue * 0.5, numValue * 1.5)
      .map(opt => `${opt} ${generated.correctAnswer.includes('cm²') ? 'cm²' : 'cm'}`);

    return {
      id: `scale7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Length scale: multiply map measurement by scale factor",
        "Area scale: multiply map area by scale factor squared",
        "For reverse: divide actual measurement by scale factor"
      ],
      visualAid: '🗺️'
    };
  },

  'integer-operations': (): ExerciseTemplate => {
    const integerTypes = [
      {
        type: 'addition',
        generate: () => {
          const num1 = Math.floor(Math.random() * 20) - 10; // -10 to 9
          const num2 = Math.floor(Math.random() * 20) - 10; // -10 to 9
          const sum = num1 + num2;
          
          return {
            question: `${num1} + ${num2} = ?`,
            correctAnswer: sum.toString(),
            calculation: Math.abs(sum)
          };
        }
      },
      {
        type: 'subtraction',
        generate: () => {
          const num1 = Math.floor(Math.random() * 20) - 10; // -10 to 9
          const num2 = Math.floor(Math.random() * 20) - 10; // -10 to 9
          const difference = num1 - num2;
          
          return {
            question: `${num1} - ${num2} = ?`,
            correctAnswer: difference.toString(),
            calculation: Math.abs(difference)
          };
        }
      },
      {
        type: 'multiplication',
        generate: () => {
          const num1 = Math.floor(Math.random() * 12) - 6; // -6 to 5
          const num2 = Math.floor(Math.random() * 12) - 6; // -6 to 5
          const product = num1 * num2;
          
          return {
            question: `${num1} × ${num2} = ?`,
            correctAnswer: product.toString(),
            calculation: Math.abs(product)
          };
        }
      },
      {
        type: 'division',
        generate: () => {
          const divisor = Math.floor(Math.random() * 6) + 1; // 1-6 (positive)
          const quotient = Math.floor(Math.random() * 10) - 5; // -5 to 4
          const dividend = divisor * quotient;
          
          return {
            question: `${dividend} ÷ ${divisor} = ?`,
            correctAnswer: quotient.toString(),
            calculation: Math.abs(quotient)
          };
        }
      }
    ];

    const integerType = integerTypes[Math.floor(Math.random() * integerTypes.length)];
    const generated = integerType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      parseInt(generated.correctAnswer) - 10,
      parseInt(generated.correctAnswer) + 10
    );

    return {
      id: `integer7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Same signs: add and keep the sign",
        "Different signs: subtract and take the sign of the larger absolute value",
        "Multiplication/Division: same signs = positive, different signs = negative"
      ],
      visualAid: '🌡️'
    };
  },

  'multi-step-problems': (): ExerciseTemplate => {
    const problemTypes = [
      {
        type: 'shopping-problem',
        generate: () => {
          const item1 = Math.floor(Math.random() * 10) + 5; // 5-14
          const item2 = Math.floor(Math.random() * 15) + 10; // 10-24
          const discount = Math.floor(Math.random() * 3) * 10 + 10; // 10%, 20%, 30%
          const subtotal = item1 + item2;
          const discountAmount = subtotal * discount / 100;
          const finalPrice = Math.round(subtotal - discountAmount);
          
          return {
            question: `Item A: $${item1}, Item B: $${item2}. ${discount}% off entire purchase. Final price?`,
            correctAnswer: `$${finalPrice}`,
            calculation: finalPrice
          };
        }
      },
      {
        type: 'geometry-problem',
        generate: () => {
          const length = Math.floor(Math.random() * 6) + 5; // 5-10
          const width = Math.floor(Math.random() * 6) + 4; // 4-9
          const border = 1;
          const innerArea = (length - 2*border) * (width - 2*border);
          
          return {
            question: `Rectangle ${length}×${width} with 1-unit border. Inner rectangle area?`,
            correctAnswer: innerArea.toString(),
            calculation: innerArea
          };
        }
      },
      {
        type: 'age-problem',
        generate: () => {
          const currentAge = Math.floor(Math.random() * 10) + 20; // 20-29
          const years = Math.floor(Math.random() * 5) + 5; // 5-9
          const futureAge = currentAge + years;
          const twiceAge = futureAge * 2;
          
          return {
            question: `Now: ${currentAge} years old. In ${years} years, age will be half of what number?`,
            correctAnswer: twiceAge.toString(),
            calculation: twiceAge
          };
        }
      }
    ];

    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const generated = problemType.generate();

    const numValue = parseInt(generated.correctAnswer.replace('$', ''));
    const options = ensureFourOptions(numValue.toString(), numValue * 0.7, numValue * 1.3)
      .map(opt => generated.correctAnswer.includes('$') ? `$${opt}` : opt.toString());

    return {
      id: `multistep7-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Break complex problems into smaller steps",
        "Calculate intermediate results before final answer",
        "Check if your answer makes sense in context"
      ],
      visualAid: '🤿'
    };
  }
};