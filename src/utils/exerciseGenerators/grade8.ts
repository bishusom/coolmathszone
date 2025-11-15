// utils/exerciseGenerators/grade8.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { getCurrency } from '@/utils/currencyHelper';

// Grade 8 Generators
export const grade8Generators = {
  'pythagorean-theorem': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'find-hypotenuse',
        generate: () => {
          const a = Math.floor(Math.random() * 12) + 1;
          const b = Math.floor(Math.random() * 12) + 1;
          const c = Math.sqrt(a * a + b * b);
          return {
            question: `Find the hypotenuse of a right triangle with legs ${a} and ${b}`,
            answer: c.toFixed(2),
            hint: 'Use a² + b² = c²',
            visualAid: '📐'
          };
        }
      },
      {
        type: 'find-leg',
        generate: () => {
          const c = Math.floor(Math.random() * 15) + 10;
          const a = Math.floor(Math.random() * (c - 5)) + 3;
          const b = Math.sqrt(c * c - a * a);
          return {
            question: `A right triangle has hypotenuse ${c} and one leg ${a}. Find the other leg.`,
            answer: b.toFixed(2),
            hint: 'Use c² - a² = b²',
            visualAid: '📐'
          };
        }
      },
      {
        type: 'real-world',
        generate: () => {
          const a = Math.floor(Math.random() * 20) + 5;
          const b = Math.floor(Math.random() * 20) + 5;
          const c = Math.sqrt(a * a + b * b);
          const scenarios = [
            `A ladder leans against a wall. The base is ${a} feet from the wall and reaches ${b} feet high. How long is the ladder?`,
            `You walk ${a} blocks east and ${b} blocks north. How far are you from your starting point?`,
            `A rectangular field is ${a}m by ${b}m. How long is the diagonal?`
          ];
          return {
            question: scenarios[Math.floor(Math.random() * scenarios.length)],
            answer: c.toFixed(2),
            hint: 'This is a Pythagorean theorem application',
            visualAid: '🏗️'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const correctNum = parseFloat(generated.answer);
    const options = ensureFourOptions(correctNum.toString(), 1, Math.max(30, correctNum * 2))
      .map(opt => parseFloat(opt).toFixed(2));

    return {
      id: `pythag-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'Remember to square the numbers first', 'Take the square root at the end'],
      visualAid: generated.visualAid
    };
  },

  'functions': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'function-notation',
        generate: () => {
          const x = Math.floor(Math.random() * 10) + 1;
          const a = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          const result = a * x + b;
          
          return {
            question: `If f(x) = ${a}x + ${b}, what is f(${x})?`,
            answer: result.toString(),
            hint: `Replace x with ${x} in the function`,
            visualAid: '𝑓'
          };
        }
      },
      {
        type: 'input-output',
        generate: () => {
          const inputs = [1, 2, 3, 4];
          const rule = Math.floor(Math.random() * 3) + 2;
          const operation = ['+', '×', '-'][Math.floor(Math.random() * 3)];
          const constant = Math.floor(Math.random() * 5) + 1;
          
          let question = '';
          let answer = '';
          
          if (operation === '+') {
            question = `If input ${inputs[0]} → output ${inputs[0] + constant}, input ${inputs[1]} → output ${inputs[1] + constant}, what is the function rule?`;
            answer = `x + ${constant}`;
          } else if (operation === '×') {
            question = `If input ${inputs[0]} → output ${inputs[0] * rule}, input ${inputs[1]} → output ${inputs[1] * rule}, what is the function rule?`;
            answer = `${rule}x`;
          } else {
            question = `If input ${inputs[0]} → output ${inputs[0] - constant}, input ${inputs[1]} → output ${inputs[1] - constant}, what is the function rule?`;
            answer = `x - ${constant}`;
          }
          
          return { question, answer, hint: 'Look for the pattern between input and output', visualAid: '🔄' };
        }
      },
      {
        type: 'function-identification',
        generate: () => {
          const pairs = [
            { input: 1, output: 2 },
            { input: 2, output: 4 },
            { input: 3, output: 6 }
          ];
          
          return {
            question: `Do these pairs represent a function? (${pairs.map(p => `${p.input}→${p.output}`).join(', ')})`,
            answer: 'Yes',
            hint: 'Each input has exactly one output',
            visualAid: '✓'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const options = generated.answer === 'Yes' 
      ? ['Yes', 'No', 'Sometimes', 'Cannot determine']
      : ensureFourOptions(generated.answer, 1, 30);

    return {
      id: `func-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'A function gives one output for each input'],
      visualAid: generated.visualAid
    };
  },

  'transformations': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'translation',
        generate: () => {
          const x = Math.floor(Math.random() * 5) + 1;
          const y = Math.floor(Math.random() * 5) + 1;
          const directions = ['right', 'left', 'up', 'down'];
          const direction = directions[Math.floor(Math.random() * directions.length)];
          
          let question = '';
          let answer = '';
          
          if (direction === 'right') {
            question = `Point A(2, 3) is translated ${x} units right. What are its new coordinates?`;
            answer = `(${2 + x}, 3)`;
          } else if (direction === 'left') {
            question = `Point B(5, 4) is translated ${x} units left. What are its new coordinates?`;
            answer = `(${5 - x}, 4)`;
          } else if (direction === 'up') {
            question = `Point C(1, 2) is translated ${y} units up. What are its new coordinates?`;
            answer = `(1, ${2 + y})`;
          } else {
            question = `Point D(3, 6) is translated ${y} units down. What are its new coordinates?`;
            answer = `(3, ${6 - y})`;
          }
          
          return { question, answer, hint: 'Translation slides the point without changing its shape', visualAid: '➡️' };
        }
      },
      {
        type: 'reflection',
        generate: () => {
          const point = [Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 5) + 1];
          const axes = ['x-axis', 'y-axis'];
          const axis = axes[Math.floor(Math.random() * axes.length)];
          
          let answer = '';
          if (axis === 'x-axis') {
            answer = `(${point[0]}, ${-point[1]})`;
          } else {
            answer = `(${-point[0]}, ${point[1]})`;
          }
          
          return {
            question: `What are the coordinates after reflecting point (${point[0]}, ${point[1]}) across the ${axis}?`,
            answer: answer,
            hint: `Reflection across ${axis} changes the sign of the ${axis === 'x-axis' ? 'y' : 'x'} coordinate`,
            visualAid: '🪞'
          };
        }
      },
      {
        type: 'rotation',
        generate: () => {
          const point = [Math.floor(Math.random() * 3) + 1, Math.floor(Math.random() * 3) + 1];
          const degrees = 90;
          const direction = ['clockwise', 'counterclockwise'][Math.floor(Math.random() * 2)];
          
          // Simple 90° rotation around origin
          let answer = '';
          if (direction === 'clockwise') {
            answer = `(${point[1]}, ${-point[0]})`;
          } else {
            answer = `(${-point[1]}, ${point[0]})`;
          }
          
          return {
            question: `Point (${point[0]}, ${point[1]}) is rotated ${degrees}° ${direction} about the origin. What are the new coordinates?`,
            answer: answer,
            hint: 'For 90° rotation, swap x and y coordinates and adjust signs',
            visualAid: '🔄'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const options = ensureFourOptions(generated.answer.replace(/[()]/g, ''), -10, 10)
      .map(opt => {
        const [x, y] = opt.split(',');
        return `(${x}, ${y})`;
      });

    return {
      id: `transform-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'Coordinates are written as (x, y)'],
      visualAid: generated.visualAid
    };
  },

  'linear-equations': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'slope-intercept',
        generate: () => {
          let m = Math.floor(Math.random() * 8) - 4; // slope between -4 and 3
          const b = Math.floor(Math.random() * 10) - 5; // y-intercept between -5 and 4
          if (m === 0) m = 1; // avoid horizontal lines for this exercise
          
          return {
            question: `What is the slope and y-intercept of y = ${m}x + ${b}?`,
            answer: `slope: ${m}, y-intercept: ${b}`,
            hint: 'y = mx + b where m is slope and b is y-intercept',
            visualAid: '📈'
          };
        }
      },
      {
        type: 'graph-to-equation',
        generate: () => {
          const m = Math.floor(Math.random() * 5) + 1;
          const b = Math.floor(Math.random() * 6);
          const point1 = `(0, ${b})`;
          const point2 = `(1, ${m + b})`;
          
          return {
            question: `A line passes through points ${point1} and ${point2}. What is its equation in slope-intercept form?`,
            answer: `y = ${m}x + ${b}`,
            hint: 'Find slope using rise/run, then use y = mx + b',
            visualAid: '📊'
          };
        }
      },
      {
        type: 'parallel-lines',
        generate: () => {
          const m = Math.floor(Math.random() * 5) + 1;
          const b1 = Math.floor(Math.random() * 6);
          const b2 = Math.floor(Math.random() * 6) + 6;
          
          return {
            question: `What is the slope of a line parallel to y = ${m}x + ${b1}?`,
            answer: m.toString(),
            hint: 'Parallel lines have the same slope',
            visualAid: '∥'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    let options: string[];
    if (generated.answer.includes('slope:')) {
      const parts = generated.answer.split(', ');
      const wrongSlopes = ensureFourOptions(parts[0].split(': ')[1], -5, 5)
        .map(slope => `slope: ${slope}, y-intercept: ${parts[1].split(': ')[1]}`);
      options = wrongSlopes;
    } else if (generated.answer.includes('y =')) {
      const wrongMs = ensureFourOptions(generated.answer.split(' ')[2].replace('x', ''), -5, 5)
        .map(m => `y = ${m}x + ${generated.answer.split('+ ')[1]}`);
      options = wrongMs;
    } else {
      options = ensureFourOptions(generated.answer, -5, 5);
    }

    // Ensure correct answer is in options
    if (!options.includes(generated.answer)) {
      options[Math.floor(Math.random() * options.length)] = generated.answer;
    }

    return {
      id: `linear-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'Slope = rise/run', 'y-intercept is where the line crosses the y-axis'],
      visualAid: generated.visualAid
    };
  },

  'scientific-notation': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'standard-to-scientific',
        generate: () => {
          const base = (Math.random() * 9 + 1).toFixed(1);
          const exponent = Math.floor(Math.random() * 7) + 3;
          const number = parseFloat(base) * Math.pow(10, exponent);
          
          return {
            question: `Write ${number.toLocaleString()} in scientific notation`,
            answer: `${base} × 10^${exponent}`,
            hint: 'Move decimal point and count places',
            visualAid: '🔬'
          };
        }
      },
      {
        type: 'scientific-to-standard',
        generate: () => {
          const base = (Math.random() * 9 + 1).toFixed(1);
          const exponent = Math.floor(Math.random() * 7) + 3;
          const number = parseFloat(base) * Math.pow(10, exponent);
          
          return {
            question: `Convert ${base} × 10^${exponent} to standard form`,
            answer: number.toLocaleString(),
            hint: 'Move decimal point to the right for positive exponents',
            visualAid: '🔢'
          };
        }
      },
      {
        type: 'small-numbers',
        generate: () => {
          const base = (Math.random() * 9 + 1).toFixed(1);
          const exponent = Math.floor(Math.random() * 5) + 1;
          const number = parseFloat(base) * Math.pow(10, -exponent);
          
          return {
            question: `Write ${number} in scientific notation`,
            answer: `${base} × 10^-${exponent}`,
            hint: 'Negative exponents mean very small numbers',
            visualAid: '🔍'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    let options: string[];
    if (generated.answer.includes('× 10^')) {
      const parts = generated.answer.split(' × 10^');
      const wrongBases = ensureFourOptions(parts[0], 1, 10).map(b => `${b} × 10^${parts[1]}`);
      options = wrongBases;
    } else {
      // For standard form answers
      const num = parseFloat(generated.answer.replace(/,/g, ''));
      options = ensureFourOptions(num.toString(), num * 0.1, num * 10)
        .map(opt => parseFloat(opt).toLocaleString());
    }

    return {
      id: `sci-not-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'Scientific notation: a × 10^b where 1 ≤ a < 10'],
      visualAid: generated.visualAid
    };
  },

  'volume-3d-shapes': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'cylinder',
        generate: () => {
          const r = Math.floor(Math.random() * 5) + 2;
          const h = Math.floor(Math.random() * 8) + 3;
          const volume = (Math.PI * r * r * h).toFixed(2);
          
          return {
            question: `Find the volume of a cylinder with radius ${r} and height ${h}`,
            answer: volume,
            hint: 'Volume = π × r² × h',
            visualAid: '🛢️'
          };
        }
      },
      {
        type: 'cone',
        generate: () => {
          const r = Math.floor(Math.random() * 4) + 2;
          const h = Math.floor(Math.random() * 6) + 4;
          const volume = ((Math.PI * r * r * h) / 3).toFixed(2);
          
          return {
            question: `Find the volume of a cone with radius ${r} and height ${h}`,
            answer: volume,
            hint: 'Volume = (π × r² × h) ÷ 3',
            visualAid: '🎯'
          };
        }
      },
      {
        type: 'sphere',
        generate: () => {
          const r = Math.floor(Math.random() * 5) + 2;
          const volume = ((4/3) * Math.PI * Math.pow(r, 3)).toFixed(2);
          
          return {
            question: `Find the volume of a sphere with radius ${r}`,
            answer: volume,
            hint: 'Volume = (4/3) × π × r³',
            visualAid: '🎱'
          };
        }
      }
    ];

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const correctNum = parseFloat(generated.answer);
    const options = ensureFourOptions(correctNum.toString(), 10, Math.max(500, correctNum * 2))
      .map(opt => parseFloat(opt).toFixed(2));

    return {
      id: `volume-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, 'Use π ≈ 3.14 for calculation', 'Remember to use the correct formula'],
      visualAid: generated.visualAid
    };
  }
};