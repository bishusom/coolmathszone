// utils/exerciseGenerators/grade5.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { getCurrency } from '@/utils/currencyHelper';

export const grade5Generators = {
  'fractions': (): ExerciseTemplate => {
    const fractionTypes = [
      {
        type: 'addition-unlike',
        generate: () => {
          const denom1 = Math.floor(Math.random() * 4) + 2; // 2-5
          const denom2 = Math.floor(Math.random() * 4) + 3; // 3-6, different from denom1
          const num1 = Math.floor(Math.random() * (denom1 - 1)) + 1;
          const num2 = Math.floor(Math.random() * (denom2 - 1)) + 1;
          
          const commonDenom = denom1 * denom2;
          const converted1 = num1 * denom2;
          const converted2 = num2 * denom1;
          const sum = converted1 + converted2;
          
          // Simplify fraction if possible
          let simplifiedNum = sum;
          let simplifiedDenom = commonDenom;
          for (let i = 2; i <= Math.min(sum, commonDenom); i++) {
            if (sum % i === 0 && commonDenom % i === 0) {
              simplifiedNum = sum / i;
              simplifiedDenom = commonDenom / i;
            }
          }
          
          const correctAnswer = simplifiedDenom === commonDenom ? 
            `${sum}/${commonDenom}` : `${simplifiedNum}/${simplifiedDenom}`;
          
          return {
            question: `${num1}/${denom1} + ${num2}/${denom2} = ?`,
            correctAnswer: correctAnswer,
            calculation: sum
          };
        }
      },
      {
        type: 'multiplication',
        generate: () => {
          const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
          const denom1 = Math.floor(Math.random() * 5) + 2; // 2-6
          const num2 = Math.floor(Math.random() * 4) + 1; // 1-4
          const denom2 = Math.floor(Math.random() * 4) + 3; // 3-6
          
          const productNum = num1 * num2;
          const productDenom = denom1 * denom2;
          
          // Simplify
          let simplifiedNum = productNum;
          let simplifiedDenom = productDenom;
          for (let i = 2; i <= Math.min(productNum, productDenom); i++) {
            if (productNum % i === 0 && productDenom % i === 0) {
              simplifiedNum = productNum / i;
              simplifiedDenom = productDenom / i;
            }
          }
          
          const correctAnswer = simplifiedDenom === productDenom ? 
            `${productNum}/${productDenom}` : `${simplifiedNum}/${simplifiedDenom}`;
          
          return {
            question: `${num1}/${denom1} × ${num2}/${denom2} = ?`,
            correctAnswer: correctAnswer,
            calculation: productNum
          };
        }
      },
      {
        type: 'division',
        generate: () => {
          const num1 = Math.floor(Math.random() * 4) + 1; // 1-4
          const denom1 = Math.floor(Math.random() * 4) + 2; // 2-5
          const num2 = Math.floor(Math.random() * 3) + 1; // 1-3
          const denom2 = Math.floor(Math.random() * 3) + 2; // 2-4
          
          // Division: multiply by reciprocal
          const resultNum = num1 * denom2;
          const resultDenom = denom1 * num2;
          
          // Simplify
          let simplifiedNum = resultNum;
          let simplifiedDenom = resultDenom;
          for (let i = 2; i <= Math.min(resultNum, resultDenom); i++) {
            if (resultNum % i === 0 && resultDenom % i === 0) {
              simplifiedNum = resultNum / i;
              simplifiedDenom = resultDenom / i;
            }
          }
          
          const correctAnswer = simplifiedDenom === resultDenom ? 
            `${resultNum}/${resultDenom}` : `${simplifiedNum}/${simplifiedDenom}`;
          
          return {
            question: `${num1}/${denom1} ÷ ${num2}/${denom2} = ?`,
            correctAnswer: correctAnswer,
            calculation: resultNum
          };
        }
      }
    ];

    const fractionType = fractionTypes[Math.floor(Math.random() * fractionTypes.length)];
    const generated = fractionType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      1,
      generated.calculation * 2
    ).map(opt => {
      if (!opt.includes('/')) {
        const randomDenom = Math.floor(Math.random() * 8) + 2;
        return `${opt}/${randomDenom}`;
      }
      return opt;
    });

    return {
      id: `frac5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "For addition: find common denominator first",
        "For multiplication: multiply numerators and denominators",
        "For division: multiply by the reciprocal",
        "Always simplify your answer if possible"
      ],
      visualAid: '🧮'
    };
  },

  'volume': (): ExerciseTemplate => {
    const volumeTypes = [
      {
        type: 'rectangular-prism',
        generate: () => {
          const length = Math.floor(Math.random() * 6) + 3; // 3-8
          const width = Math.floor(Math.random() * 6) + 3; // 3-8
          const height = Math.floor(Math.random() * 6) + 3; // 3-8
          const volume = length * width * height;
          
          return {
            question: `What is the volume of a rectangular prism that is ${length} units long, ${width} units wide, and ${height} units tall?`,
            correctAnswer: volume.toString(),
            calculation: volume
          };
        }
      },
      {
        type: 'missing-dimension',
        generate: () => {
          const volume = Math.floor(Math.random() * 100) + 50; // 50-149
          const length = Math.floor(Math.random() * 5) + 3; // 3-7
          const width = Math.floor(Math.random() * 5) + 3; // 3-7
          const height = volume / (length * width);
          
          return {
            question: `A rectangular prism has a volume of ${volume} cubic units. If its length is ${length} units and width is ${width} units, what is its height?`,
            correctAnswer: height.toString(),
            calculation: height
          };
        }
      },
      {
        type: 'word-problem',
        generate: () => {
          const boxes = Math.floor(Math.random() * 4) + 2; // 2-5
          const length = Math.floor(Math.random() * 4) + 2; // 2-5
          const width = Math.floor(Math.random() * 4) + 2; // 2-5
          const height = Math.floor(Math.random() * 4) + 2; // 2-5
          const totalVolume = boxes * length * width * height;
          
          return {
            question: `There are ${boxes} boxes. Each box is ${length} units long, ${width} units wide, and ${height} units tall. What is the total volume of all boxes?`,
            correctAnswer: totalVolume.toString(),
            calculation: totalVolume
          };
        }
      }
    ];

    const volumeType = volumeTypes[Math.floor(Math.random() * volumeTypes.length)];
    const generated = volumeType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      Math.floor(parseFloat(generated.correctAnswer) * 0.5),
      Math.floor(parseFloat(generated.correctAnswer) * 1.5)
    );

    return {
      id: `volume5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.map(opt => `${opt} cubic units`),
      correctAnswer: `${generated.correctAnswer} cubic units`,
      hints: [
        "Volume of rectangular prism = length × width × height",
        "Make sure all dimensions are in the same units",
        "For missing dimensions: Volume ÷ (length × width) = height"
      ],
      visualAid: '📦'
    };
  },

  'coordinates': (): ExerciseTemplate => {
    const coordinateTypes = [
      {
        type: 'identify-point',
        generate: () => {
          const x = Math.floor(Math.random() * 5) + 1; // 1-5
          const y = Math.floor(Math.random() * 5) + 1; // 1-5
          
          return {
            question: `What are the coordinates of the point at (${x}, ${y})?`,
            correctAnswer: `(${x}, ${y})`,
            calculation: x + y
          };
        }
      },
      {
        type: 'plot-point',
        generate: () => {
          const x = Math.floor(Math.random() * 5) + 1; // 1-5
          const y = Math.floor(Math.random() * 5) + 1; // 1-5
          const quadrant = x > 0 && y > 0 ? 'I' : 'II';
          
          return {
            question: `In which quadrant is the point (${x}, ${y}) located?`,
            correctAnswer: `Quadrant ${quadrant}`,
            calculation: x
          };
        }
      },
      {
        type: 'distance',
        generate: () => {
          const x1 = Math.floor(Math.random() * 4) + 1; // 1-4
          const y1 = Math.floor(Math.random() * 4) + 1; // 1-4
          const x2 = x1 + Math.floor(Math.random() * 3) + 1; // 1-3 units away
          const y2 = y1 + Math.floor(Math.random() * 3) + 1; // 1-3 units away
          
          return {
            question: `What is the distance between points (${x1}, ${y1}) and (${x2}, ${y2})? Count the units.`,
            correctAnswer: (Math.abs(x2 - x1) + Math.abs(y2 - y1)).toString(),
            calculation: Math.abs(x2 - x1) + Math.abs(y2 - y1)
          };
        }
      }
    ];

    const coordinateType = coordinateTypes[Math.floor(Math.random() * coordinateTypes.length)];
    const generated = coordinateType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes('Quadrant')) {
      options = ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'];
    } else if (generated.correctAnswer.includes('(')) {
      const [x, y] = generated.correctAnswer.replace(/[()]/g, '').split(',').map(Number);
      options = [
        generated.correctAnswer,
        `(${y}, ${x})`,
        `(${x + 1}, ${y})`,
        `(${x}, ${y - 1})`
      ];
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, 8);
    }

    return {
      id: `coord5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Coordinates are (x, y) - horizontal first, then vertical",
        "Quadrant I: (+,+), Quadrant II: (-,+), Quadrant III: (-,-), Quadrant IV: (+,-)",
        "Distance: count how many units you move horizontally and vertically"
      ],
      visualAid: '🗺️'
    };
  },

  'word-problems': (): ExerciseTemplate => {
    const problemTypes = [
      {
        type: 'fraction-pizza',
        generate: () => {
          const totalSlices = 8;
          const eaten1 = Math.floor(Math.random() * 3) + 1; // 1-3
          const eaten2 = Math.floor(Math.random() * 3) + 1; // 1-3
          const remaining = totalSlices - eaten1 - eaten2;
          
          return {
            question: `A pizza is cut into ${totalSlices} equal slices. Sarah eats ${eaten1} slices and Mark eats ${eaten2} slices. What fraction of the pizza is left?`,
            correctAnswer: `${remaining}/${totalSlices}`,
            calculation: remaining
          };
        }
      },
      {
        type: 'area-garden',
        generate: () => {
          const length = Math.floor(Math.random() * 8) + 8; // 8-15
          const width = Math.floor(Math.random() * 6) + 5; // 5-10
          const area = length * width;
          
          return {
            question: `A rectangular garden is ${length} feet long and ${width} feet wide. What is the area of the garden?`,
            correctAnswer: area.toString(),
            calculation: area
          };
        }
      },
      {
        type: 'multiplication-books',
        generate: () => {
          const booksPerBox = Math.floor(Math.random() * 10) + 15; // 15-24
          const boxes = Math.floor(Math.random() * 6) + 3; // 3-8
          const totalBooks = booksPerBox * boxes;
          
          return {
            question: `If a box can hold ${booksPerBox} books and there are ${boxes} boxes, how many books are there in total?`,
            correctAnswer: totalBooks.toString(),
            calculation: totalBooks
          };
        }
      }
    ];

    const problemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const generated = problemType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer.includes('/') ? generated.correctAnswer.split('/')[0] : generated.correctAnswer,
      Math.floor(generated.calculation * 0.5),
      Math.floor(generated.calculation * 1.5)
    );

    // Handle fraction answers
    if (generated.correctAnswer.includes('/')) {
      const [num, den] = generated.correctAnswer.split('/');
      options[0] = generated.correctAnswer;
      options[1] = `${parseInt(num) + 1}/${den}`;
      options[2] = `${parseInt(num) - 1}/${den}`;
      options[3] = `${num}/${parseInt(den) + 2}`;
    }

    return {
      id: `word5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Read the problem carefully and identify what's being asked",
        "Look for key words that tell you what operation to use",
        "Check if your answer makes sense in the context"
      ],
      visualAid: '🤔'
    };
  },

  'percentage': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const percentageTypes = [
      {
        type: 'basic-percentage',
        generate: () => {
          const total = Math.floor(Math.random() * 40) + 10; // 10-49
          const percentage = Math.floor(Math.random() * 4) + 2; // 2-5 (20%, 25%, 33%, 50%)
          const percentValues = [20, 25, 33, 50];
          const selectedPercent = percentValues[percentage - 2];
          const result = Math.round(total * selectedPercent / 100);
          
          return {
            question: `What is ${selectedPercent}% of ${total}?`,
            correctAnswer: result.toString(),
            calculation: result
          };
        }
      },
      {
        type: 'percentage-of-money',
        generate: () => {
          const amount = (Math.random() * 40 + 10).toFixed(2); // $10-$50
          const percentage = 25; // 25% for simplicity
          const result = (parseFloat(amount) * 0.25).toFixed(2);
          
          return {
            question: `What is 25% of ${currency.symbol}${amount}?`,
            correctAnswer: `${currency.symbol}${result}`,
            calculation: parseFloat(result)
          };
        }
      },
      {
        type: 'percentage-calculation',
        generate: () => {
          const part = Math.floor(Math.random() * 15) + 5; // 5-19
          const whole = Math.floor(Math.random() * 30) + 20; // 20-49
          const percentage = Math.round((part / whole) * 100);
          
          return {
            question: `What percentage is ${part} of ${whole}?`,
            correctAnswer: `${percentage}%`,
            calculation: percentage
          };
        }
      }
    ];

    const percentageType = percentageTypes[Math.floor(Math.random() * percentageTypes.length)];
    const generated = percentageType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(currency.symbol)) {
      const numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
      options = ensureFourOptions(numericValue.toString(), 1, numericValue * 3)
        .map(opt => `${currency.symbol}${parseFloat(opt).toFixed(2)}`);
    } else if (generated.correctAnswer.includes('%')) {
      const percentValue = parseInt(generated.correctAnswer.replace('%', ''));
      options = ensureFourOptions(percentValue.toString(), 10, 100)
        .map(opt => `${opt}%`);
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 3);
    }

    return {
      id: `percent5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Percentage means 'per hundred' - divide by 100",
        "To find X% of a number: multiply the number by X/100",
        "To find what percentage A is of B: (A ÷ B) × 100"
      ],
      visualAid: '🏴‍☠️'
    };
  },

  'profit-loss': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const plTypes = [
      {
        type: 'profit-amount',
        generate: () => {
          const costPrice = (Math.random() * 30 + 10).toFixed(2); // $10-$40
          const sellingPrice = (parseFloat(costPrice) + Math.random() * 15 + 5).toFixed(2); // $5-$20 profit
          const profit = (parseFloat(sellingPrice) - parseFloat(costPrice)).toFixed(2);
          
          return {
            question: `A merchant buys an item for ${currency.symbol}${costPrice} and sells it for ${currency.symbol}${sellingPrice}. What is the profit?`,
            correctAnswer: `${currency.symbol}${profit}`,
            calculation: parseFloat(profit)
          };
        }
      },
      {
        type: 'loss-amount',
        generate: () => {
          const costPrice = (Math.random() * 40 + 20).toFixed(2); // $20-$60
          const sellingPrice = (parseFloat(costPrice) - Math.random() * 12 - 3).toFixed(2); // $3-$15 loss
          const loss = (parseFloat(costPrice) - parseFloat(sellingPrice)).toFixed(2);
          
          return {
            question: `A shopkeeper buys goods for ${currency.symbol}${costPrice} but has to sell them for ${currency.symbol}${sellingPrice}. What is the loss?`,
            correctAnswer: `${currency.symbol}${loss}`,
            calculation: parseFloat(loss)
          };
        }
      },
      {
        type: 'profit-percentage',
        generate: () => {
          const costPrice = Math.floor(Math.random() * 40) + 20; // 20-59
          const profit = Math.floor(Math.random() * 15) + 5; // 5-19
          const profitPercent = Math.round((profit / costPrice) * 100);
          
          return {
            question: `If the cost price is ${currency.symbol}${costPrice} and the profit is ${currency.symbol}${profit}, what is the profit percentage?`,
            correctAnswer: `${profitPercent}%`,
            calculation: profitPercent
          };
        }
      }
    ];

    const plType = plTypes[Math.floor(Math.random() * plTypes.length)];
    const generated = plType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(currency.symbol)) {
      const numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
      options = ensureFourOptions(numericValue.toString(), 1, numericValue * 2)
        .map(opt => `${currency.symbol}${parseFloat(opt).toFixed(2)}`);
    } else {
      const percentValue = parseInt(generated.correctAnswer.replace('%', ''));
      options = ensureFourOptions(percentValue.toString(), 10, 100)
        .map(opt => `${opt}%`);
    }

    return {
      id: `profit5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Profit = Selling Price - Cost Price",
        "Loss = Cost Price - Selling Price", 
        "Profit % = (Profit ÷ Cost Price) × 100",
        "Loss % = (Loss ÷ Cost Price) × 100"
      ],
      visualAid: '💰'
    };
  },

  'simple-interest': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const interestTypes = [
      {
        type: 'calculate-interest',
        generate: () => {
          const principal = Math.floor(Math.random() * 500) + 500; // 500-999
          const rate = Math.floor(Math.random() * 4) + 3; // 3-6%
          const time = Math.floor(Math.random() * 3) + 2; // 2-4 years
          const interest = Math.round((principal * rate * time) / 100);
          
          return {
            question: `Calculate the simple interest on ${currency.symbol}${principal} at ${rate}% per year for ${time} years.`,
            correctAnswer: `${currency.symbol}${interest}`,
            calculation: interest
          };
        }
      },
      {
        type: 'find-rate',
        generate: () => {
          const principal = Math.floor(Math.random() * 400) + 600; // 600-999
          const time = Math.floor(Math.random() * 3) + 2; // 2-4 years
          const interest = Math.floor(Math.random() * 100) + 50; // 50-149
          const rate = Math.round((interest * 100) / (principal * time));
          
          return {
            question: `The simple interest on ${currency.symbol}${principal} for ${time} years is ${currency.symbol}${interest}. What is the rate of interest?`,
            correctAnswer: `${rate}%`,
            calculation: rate
          };
        }
      }
    ];

    const interestType = interestTypes[Math.floor(Math.random() * interestTypes.length)];
    const generated = interestType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(currency.symbol)) {
      const numericValue = parseInt(generated.correctAnswer.replace(currency.symbol, ''));
      options = ensureFourOptions(numericValue.toString(), 10, numericValue * 2)
        .map(opt => `${currency.symbol}${opt}`);
    } else {
      const percentValue = parseInt(generated.correctAnswer.replace('%', ''));
      options = ensureFourOptions(percentValue.toString(), 1, 15)
        .map(opt => `${opt}%`);
    }

    return {
      id: `interest5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Simple Interest = (Principal × Rate × Time) ÷ 100",
        "Rate = (Interest × 100) ÷ (Principal × Time)",
        "Time = (Interest × 100) ÷ (Principal × Rate)"
      ],
      visualAid: '🏝️'
    };
  },

  'average-mean': (): ExerciseTemplate => {
    const averageTypes = [
      {
        type: 'basic-average',
        generate: () => {
          const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 10); // 10-29
          const sum = numbers.reduce((a, b) => a + b, 0);
          const average = Math.round(sum / numbers.length);
          
          return {
            question: `Find the average of: ${numbers.join(', ')}`,
            correctAnswer: average.toString(),
            calculation: average
          };
        }
      },
      {
        type: 'missing-number',
        generate: () => {
          const average = Math.floor(Math.random() * 15) + 10; // 10-24
          const count = 4;
          const numbers = Array.from({ length: count - 1 }, () => Math.floor(Math.random() * 10) + average - 5);
          const sumKnown = numbers.reduce((a, b) => a + b, 0);
          const missingNumber = average * count - sumKnown;
          
          return {
            question: `The average of 4 numbers is ${average}. Three numbers are ${numbers.join(', ')}. What is the fourth number?`,
            correctAnswer: missingNumber.toString(),
            calculation: missingNumber
          };
        }
      },
      {
        type: 'word-problem',
        generate: () => {
          const scores = Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 70); // 70-89
          const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
          
          return {
            question: `A student scored ${scores.join(', ')} on 4 tests. What is the average score?`,
            correctAnswer: average.toString(),
            calculation: average
          };
        }
      }
    ];

    const averageType = averageTypes[Math.floor(Math.random() * averageTypes.length)];
    const generated = averageType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      Math.floor(parseInt(generated.correctAnswer) * 0.7),
      Math.floor(parseInt(generated.correctAnswer) * 1.3)
    );

    return {
      id: `average5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Average = Sum of all numbers ÷ Count of numbers",
        "To find a missing number: Average × Count - Sum of known numbers",
        "Add all values first, then divide by how many there are"
      ],
      visualAid: '📏'
    };
  },

  'ratio-proportion': (): ExerciseTemplate => {
    const ratioTypes = [
      {
        type: 'simplify-ratio',
        generate: () => {
          const num1 = Math.floor(Math.random() * 8) + 2; // 2-9
          const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
          
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
        type: 'equivalent-ratio',
        generate: () => {
          const ratio1 = Math.floor(Math.random() * 3) + 2; // 2-4
          const ratio2 = Math.floor(Math.random() * 3) + 3; // 3-5
          const multiplier = Math.floor(Math.random() * 3) + 2; // 2-4
          
          return {
            question: `Which ratio is equivalent to ${ratio1}:${ratio2}?`,
            correctAnswer: `${ratio1 * multiplier}:${ratio2 * multiplier}`,
            calculation: ratio1 * multiplier
          };
        }
      },
      {
        type: 'proportion-word',
        generate: () => {
          const ratio1 = Math.floor(Math.random() * 3) + 2; // 2-4
          const ratio2 = Math.floor(Math.random() * 3) + 3; // 3-5
          const value1 = Math.floor(Math.random() * 4) + 3; // 3-6
          const value2 = Math.round((value1 * ratio2) / ratio1);
          
          return {
            question: `If ${ratio1} books cost ${ratio2} dollars, how much do ${value1} books cost?`,
            correctAnswer: `${value2}`,
            calculation: value2
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
        `${a * 2}:${b}`
      ];
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `ratio5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: [
        "Ratios can be simplified by dividing both numbers by their GCD",
        "Equivalent ratios: multiply or divide both numbers by the same value",
        "For proportions: set up as fraction and cross-multiply"
      ],
      visualAid: '🪸'
    };
  },

  'hcf-lcm': (): ExerciseTemplate => {
    const hcfLcmTypes = [
      {
        type: 'find-hcf',
        generate: () => {
          const num1 = Math.floor(Math.random() * 6) + 8; // 8-13
          const num2 = Math.floor(Math.random() * 6) + 12; // 12-17
          
          let a = num1, b = num2;
          while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
          }
          const hcf = a;
          
          return {
            question: `Find the Highest Common Factor (HCF) of ${num1} and ${num2}`,
            correctAnswer: hcf.toString(),
            calculation: hcf
          };
        }
      },
      {
        type: 'find-lcm',
        generate: () => {
          const num1 = Math.floor(Math.random() * 4) + 4; // 4-7
          const num2 = Math.floor(Math.random() * 4) + 6; // 6-9
          const lcm = (num1 * num2) / (() => {
            let a = num1, b = num2;
            while (b !== 0) {
              const temp = b;
              b = a % b;
              a = temp;
            }
            return a;
          })();
          
          return {
            question: `Find the Least Common Multiple (LCM) of ${num1} and ${num2}`,
            correctAnswer: lcm.toString(),
            calculation: lcm
          };
        }
      },
      {
        type: 'word-problem',
        generate: () => {
          const num1 = Math.floor(Math.random() * 3) + 3; // 3-5
          const num2 = Math.floor(Math.random() * 3) + 4; // 4-6
          const lcm = num1 * num2; // Since they're usually coprime in this range
          
          return {
            question: `Two traffic lights change every ${num1} and ${num2} minutes. How many minutes until they both change at the same time?`,
            correctAnswer: lcm.toString(),
            calculation: lcm
          };
        }
      }
    ];

    const hcfLcmType = hcfLcmTypes[Math.floor(Math.random() * hcfLcmTypes.length)];
    const generated = hcfLcmType.generate();

    const options = ensureFourOptions(
      generated.correctAnswer,
      1,
      generated.calculation * 2
    );

    return {
      id: `hcflcm5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "HCF: largest number that divides both numbers evenly",
        "LCM: smallest number that is a multiple of both numbers",
        "HCF × LCM = Product of the two numbers",
        "Use prime factorization for larger numbers"
      ],
      visualAid: '🐟'
    };
  },

  'decimal-operations': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const decimalTypes = [
      {
        type: 'multiplication',
        generate: () => {
          const decimal1 = (Math.random() * 9 + 1).toFixed(1); // 1.0-9.9
          const decimal2 = (Math.random() * 4 + 1).toFixed(1); // 1.0-4.9
          const product = (parseFloat(decimal1) * parseFloat(decimal2)).toFixed(2);
          
          return {
            question: `${decimal1} × ${decimal2} = ?`,
            correctAnswer: product,
            calculation: parseFloat(product)
          };
        }
      },
      {
        type: 'division',
        generate: () => {
          const dividend = (Math.random() * 9 + 1).toFixed(1); // 1.0-9.9
          const divisor = Math.floor(Math.random() * 3) + 2; // 2-4
          const quotient = (parseFloat(dividend) / divisor).toFixed(2);
          
          return {
            question: `${dividend} ÷ ${divisor} = ?`,
            correctAnswer: quotient,
            calculation: parseFloat(quotient)
          };
        }
      },
      {
        type: 'money-multiplication',
        generate: () => {
          const price = (Math.random() * 8 + 2).toFixed(2); // $2-$10
          const quantity = Math.floor(Math.random() * 5) + 3; // 3-7
          const total = (parseFloat(price) * quantity).toFixed(2);
          
          return {
            question: `If one item costs ${currency.symbol}${price}, how much do ${quantity} items cost?`,
            correctAnswer: `${currency.symbol}${total}`,
            calculation: parseFloat(total)
          };
        }
      }
    ];

    const decimalType = decimalTypes[Math.floor(Math.random() * decimalTypes.length)];
    const generated = decimalType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(currency.symbol)) {
      const numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
      options = ensureFourOptions(numericValue.toString(), numericValue * 0.5, numericValue * 1.5)
        .map(opt => `${currency.symbol}${parseFloat(opt).toFixed(2)}`);
    } else {
      const numericValue = parseFloat(generated.correctAnswer);
      options = ensureFourOptions(numericValue.toString(), numericValue * 0.5, numericValue * 1.5)
        .map(opt => parseFloat(opt).toFixed(2));
    }

    return {
      id: `decimal5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "For multiplication: count decimal places in factors for product",
        "For division: move decimal points to make divisor whole number",
        "Align decimal points when adding/subtracting",
        "Use estimation to check if your answer is reasonable"
      ],
      visualAid: '💨'
    };
  },

  'unitary-method': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const unitaryTypes = [
      {
        type: 'direct-proportion',
        generate: () => {
          const unitPrice = (Math.random() * 5 + 3).toFixed(2); // $3-$8
          const quantity = Math.floor(Math.random() * 6) + 5; // 5-10
          const total = (parseFloat(unitPrice) * quantity).toFixed(2);
          
          return {
            question: `If 1 item costs ${currency.symbol}${unitPrice}, how much do ${quantity} items cost?`,
            correctAnswer: `${currency.symbol}${total}`,
            calculation: parseFloat(total)
          };
        }
      },
      {
        type: 'inverse-proportion',
        generate: () => {
          const workers = Math.floor(Math.random() * 3) + 3; // 3-5
          const days = Math.floor(Math.random() * 4) + 4; // 4-7
          const newWorkers = workers + Math.floor(Math.random() * 2) + 1; // 1-2 more workers
          const newDays = Math.round((workers * days) / newWorkers);
          
          return {
            question: `If ${workers} workers can complete a job in ${days} days, how many days will ${newWorkers} workers take?`,
            correctAnswer: newDays.toString(),
            calculation: newDays
          };
        }
      },
      {
        type: 'rate-problem',
        generate: () => {
          const distance = Math.floor(Math.random() * 30) + 20; // 20-49 km
          const time = Math.floor(Math.random() * 3) + 2; // 2-4 hours
          const speed = Math.round(distance / time);
          const newTime = Math.floor(Math.random() * 3) + 3; // 3-5 hours
          const newDistance = speed * newTime;
          
          return {
            question: `A car travels ${distance} km in ${time} hours. How far will it travel in ${newTime} hours at the same speed?`,
            correctAnswer: newDistance.toString(),
            calculation: newDistance
          };
        }
      }
    ];

    const unitaryType = unitaryTypes[Math.floor(Math.random() * unitaryTypes.length)];
    const generated = unitaryType.generate();

    let options: string[] = [];
    if (generated.correctAnswer.includes(currency.symbol)) {
      const numericValue = parseFloat(generated.correctAnswer.replace(currency.symbol, ''));
      options = ensureFourOptions(numericValue.toString(), numericValue * 0.5, numericValue * 1.5)
        .map(opt => `${currency.symbol}${parseFloat(opt).toFixed(2)}`);
    } else {
      options = ensureFourOptions(generated.correctAnswer, 1, generated.calculation * 2);
    }

    return {
      id: `unitary5-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: [
        "Unitary method: find value for one unit first",
        "For direct proportion: more units = more value",
        "For inverse proportion: more workers = less time",
        "Find the rate per unit, then multiply by required units"
      ],
      visualAid: '🐋'
    };
  }
};