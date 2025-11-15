// utils/exerciseGenerators/earlyGrades.ts
import { ExerciseTemplate, ensureFourOptions, ExerciseSession } from '@/utils/exerciseGenerators/grades';
import { getCurrency, formatSubunit, getCommonCoins } from '@/utils/currencyHelper';


// Kindergarten Generators (complete - all original content preserved)
export const kindergartenGenerators = {
  'counting': (): ExerciseTemplate => {
    const count = Math.floor(Math.random() * 8) + 3;
    const seaObjects = ['🐠', '🐟', '🐡', '🦀', '🐚', '🦐', '🦑', '🐙', '🦞', '🌟', '💎', '🔱', '🪸', '⚓'];
    const object = seaObjects[Math.floor(Math.random() * seaObjects.length)];
    
    const options = ensureFourOptions(count.toString(), 1, 10);
    
    return {
      id: `count-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `How many ${object} are there?`,
      options: options,
      correctAnswer: count.toString(),
      hints: [`Count each ${object} slowly`, `Point to each one as you count`],
      visualAid: object.repeat(count)
    };
  },

  'number-recognition': (): ExerciseTemplate => {
    const number = Math.floor(Math.random() * 10) + 1;
    const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const numberWord = numberWords[number - 1];
    const options = ensureFourOptions(number.toString(), 1, 10);
    
    return {
      id: `number-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `Find the number ${numberWord}`, // Changed to word instead of digit
      options: options,
      correctAnswer: number.toString(),
      hints: [
        `Look for the number ${numberWord}`,
        `${numberWord} looks like this: ${number}`,
        `Count: one, two, three... find ${numberWord}!`
      ],
      visualAid: '🔢'
    };
  },
  
  'shapes': (): ExerciseTemplate => {
    const shapes = [
      { name: 'circle', emoji: '⭕', sides: 'round' },
      { name: 'circle', emoji: '🔴', sides: 'round' },
      { name: 'circle', emoji: '🔵', sides: 'round' },
      { name: 'square', emoji: '⬜', sides: '4 equal sides' },
      { name: 'square', emoji: '🟥', sides: '4 equal sides' },
      { name: 'square', emoji: '🟩', sides: '4 equal sides' },
      { name: 'triangle', emoji: '🔺', sides: '3 sides' },
      { name: 'triangle', emoji: '▶', sides: '3 sides' },
      { name: 'triangle', emoji: '📐', sides: '3 sides' },
      { name: 'rectangle', emoji: '📱', sides: '4 sides' },
      { name: 'rectangle', emoji: '⎕', sides: '4 sides' },
      { name: 'rectangle', emoji: '𓈙', sides: '4 sides' }
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Get all shapes that are NOT the same type as the correct answer
    const wrongShapes = shapes.filter(s => s.name !== shape.name);
    
    // Start with the correct answer
    const options = [shape.emoji];
    
    // Add 3 random wrong shapes (different types)
    while (options.length < 4) {
      const randomWrongShape = wrongShapes[Math.floor(Math.random() * wrongShapes.length)];
      if (!options.includes(randomWrongShape.emoji)) {
        options.push(randomWrongShape.emoji);
      }
    }
    
    return {
      id: `shape-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `Which shape is a ${shape.name}?`,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: shape.emoji,
      hints: [`A ${shape.name} has ${shape.sides}`, `Look for the ${shape.name} shape`],
      visualAid: shape.emoji
    };
  },

  'comparison': (): ExerciseTemplate => {
    const firstNumber = Math.floor(Math.random() * 8) + 1;
    
    // Generate numbers that are clearly bigger and smaller than firstNumber
    const biggerNumber = firstNumber + Math.floor(Math.random() * 3) + 1; // 1-3 bigger
    const smallerNumber = Math.max(1, firstNumber - Math.floor(Math.random() * 3) - 1); // 1-3 smaller, but at least 1
    
    const comparisonTypes = ['bigger than', 'smaller than'];
    const comparison = comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)];
    
    let correctAnswer = '';
    let options: string[] = [];
    
    if (comparison === 'bigger than') {
        correctAnswer = biggerNumber.toString();
        options = [biggerNumber.toString(), smallerNumber.toString()];
    } else { // smaller than
        correctAnswer = smallerNumber.toString();
        options = [smallerNumber.toString(), biggerNumber.toString()];
    }
  
    // Shuffle the options array to randomize correct answer position
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    
    return {
        id: `compare-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice',
        question: `Which number is ${comparison} ${firstNumber}?`,
        correctAnswer,
        options: shuffledOptions,
        hints: [
            `Think about numbers that are ${comparison} ${firstNumber}`,
            `Count from ${firstNumber} to find numbers that are ${comparison}`
        ],
        visualAid: '⚖️'
    };
  },

  'counting-to-20': (): ExerciseTemplate => {
    const questionTypes = [
      {
        type: 'find-number',
        generate: () => {
          const number = Math.floor(Math.random() * 20) + 1;
          const options = ensureFourOptions(number.toString(), 1, 20);
          
          return {
            question: `Find the number ${number}`,
            correctAnswer: number.toString(),
            options: options,
            hints: [`Look for the number ${number}`, `Count up to ${number}`],
            visualAid: '🔢' // Add this
          };
        }
      },
      {
        type: 'count-objects',
        generate: () => {
          const count = Math.floor(Math.random() * 15) + 5;
          const objects = ['🐠', '🌟', '🐚', '🦀', '💎', '🪸', '🦐', '🐙'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          const options = ensureFourOptions(count.toString(), 1, 20);
          
          return {
            question: `How many ${object} are there?`,
            correctAnswer: count.toString(),
            options: options,
            hints: [`Count each ${object} carefully`, `Point and count slowly`],
            visualAid: object.repeat(count)
          };
        }
      },
      {
        type: 'missing-number',
        generate: () => {
          const sequenceStart = Math.floor(Math.random() * 10) + 1;
          const sequence: (number | string)[] = [sequenceStart, sequenceStart + 1, sequenceStart + 2]; // Fix: Explicitly type the array
          const missingIndex = Math.floor(Math.random() * 3);
          const correctAnswer = sequence[missingIndex].toString();
          sequence[missingIndex] = '?'; // This will now work
          
          return {
            question: `What number is missing? ${sequence.join(' → ')}`,
            correctAnswer,
            options: ensureFourOptions(correctAnswer, 1, 20),
            hints: ['Count forward from the first number', 'Look for the pattern'],
            visualAid: '🔢' // Add missing visualAid
          };
        }
      }
    ];
    
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `count20-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options.sort(() => Math.random() - 0.5),
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: generated.visualAid || '🔢'
    };
  },

  '3d-shapes': (): ExerciseTemplate => {
    const shapes = [
      { name: 'cube', emoji: '⬜', description: '6 square faces', realWorld: 'dice, box' },
      { name: 'sphere', emoji: '⚪', description: 'round like a ball', realWorld: 'ball, marble' },
      { name: 'cylinder', emoji: '🛢️', description: 'round sides, flat ends', realWorld: 'can, glass' },
      { name: 'cone', emoji: '🎯', description: 'pointed top, circular base', realWorld: 'traffic cone, ice cream' },
      { name: 'pyramid', emoji: '🔺', description: 'triangular sides meeting at a point', realWorld: 'pyramid, roof' },
      { name: 'rectangular prism', emoji: '📦', description: '6 rectangular faces', realWorld: 'book, brick' }
    ];
    
    const questionTypes = [
      {
        type: 'identify-shape',
        generate: (shape: any) => {
          const options = shapes.map(s => s.emoji);
          const selectedOptions = options.sort(() => Math.random() - 0.5).slice(0, 4);
          if (!selectedOptions.includes(shape.emoji)) {
            selectedOptions[0] = shape.emoji;
          }
          
          return {
            question: `Which shape is a ${shape.name}?`,
            correctAnswer: shape.emoji,
            options: selectedOptions.sort(() => Math.random() - 0.5),
            hints: [`A ${shape.name} has ${shape.description}`, `Think of a ${shape.realWorld}`]
          };
        }
      },
      {
        type: 'real-world',
        generate: (shape: any) => {
          const allRealWorld = shapes.flatMap(s => s.realWorld.split(', '));
          const options = [shape.realWorld.split(', ')[0]];
          
          while (options.length < 4) {
            const randomExample = allRealWorld[Math.floor(Math.random() * allRealWorld.length)];
            if (!options.includes(randomExample)) {
              options.push(randomExample);
            }
          }
          
          return {
            question: `Which object is shaped like a ${shape.name}?`,
            correctAnswer: shape.realWorld.split(', ')[0],
            options: options.sort(() => Math.random() - 0.5),
            hints: [`A ${shape.name} looks like ${shape.realWorld}`, `It has ${shape.description}`]
          };
        }
      },
      {
        type: 'property-match',
        generate: (shape: any) => {
          const options = shapes.map(s => s.name);
          const selectedOptions = options.sort(() => Math.random() - 0.5).slice(0, 4);
          if (!selectedOptions.includes(shape.name)) {
            selectedOptions[0] = shape.name;
          }
          
          return {
            question: `Which shape has ${shape.description}?`,
            correctAnswer: shape.name,
            options: selectedOptions.sort(() => Math.random() - 0.5),
            hints: [`Look for the ${shape.name}`, `It looks like ${shape.realWorld}`]
          };
        }
      }
    ];
    
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate(shape);
    
    return {
      id: `3d-shape-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: shape.emoji
    };
  },

  'classification': (): ExerciseTemplate => {
    const categories = [
      {
        category: 'animals',
        items: ['🐕', '🐈', '🐦', '🐠', '🐘', '🦒', '🐢', '🦋'],
        intruders: ['📚', '🚗', '🏠', '✏️', '🎈'],
        questions: [
          'Which one does not belong with the animals?',
          'Find the one that is not an animal',
          'Which one is different from the others?'
        ]
      },
      {
        category: 'vehicles', 
        items: ['🚗', '🚌', '✈️', '🚂', '🚢', '🚁', '🚲', '🛴'],
        intruders: ['🍎', '📚', '🏠', '👕', '🎮'],
        questions: [
          'Which one is not a vehicle?',
          'Find the one that cannot take you somewhere',
          'Which one does not move?'
        ]
      },
      {
        category: 'food',
        items: ['🍎', '🍌', '🥕', '🍞', '🍕', '🍦', '🥪', '🍇'],
        intruders: ['⚽', '📱', '🎨', '🧸', '🎭'],
        questions: [
          'Which one is not food?',
          'Find the one you cannot eat',
          'Which one is different from the yummy foods?'
        ]
      },
      {
        category: 'weather',
        items: ['☀️', '🌧️', '⛄', '🌈', '🌪️', '💨'],
        intruders: ['🎂', '🚗', '📖', '🎸', '👟'],
        questions: [
          'Which one is not part of the weather?',
          'Find the one that does not belong with weather symbols',
          'Which one is different from weather types?'
        ]
      }
    ];
    
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const question = selectedCategory.questions[Math.floor(Math.random() * selectedCategory.questions.length)];
    const intruder = selectedCategory.intruders[Math.floor(Math.random() * selectedCategory.intruders.length)];
    
    const selectedItems = [...selectedCategory.items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [...selectedItems, intruder].sort(() => Math.random() - 0.5);

    const visualAidEmojis = options.join(' ');
    
    return {
      id: `classify-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question,
      options,
      correctAnswer: intruder,
      hints: [
        'Think about what group the items belong to',
        'Find the one that is different from the others',
        `Most of these are ${selectedCategory.category}`
      ],
       visualAid: visualAidEmojis
    };
  },
  'money-recognition': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    const commonCoins = getCommonCoins(currency);

    const questionTypes = [
      {
        type: 'identify-coin',
        generate: (coin: any) => {
          const options = commonCoins.map(c => c.displayName);
          const selectedOptions = [...options].sort(() => Math.random() - 0.5).slice(0, 4);
          if (!selectedOptions.includes(coin.displayName)) {
            selectedOptions[0] = coin.displayName;
          }
          
          return {
            question: `Which coin is worth ${formatSubunit(coin.value, currency)}?`,
            correctAnswer: coin.displayName,
            options: selectedOptions.sort(() => Math.random() - 0.5),
            hints: [`A ${coin.displayName} is worth ${formatSubunit(coin.value, currency)}`, `Look for the ${coin.name}`]
          };
        }
      },
      {
        type: 'match-value',
        generate: (coin: any) => {
          const values = commonCoins.map(c => formatSubunit(c.value, currency));
          const selectedOptions = [...values].sort(() => Math.random() - 0.5).slice(0, 4);
          if (!selectedOptions.includes(formatSubunit(coin.value, currency))) {
            selectedOptions[0] = formatSubunit(coin.value, currency);
          }
          
          return {
            question: `How much is a ${coin.displayName} worth?`,
            correctAnswer: formatSubunit(coin.value, currency),
            options: selectedOptions.sort(() => Math.random() - 0.5),
            hints: [`Remember: ${coin.displayName} = ${formatSubunit(coin.value, currency)}`, `Think about coin values`]
          };
        }
      },
      {
        type: 'sort-coins',
        generate: (coin: any) => {
          const sortedCoins = [...commonCoins].sort((a, b) => a.value - b.value);
          const questionCoin = sortedCoins[Math.floor(Math.random() * sortedCoins.length)];
          const position = sortedCoins.indexOf(questionCoin);
          
          const positions = ['smallest', 'biggest', 'middle'];
          
          return {
            question: `If you sort coins by value, which coin is ${positions[Math.min(position, 2)]}?`,
            correctAnswer: questionCoin.displayName,
            options: commonCoins.map(c => c.displayName).sort(() => Math.random() - 0.5),
            hints: [
              `${sortedCoins[0].displayName} is smallest, ${sortedCoins[sortedCoins.length-1].displayName} is biggest`,
              `Think about which coin has more value`
            ]
          };
        }
      }
    ];

    const coin = commonCoins[Math.floor(Math.random() * commonCoins.length)];
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate(coin);
    
    return {
      id: `money-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: coin.emoji.repeat(3)
    };
  },
  'patterns': (): ExerciseTemplate => {
    const patternTypes = [
      {
        type: 'AB',
        patterns: [
          { sequence: ['🐠', '🐟', '🐠', '🐟', '🐠', '?'], answer: '🐟' },
          { sequence: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'], answer: '🔵' },
          { sequence: ['⭐', '🌟', '⭐', '🌟', '⭐', '?'], answer: '🌟' },
          { sequence: ['🦀', '🐚', '🦀', '🐚', '🦀', '?'], answer: '🐚' }
        ]
      },
      {
        type: 'ABC',
        patterns: [
          { sequence: ['🐠', '🐟', '🐡', '🐠', '🐟', '🐡', '🐠', '?'], answer: '🐟' },
          { sequence: ['🔴', '🟢', '🔵', '🔴', '🟢', '🔵', '🔴', '?'], answer: '🟢' },
          { sequence: ['⭐', '🌟', '💫', '⭐', '🌟', '💫', '⭐', '?'], answer: '🌟' },
          { sequence: ['🦀', '🐚', '🪸', '🦀', '🐚', '🪸', '🦀', '?'], answer: '🐚' }
        ]
      },
      {
        type: 'AAB',
        patterns: [
          { sequence: ['🐠', '🐠', '🐟', '🐠', '🐠', '🐟', '🐠', '?'], answer: '🐠' },
          { sequence: ['🔴', '🔴', '🔵', '🔴', '🔴', '🔵', '🔴', '?'], answer: '🔴' },
          { sequence: ['⭐', '⭐', '🌟', '⭐', '⭐', '🌟', '⭐', '?'], answer: '⭐' }
        ]
      }
    ];

    const patternType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    const pattern = patternType.patterns[Math.floor(Math.random() * patternType.patterns.length)];
    
    // Create options - correct answer plus 3 random sea/ocean emojis
    const seaEmojis = ['🐠', '🐟', '🐡', '🦀', '🐚', '🪸', '🦐', '🐙', '🦑', '🌟', '💎'];
    const options = [pattern.answer];
    
    while (options.length < 4) {
      const randomEmoji = seaEmojis[Math.floor(Math.random() * seaEmojis.length)];
      if (!options.includes(randomEmoji) && randomEmoji !== pattern.answer) {
        options.push(randomEmoji);
      }
    }

    const questionText = `What comes next in this pattern?\n${pattern.sequence.join(' ')}`;

    return {
      id: `pattern-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: questionText,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer: pattern.answer,
      hints: [
        'Look for the repeating pattern',
        'Say the pattern out loud to hear the rhythm',
        'What emoji would keep the pattern going?'
      ],
      visualAid: pattern.sequence.slice(0, -1).join('') // Show the pattern without the question mark
    };
  },

  'ordinal-numbers': (): ExerciseTemplate => {
    const seaRaces = [
      {
        theme: 'dolphin race',
        participants: ['🐬', '🐋', '🦈', '🐠', '🐟', '🐡'],
        positions: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
      },
      {
        theme: 'turtle race', 
        participants: ['🐢', '🦀', '🐌', '🦐', '🐙', '🦑'],
        positions: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
      },
      {
        theme: 'seahorse race',
        participants: ['🐎', '🦄', '🦓', '🦌', '🐘', '🦒'],
        positions: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']
      }
    ];

    const questionTypes = [
      {
        type: 'position-identification',
        generate: (race: any) => {
          const positionIndex = Math.floor(Math.random() * 3); // first, second, or third
          const position = race.positions[positionIndex];
          const participant = race.participants[positionIndex];
          
          return {
            question: `In the ${race.theme}, which sea creature came in ${position} place?`,
            correctAnswer: participant,
            options: race.participants.slice(0, 4).sort(() => Math.random() - 0.5),
            hints: [
              `${position} place means position number ${positionIndex + 1}`,
              `Count from the front: 1st, 2nd, 3rd...`
            ]
          };
        }
      },
      {
        type: 'ordinal-matching',
        generate: (race: any) => {
          const positionIndex = Math.floor(Math.random() * 3);
          const participant = race.participants[positionIndex];
          const ordinalWords = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
          const ordinalNumbers = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
          
          return {
            question: `What position is ${participant} in?`,
            correctAnswer: ordinalNumbers[positionIndex],
            options: ordinalNumbers.slice(0, 4).sort(() => Math.random() - 0.5),
            hints: [
              `Look at the order of the race`,
              `${ordinalWords[positionIndex]} place is written as ${ordinalNumbers[positionIndex]}`
            ]
          };
        }
      },
      {
        type: 'sequence-completion',
        generate: (race: any) => {
          const sequence = ['first', 'second', 'third', 'fourth'];
          const missingIndex = Math.floor(Math.random() * 3);
          const correctAnswer = sequence[missingIndex];
          sequence[missingIndex] = '?';
          
          return {
            question: `Complete the sequence: ${sequence.join(' → ')}`,
            correctAnswer: correctAnswer,
            options: ['first', 'second', 'third', 'fourth'].sort(() => Math.random() - 0.5),
            hints: [
              'Remember the order: first, second, third, fourth...',
              'What comes after second? Before fourth?'
            ]
          };
        }
      }
    ];

    const race = seaRaces[Math.floor(Math.random() * seaRaces.length)];
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate(race);
    
    // Create visual aid showing the race order
    const visualAid = race.participants.slice(0, 4).join(' → ');

    return {
      id: `ordinal-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: visualAid
    };
  }
};