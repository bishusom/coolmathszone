// utils/exerciseGenerators/grade6.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { getCurrency } from '@/utils/currencyHelper';

export const grade6Generators = {
  'ratios': (): ExerciseTemplate => {
    const ratioTypes = [
      {
        type: 'simplify-ratio',
        generate: () => {
          const num1 = Math.floor(Math.random() * 12) + 4; // 4-15
          const num2 = Math.floor(Math.random() * 12) + 4; // 4-15
          
          // Find GCD to simplify
          let a = num1, b = num2;
          while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
          }
          const gcd = a;
          
          const simplified = `${num1 / gcd}:${num2 / gcd}`;
          
          return {
            question: `Simplify the ratio ${num1}:${num2}`,
            correctAnswer: simplified,
            calculation: num1 + num2
          };
        }
      },
      {
        type: 'equivalent-ratios',
        generate: () => {
          const ratio1 = Math.floor(Math.random() * 3) + 2; // 2-4
          const ratio2 = Math.floor(Math.random() * 3) + 3; // 3-5
          const multiplier = Math.floor(Math.random() * 4) + 2; // 2-5
          
          return {
            question: `Which ratio is equivalent to ${ratio1}:${ratio2}?`,
            correctAnswer: `${ratio1 * multiplier}:${ratio2 * multiplier}`,
            calculation: ratio1 * multiplier
          };
        }
      },
      {
        type: 'ratio-word-problem',
        generate: () => {
          const boys = Math.floor(Math.random() * 6) + 5; // 5-10
          const girls = Math.floor(Math.random() * 6) + 8; // 8-13
          const ratio = `${boys}:${girls}`;
          
          return {
            question: `In a class, the ratio of boys to girls is ${ratio}. If there are ${boys} boys, how many girls are there?`,
            correctAnswer: girls.toString(),
            calculation: girls
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
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `ratio6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Simplify ratios by dividing both numbers by their greatest common factor",
        "Equivalent ratios can be found by multiplying or dividing both numbers by the same value",
        "Set up proportions to solve ratio word problems"
      ],
      visualAid: '🦀'
    };
  },

  'rates-unit-rates': (): ExerciseTemplate => {
    const rateTypes = [
      {
        type: 'unit-rate',
        generate: () => {
          const amount = Math.floor(Math.random() * 30) + 20; // 20-49
          const units = Math.floor(Math.random() * 5) + 3; // 3-7
          const unitRate = (amount / units).toFixed(2);
          
          return {
            question: `Find the unit rate: ${amount} miles in ${units} hours`,
            correctAnswer: `${unitRate} miles per hour`,
            calculation: parseFloat(unitRate)
          };
        }
      },
      {
        type: 'compare-rates',
        generate: () => {
          const rate1 = (Math.random() * 8 + 4).toFixed(2); // 4-12 per unit
          const rate2 = (Math.random() * 8 + 3).toFixed(2); // 3-11 per unit
          const betterRate = parseFloat(rate1) < parseFloat(rate2) ? 'A' : 'B';
          
          return {
            question: `Store A: $${rate1} per pound, Store B: $${rate2} per pound. Which store has the better price?`,
            correctAnswer: betterRate,
            calculation: parseFloat(rate1)
          };
        }
      },
      {
        type: 'rate-word-problem',
        generate: () => {
          const speed = Math.floor(Math.random() * 40) + 30; // 30-69 mph
          const time = Math.floor(Math.random() * 4) + 2; // 2-5 hours
          const distance = speed * time;
          
          return {
            question: `A car travels at ${speed} miles per hour. How far will it travel in ${time} hours?`,
            correctAnswer: distance.toString(),
            calculation: distance
          };
        }
      }
    ];

    const rateType = rateTypes[Math.floor(Math.random() * rateTypes.length)];
    const generated = rateType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('miles per hour')) {
      const rateValue = parseFloat(generated.correctAnswer.split(' ')[0]);
      options = ensureFourOptions(rateValue.toString(), rateValue * 0.5, rateValue * 1.5)
        .map(opt => `${opt} miles per hour`);
    } else if (generated.correctAnswer === 'A' || generated.correctAnswer === 'B') {
      options = ['A', 'B', 'Both are same', 'Cannot determine'];
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `rate6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Unit rate = Total amount ÷ Number of units",
        "Lower price per unit is usually better",
        "Distance = Speed × Time"
      ],
      visualAid: '⚡'
    };
  },

  'negative-numbers': (): ExerciseTemplate => {
    const negativeTypes = [
      {
        type: 'compare-integers',
        generate: () => {
          const num1 = Math.floor(Math.random() * 10) - 5; // -5 to 4
          const num2 = Math.floor(Math.random() * 10) - 5; // -5 to 4
          const comparison = num1 > num2 ? '>' : num1 < num2 ? '<' : '=';
          
          return {
            question: `Compare: ${num1} ? ${num2}`,
            correctAnswer: comparison,
            calculation: Math.abs(num1)
          };
        }
      },
      {
        type: 'order-integers',
        generate: () => {
          const numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 15) - 7); // -7 to 7
          const sorted = [...numbers].sort((a, b) => a - b);
          
          return {
            question: `Order these numbers from least to greatest: ${numbers.join(', ')}`,
            correctAnswer: sorted.join(', '),
            calculation: numbers[0]
          };
        }
      },
      {
        type: 'real-world-negative',
        generate: () => {
          const scenarios = [
            { situation: "temperature below zero", value: Math.floor(Math.random() * 10) - 15, unit: "°C" }, // -15 to -5
            { situation: "elevation below sea level", value: Math.floor(Math.random() * 100) - 200, unit: "feet" }, // -200 to -100
            { situation: "debt", value: Math.floor(Math.random() * 50) - 100, unit: "dollars" } // -100 to -50
          ];
          const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
          
          return {
            question: `Which number represents ${scenario.situation}?`,
            correctAnswer: scenario.value.toString(),
            calculation: Math.abs(scenario.value)
          };
        }
      }
    ];

    const negativeType = negativeTypes[Math.floor(Math.random() * negativeTypes.length)];
    const generated = negativeType.generate();

    let options: string[] = [];
    if (generated.correctAnswer === '>' || generated.correctAnswer === '<' || generated.correctAnswer === '=') {
      options = ['>', '<', '=', '≠'];
    } else if (generated.correctAnswer.includes(',')) {
      const numbers = generated.correctAnswer.split(', ').map(Number);
      options = [
        generated.correctAnswer,
        numbers.reverse().join(', '),
        numbers.sort((a, b) => b - a).join(', '),
        numbers.map(n => n + 1).join(', ')
      ];
    } else {
      const correctNum = parseInt(generated.correctAnswer);
      options = [
        generated.correctAnswer,
        (correctNum * -1).toString(),
        (correctNum + 5).toString(),
        (correctNum - 5).toString()
      ];
    }

    return {
      id: `negative6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Numbers to the right are greater on a number line",
        "Negative numbers get smaller as they move away from zero",
        "Think about real-world contexts: below zero, below sea level, debt"
      ],
      visualAid: '🌡️'
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
      id: `integer6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Same signs: add and keep the sign",
        "Different signs: subtract and take the sign of the larger number",
        "Multiplication/Division: same signs = positive, different signs = negative"
      ],
      visualAid: '🌡️'
    };
  },

  'algebra-expressions': (): ExerciseTemplate => {
    const expressionTypes = [
      {
        type: 'evaluate-expression',
        generate: () => {
          const x = Math.floor(Math.random() * 5) + 2; // 2-6
          const coefficient = Math.floor(Math.random() * 3) + 2; // 2-4
          const constant = Math.floor(Math.random() * 5) + 1; // 1-5
          const result = coefficient * x + constant;
          
          return {
            question: `Evaluate ${coefficient}x + ${constant} when x = ${x}`,
            correctAnswer: result.toString(),
            calculation: result
          };
        }
      },
      {
        type: 'write-expression',
        generate: () => {
          const operations = [
            { phrase: "5 more than x", expression: "x + 5" },
            { phrase: "3 times x", expression: "3x" },
            { phrase: "x decreased by 2", expression: "x - 2" },
            { phrase: "half of x", expression: "x/2" }
          ];
          const operation = operations[Math.floor(Math.random() * operations.length)];
          
          return {
            question: `Write an expression for: ${operation.phrase}`,
            correctAnswer: operation.expression,
            calculation: 0
          };
        }
      },
      {
        type: 'identify-parts',
        generate: () => {
          const coefficient = Math.floor(Math.random() * 4) + 2; // 2-5
          const variable = 'y';
          const constant = Math.floor(Math.random() * 6) + 1; // 1-6
          const expression = `${coefficient}${variable} + ${constant}`;
          
          return {
            question: `In the expression ${expression}, what is the constant?`,
            correctAnswer: constant.toString(),
            calculation: constant
          };
        }
      }
    ];

    const expressionType = expressionTypes[Math.floor(Math.random() * expressionTypes.length)];
    const generated = expressionType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('x')) {
      const similarExpressions = [
        generated.correctAnswer,
        generated.correctAnswer.replace('+', '-'),
        generated.correctAnswer.replace('x', '') + 'x',
        'x' + generated.correctAnswer.replace('x', '')
      ];
      options = similarExpressions;
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation + 10);
    }

    return {
      id: `algebra6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Substitute the given value for the variable",
        "Look for key words: 'more than' means add, 'times' means multiply",
        "Constants are numbers without variables"
      ],
      visualAid: '📝'
    };
  },

  'algebraic-expressions': (): ExerciseTemplate => {
    const advancedExpressionTypes = [
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
          const x = Math.floor(Math.random() * 3) + 2; // 2-4
          const y = Math.floor(Math.random() * 3) + 1; // 1-3
          const result = 2*x + 3*y + 5;
          
          return {
            question: `Evaluate 2x + 3y + 5 when x = ${x} and y = ${y}`,
            correctAnswer: result.toString(),
            calculation: result
          };
        }
      }
    ];

    const expressionType = advancedExpressionTypes[Math.floor(Math.random() * advancedExpressionTypes.length)];
    const generated = expressionType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('x')) {
      const parts = generated.correctAnswer.split(' + ');
      options = [
        generated.correctAnswer,
        parts.reverse().join(' + '),
        generated.correctAnswer.replace('+', '-'),
        generated.correctAnswer.replace(/x/g, 'y').replace(/y/g, 'x')
      ];
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `algexpr6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  'algebra-equations': (): ExerciseTemplate => {
    const equationTypes = [
      {
        type: 'one-step-addition',
        generate: () => {
          const solution = Math.floor(Math.random() * 10) + 1; // 1-10
          const constant = Math.floor(Math.random() * 8) + 2; // 2-9
          const equation = `x + ${constant} = ${solution + constant}`;
          
          return {
            question: `Solve: ${equation}`,
            correctAnswer: solution.toString(),
            calculation: solution
          };
        }
      },
      {
        type: 'one-step-multiplication',
        generate: () => {
          const solution = Math.floor(Math.random() * 6) + 2; // 2-7
          const coefficient = Math.floor(Math.random() * 4) + 2; // 2-5
          const equation = `${coefficient}x = ${coefficient * solution}`;
          
          return {
            question: `Solve: ${equation}`,
            correctAnswer: solution.toString(),
            calculation: solution
          };
        }
      },
      {
        type: 'two-step',
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
      }
    ];

    const equationType = equationTypes[Math.floor(Math.random() * equationTypes.length)];
    const generated = equationType.generate();

    const options = ensureFourOptions(generated.correctAnswer, 1, 15);

    return {
      id: `equation6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "For addition equations: subtract from both sides",
        "For multiplication equations: divide both sides",
        "For two-step: undo addition/subtraction first, then multiplication/division"
      ],
      visualAid: '🪸'
    };
  },

  'commercial-math': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const commercialTypes = [
      {
        type: 'discount',
        generate: () => {
          const originalPrice = Math.floor(Math.random() * 5000 + 3000) / 100; // $30.00-$79.99
          const discountPercent = Math.floor(Math.random() * 4) * 10 + 10; // 10%, 20%, 30%, 40%
          const discountAmount = (originalPrice * discountPercent / 100);
          const salePrice = (originalPrice - discountAmount);
          
          return {
            question: `A ${currency.symbol}${originalPrice.toFixed(2)} item is ${discountPercent}% off. What is the sale price?`,
            correctAnswer: `${currency.symbol}${salePrice.toFixed(2)}`,
            calculation: salePrice
          };
        }
      },
      {
        type: 'commission',
        generate: () => {
          const sales = Math.floor(Math.random() * 20000 + 30000) / 10; // $3000.0-$4999.9
          const commissionRate = Math.floor(Math.random() * 4) + 3; // 3-6%
          const commission = (sales * commissionRate / 100);
          
          return {
            question: `A salesperson earns ${commissionRate}% commission on ${currency.symbol}${sales.toFixed(2)} in sales. How much commission?`,
            correctAnswer: `${currency.symbol}${commission.toFixed(2)}`,
            calculation: commission
          };
        }
      },
      {
        type: 'compound-interest',
        generate: () => {
          const principal = Math.floor(Math.random() * 10000 + 10000) / 10; // $1000.0-$1999.9
          const rate = Math.floor(Math.random() * 3) + 4; // 4-6%
          const years = 2;
          const amount = principal * Math.pow(1 + rate/100, years);
          
          return {
            question: `${currency.symbol}${principal.toFixed(2)} invested at ${rate}% annual compound interest for ${years} years grows to?`,
            correctAnswer: `${currency.symbol}${amount.toFixed(2)}`,
            calculation: amount
          };
        }
      },
      {
        type: 'simple-interest',
        generate: () => {
          const principal = Math.floor(Math.random() * 8000 + 2000) / 100; // $20.00-$99.99
          const rate = Math.floor(Math.random() * 5) + 3; // 3-7%
          const years = Math.floor(Math.random() * 3) + 2; // 2-4 years
          const interest = principal * rate * years / 100;
          const total = principal + interest;
          
          return {
            question: `${currency.symbol}${principal.toFixed(2)} invested at ${rate}% simple interest for ${years} years. What is the total amount?`,
            correctAnswer: `${currency.symbol}${total.toFixed(2)}`,
            calculation: total
          };
        }
      },
      {
        type: 'tax-calculation',
        generate: () => {
          const price = Math.floor(Math.random() * 4000 + 1000) / 100; // $10.00-$49.99
          const taxRate = Math.floor(Math.random() * 4) + 6; // 6-9%
          const taxAmount = price * taxRate / 100;
          const total = price + taxAmount;
          
          return {
            question: `An item costs ${currency.symbol}${price.toFixed(2)}. With ${taxRate}% sales tax, what is the total?`,
            correctAnswer: `${currency.symbol}${total.toFixed(2)}`,
            calculation: total
          };
        }
      }
    ];

    const commercialType = commercialTypes[Math.floor(Math.random() * commercialTypes.length)];
    const generated = commercialType.generate();

    const numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
    
    // Generate options with proper decimal formatting
    const options = ensureFourOptions(numericValue.toString(), numericValue * 0.7, numericValue * 1.3)
      .map(opt => {
        const num = parseFloat(opt);
        // Ensure we don't get weird floating point precision
        const rounded = Math.round(num * 100) / 100;
        return `${currency.symbol}${rounded.toFixed(2)}`;
      });

    // Ensure correct answer is properly formatted and in options
    const correctAnswerFormatted = `${currency.symbol}${numericValue.toFixed(2)}`;
    if (!options.includes(correctAnswerFormatted)) {
      options[Math.floor(Math.random() * options.length)] = correctAnswerFormatted;
    }

    const hints = [
      "Sale price = Original price - (Original price × Discount %)",
      "Commission = Sales amount × Commission rate",
      "Compound interest: A = P(1 + r)^t where A = amount, P = principal, r = rate, t = time",
      "Simple interest: Total = Principal + (Principal × Rate × Time)",
      "Total with tax = Price + (Price × Tax rate)"
    ];

    return {
      id: `commercial6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: correctAnswerFormatted,
      hints: [hints[commercialTypes.indexOf(commercialType)], ...hints.slice(0, 2)],
      visualAid: '🏪'
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
        type: 'composite-figure',
        generate: () => {
          const rectangleArea = Math.floor(Math.random() * 20) + 15; // 15-34
          const triangleArea = Math.floor(Math.random() * 10) + 5; // 5-14
          const totalArea = rectangleArea + triangleArea;
          
          return {
            question: `A figure is made of a rectangle with area ${rectangleArea} and a triangle with area ${triangleArea}. What is the total area?`,
            correctAnswer: totalArea.toString(),
            calculation: totalArea
          };
        }
      }
    ];

    const areaType = areaTypes[Math.floor(Math.random() * areaTypes.length)];
    const generated = areaType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      Math.floor(parseFloat(generated.correctAnswer) * 0.5),
      Math.floor(parseFloat(generated.correctAnswer) * 1.5)
    );

    return {
      id: `area6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Triangle area = ½ × base × height",
        "Parallelogram area = base × height",
        "For composite figures: add the areas of the simple shapes"
      ],
      visualAid: '🔷'
    };
  },

  'surface-area': (): ExerciseTemplate => {
    const surfaceAreaTypes = [
      {
        type: 'rectangular-prism',
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
        type: 'cube',
        generate: () => {
          const side = Math.floor(Math.random() * 4) + 3; // 3-6
          const surfaceArea = 6 * side * side;
          
          return {
            question: `Find the surface area of a cube with side length ${side}`,
            correctAnswer: surfaceArea.toString(),
            calculation: surfaceArea
          };
        }
      },
      {
        type: 'word-problem',
        generate: () => {
          const side = Math.floor(Math.random() * 3) + 2; // 2-4
          const surfaceArea = 6 * side * side;
          
          return {
            question: `How much wrapping paper is needed to cover a cube-shaped box with side ${side} units?`,
            correctAnswer: surfaceArea.toString(),
            calculation: surfaceArea
          };
        }
      }
    ];

    const surfaceAreaType = surfaceAreaTypes[Math.floor(Math.random() * surfaceAreaTypes.length)];
    const generated = surfaceAreaType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      Math.floor(parseInt(generated.correctAnswer) * 0.6),
      Math.floor(parseInt(generated.correctAnswer) * 1.4)
    );

    return {
      id: `surface6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Surface area of rectangular prism = 2(lw + lh + wh)",
        "Surface area of cube = 6 × side²",
        "Surface area is the total area of all faces"
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
        type: 'diameter-circumference',
        generate: () => {
          const diameter = Math.floor(Math.random() * 8) + 4; // 4-11
          const circumference = (Math.PI * diameter).toFixed(1);
          
          return {
            question: `Find the circumference of a circle with diameter ${diameter} (use π = 3.14)`,
            correctAnswer: circumference,
            calculation: parseFloat(circumference)
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
      id: `circle6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Circumference = 2πr or πd",
        "Area of circle = πr²",
        "Diameter = 2 × radius"
      ],
      visualAid: '⭕'
    };
  },

  'statistics-probability': (): ExerciseTemplate => {
    const statsTypes = [
      {
        type: 'mean',
        generate: () => {
          const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 10); // 10-29
          const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
          
          return {
            question: `Find the mean of: ${numbers.join(', ')}`,
            correctAnswer: mean.toString(),
            calculation: mean
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
    );

    return {
      id: `stats6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Mean = Sum of all numbers ÷ Count of numbers",
        "Median = Middle number when ordered",
        "Range = Largest number - Smallest number"
      ],
      visualAid: '🎲'
    };
  },

  'data-graphs': (): ExerciseTemplate => {
    const graphTypes = [
      {
        type: 'histogram-interpret',
        generate: () => {
          const values = [5, 8, 12, 7, 3];
          const total = values.reduce((a, b) => a + b, 0);
          
          return {
            question: `A histogram shows frequency: 0-10: ${values[0]}, 11-20: ${values[1]}, 21-30: ${values[2]}, 31-40: ${values[3]}, 41-50: ${values[4]}. How many total data points?`,
            correctAnswer: total.toString(),
            calculation: total
          };
        }
      },
      {
        type: 'pie-chart',
        generate: () => {
          const percentages = [25, 30, 20, 25];
          const total = 100;
          const angle = (percentages[1] / 100) * 360; // 30% of 360°
          
          return {
            question: `A pie chart shows: 25%, 30%, 20%, 25%. What angle represents the 30% section?`,
            correctAnswer: '108°',
            calculation: 108
          };
        }
      },
      {
        type: 'box-plot',
        generate: () => {
          const numbers = [12, 15, 18, 22, 25, 28, 32];
          const median = 22;
          
          return {
            question: `A box plot shows data: 12, 15, 18, 22, 25, 28, 32. What is the median?`,
            correctAnswer: median.toString(),
            calculation: median
          };
        }
      }
    ];

    const graphType = graphTypes[Math.floor(Math.random() * graphTypes.length)];
    const generated = graphType.generate();

    const options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);

    return {
      id: `graphs6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Histograms show frequency in intervals",
        "Pie chart angles: Percentage × 3.6 = Degrees",
        "Box plot median is the middle line in the box"
      ],
      visualAid: '📈'
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
      },
      {
        type: 'simple-event',
        generate: () => {
          const sides = 6;
          const event = Math.floor(Math.random() * 2) + 2; // 2 or 3
          const probability = event === 2 ? '1/3' : '1/2';
          
          return {
            question: `Roll a die. P(even number) = ?`,
            correctAnswer: probability,
            calculation: event
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
      id: `prob6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Probability = Favorable outcomes ÷ Total possible outcomes",
        "P(not A) = 1 - P(A)",
        "For a fair die, each number has probability 1/6"
      ],
      visualAid: '🎯'
    };
  }
};