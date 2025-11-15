// utils/exerciseGenerators/grades2.ts
import { ExerciseTemplate, ensureFourOptions, getVisualAidForObjects } from './grades';
import { getCurrency, formatSubunit, getCommonCoins, type Currency } from '@/utils/currencyHelper';
import { generateClockSVG } from '@/utils/clockGenerator';

// Grade 2 Generators (complete - all original content preserved)
export const grade2Generators = {
  'word-problems': (): ExerciseTemplate => {
    const problemCategories = [
      {
        name: "Addition Stories",
        templates: [
          {
            question: "There are {first} {object1} and {second} {object2}. How many {objects} are there in total?",
            operation: (a: number, b: number) => a + b,
            objectPairs: [
              { object1: 'red balloons', object2: 'blue balloons', objects: 'balloons' },
              { object1: 'big dogs', object2: 'small cats', objects: 'animals' },
              { object1: 'story books', object2: 'picture books', objects: 'books' },
              { object1: 'chocolate cookies', object2: 'vanilla cookies', objects: 'cookies' },
              { object1: 'red cars', object2: 'blue trucks', objects: 'vehicles' }
            ]
          },
          {
            question: "In the garden, I see {first} {object1} and {second} {object2}. How many {objects} do I see?",
            operation: (a: number, b: number) => a + b,
            objectPairs: [
              { object1: 'red roses', object2: 'yellow sunflowers', objects: 'flowers' },
              { object1: 'green frogs', object2: 'brown snails', objects: 'animals' },
              { object1: 'tall trees', object2: 'small bushes', objects: 'plants' }
            ]
          }
        ]
      },
      {
        name: "Subtraction Stories", 
        templates: [
          {
            question: "I had {first} {object1}. I gave {second} to my friend. How many {objects} do I have left?",
            operation: (a: number, b: number) => a - b,
            objectPairs: [
              { object1: 'marbles', objects: 'marbles' },
              { object1: 'stickers', objects: 'stickers' },
              { object1: 'candies', objects: 'candies' },
              { object1: 'toys', objects: 'toys' },
              { object1: 'pencils', objects: 'pencils' }
            ]
          },
          {
            question: "There were {first} {object1} on the table. {second} fell off. How many {objects} are still on the table?",
            operation: (a: number, b: number) => a - b,
            objectPairs: [
              { object1: 'crayons', objects: 'crayons' },
              { object1: 'blocks', objects: 'blocks' },
              { object1: 'coins', objects: 'coins' },
              { object1: 'cups', objects: 'cups' }
            ]
          }
        ]
      },
      {
        name: "Comparison Stories",
        templates: [
          {
            question: "Tom has {first} {object1}. Sarah has {second} {object2}. How many more {objects} does {person} have?",
            operation: (a: number, b: number) => Math.abs(a - b),
            objectPairs: [
              { object1: 'toy cars', object2: 'toy cars', objects: 'toy cars', person: 'Tom' },
              { object1: 'dolls', object2: 'dolls', objects: 'dolls', person: 'Sarah' },
              { object1: 'baseball cards', object2: 'baseball cards', objects: 'baseball cards', person: 'Tom' }
            ],
            getQuestion: (template: any, num1: number, num2: number, objects: any) => {
              const person = num1 > num2 ? 'Tom' : 'Sarah';
              return template.question
                .replace('{person}', person)
                .replace('{first}', num1.toString())
                .replace('{object1}', objects.object1)
                .replace('{second}', num2.toString())
                .replace('{object2}', objects.object2)
                .replace('{objects}', objects.objects);
            }
          }
        ]
      }
    ];

    const category = problemCategories[Math.floor(Math.random() * problemCategories.length)];
    const template = category.templates[Math.floor(Math.random() * category.templates.length)];
    const objectPair = template.objectPairs[Math.floor(Math.random() * template.objectPairs.length)];
    
    let num1, num2, answer;
    
    if (category.name === "Addition Stories") {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * 15) + 5;
      answer = template.operation(num1, num2);
    } else if (category.name === "Subtraction Stories") {
      num1 = Math.floor(Math.random() * 15) + 10;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = template.operation(num1, num2);
    } else {
      num1 = Math.floor(Math.random() * 12) + 3;
      num2 = Math.floor(Math.random() * 12) + 3;
      while (num1 === num2) {
        num2 = Math.floor(Math.random() * 12) + 3;
      }
      answer = template.operation(num1, num2);
    }
    
    let question;
    if ('getQuestion' in template && typeof (template as any).getQuestion === 'function') {
      question = (template as any).getQuestion(template, num1, num2, objectPair);
    } else {
      question = template.question
        .replace('{first}', num1.toString())
        .replace('{object1}', objectPair.object1)
        .replace('{second}', num2.toString())
        .replace('{object2}', (objectPair as any).object2 ?? objectPair.object1)
        .replace('{objects}', objectPair.objects);
    }
    
    const options = ensureFourOptions(answer.toString(), 1, 30);

    const hints = category.name === "Addition Stories" 
      ? [`Add ${num1} + ${num2}`, "Combine both amounts"]
      : category.name === "Subtraction Stories"
      ? [`Subtract ${num2} from ${num1}`, "Find how many are left"]
      : [`Find the difference between ${num1} and ${num2}`, "See which number is bigger and by how much"];

    return {
      id: `word-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question,
      options,
      correctAnswer: answer.toString(),
      hints,
      visualAid: getVisualAidForObjects(
        objectPair.object1.split(' ')[1] || objectPair.object1,
        ('object2' in objectPair && objectPair.object2 ? objectPair.object2.split(' ')[1] : objectPair.object1)
      )
    };
  },

  'time-telling': (): ExerciseTemplate => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minuteOptions = [0, 30]; // Only whole and half hours for Grade 2
    const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
    
    // Generate clock SVG
    const clockVisualAid = generateClockSVG(timeString, 120);
    
    const timeWords = minute === 0 ? `${hour} o'clock` : `half past ${hour}`;
    
    const questionTypes = [
      {
        type: 'analog-to-digital',
        question: `What time is shown on the clock?`,
        correctAnswer: timeString,
        hint: 'Look at where both clock hands are pointing'
      },
      {
        type: 'digital-to-words', 
        question: `The clock shows ${timeString}. How would you say this time?`,
        correctAnswer: timeWords,
        hint: `${minute === 0 ? 'O\'clock means exactly on the hour' : 'Half past means 30 minutes after the hour'}`
      },
      {
        type: 'daily-activity',
        question: `What time is it when the clock looks like this?`,
        correctAnswer: timeString,
        hint: 'Match the clock to a common daily time'
      }
    ];
    
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let options: string[];
    
    if (selectedType.type === 'digital-to-words') {
      // For word-based answers
      options = [timeWords];
      
      // Add wrong word options
      const wrongTimes = new Set<string>();
      while (wrongTimes.size < 3) {
        const wrongHour = Math.floor(Math.random() * 12) + 1;
        const wrongMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
        const wrongTimeWords = wrongMinute === 0 ? `${wrongHour} o'clock` : `half past ${wrongHour}`;
        
        if (wrongTimeWords !== timeWords) {
          wrongTimes.add(wrongTimeWords);
        }
      }
      
      options = [...options, ...Array.from(wrongTimes)].sort(() => Math.random() - 0.5);
    } else {
      // For digital time answers
      options = [timeString];
      
      // Add wrong digital options
      const wrongTimes = new Set<string>();
      while (wrongTimes.size < 3) {
        const wrongHour = Math.floor(Math.random() * 12) + 1;
        const wrongMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
        const wrongTime = `${wrongHour}:${wrongMinute.toString().padStart(2, '0')}`;
        
        if (wrongTime !== timeString) {
          wrongTimes.add(wrongTime);
        }
      }
      
      options = [...options, ...Array.from(wrongTimes)].sort(() => Math.random() - 0.5);
    }
    
    return {
      id: `time-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: selectedType.question,
      options: options,
      correctAnswer: selectedType.correctAnswer,
      hints: [
        selectedType.hint,
        'Short hand = hours, long hand = minutes',
        minute === 0 ? 'Long hand at top = o\'clock' : 'Long hand at bottom = half past'
      ],
      visualAid: selectedType.type === 'digital-to-words' ? '⏰' : clockVisualAid
    };
  },

'money': (currencyCode: string = 'US'): ExerciseTemplate => { // ADD currencyCode PARAMETER
    const currency = getCurrency(currencyCode);
    const commonCoins = getCommonCoins(currency);

    const moneyQuestionTypes = [
      {
        type: 'basic-coin-addition',
        generate: () => {
          const coin1 = commonCoins[Math.floor(Math.random() * commonCoins.length)];
          const coin2 = commonCoins[Math.floor(Math.random() * commonCoins.length)];
          const total = coin1.value + coin2.value;
          
          return {
            question: `If you have one ${coin1.displayName} and one ${coin2.displayName}, how much money do you have?`,
            correctAnswer: formatSubunit(total, currency),
            options: generateMoneyOptions(total, currency, commonCoins),
            hints: [
              `A ${coin1.displayName} is ${formatSubunit(coin1.value, currency)}`,
              `A ${coin2.displayName} is ${formatSubunit(coin2.value, currency)}`,
              `Add: ${formatSubunit(coin1.value, currency)} + ${formatSubunit(coin2.value, currency)}`
            ],
            visualAid: coin1.emoji + coin2.emoji
          };
        }
      },
      {
        type: 'multiple-coins',
        generate: () => {
          const selectedCoins = commonCoins.slice(0, 3);
          const coinCounts = selectedCoins.map(coin => ({
            coin,
            count: Math.floor(Math.random() * 3) + 1
          }));
          
          const total = coinCounts.reduce((sum, item) => sum + (item.coin.value * item.count), 0);
          
          return {
            question: `Count the money: ${coinCounts.map(item => 
              `${item.count} ${item.coin.displayName}`).join(', ')}`,
            correctAnswer: formatSubunit(total, currency),
            options: generateMoneyOptions(total, currency, commonCoins),
            hints: [
              'Count each type of coin separately',
              'Then add all the amounts together',
              coinCounts.map(item => `${item.count} × ${formatSubunit(item.coin.value, currency)}`).join(' + ')
            ],
            visualAid: coinCounts.map(item => item.coin.emoji.repeat(item.count)).join('')
          };
        }
      },
      {
        type: 'coin-comparison',
        generate: () => {
          const coin1 = commonCoins[Math.floor(Math.random() * commonCoins.length)];
          const coin2 = commonCoins[Math.floor(Math.random() * commonCoins.length)];
          const count1 = Math.floor(Math.random() * 4) + 1;
          const count2 = Math.floor(Math.random() * 4) + 1;
          
          const total1 = coin1.value * count1;
          const total2 = coin2.value * count2;
          
          const isMore = total1 > total2;
          const isEqual = total1 === total2;
          
          let question, correctAnswer;
          
          if (isEqual) {
            question = `Which has the same value: ${count1} ${coin1.displayName} or ${count2} ${coin2.displayName}?`;
            correctAnswer = 'Both are equal';
          } else {
            question = `Which is worth more: ${count1} ${coin1.displayName} or ${count2} ${coin2.displayName}?`;
            correctAnswer = isMore ? `${count1} ${coin1.displayName}` : `${count2} ${coin2.displayName}`;
          }
          
          return {
            question,
            correctAnswer,
            options: [
              `${count1} ${coin1.displayName}`,
              `${count2} ${coin2.displayName}`,
              'Both are equal',
              'Neither'
            ].sort(() => Math.random() - 0.5),
            hints: [
              `Calculate: ${count1} × ${formatSubunit(coin1.value, currency)} = ${formatSubunit(total1, currency)}`,
              `Calculate: ${count2} × ${formatSubunit(coin2.value, currency)} = ${formatSubunit(total2, currency)}`,
              'Compare the total amounts'
            ],
            visualAid: coin1.emoji.repeat(count1) + ' vs ' + coin2.emoji.repeat(count2)
          };
        }
      },
      {
        type: 'making-amount',
        generate: () => {
          const targetAmount = [10, 25, 50, 100][Math.floor(Math.random() * 4)];
          const possibleCombinations = [
            { coins: [commonCoins.find(c => c.value === 10)], description: 'one dime' },
            { coins: [commonCoins.find(c => c.value === 25)], description: 'one quarter' },
            { coins: [commonCoins.find(c => c.value === 5), commonCoins.find(c => c.value === 5)], description: 'two nickels' },
            { coins: [commonCoins.find(c => c.value === 10), commonCoins.find(c => c.value === 10), commonCoins.find(c => c.value === 5)], description: 'two dimes and one nickel' }
          ].filter(comb => comb.coins.every(coin => coin !== undefined));
          
          const correctCombination = possibleCombinations.find(comb => 
            comb.coins.reduce((sum, coin) => sum + coin!.value, 0) === targetAmount
          );
          
          const wrongCombinations = possibleCombinations.filter(comb => 
            comb.coins.reduce((sum, coin) => sum + coin!.value, 0) !== targetAmount
          ).slice(0, 3);
          
          return {
            question: `Which combination makes exactly ${formatSubunit(targetAmount, currency)}?`,
            correctAnswer: correctCombination?.description || 'one dime',
            options: [
              correctCombination?.description || 'one dime',
              ...wrongCombinations.map(comb => comb.description)
            ].sort(() => Math.random() - 0.5),
            hints: [
              `You need coins that add up to ${formatSubunit(targetAmount, currency)}`,
              'Add the values of each coin combination',
              'Check which one equals the target amount'
            ],
            visualAid: '💰'
          };
        }
      },
      {
        type: 'coin-identification',
        generate: () => {
          const coin = commonCoins[Math.floor(Math.random() * commonCoins.length)];
          const wrongCoins = commonCoins.filter(c => c.value !== coin.value)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          
          return {
            question: `Which coin is worth ${formatSubunit(coin.value, currency)}?`,
            correctAnswer: coin.displayName,
            options: [coin.displayName, ...wrongCoins.map(c => c.displayName)].sort(() => Math.random() - 0.5),
            hints: [
              `Look for the coin that equals ${formatSubunit(coin.value, currency)}`,
              'Remember the values of different coins',
              currency.coins.map(c => `${c.displayName} = ${formatSubunit(c.value, currency)}`).join(', ')
            ],
            visualAid: coin.emoji.repeat(3)
          };
        }
      }
    ];

    const selectedType = moneyQuestionTypes[Math.floor(Math.random() * moneyQuestionTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `money-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: generated.visualAid
    };
  },
  
  'place-value': (): ExerciseTemplate => {
    const number = Math.floor(Math.random() * 900) + 100;
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const ones = number % 10;
    
    const placeTypes = [
      { 
        type: 'hundreds', 
        value: hundreds, 
        question: `In the number ${number}, how many hundreds are there?`,
        hint: `The hundreds place is the first digit`
      },
      { 
        type: 'tens', 
        value: tens, 
        question: `In the number ${number}, how many tens are there?`,
        hint: `The tens place is the second digit`
      },
      { 
        type: 'ones', 
        value: ones, 
        question: `In the number ${number}, how many ones are there?`,
        hint: `The ones place is the last digit`
      },
      { 
        type: 'expanded', 
        value: number, 
        question: `What is ${number} in expanded form?`,
        hint: `Break the number into hundreds, tens, and ones`
      }
    ];
    
    const selectedType = placeTypes[Math.floor(Math.random() * placeTypes.length)];
    
    let correctAnswer: string;
    let options: string[];
    
    if (selectedType.type === 'expanded') {
      correctAnswer = `${hundreds * 100} + ${tens * 10} + ${ones}`;
      options = [
        correctAnswer,
        `${ones * 100} + ${hundreds * 10} + ${tens}`,
        `${tens * 100} + ${ones * 10} + ${hundreds}`,
        `${hundreds} + ${tens} + ${ones}`
      ];
    } else {
      correctAnswer = selectedType.value.toString();
      options = ensureFourOptions(correctAnswer, 0, 9);
    }
    
    return {
      id: `place2-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: selectedType.question,
      options: options.sort(() => Math.random() - 0.5),
      correctAnswer,
      hints: [selectedType.hint, `${number} has ${hundreds} hundreds, ${tens} tens, and ${ones} ones`],
      visualAid: '🔢'
    };
  },

  'measurement': (): ExerciseTemplate => {
    const lengthComparisonQuestions = [
      {
        question: "Here are three classroom objects: 🖍️ (crayon), 📏 (ruler), 🪑 (chair). Which is longest?",
        correctAnswer: "🪑",
        options: ["🖍️", "📏", "🪑", "📚"],
        hint: "Think about how long each object is in real life"
      },
      {
        question: "Which is shortest: a 📏 (30cm ruler), a 🥖 (baguette), or a 🐍 (garden snake)?",
        correctAnswer: "📏",
        options: ["📏", "🥖", "🐍", "🌳"],
        hint: "A baguette is about 60cm, a garden snake can be over 1 meter"
      },
      {
        question: "Emma's rope is 8 meters. Jake's rope is 11 meters. Whose rope is longer?",
        correctAnswer: "Jake",
        options: ["Emma", "Jake", "Same length", "Can't tell"],
        hint: "Longer means more length in meters"
      },
      {
        question: "Tree A is 5 meters tall. Tree B is 9 meters tall. Which tree is shorter?",
        correctAnswer: "Tree A",
        options: ["Tree A", "Tree B", "Both are same", "Neither"],
        hint: "Shorter means less height"
      },
      {
        question: "Pencil: 15cm, Book: 22cm, Shoe: 30cm. Which is longest?",
        correctAnswer: "Shoe",
        options: ["Pencil", "Book", "Shoe", "Eraser"],
        hint: "Compare the numbers - highest number is longest"
      },
      {
        question: "Ribbon: 45cm, String: 38cm, Thread: 15cm. Which is shortest?",
        correctAnswer: "Thread",
        options: ["Ribbon", "String", "Thread", "Rope"],
        hint: "Smallest number means shortest"
      }
    ];

    const unitSelectionQuestions = [
      {
        question: "You want to measure how long your math book is. What unit should you use?",
        correctAnswer: "centimeters",
        options: ["centimeters", "meters", "kilometers", "liters"],
        hint: "Books are small objects - pick the smallest length unit"
      },
      {
        question: "Your mom is measuring how much water fits in a bathtub. What unit should she use?",
        correctAnswer: "liters",
        options: ["milliliters", "liters", "kilograms", "meters"],
        hint: "Think about how much water a bathtub holds"
      },
      {
        question: "How long does it take to brush your teeth?",
        correctAnswer: "minutes",
        options: ["seconds", "minutes", "hours", "days"],
        hint: "Toothbrushing takes a short amount of time"
      },
      {
        question: "Which unit measures how heavy your backpack is?",
        correctAnswer: "kilograms",
        options: ["grams", "kilograms", "liters", "meters"],
        hint: "Weight is measured in grams or kilograms"
      },
      {
        question: "What unit would you use to measure a swimming pool's length?",
        correctAnswer: "meters",
        options: ["centimeters", "meters", "kilometers", "milliliters"],
        hint: "A pool is very long - pick a medium length unit"
      },
      {
        question: "A doctor measures medicine in:",
        correctAnswer: "milliliters",
        options: ["liters", "milliliters", "kilograms", "hours"],
        hint: "Medicine comes in small amounts"
      },
      {
        question: "What unit tells you how long a movie is?",
        correctAnswer: "hours",
        options: ["seconds", "minutes", "hours", "days"],
        hint: "Movies usually last 1-3 hours"
      },
      {
        question: "Which measures how much a banana weighs?",
        correctAnswer: "grams",
        options: ["grams", "kilograms", "meters", "liters"],
        hint: "A banana is light - pick the smaller weight unit"
      }
    ];

    const generateEstimationQuestion = () => {
      const scenarios = [
        {
          template: () => {
            const clipLength = 3;
            const bookLength = 30;
            const answer = Math.round(bookLength / clipLength);
            return {
              question: `About how many paper clips (${clipLength}cm each) long is a ${bookLength}cm notebook?`,
              correctAnswer: answer.toString(),
              options: ensureFourOptions(answer.toString(), answer-2, answer+2),
              hint: `${bookLength}cm ÷ ${clipLength}cm per clip ≈ ?`
            };
          }
        },
        {
          template: () => {
            const bottleVolume = [250, 500, 750][Math.floor(Math.random() * 3)];
            const jugVolume = 2000;
            const answer = jugVolume / bottleVolume;
            return {
              question: `A water bottle holds ${bottleVolume}ml. How many bottles fill a ${jugVolume/1000}-liter jug?`,
              correctAnswer: answer.toString(),
              options: ensureFourOptions(answer.toString(), answer-1, answer+2),
              hint: `${jugVolume}ml ÷ ${bottleVolume}ml per bottle = ?`
            };
          }
        },
        {
          template: () => {
            const stepLength = [40, 50, 60][Math.floor(Math.random() * 3)];
            const roomWidth = Math.round(stepLength * (8 + Math.floor(Math.random() * 5)));
            const answer = Math.round(roomWidth / stepLength);
            return {
              question: `If your step is ${stepLength}cm, how many steps to cross a ${roomWidth}cm wide room?`,
              correctAnswer: answer.toString(),
              options: ensureFourOptions(answer.toString(), answer-2, answer+1),
              hint: `${roomWidth}cm ÷ ${stepLength}cm per step ≈ ?`
            };
          }
        }
      ];
      
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      return scenario.template();
    };

    const orderingQuestions = [
      {
        question: "Put these in order from SHORTEST to LONGEST: paperclip, school desk, basketball court",
        correctAnswer: "paperclip, school desk, basketball court",
        options: [
          "paperclip, school desk, basketball court",
          "school desk, paperclip, basketball court", 
          "basketball court, school desk, paperclip",
          "school desk, basketball court, paperclip"
        ],
        hint: "Think about the size of each object you see in real life"
      },
      {
        question: "Order from SMALLEST to BIGGEST: drop of water, glass of water, swimming pool",
        correctAnswer: "drop of water, glass of water, swimming pool",
        options: [
          "drop of water, glass of water, swimming pool",
          "glass of water, drop of water, swimming pool",
          "swimming pool, glass of water, drop of water",
          "glass of water, swimming pool, drop of water"
        ],
        hint: "Which holds the least water? Which holds the most?"
      },
      {
        question: "Arrange from LIGHTEST to HEAVIEST: feather, cat, elephant",
        correctAnswer: "feather, cat, elephant",
        options: [
          "feather, cat, elephant",
          "cat, feather, elephant",
          "elephant, cat, feather",
          "cat, elephant, feather"
        ],
        hint: "Think about how much each animal weighs"
      }
    ];

    const questionGenerators = [
      () => {
        const q = lengthComparisonQuestions[Math.floor(Math.random() * lengthComparisonQuestions.length)];
        return { ...q, visualAid: "📏" };
      },
      () => {
        const q = unitSelectionQuestions[Math.floor(Math.random() * unitSelectionQuestions.length)];
        return { ...q, visualAid: "🧪" };
      },
      () => {
        const q = generateEstimationQuestion();
        return { ...q, visualAid: "🎯" };
      },
      () => {
        const q = orderingQuestions[Math.floor(Math.random() * orderingQuestions.length)];
        return { ...q, visualAid: "📊" };
      }
    ];

    const selectedQuestion = questionGenerators[Math.floor(Math.random() * questionGenerators.length)]();
    
    return {
      id: `measure2-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: selectedQuestion.question,
      options: selectedQuestion.options.sort(() => Math.random() - 0.5),
      correctAnswer: selectedQuestion.correctAnswer,
      hints: [
        selectedQuestion.hint,
        "Measurement helps us describe how big, long, heavy, or full things are"
      ],
      visualAid: selectedQuestion.visualAid
    };
  },

  'geometry': (): ExerciseTemplate => {
    const shapes = [
      { name: 'triangle', sides: 3, emoji: '🔺' },
      { name: 'triangle', sides: 3, emoji: '∆' },
      { name: 'square', sides: 4, emoji: '⬜' },
      { name: 'square', sides: 4, emoji: '🟦' },
      { name: 'rectangle', sides: 4, emoji: '▌' },
      { name: 'rectangle', sides: 4, emoji: '⎕' },
      { name: 'rhombus', sides: 4, emoji: '🔷' },
      { name: 'pentagon', sides: 5, emoji: '⬟' },
      { name: 'hexagon', sides: 6, emoji: '⬣' }
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const options = ensureFourOptions(shape.sides.toString(), 3, 8);
    
    return {
      id: `geo-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `How many sides does a ${shape.name} have?`,
      options: options,
      correctAnswer: shape.sides.toString(),
      hints: [`Count the sides of the ${shape.name}`, `A ${shape.name} has ${shape.sides} sides`],
      visualAid: shape.emoji
    };
  },
  // Add to grade2Generators object:

  'standard-measurement': (): ExerciseTemplate => {
    const measurementTypes = [
      {
        type: 'unit-selection',
        generate: () => {
          const scenarios = [
            {
              object: 'pencil',
              correctUnit: 'centimeters',
              question: 'What unit would you use to measure a pencil?',
              hint: 'Pencils are small objects - use a small unit',
              wrongUnits: ['meters', 'kilometers', 'liters']
            },
            {
              object: 'swimming pool',
              correctUnit: 'meters', 
              question: 'What unit would you use to measure a swimming pool?',
              hint: 'Pools are large - use a medium length unit',
              wrongUnits: ['centimeters', 'kilometers', 'milliliters']
            },
            {
              object: 'car trip',
              correctUnit: 'kilometers',
              question: 'What unit would you use to measure a car trip?',
              hint: 'Long distances use large units',
              wrongUnits: ['centimeters', 'meters', 'grams']
            },
            {
              object: 'book',
              correctUnit: 'centimeters',
              question: 'What unit would you use to measure a book?',
              hint: 'Books are medium-small objects',
              wrongUnits: ['meters', 'kilometers', 'kilograms']
            },
            {
              object: 'finger',
              correctUnit: 'centimeters',
              question: 'What unit would you use to measure your finger?',
              hint: 'Very small objects use centimeters',
              wrongUnits: ['meters', 'kilometers', 'liters']
            }
          ];
          
          const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
          const options = [scenario.correctUnit, ...scenario.wrongUnits].sort(() => Math.random() - 0.5);
          
          return {
            question: scenario.question,
            correctAnswer: scenario.correctUnit,
            options: options,
            hints: [scenario.hint, `Think about the size of a ${scenario.object}`]
          };
        }
      },
      {
        type: 'measurement-comparison',
        generate: () => {
          const comparisons = [
            {
              object1: 'pencil', length1: 15,
              object2: 'ruler', length2: 30,
              question: 'A pencil is 15 cm. A ruler is 30 cm. How much longer is the ruler?',
              answer: '15',
              unit: 'cm'
            },
            {
              object1: 'book', length1: 25,
              object2: 'notebook', length2: 18,
              question: 'A book is 25 cm. A notebook is 18 cm. How much shorter is the notebook?',
              answer: '7',
              unit: 'cm'
            },
            {
              object1: 'desk', length1: 120,
              object2: 'chair', length2: 45,
              question: 'A desk is 120 cm. A chair is 45 cm. What is the difference in length?',
              answer: '75',
              unit: 'cm'
            }
          ];
          
          const comparison = comparisons[Math.floor(Math.random() * comparisons.length)];
          const difference = parseInt(comparison.answer);
          const options = ensureFourOptions(comparison.answer, difference - 5, difference + 5);
          
          return {
            question: comparison.question,
            correctAnswer: `${comparison.answer} ${comparison.unit}`,
            options: options.map(opt => `${opt} ${comparison.unit}`),
            hints: [
              `Find the difference between ${comparison.length1} and ${comparison.length2}`,
              `Subtract: ${Math.max(comparison.length1, comparison.length2)} - ${Math.min(comparison.length1, comparison.length2)}`
            ]
          };
        }
      },
      {
        type: 'estimation',
        generate: () => {
          const objects = [
            { name: 'paper clip', actual: 3, unit: 'cm', range: [2, 4] },
            { name: 'chair', actual: 45, unit: 'cm', range: [40, 50] },
            { name: 'door', actual: 200, unit: 'cm', range: [180, 220] },
            { name: 'car', actual: 450, unit: 'cm', range: [400, 500] }
          ];
          
          const object = objects[Math.floor(Math.random() * objects.length)];
          const correctAnswer = object.actual.toString();
          const options = ensureFourOptions(correctAnswer, object.range[0], object.range[1]);
          
          return {
            question: `About how many ${object.unit} long is a ${object.name}?`,
            correctAnswer: correctAnswer,
            options: options,
            hints: [
              `Think about everyday ${object.name}s you've seen`,
              `Estimate based on what you know`
            ]
          };
        }
      },
      {
        type: 'conversion',
        generate: () => {
          const conversions = [
            { from: 100, to: 1, fromUnit: 'cm', toUnit: 'm', question: 'How many meters is 100 centimeters?' },
            { from: 2, to: 200, fromUnit: 'm', toUnit: 'cm', question: 'How many centimeters is 2 meters?' },
            { from: 500, to: 5, fromUnit: 'cm', toUnit: 'm', question: 'How many meters is 500 centimeters?' },
            { from: 3, to: 300, fromUnit: 'm', toUnit: 'cm', question: 'How many centimeters is 3 meters?' }
          ];
          
          const conversion = conversions[Math.floor(Math.random() * conversions.length)];
          const options = ensureFourOptions(conversion.to.toString(), conversion.to - 50, conversion.to + 50);
          
          return {
            question: conversion.question,
            correctAnswer: conversion.to.toString(),
            options: options,
            hints: [
              `Remember: 1 meter = 100 centimeters`,
              `${conversion.from} ${conversion.fromUnit} = ? ${conversion.toUnit}`
            ]
          };
        }
      }
    ];

    const selectedType = measurementTypes[Math.floor(Math.random() * measurementTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `measure-standard-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: '📐'
    };
  },

  'time-five-minutes': (): ExerciseTemplate => {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const minute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
    
    // Generate clock SVG
    const clockVisualAid = generateClockSVG(timeString, 120);
    
    const timeWords = getTimeInWords(hour, minute);
    
    const timeTypes = [
      {
        type: 'analog-to-digital',
        generate: () => ({
          question: `What time is shown on the clock?`,
          correctAnswer: timeString,
          options: generateTimeOptions(timeString, minuteOptions),
          hints: [
            `The hour hand is near ${hour}, the minute hand is at ${minute}`,
            'Digital time shows hours:minutes'
          ]
        })
      },
      {
        type: 'digital-to-words',
        generate: () => ({
          question: `The digital clock shows ${timeString}. How would you say this time?`,
          correctAnswer: timeWords,
          options: generateWordOptions(hour, minute, minuteOptions),
          hints: [
            `Read ${minute} minutes past ${hour}`,
            'Remember special names: 15=quarter, 30=half, 45=quarter to'
          ]
        })
      },
      {
        type: 'time-sequences',
        generate: () => {
          const intervals = [5, 10, 15, 30];
          const interval = intervals[Math.floor(Math.random() * intervals.length)];
          
          let nextHour = hour;
          let nextMinute = minute + interval;
          
          if (nextMinute >= 60) {
            nextHour++;
            nextMinute -= 60;
            if (nextHour > 12) nextHour = 1;
          }
          
          const nextTimeString = `${nextHour}:${nextMinute.toString().padStart(2, '0')}`;
          
          return {
            question: `If it's ${timeString} now, what time will it be in ${interval} minutes?`,
            correctAnswer: nextTimeString,
            options: generateTimeOptions(nextTimeString, minuteOptions),
            hints: [
              `Add ${interval} minutes to ${minute}`,
              `Count forward: ${minute} + ${interval} = ${nextMinute}`
            ]
          };
        }
      },
      {
        type: 'quarter-concepts',
        generate: () => {
          const concepts = [
            {
              condition: minute === 15,
              question: `What is "quarter past ${hour}" in digital time?`,
              answer: timeString,
              hint: 'Quarter past means 15 minutes after the hour'
            },
            {
              condition: minute === 45,
              question: `What is "quarter to ${hour + 1 > 12 ? 1 : hour + 1}" in digital time?`,
              answer: timeString, 
              hint: 'Quarter to means 15 minutes before the next hour'
            },
            {
              condition: minute === 30,
              question: `What is "half past ${hour}" in digital time?`,
              answer: timeString,
              hint: 'Half past means 30 minutes after the hour'
            }
          ];
          
          const concept = concepts.find(c => c.condition) || concepts[0];
          
          return {
            question: concept.question,
            correctAnswer: concept.answer,
            options: generateTimeOptions(timeString, minuteOptions),
            hints: [concept.hint, 'Digital time shows hours:minutes']
          };
        }
      }
    ];

    const selectedType = timeTypes[Math.floor(Math.random() * timeTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `time-5min-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: selectedType.type === 'digital-to-words' ? '🕒' : clockVisualAid
    };
  },
  'money-word-problems': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    const commonCoins = getCommonCoins(currency);

    const moneyWordProblems = [
      {
        type: 'saving-money',
        generate: () => {
          const itemPrice = [25, 50, 75, 100][Math.floor(Math.random() * 4)];
          const currentSavings = Math.floor(Math.random() * (itemPrice - 10)) + 5;
          const needed = itemPrice - currentSavings;
          
          return {
            question: `You want to buy a toy that costs ${formatSubunit(itemPrice, currency)}. You have ${formatSubunit(currentSavings, currency)}. How much more money do you need?`,
            correctAnswer: formatSubunit(needed, currency),
            options: generateMoneyOptions(needed, currency, commonCoins),
            hints: [
              `Subtract what you have from what you need`,
              `${formatSubunit(itemPrice, currency)} - ${formatSubunit(currentSavings, currency)} = ?`,
              'Find the difference between the price and your savings'
            ],
            visualAid: '💰'
          };
        }
      },
      {
        type: 'buying-items',
        generate: () => {
          const items = [
            { name: 'pencil', price: 10 },
            { name: 'eraser', price: 5 },
            { name: 'notebook', price: 25 },
            { name: 'sticker', price: 15 }
          ];
          const item1 = items[Math.floor(Math.random() * items.length)];
          const item2 = items[Math.floor(Math.random() * items.length)];
          const total = item1.price + item2.price;
          
          return {
            question: `You buy a ${item1.name} for ${formatSubunit(item1.price, currency)} and a ${item2.name} for ${formatSubunit(item2.price, currency)}. How much do you spend in total?`,
            correctAnswer: formatSubunit(total, currency),
            options: generateMoneyOptions(total, currency, commonCoins),
            hints: [
              'Add the prices of both items',
              `${formatSubunit(item1.price, currency)} + ${formatSubunit(item2.price, currency)} = ?`,
              'Combine the amounts'
            ],
            visualAid: '🛍️'
          };
        }
      },
      {
        type: 'change-calculation',
        generate: () => {
          const itemPrice = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
          const moneyPaid = itemPrice + [5, 10, 25][Math.floor(Math.random() * 3)];
          const change = moneyPaid - itemPrice;
          
          return {
            question: `You buy a snack for ${formatSubunit(itemPrice, currency)}. You pay with ${formatSubunit(moneyPaid, currency)}. How much change do you get back?`,
            correctAnswer: formatSubunit(change, currency),
            options: generateMoneyOptions(change, currency, commonCoins),
            hints: [
              'Subtract the price from what you paid',
              `${formatSubunit(moneyPaid, currency)} - ${formatSubunit(itemPrice, currency)} = ?`,
              'Change is the money you get back'
            ],
            visualAid: '💵'
          };
        }
      },
      {
        type: 'comparing-money',
        generate: () => {
          const person1 = ['Tom', 'Sarah', 'Alex', 'Maya'][Math.floor(Math.random() * 4)];
          const person2 = ['Jamal', 'Lily', 'Ryan', 'Zoe'][Math.floor(Math.random() * 4)];
          const amount1 = Math.floor(Math.random() * 50) + 25;
          const amount2 = amount1 + (Math.floor(Math.random() * 20) - 10);
          
          const difference = Math.abs(amount1 - amount2);
          const whoHasMore = amount1 > amount2 ? person1 : person2;
          
          return {
            question: `${person1} has ${formatSubunit(amount1, currency)}. ${person2} has ${formatSubunit(amount2, currency)}. How much more money does ${whoHasMore} have?`,
            correctAnswer: formatSubunit(difference, currency),
            options: generateMoneyOptions(difference, currency, commonCoins),
            hints: [
              'Find the difference between the two amounts',
              `Subtract the smaller amount from the larger amount`,
              `Compare ${formatSubunit(amount1, currency)} and ${formatSubunit(amount2, currency)}`
            ],
            visualAid: '⚖️'
          };
        }
      },
      {
        type: 'earning-money',
        generate: () => {
          const allowance = [25, 50, 75][Math.floor(Math.random() * 3)];
          const extra = Math.floor(Math.random() * 20) + 5;
          const total = allowance + extra;
          
          return {
            question: `You get ${formatSubunit(allowance, currency)} allowance each week. This week you earned ${formatSubunit(extra, currency)} extra for helping with chores. How much money do you have now?`,
            correctAnswer: formatSubunit(total, currency),
            options: generateMoneyOptions(total, currency, commonCoins),
            hints: [
              'Add your allowance to your extra earnings',
              `${formatSubunit(allowance, currency)} + ${formatSubunit(extra, currency)} = ?`,
              'Combine both amounts of money'
            ],
            visualAid: '💼'
          };
        }
      }
    ];

    const selectedProblem = moneyWordProblems[Math.floor(Math.random() * moneyWordProblems.length)];
    const generated = selectedProblem.generate();
    
    return {
      id: `money-word-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: generated.visualAid
    };
  },
  'arrays': (): ExerciseTemplate => {
    const arrayTypes = [
      {
        type: 'counting-arrays',
        generate: () => {
          const rows = Math.floor(Math.random() * 3) + 2;
          const columns = Math.floor(Math.random() * 3) + 2;
          const total = rows * columns;
          const objects = ['🍎', '🌟', '🔴', '🔵', '🟢', '🟡'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          const arrayDisplay = Array(rows).fill(null).map(() => 
            Array(columns).fill(object).join('')
          ).join('\n');
          
          return {
            question: `How many ${object} are in this array?\n${arrayDisplay}`,
            correctAnswer: total.toString(),
            options: ensureFourOptions(total.toString(), total - 2, total + 2),
            hints: [
              `Count the ${object} in rows and columns`,
              `${rows} rows × ${columns} columns = ?`,
              'Multiply rows times columns'
            ],
            visualAid: arrayDisplay
          };
        }
      },
      {
        type: 'array-creation',
        generate: () => {
          const total = Math.floor(Math.random() * 12) + 4;
          const possibleArrays = [
            { rows: 2, columns: Math.ceil(total / 2) },
            { rows: 3, columns: Math.ceil(total / 3) },
            { rows: 4, columns: Math.ceil(total / 4) }
          ].filter(arr => arr.rows * arr.columns === total);
          
          const correctArray = possibleArrays[Math.floor(Math.random() * possibleArrays.length)];
          const objects = ['🐠', '🐚', '🌟', '💎'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          return {
            question: `Which array shows ${total} ${object}?`,
            correctAnswer: `${correctArray.rows} rows and ${correctArray.columns} columns`,
            options: [
              `${correctArray.rows} rows and ${correctArray.columns} columns`,
              `${correctArray.rows + 1} rows and ${correctArray.columns - 1} columns`,
              `${correctArray.rows - 1} rows and ${correctArray.columns + 1} columns`,
              `${correctArray.columns} rows and ${correctArray.rows} columns`
            ].sort(() => Math.random() - 0.5),
            hints: [
              `Look for ${correctArray.rows} × ${correctArray.columns} = ${total}`,
              'Rows go across, columns go down',
              'Multiply rows times columns to get the total'
            ],
            visualAid: '📊'
          };
        }
      },
      {
        type: 'array-comparison',
        generate: () => {
          const array1 = {
            rows: Math.floor(Math.random() * 2) + 2,
            columns: Math.floor(Math.random() * 2) + 2
          };
          const array2 = {
            rows: Math.floor(Math.random() * 2) + 2,
            columns: Math.floor(Math.random() * 2) + 2
          };
          
          const total1 = array1.rows * array1.columns;
          const total2 = array2.rows * array2.columns;
          const difference = Math.abs(total1 - total2);
          
          const objects = ['🐟', '🦀', '🐙', '🪸'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          return {
            question: `One array has ${array1.rows} rows of ${array1.columns} ${object}. Another has ${array2.rows} rows of ${array2.columns} ${object}. How many more ${object} are in the larger array?`,
            correctAnswer: difference.toString(),
            options: ensureFourOptions(difference.toString(), difference - 1, difference + 2),
            hints: [
              `First array: ${array1.rows} × ${array1.columns} = ${total1}`,
              `Second array: ${array2.rows} × ${array2.columns} = ${total2}`,
              `Find the difference between ${Math.max(total1, total2)} and ${Math.min(total1, total2)}`
            ],
            visualAid: '⚖️'
          };
        }
      },
      {
        type: 'missing-dimension',
        generate: () => {
          const rows = Math.floor(Math.random() * 3) + 2;
          const columns = Math.floor(Math.random() * 3) + 2;
          const total = rows * columns;
          const objects = ['🔶', '🔷', '⭐', '💫'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          const hideRow = Math.random() > 0.5;
          
          return {
            question: `An array has ${total} ${object} arranged in ${hideRow ? '? rows' : `${rows} rows`} and ${hideRow ? `${columns} columns` : '? columns'}. How many ${hideRow ? 'rows' : 'columns'} are there?`,
            correctAnswer: (hideRow ? rows : columns).toString(),
            options: ensureFourOptions((hideRow ? rows : columns).toString(), 2, 5),
            hints: [
              `Total ${object} = rows × columns`,
              `${total} = ${hideRow ? '? × ' + columns : rows + ' × ?'}`,
              `Divide the total by the known dimension`
            ],
            visualAid: '❓'
          };
        }
      }
    ];

    const selectedType = arrayTypes[Math.floor(Math.random() * arrayTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `arrays-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: generated.visualAid
    };
  },
  'repeated-addition': (): ExerciseTemplate => {
    const additionTypes = [
      {
        type: 'groups-of-objects',
        generate: () => {
          const groups = Math.floor(Math.random() * 4) + 2;
          const itemsPerGroup = Math.floor(Math.random() * 5) + 2;
          const total = groups * itemsPerGroup;
          const objects = ['🐠', '🐚', '🌟', '💎', '🦀', '🐙'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          return {
            question: `There are ${groups} groups of ${itemsPerGroup} ${object}. How many ${object} in total?`,
            correctAnswer: total.toString(),
            options: ensureFourOptions(total.toString(), total - 3, total + 3),
            hints: [
              `Add ${itemsPerGroup} + ${itemsPerGroup} + ... (${groups} times)`,
              `This is ${groups} groups of ${itemsPerGroup}`,
              `You can multiply: ${groups} × ${itemsPerGroup} = ${total}`
            ],
            visualAid: object.repeat(itemsPerGroup) + ' '.repeat(2) + `× ${groups}`
          };
        }
      },
      {
        type: 'addition-to-multiplication',
        generate: () => {
          const number = Math.floor(Math.random() * 5) + 2;
          const count = Math.floor(Math.random() * 4) + 3;
          const total = number * count;
          
          const additionExpression = Array(count).fill(number).join(' + ');
          
          return {
            question: `Which multiplication matches this addition?\n${additionExpression}`,
            correctAnswer: `${count} × ${number}`,
            options: [
              `${count} × ${number}`,
              `${number} × ${count}`,
              `${count + 1} × ${number}`,
              `${count} × ${number + 1}`
            ].sort(() => Math.random() - 0.5),
            hints: [
              `There are ${count} groups of ${number}`,
              'Repeated addition can be written as multiplication',
              `Count how many times ${number} is added`
            ],
            visualAid: '🔢'
          };
        }
      },
      {
        type: 'multiplication-to-addition',
        generate: () => {
          const number = Math.floor(Math.random() * 5) + 2;
          const count = Math.floor(Math.random() * 4) + 3;
          const total = number * count;
          
          const correctAddition = Array(count).fill(number).join(' + ');
          const wrongAdditions = [
            Array(count).fill(number + 1).join(' + '),
            Array(count - 1).fill(number).join(' + '),
            Array(count + 1).fill(number - 1).join(' + ')
          ];
          
          return {
            question: `Which addition matches ${count} × ${number}?`,
            correctAnswer: correctAddition,
            options: [correctAddition, ...wrongAdditions].sort(() => Math.random() - 0.5),
            hints: [
              `${count} × ${number} means ${count} groups of ${number}`,
              'Multiplication is the same as repeated addition',
              `Add ${number} together ${count} times`
            ],
            visualAid: '➕'
          };
        }
      },
      {
        type: 'equal-groups',
        generate: () => {
          const total = Math.floor(Math.random() * 20) + 10;
          const groupSize = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
          const groups = Math.ceil(total / groupSize);
          const objects = ['🍪', '🎈', '📚', '✏️'];
          const object = objects[Math.floor(Math.random() * objects.length)];
          
          return {
            question: `You have ${total} ${object}. If you put them into groups of ${groupSize}, how many groups can you make?`,
            correctAnswer: groups.toString(),
            options: ensureFourOptions(groups.toString(), groups - 1, groups + 1),
            hints: [
              `Divide ${total} by ${groupSize}`,
              `How many times does ${groupSize} fit into ${total}?`,
              `Use repeated subtraction or counting`
            ],
            visualAid: object.repeat(groupSize) + ' '.repeat(2) + `... ${groups} times`
          };
        }
      },
      {
        type: 'skip-counting',
        generate: () => {
          const skipBy = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
          const count = Math.floor(Math.random() * 4) + 3;
          const total = skipBy * count;
          
          const sequence = Array(count).fill(0).map((_, i) => skipBy * (i + 1));
          const partialSequence = sequence.slice(0, -1).join(', ') + ', ?';
          
          return {
            question: `Complete this skip-counting sequence:\n${partialSequence}`,
            correctAnswer: total.toString(),
            options: ensureFourOptions(total.toString(), total - skipBy, total + skipBy),
            hints: [
              `Skip count by ${skipBy}s`,
              `The pattern is adding ${skipBy} each time`,
              `Last number: ${sequence[sequence.length - 2]} + ${skipBy} = ?`
            ],
            visualAid: '⏩'
          };
        }
      }
    ];

    const selectedType = additionTypes[Math.floor(Math.random() * additionTypes.length)];
    const generated = selectedType.generate();
    
    return {
      id: `repeated-add-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: generated.options,
      correctAnswer: generated.correctAnswer,
      hints: generated.hints,
      visualAid: generated.visualAid
    };
  },
};

// Helper functions for time options generation
function generateTimeOptions(correctTime: string, minuteOptions: number[]): string[] {
  const [correctHour, correctMinute] = correctTime.split(':').map(Number);
  const options = [correctTime];
  
  while (options.length < 4) {
    const wrongHour = Math.floor(Math.random() * 12) + 1;
    const wrongMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const wrongTime = `${wrongHour}:${wrongMinute.toString().padStart(2, '0')}`;
    
    if (wrongTime !== correctTime && !options.includes(wrongTime)) {
      options.push(wrongTime);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
}

function generateWordOptions(hour: number, minute: number, minuteOptions: number[]): string[] {
  const correctWords = getTimeInWords(hour, minute);
  const options = [correctWords];
  
  while (options.length < 4) {
    const wrongHour = Math.floor(Math.random() * 12) + 1;
    const wrongMinute = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const wrongWords = getTimeInWords(wrongHour, wrongMinute);
    
    if (wrongWords !== correctWords && !options.includes(wrongWords)) {
      options.push(wrongWords);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
}

// Keep the existing getTimeInWords function
function getTimeInWords(hour: number, minute: number): string {
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 30) return `half past ${hour}`;
  if (minute === 45) return `quarter to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 5) return `five past ${hour}`;
  if (minute === 10) return `ten past ${hour}`;
  if (minute === 20) return `twenty past ${hour}`;
  if (minute === 25) return `twenty-five past ${hour}`;
  if (minute === 35) return `twenty-five to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 40) return `twenty to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 50) return `ten to ${hour + 1 > 12 ? 1 : hour + 1}`;
  if (minute === 55) return `five to ${hour + 1 > 12 ? 1 : hour + 1}`;
  return `${minute} minutes past ${hour}`;
}

// Helper function for money options
function generateMoneyOptions(correctAmount: number, currency: Currency, commonCoins: any[]): string[] {
  const options = [formatSubunit(correctAmount, currency)];
  
  while (options.length < 4) {
    const wrongAmount = correctAmount + (Math.floor(Math.random() * 20) - 10);
    if (wrongAmount > 0 && wrongAmount !== correctAmount) {
      const wrongOption = formatSubunit(wrongAmount, currency);
      if (!options.includes(wrongOption)) {
        options.push(wrongOption);
      }
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
}