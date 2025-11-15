// utils/exerciseGenerators/grade3.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { generateClockSVG } from '@/utils/clockGenerator'; 
import { getCurrency, formatMoney, formatSubunit } from '@/utils/currencyHelper';

export const grade3Generators = {
  'multiplication': (): ExerciseTemplate => {
    const num1 = Math.floor(Math.random() * 8) + 2; // 2-9
    const num2 = Math.floor(Math.random() * 8) + 2; // 2-9
    const product = num1 * num2;
    
    const options = ensureFourOptions(product.toString(), 4, 81);
    
    // More question variations
    const questionVariations = [
      `${num1} × ${num2} = ?`,
      `What is ${num1} times ${num2}?`,
      `Calculate: ${num1} multiplied by ${num2}`,
      `Solve: ${num1} × ${num2}`,
      `Find the product of ${num1} and ${num2}`,
      `${num1} groups of ${num2} equals?`,
      `If you have ${num1} bags with ${num2} candies each, total candies?`
    ];
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    
    return {
      id: `mult-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: product.toString(),
      hints: [`${num1} times ${num2} means ${num1} added ${num2} times`, `You can skip count by ${num1}s`],
      visualAid: '🦈'
    };
  },

  'division': (): ExerciseTemplate => {
    const divisor = Math.floor(Math.random() * 7) + 2; // 2-8 (expanded range)
    const quotient = Math.floor(Math.random() * 9) + 2; // 2-10 (expanded range)
    const dividend = divisor * quotient;
    
    const options = ensureFourOptions(quotient.toString(), 2, 10);
    
    // More question variations
    const questionVariations = [
      `${dividend} ÷ ${divisor} = ?`,
      `What is ${dividend} divided by ${divisor}?`,
      `How many times does ${divisor} go into ${dividend}?`,
      `Share ${dividend} equally among ${divisor} groups`,
      `If you split ${dividend} into ${divisor} equal parts, each part is?`,
      `${dividend} shared by ${divisor} people equals?`
    ];
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    
    return {
      id: `div-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: quotient.toString(),
      hints: [`How many times does ${divisor} go into ${dividend}?`, `Think of sharing ${dividend} items among ${divisor} people`],
      visualAid: '🐬'
    };
  },

  'multiplication-fluency': (): ExerciseTemplate => {
    // Expanded fluency facts
    const products = [
      [7, 8, 56], [6, 9, 54], [8, 8, 64], [9, 9, 81], [7, 7, 49],
      [6, 8, 48], [5, 9, 45], [8, 9, 72], [7, 9, 63], [6, 7, 42],
      [4, 8, 32], [5, 8, 40], [9, 7, 63], [8, 7, 56], [9, 6, 54],
      [4, 9, 36], [5, 7, 35], [6, 6, 36], [7, 4, 28], [8, 3, 24]
    ];
    const [num1, num2, product] = products[Math.floor(Math.random() * products.length)];
    
    const options = ensureFourOptions(product.toString(), 20, 90);
    
    // Question variations
    const questionVariations = [
      `Quick! ${num1} × ${num2} = ?`,
      `Fast recall: ${num1} times ${num2}`,
      `Mental math: ${num1} × ${num2}`,
      `Instant answer: ${num1} × ${num2}`
    ];
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    
    return {
      id: `mult-fluency-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: product.toString(),
      hints: ['Try to recall this multiplication fact quickly!', 'Think of related facts you know'],
      visualAid: '⚡'
    };
  },

  'fractions': (): ExerciseTemplate => {
    // Even more fractions
    const fractions = [
      // Unit fractions
      { numerator: 1, denominator: 2, emoji: '½' },
      { numerator: 1, denominator: 3, emoji: '⅓' },
      { numerator: 1, denominator: 4, emoji: '¼' },
      { numerator: 1, denominator: 5, emoji: '⅕' },
      { numerator: 1, denominator: 6, emoji: '⅙' },
      { numerator: 1, denominator: 7, emoji: '⅐' },
      { numerator: 1, denominator: 8, emoji: '⅛' },
      
      // Common fractions
      { numerator: 2, denominator: 3, emoji: '⅔' },
      { numerator: 3, denominator: 4, emoji: '¾' },
      { numerator: 2, denominator: 5, emoji: '⅖' },
      { numerator: 3, denominator: 5, emoji: '⅗' },
      { numerator: 4, denominator: 5, emoji: '⅘' },
      { numerator: 5, denominator: 6, emoji: '⅚' },
      { numerator: 2, denominator: 7, emoji: '²⁄₇' },
      { numerator: 3, denominator: 7, emoji: '³⁄₇' },
      { numerator: 4, denominator: 7, emoji: '⁴⁄₇' },
      { numerator: 5, denominator: 7, emoji: '⁵⁄₇' },
      { numerator: 6, denominator: 7, emoji: '⁶⁄₇' },
      { numerator: 3, denominator: 8, emoji: '⅜' },
      { numerator: 5, denominator: 8, emoji: '⅝' },
      { numerator: 7, denominator: 8, emoji: '⅞' }
    ];
    const fraction = fractions[Math.floor(Math.random() * fractions.length)];
    
    // More question variations
    const questionVariations = [
      `What fraction is represented?`,
      `Which fraction shows the shaded part?`,
      `Identify the fraction:`,
      `What fraction does this represent?`,
      `Choose the correct fraction:`,
      `Match the visual to the fraction:`
    ];
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    
    // Ensure the correct answer is included in options
    const allFractions = fractions.map(f => f.emoji);
    const otherFractions = allFractions.filter(f => f !== fraction.emoji);
    
    // Shuffle other fractions and take 3
    const shuffledOthers = [...otherFractions].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine correct answer with 3 random wrong answers
    const options = [fraction.emoji, ...shuffledOthers].sort(() => Math.random() - 0.5);
    
    // Create unique visual aid with different patterns
    const totalParts = fraction.denominator;
    const shadedParts = fraction.numerator;
    const patterns = ['🔸', '🟦', '🟩', '🟥', '🟨'];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    const visualAid = pattern.repeat(shadedParts) + `⚪`.repeat(totalParts - shadedParts);
    
    return {
      id: `frac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: fraction.emoji,
      hints: [
        `The fraction has ${fraction.numerator} part out of ${fraction.denominator} total parts`, 
        `Look for the fraction that matches the shaded portion`
      ],
      visualAid: visualAid
    };
  },

  'equivalent-fractions': (): ExerciseTemplate => {
    // Expanded equivalent fractions
    const equivalents = [
      { fraction: '½', equivalents: ['2/4', '3/6', '4/8', '5/10', '6/12'] },
      { fraction: '⅓', equivalents: ['2/6', '3/9', '4/12', '5/15', '6/18'] },
      { fraction: '¼', equivalents: ['2/8', '3/12', '4/16', '5/20', '6/24'] },
      { fraction: '⅔', equivalents: ['4/6', '6/9', '8/12', '10/15', '12/18'] },
      { fraction: '¾', equivalents: ['6/8', '9/12', '12/16', '15/20', '18/24'] },
      { fraction: '⅖', equivalents: ['4/10', '6/15', '8/20', '10/25', '12/30'] }
    ];
    const eq = equivalents[Math.floor(Math.random() * equivalents.length)];
    const correctEquivalent = eq.equivalents[Math.floor(Math.random() * eq.equivalents.length)];
    
    const options = [correctEquivalent];
    while (options.length < 4) {
      const randomNum = Math.floor(Math.random() * 12) + 2;
      const wrongOption = `${Math.floor(Math.random() * randomNum) + 1}/${randomNum}`;
      if (!options.includes(wrongOption) && wrongOption !== eq.fraction && 
          !eq.equivalents.includes(wrongOption)) {
        options.push(wrongOption);
      }
    }
    
    return {
      id: `equiv-frac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: `Which fraction is equivalent to ${eq.fraction}?`,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: correctEquivalent,
      hints: ['Multiply the numerator and denominator by the same number', `Think about what you can multiply to get ${eq.fraction}`],
      visualAid: '🟰'
    };
  },

  'compare-fractions': (): ExerciseTemplate => {
    // More fraction comparisons
    const comparisons = [
      { frac1: '½', frac2: '¼', answer: '½', symbol: '>' },
      { frac1: '⅓', frac2: '½', answer: '½', symbol: '>' },
      { frac1: '¾', frac2: '½', answer: '¾', symbol: '>' },
      { frac1: '¼', frac2: '⅓', answer: '⅓', symbol: '>' },
      { frac1: '⅔', frac2: '⅓', answer: '⅔', symbol: '>' },
      { frac1: '⅗', frac2: '⅖', answer: '⅗', symbol: '>' },
      { frac1: '⅘', frac2: '⅗', answer: '⅘', symbol: '>' },
      { frac1: '⅚', frac2: '⅓', answer: '⅚', symbol: '>' },
      { frac1: '⅞', frac2: '¾', answer: '⅞', symbol: '>' },
      { frac1: '⅖', frac2: '⅕', answer: '⅖', symbol: '>' }
    ];
    const comp = comparisons[Math.floor(Math.random() * comparisons.length)];
    
    const options = [comp.frac1, comp.frac2, 'equal'];
    
    return {
      id: `compare-frac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: `Compare: ${comp.frac1} ? ${comp.frac2}`,
      options: options,
      correctAnswer: comp.frac1 === comp.answer ? comp.frac1 : comp.frac2,
      hints: ['Think about the size of the pieces', 'Which fraction represents larger pieces?'],
      visualAid: '⚖️'
    };
  },

  'measurement': (): ExerciseTemplate => {
    // Generate random dimensions
    const length = Math.floor(Math.random() * 10) + 2; // 2-11
    const width = Math.floor(Math.random() * 8) + 2;   // 2-9
    
    const area = length * width;
    const perimeter = 2 * (length + width);
    
    const measurements = [
      {
        question: `What is the area of a garden that is ${length} units long and ${width} units wide?`,
        answer: area.toString(),
        unit: "square units"
      },
      {
        question: `What is the perimeter of a square with ${length} unit sides?`,
        answer: (length * 4).toString(),
        unit: "units"
      },
      {
        question: `A picture frame is ${length} inches long and ${width} inches wide. What is the perimeter?`,
        answer: perimeter.toString(),
        unit: "inches"
      },
      {
        question: `A classroom is ${length} meters long and ${width} meters wide. How much carpet is needed to cover the floor?`,
        answer: area.toString(),
        unit: "square meters"
      },
      {
        question: `If a book is ${length} inches long and ${width} inches wide, what is its area?`,
        answer: area.toString(),
        unit: "square inches"
      },
      {
        question: `What is the perimeter of a rectangle ${length} cm long and ${width} cm wide?`,
        answer: perimeter.toString(),
        unit: "cm"
      }
    ];
    
    const measurement = measurements[Math.floor(Math.random() * measurements.length)];
    
    const options = ensureFourOptions(measurement.answer, 4, 100);
    
    return {
      id: `measure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: measurement.question,
      options: options.map(opt => `${opt} ${measurement.unit}`),
      correctAnswer: `${measurement.answer} ${measurement.unit}`,
      hints: ["Area = length × width", "Perimeter = sum of all sides"],
      visualAid: '🐢'
    };
  },

  'area-perimeter-problems': (): ExerciseTemplate => {
    // Generate random dimensions
    const length = Math.floor(Math.random() * 15) + 5; // 5-19
    const width = Math.floor(Math.random() * 12) + 3;  // 3-14
    
    const area = length * width;
    const perimeter = 2 * (length + width);
    
    // Randomly choose between area and perimeter problems
    const problemTypes = [
      {
        type: 'area',
        question: `A garden is ${length} feet long and ${width} feet wide. What is the area?`,
        answer: area.toString(),
        unit: 'square feet'
      },
      {
        type: 'area', 
        question: `A classroom is ${length} meters long and ${width} meters wide. How much carpet is needed to cover the floor?`,
        answer: area.toString(),
        unit: 'square meters'
      },
      {
        type: 'area',
        question: `A poster is ${length} inches long and ${width} inches wide. What is its area?`,
        answer: area.toString(),
        unit: 'square inches'
      },
      {
        type: 'area',
        question: `A whiteboard is ${length} feet by ${width} feet. What is its area?`,
        answer: area.toString(),
        unit: 'square feet'
      },
      {
        type: 'perimeter',
        question: `A picture frame is ${length} inches long and ${width} inches wide. What is the perimeter?`,
        answer: perimeter.toString(),
        unit: 'inches'
      },
      {
        type: 'perimeter',
        question: `A swimming pool is ${length} meters long and ${width} meters wide. What is the perimeter?`,
        answer: perimeter.toString(),
        unit: 'meters'
      },
      {
        type: 'perimeter',
        question: `A fence around a ${length} foot by ${width} foot garden. What is the perimeter?`,
        answer: perimeter.toString(),
        unit: 'feet'
      },
      {
        type: 'perimeter',
        question: `A rectangular table is ${length} cm long and ${width} cm wide. What is the perimeter?`,
        answer: perimeter.toString(),
        unit: 'cm'
      },
      {
        type: 'area',
        question: `What is the area of a rectangle that is ${length} units long and ${width} units wide?`,
        answer: area.toString(),
        unit: 'square units'
      },
      {
        type: 'perimeter',
        question: `What is the perimeter of a rectangle that is ${length} units long and ${width} units wide?`,
        answer: perimeter.toString(),
        unit: 'units'
      }
    ];
    
    const problem = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    
    // Generate options based on the answer range
    const maxValue = Math.max(area, perimeter) * 2;
    const options = ensureFourOptions(problem.answer, 10, maxValue);
    
    return {
      id: `area-perim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: problem.question,
      options: options.map(opt => `${opt} ${problem.unit}`),
      correctAnswer: `${problem.answer} ${problem.unit}`,
      hints: [
        problem.type === 'area' ? "Area = length × width" : "Perimeter = 2 × (length + width)",
        "Read carefully to see if it's asking for area or perimeter"
      ],
      visualAid: '📐'
    };
  },

  'geometry': (): ExerciseTemplate => {
    // More shapes
    const shapes = [
      { name: "pentagon", sides: 5, question: "How many sides does a pentagon have?" },
      { name: "hexagon", sides: 6, question: "How many sides does a hexagon have?" },
      { name: "octagon", sides: 8, question: "How many sides does an octagon have?" },
      { name: "triangle", sides: 3, question: "How many sides does a triangle have?" },
      { name: "quadrilateral", sides: 4, question: "How many sides does a quadrilateral have?" },
      { name: "heptagon", sides: 7, question: "How many sides does a heptagon have?" },
      { name: "nonagon", sides: 9, question: "How many sides does a nonagon have?" },
      { name: "decagon", sides: 10, question: "How many sides does a decagon have?" }
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const options = ensureFourOptions(shape.sides.toString(), 3, 12);
    
    return {
      id: `geo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: shape.question,
      options: options,
      correctAnswer: shape.sides.toString(),
      hints: [`A ${shape.name} has ${shape.sides} sides`, "Count the sides carefully"],
      visualAid: '🐙'
    };
  },

  'shape-attributes': (): ExerciseTemplate => {
    const shapes = [
      { 
        name: "square", 
        attributes: ["4 equal sides", "4 right angles", "all sides same length"], 
        emoji: '⬜',
        description: "a shape with 4 equal sides and 4 right angles"
      },
      { 
        name: "rectangle", 
        attributes: ["4 sides", "opposite sides equal", "4 right angles", "2 long sides, 2 short sides"], 
        emoji: '📱',
        description: "a shape with 4 sides where opposite sides are equal and has 4 right angles"
      },
      { 
        name: "triangle", 
        attributes: ["3 sides", "3 angles", "3 corners"], 
        emoji: '🔺',
        description: "a shape with 3 sides and 3 angles"
      },
      { 
        name: "pentagon", 
        attributes: ["5 sides", "5 angles", "5 corners"], 
        emoji: '⬟',
        description: "a shape with 5 sides"
      },
      { 
        name: "hexagon", 
        attributes: ["6 sides", "6 angles", "6 corners"], 
        emoji: '⬢',
        description: "a shape with 6 sides"
      },
      { 
        name: "circle", 
        attributes: ["no sides", "round", "no corners", "curved line"], 
        emoji: '⭕',
        description: "a round shape with no sides or corners"
      },
      { 
        name: "rhombus", 
        attributes: ["4 equal sides", "opposite angles equal", "like a slanted square"], 
        emoji: '🔷',
        description: "a shape with 4 equal sides but slanted corners"
      },
      { 
        name: "trapezoid", 
        attributes: ["4 sides", "one pair of parallel sides", "only two sides parallel"], 
        emoji: '📐',
        description: "a shape with 4 sides where only one pair of sides is parallel"
      },
      { 
        name: "octagon", 
        attributes: ["8 sides", "8 angles", "8 corners"], 
        emoji: '🛑',
        description: "a shape with 8 sides"
      }
    ];

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const questionTypes = [
      {
        type: 'identify-by-attributes',
        text: `Which shape has these attributes?`,
        description: shape.attributes.slice(0, 2).join(', '),
        optionType: 'shape-names'
      },
      {
        type: 'name-attributes', 
        text: `What are the main attributes of a ${shape.name}?`,
        description: null,
        optionType: 'attributes'
      },
      {
        type: 'match-description',
        text: `Which shape matches this description?`,
        description: shape.description,
        optionType: 'shape-names'
      },
      {
        type: 'complete-attributes',
        text: `A ${shape.name} has:`,
        description: `Which of these is true?`,
        optionType: 'attributes'
      }
    ];
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    // Build question text
    let question = questionType.text;
    if (questionType.description) {
      question += `\n${questionType.description}`;
    }

    // DYNAMIC OPTION GENERATION BASED ON QUESTION TYPE
    let options: string[];
    let correctAnswer: string;

    if (questionType.optionType === 'shape-names') {
      // Options are shape names, correct answer is shape name
      const allShapeNames = shapes.map(s => s.name);
      const otherShapes = allShapeNames.filter(name => name !== shape.name);
      const shuffledOthers = [...otherShapes].sort(() => Math.random() - 0.5).slice(0, 3);
      options = [shape.name, ...shuffledOthers].sort(() => Math.random() - 0.5);
      correctAnswer = shape.name;
      
    } else { // optionType === 'attributes'
      // Options are attribute descriptions, correct answer is attribute description
      // Pick a random correct attribute from this shape
      const correctAttribute = shape.attributes[Math.floor(Math.random() * shape.attributes.length)];
      
      // Collect all possible wrong attributes from other shapes
      const allAttributes = shapes.flatMap(s => s.attributes);
      const uniqueWrongAttributes = [...new Set(allAttributes)]; // Remove duplicates
      const wrongAttributes = uniqueWrongAttributes.filter(attr => 
        !shape.attributes.includes(attr) && attr !== correctAttribute
      );
      
      // Shuffle and select 3 wrong options
      const shuffledWrong = [...wrongAttributes].sort(() => Math.random() - 0.5).slice(0, 3);
      options = [correctAttribute, ...shuffledWrong].sort(() => Math.random() - 0.5);
      correctAnswer = correctAttribute; // This is now an attribute, not a shape name!
    }

    // Generate appropriate hints
    let hints: string[];
    if (questionType.optionType === 'shape-names') {
      hints = [
        `Look for the shape that matches all the given properties`,
        `Think about what makes each shape unique`
      ];
    } else {
      hints = [
        `Remember the key features of a ${shape.name}`,
        `Think about sides, angles, and special properties`
      ];
    }

    // Better visual aid - use multiple emojis to represent the shape
    const visualAids = {
      'square': '⬜⬛🔲',
      'rectangle': '📱💳📺',
      'triangle': '🔺▲🔻', 
      'pentagon': '⬟🏠',
      'hexagon': '⬢🍯🐝',
      'circle': '⭕🔵⚪',
      'rhombus': '🔷💠♦️',
      'trapezoid': '📐🏢',
      'octagon': '🛑⛔'
    };

    return {
      id: `shape-attrib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: hints,
      visualAid: visualAids[shape.name as keyof typeof visualAids] || shape.emoji
    };
  },

  'time-to-minute': (): ExerciseTemplate => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 12) * 5; // Only multiples of 5 for clarity
    const formattedMinute = minute.toString().padStart(2, '0');
    const timeString = `${hour}:${formattedMinute}`;
    
    // Generate clock SVG
    const clockSVG = generateClockSVG(timeString, 120);
    
    // Create plausible wrong options
    const options = [
      timeString,
      `${hour}:${(minute + 5) % 60}`.padStart(2, '0'),
      `${hour}:${(minute - 5 + 60) % 60}`.padStart(2, '0'),
      `${(hour % 12) + 1}:${formattedMinute}`
    ].sort(() => Math.random() - 0.5);
    
    // Updated question variations that reference the clock
    const questionVariations = [
      `What time is shown on the clock?`,
      `Which time matches the clock display?`,
      `What time does this clock show?`,
      `Look at the analog clock. What time is it?`,
      `Identify the time shown on the clock:`
    ];
    const question = questionVariations[Math.floor(Math.random() * questionVariations.length)];
    
    return {
      id: `time-minute-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: timeString,
      hints: [
        'The short hand shows the hour, the long hand shows minutes',
        'Each number represents 5 minutes for the minute hand',
        'The hour hand moves slightly as minutes pass'
      ],
      visualAid: clockSVG // This will be the SVG string that displays the clock
    };
  },

  'money-math': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    
    const moneyTypes = [
      {
        type: 'addition',
        generate: () => {
          const amounts = [
            Math.floor(Math.random() * 5) + 1, // $1-$5
            Math.floor(Math.random() * 3) + 1, // $1-$3
            Math.floor(Math.random() * 2) + 1  // $1-$2
          ];
          const total = amounts.reduce((sum, amount) => sum + amount, 0);
          
          // FIX: Use dynamic currency symbol instead of hardcoded '$'
          return {
            question: `You have bills of ${currency.symbol}${amounts.join(`, ${currency.symbol}`)}. How much money do you have in total?`,
            correctAnswer: formatMoney(total, currency),
            calculation: total
          };
        }
      },
      {
        type: 'subtraction',
        generate: () => {
          const amounts = [
            Math.floor(Math.random() * 10) + 5, // $5-$14
            Math.floor(Math.random() * 4) + 1   // $1-$4
          ];
          const difference = amounts[0] - amounts[1];
          
          // FIX: Use dynamic currency symbol
          return {
            question: `You have ${currency.symbol}${amounts[0]} and spend ${currency.symbol}${amounts[1]}. How much money is left?`,
            correctAnswer: formatMoney(difference, currency),
            calculation: difference
          };
        }
      },
      {
        type: 'making-change',
        generate: () => {
          const amounts = [
            Math.floor(Math.random() * 5) + 5,  // $5-$9
            Math.floor(Math.random() * 4) + 1   // $1-$4
          ];
          const change = amounts[0] - amounts[1];
          
          // FIX: Use dynamic currency symbol
          return {
            question: `If you pay ${currency.symbol}${amounts[0]} for an item that costs ${currency.symbol}${amounts[1]}, how much change should you get back?`,
            correctAnswer: formatMoney(change, currency),
            calculation: change
          };
        }
      },
      {
        type: 'multiple-items',
        generate: () => {
          const item1 = { name: 'notebook', price: Math.floor(Math.random() * 3) + 2 }; // $2-$4
          const item2 = { name: 'pencil', price: Math.floor(Math.random() * 2) + 1 };   // $1-$2
          const total = item1.price + item2.price;
          
          // FIX: Use dynamic currency symbol
          return {
            question: `A ${item1.name} costs ${currency.symbol}${item1.price} and a ${item2.name} costs ${currency.symbol}${item2.price}. How much do both items cost together?`,
            correctAnswer: formatMoney(total, currency),
            calculation: total
          };
        }
      },
      {
        type: 'money-comparison',
        generate: () => {
          const person1 = ['Alex', 'Maya', 'Sam', 'Lily'][Math.floor(Math.random() * 4)];
          const person2 = ['Tom', 'Zoe', 'Ryan', 'Emma'][Math.floor(Math.random() * 4)];
          const amount1 = Math.floor(Math.random() * 8) + 3; // $3-$10
          const amount2 = amount1 + (Math.floor(Math.random() * 4) - 2); // $1-$2 difference
          
          const difference = Math.abs(amount1 - amount2);
          const whoHasMore = amount1 > amount2 ? person1 : person2;
          
          // FIX: Use dynamic currency symbol
          return {
            question: `${person1} has ${currency.symbol}${amount1}. ${person2} has ${currency.symbol}${amount2}. How much more money does ${whoHasMore} have?`,
            correctAnswer: formatMoney(difference, currency),
            calculation: difference
          };
        }
      }
    ];

    const moneyType = moneyTypes[Math.floor(Math.random() * moneyTypes.length)];
    const generated = moneyType.generate();

    // Generate options using currency formatting
    const options = ensureFourOptions(
      generated.calculation.toString(), 
      1, 
      Math.max(20, generated.calculation + 5)
    ).map(opt => formatMoney(Number(opt), currency));

    // Enhanced hints with currency-specific guidance
    const hints = [
      'Remember to line up decimal points when working with money',
      'Double-check your addition/subtraction',
      currency.decimal 
        ? `In ${currency.name}, ${currency.symbol}1 = 100 ${currency.subunit}`
        : `${currency.name} doesn't use decimal units`
    ];

    // Better visual aids for money problems
    const visualAids = {
      'addition': '💰➕💰',
      'subtraction': '💰➖💰', 
      'making-change': '💵🔄',
      'multiple-items': '🛍️',
      'coin-combinations': '🪙',
      'money-comparison': '⚖️'
    };

    return {
      id: `money-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.correctAnswer,
      hints: hints,
      visualAid: visualAids[moneyType.type as keyof typeof visualAids] || '💎'
    };
  },
  'rounding': (): ExerciseTemplate => {
    const roundingTypes = [
      { number: Math.floor(Math.random() * 90) + 10, place: 'ten' }, // 10-99
      { number: Math.floor(Math.random() * 900) + 100, place: 'hundred' }, // 100-999
      { number: Math.floor(Math.random() * 90) + 10, place: 'ten' } // More tens for balance
    ];

    const roundType = roundingTypes[Math.floor(Math.random() * roundingTypes.length)];
    let correctAnswer = '';
    
    if (roundType.place === 'ten') {
      correctAnswer = (Math.round(roundType.number / 10) * 10).toString();
    } else {
      correctAnswer = (Math.round(roundType.number / 100) * 100).toString();
    }

    const question = `Round ${roundType.number} to the nearest ${roundType.place}`;
    const options = ensureFourOptions(
      correctAnswer.toString(),
      Number(correctAnswer) - 50,
      Number(correctAnswer) + 50
    );

    return {
      id: `round-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer.toString(),
      hints: [
        `Look at the digit to the right of the ${roundType.place}s place`,
        'If it is 5 or greater, round up',
        'If it is 4 or less, round down'
      ],
      visualAid: '🔢'
    };
  },

  'estimation': (): ExerciseTemplate => {
    const num1 = Math.floor(Math.random() * 50) + 25; // 25-74
    const num2 = Math.floor(Math.random() * 50) + 25; // 25-74
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    let exactAnswer = 0;
    let estimatedAnswer = 0;
    
    if (operation === '+') {
      question = `Estimate the sum: ${num1} + ${num2}`;
      exactAnswer = num1 + num2;
      estimatedAnswer = Math.round(num1 / 10) * 10 + Math.round(num2 / 10) * 10;
    } else {
      question = `Estimate the difference: ${num1} - ${num2}`;
      exactAnswer = num1 - num2;
      estimatedAnswer = Math.round(num1 / 10) * 10 - Math.round(num2 / 10) * 10;
    }

    const options = [
      estimatedAnswer.toString(),
      exactAnswer.toString(),
      (estimatedAnswer + 10).toString(),
      (estimatedAnswer - 10).toString()
    ].sort(() => Math.random() - 0.5);

    return {
      id: `estimate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: estimatedAnswer.toString(),
      hints: [
        'Round each number to the nearest ten first',
        'Then perform the operation with the rounded numbers',
        'Estimation gives you a close answer, not exact'
      ],
      visualAid: '🌊'
    };
  },

  'two-step-problems': (): ExerciseTemplate => {
    const problems = [
      {
        scenario: `A classroom has ${Math.floor(Math.random() * 5) + 4} rows of desks. Each row has ${Math.floor(Math.random() * 4) + 3} desks. If ${Math.floor(Math.random() * 5) + 2} desks are broken, how many usable desks are there?`,
        steps: ['multiply', 'subtract']
      },
      {
        scenario: `A baker made ${Math.floor(Math.random() * 4) + 3} trays of cookies. Each tray had ${Math.floor(Math.random() * 6) + 5} cookies. If ${Math.floor(Math.random() * 8) + 3} cookies were sold, how many cookies are left?`,
        steps: ['multiply', 'subtract']
      },
      {
        scenario: `There are ${Math.floor(Math.random() * 4) + 3} boxes with ${Math.floor(Math.random() * 6) + 4} books in each box. ${Math.floor(Math.random() * 5) + 2} more books are added. How many books are there now?`,
        steps: ['multiply', 'add']
      }
    ];

    const problem = problems[Math.floor(Math.random() * problems.length)];
    const numbers = problem.scenario.match(/\d+/g)?.map(Number) || [];
    
    let correctAnswer = 0;
    if (problem.steps[0] === 'multiply' && problem.steps[1] === 'subtract') {
      correctAnswer = numbers[0] * numbers[1] - numbers[2];
    } else if (problem.steps[0] === 'multiply' && problem.steps[1] === 'add') {
      correctAnswer = numbers[0] * numbers[1] + numbers[2];
    }

    const options = ensureFourOptions(correctAnswer.toString(), 
      Math.max(1, correctAnswer - 10), correctAnswer + 10);

    return {
      id: `twostep-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple-choice',
      question: problem.scenario,
      options: options,
      correctAnswer: correctAnswer.toString(),
      hints: [
        'Read the problem carefully to identify both steps',
        'Solve the first step before the second step',
        'Check your work by reading the problem again'
      ],
      visualAid: '🤔'
    };
  }
};