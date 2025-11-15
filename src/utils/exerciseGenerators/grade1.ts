// utils/exerciseGenerators/grade1.ts
import { ExerciseTemplate, ensureFourOptions } from './grades';
import { generateClockSVG } from '@/utils/clockGenerator';
import { getCurrency, formatSubunit, getCommonCoins } from '@/utils/currencyHelper';

// Grade 1 Generators (complete - all original content preserved)
export const grade1Generators = {
  addition: (): ExerciseTemplate => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const sum = num1 + num2;
    
    const options = ensureFourOptions(sum.toString(), 1, 20);
    
    return {
      id: `add-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `${num1} + ${num2} = ?`,
      options: options,
      correctAnswer: sum.toString(),
      hints: [`Start with ${num1} and count ${num2} more`, `Use your fingers to help add`],
      visualAid: '➕'
    };
  },

  subtraction: (): ExerciseTemplate => {
    const num1 = Math.floor(Math.random() * 10) + 5;
    const num2 = Math.floor(Math.random() * 4) + 1;
    const difference = num1 - num2;
    
    const options = ensureFourOptions(difference.toString(), 1, 15);
    
    return {
      id: `sub-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `${num1} - ${num2} = ?`,
      options: options,
      correctAnswer: difference.toString(),
      hints: [`Start with ${num1} and take away ${num2}`, `Count backwards from ${num1}`],
      visualAid: '➖'
    };
  },

  'place-value': (): ExerciseTemplate => {
    const number = Math.floor(Math.random() * 90) + 10;
    const tens = Math.floor(number / 10);
    const ones = number % 10;
    
    const options = ensureFourOptions(tens.toString(), 1, 9);
    
    return {
      id: `place-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `In the number ${number}, how many tens are there?`,
      options: options,
      correctAnswer: tens.toString(),
      hints: [`The tens place is the first digit`, `${number} has ${tens} tens and ${ones} ones`],
      visualAid: '🔢'
    };
  },

  measurement: (): ExerciseTemplate => {
    const objects = ['pencil', 'book', 'shoe', 'bottle'];
    const object = objects[Math.floor(Math.random() * objects.length)];
    const measurement = Math.floor(Math.random() * 5) + 1;
    const units = ['paper clips', 'blocks', 'cubes'];
    const unit = units[Math.floor(Math.random() * units.length)];
    
    const options = ensureFourOptions(measurement.toString(), 1, 10);
    
    return {
      id: `measure-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: `About how many ${unit} long is a ${object}?`,
      options: options.filter(opt => parseInt(opt) > 0),
      correctAnswer: measurement.toString(),
      hints: ['Think about how you would measure it', 'Compare it to other objects'],
      visualAid: '📏'
    };
  },

  'inverse-operations': (): ExerciseTemplate => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const sum = num1 + num2;
    
    const questionTypes = [
      {
        type: 'addition-to-subtraction',
        generate: () => ({
          question: `If ${num1} + ${num2} = ${sum}, then ${sum} - ${num1} = ?`,
          answer: num2.toString(),
          hint: 'Addition and subtraction are opposites',
          story: `You have ${num1} shells and find ${num2} more. If you give away your original ${num1} shells, how many are left?`
        })
      },
      {
        type: 'subtraction-to-addition',
        generate: () => ({
          question: `If ${sum} - ${num2} = ${num1}, then ${num1} + ${num2} = ?`,
          answer: sum.toString(),
          hint: 'Think about the relationship between + and -',
          story: `You had ${sum} pearls and gave ${num2} to a friend. To get back to ${sum}, how many more do you need?`
        })
      },
      {
        type: 'missing-addend',
        generate: () => {
          const missingNum = Math.random() > 0.5 ? num1 : num2;
          return {
            question: `${num1} + ? = ${sum}`,
            answer: num2.toString(),
            hint: 'What number added to the first gives the total?',
            story: `You have ${num1} starfish. How many more do you need to have ${sum} total?`
          };
        }
      },
      {
        type: 'fact-family',
        generate: () => {
          const operations = [
            `${num1} + ${num2} = ${sum}`,
            `${num2} + ${num1} = ${sum}`,
            `${sum} - ${num1} = ${num2}`,
            `${sum} - ${num2} = ${num1}`
          ];
          const missingOp = operations[Math.floor(Math.random() * operations.length)];
          const [part1, part2] = missingOp.split(' = ');
          
          return {
            question: `Complete the fact: ${part1} = ?`,
            answer: part2,
            hint: 'This is part of a fact family',
            story: `These numbers are friends: ${num1}, ${num2}, and ${sum}`
          };
        }
      }
    ];
    
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const options = ensureFourOptions(generated.answer, 1, 20);
    
    return {
      id: `inverse-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: options,
      correctAnswer: generated.answer,
      hints: [generated.hint, generated.story, 'They undo each other!'],
      visualAid: '🔄'
    };
  },

  'time-half-hour': (): ExerciseTemplate => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const isHalfPast = Math.random() > 0.5;
    const timeString = isHalfPast ? `${hours}:30` : `${hours}:00`;
    
    // Generate clock SVG
    const clockVisualAid = generateClockSVG(timeString, 120);
    
    const questionTypes = [
      {
        type: 'direct-time',
        generate: () => ({
          question: `What time is shown on the clock?`,
          answer: timeString,
          hint: isHalfPast ? 'The long hand points to 6 for half past' : 'The long hand points to 12 for o\'clock'
        })
      },
      {
        type: 'clock-reading',
        generate: () => ({
          question: `Look at the analog clock. What time is it?`,
          answer: timeString,
          hint: 'Little hand = hours, big hand = minutes'
        })
      },
      {
        type: 'daily-routine',
        generate: () => {
          const routines = [
            { time: '7:00', activity: 'wake up' },
            { time: '12:30', activity: 'eat lunch' },
            { time: '3:00', activity: 'play outside' },
            { time: '8:30', activity: 'go to bed' }
          ];
          const routine = routines.find(r => r.time === timeString) || 
                        { activity: isHalfPast ? `do homework at half past ${hours}` : `have breakfast at ${hours} o'clock` };
          
          return {
            question: `What time do you ${routine.activity}?`,
            answer: timeString,
            hint: 'Look at the clock to find the time'
          };
        }
      }
    ];
    
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const generated = selectedType.generate();
    
    const options = new Set<string>();
    options.add(generated.answer);
    
    // Create plausible wrong options
    while (options.size < 4) {
      const randomHour = Math.floor(Math.random() * 12) + 1;
      const randomHalf = Math.random() > 0.5;
      const randomTime = randomHalf ? `${randomHour}:30` : `${randomHour}:00`;
      
      // Make sure wrong options are different from correct answer
      if (randomTime !== timeString) {
        options.add(randomTime);
      }
    }
    
    return {
      id: `time1-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: generated.question,
      options: Array.from(options).sort(() => Math.random() - 0.5),
      correctAnswer: generated.answer,
      hints: [
        generated.hint,
        'The short hand shows the hour',
        isHalfPast ? '30 minutes = half hour' : '0 minutes = exactly on the hour'
      ],
      visualAid: clockVisualAid // Use the generated clock SVG
    };
  },
  'coin-counting': (currencyCode: string = 'US'): ExerciseTemplate => {
    const currency = getCurrency(currencyCode);
    const commonCoins = getCommonCoins(currency);

    const coinTypes = [
      {
        type: 'single-coin',
        coins: commonCoins.map(coin => ({
          ...coin,
          count: Math.floor(Math.random() * 5) + 1
        }))
      },
      {
        type: 'mixed-coins',
        coins: commonCoins.slice(0, 3).map(coin => ({
          ...coin,
          count: Math.floor(Math.random() * 3) + 1
        }))
      },
      {
        type: 'equal-groups',
        coins: commonCoins.slice(0, 2).map(coin => ({
          ...coin,
          count: Math.floor(Math.random() * 4) + 2
        }))
      }
    ];

    const coinType = coinTypes[Math.floor(Math.random() * coinTypes.length)];
    
    let totalValue = 0;
    let question = '';
    let visualAid = '';

    if (coinType.type === 'single-coin') {
      const coin = coinType.coins[Math.floor(Math.random() * coinType.coins.length)];
      totalValue = coin.value * coin.count;
      question = `You have ${coin.count} ${coin.displayName}${coin.count > 1 ? 's' : ''}. How much money do you have?`;
      visualAid = coin.emoji.repeat(coin.count);
    } else if (coinType.type === 'mixed-coins') {
      coinType.coins.forEach(coin => {
        totalValue += coin.value * coin.count;
        visualAid += coin.emoji.repeat(coin.count) + ' ';
      });
      question = `Count the money: ${coinType.coins.map(coin => 
        `${coin.count} ${coin.displayName}`).join(' and ')}`;
    } else {
      // Equal groups - comparing two types of coins
      const coin1 = coinType.coins[0];
      const coin2 = coinType.coins[1];
      totalValue = coin1.value * coin1.count;
      const comparisonValue = coin2.value * coin2.count;
      
      const comparisons = [
        {
          question: `Which is worth more: ${coin1.count} ${coin1.displayName} or ${coin2.count} ${coin2.displayName}?`,
          answer: totalValue > comparisonValue ? `${coin1.count} ${coin1.displayName}` : `${coin2.count} ${coin2.displayName}`,
          visual: coin1.emoji.repeat(coin1.count) + ' vs ' + coin2.emoji.repeat(coin2.count)
        },
        {
          question: `How much are ${coin1.count} ${coin1.displayName} worth?`,
          answer: formatSubunit(totalValue, currency),
          visual: coin1.emoji.repeat(coin1.count)
        }
      ];
      
      const selected = comparisons[Math.floor(Math.random() * comparisons.length)];
      question = selected.question;
      visualAid = selected.visual;
      totalValue = selected.answer.includes(currency.subunit.charAt(0)) ? totalValue : 0;
    }

    const correctAnswer = coinType.type === 'equal-groups' && !question.includes(currency.subunit.charAt(0))
      ? (totalValue > 0 ? `${coinType.coins[0].count} ${coinType.coins[0].displayName}` : `${coinType.coins[1].count} ${coinType.coins[1].displayName}`)
      : formatSubunit(totalValue, currency);

    const options = ensureFourOptions(
      coinType.type === 'equal-groups' && !question.includes(currency.subunit.charAt(0)) 
        ? (totalValue > 0 ? `${coinType.coins[0].count} ${coinType.coins[0].displayName}` : `${coinType.coins[1].count} ${coinType.coins[1].displayName}`)
        : totalValue.toString(),
      1, 
      Math.max(100, totalValue * 2)
    ).map(opt => {
      if (coinType.type === 'equal-groups' && !question.includes(currency.subunit.charAt(0))) {
        return opt.includes('coin') ? opt : `${opt} ${commonCoins[0].displayName}`;
      } else {
        return formatSubunit(parseInt(opt), currency);
      }
    });

    const hints = [
      `${commonCoins.map(coin => `${coin.displayName} = ${formatSubunit(coin.value, currency)}`).join(', ')}`,
      'Count carefully by 1s, 5s, or 10s',
      'Use skip counting for larger coins'
    ];

    return {
      id: `coins-${Date.now()}-${Math.random()}`,
      type: 'multiple-choice',
      question: question,
      options: options,
      correctAnswer: correctAnswer,
      hints: hints,
      visualAid: visualAid
    };
  },
};