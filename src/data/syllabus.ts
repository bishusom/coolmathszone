// src/data/syllabus.ts
import { GradeLevel } from '@/types';

export const gradeLevels: GradeLevel[] = [
  {
    id: 'kindergarten',
    title: 'Kindergarten',
    description: 'Counting magic and shape adventures under the sea!',
    age: 4,
    color: 'pink',
    icon: '🧜‍♀️',
    topics: [
      {
        id: 'counting',
        title: 'Seashell Counting',
        description: 'Learn to count like a mermaid!',
        emoji: '🐚',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Count to 100 by ones and tens like ocean waves',
          'Count forward from any given number like swimming fish',
          'Write numbers from 0 to 20 in the sand',
          'Compare seashells and treasures up to 10'
        ]
      },
      {
        id: 'number-recognition',
        title: 'Number Treasure Hunt',
        description: 'Recognize numbers in ocean treasures!',
        emoji: '⭐',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Identify numbers 0-20',
          'Match numbers to quantities',
          'Find hidden numbers in ocean scenes'
        ]
      },
      {
        id: 'shapes',
        title: 'Ocean Shape Explorer',
        description: 'Discover shapes in the coral reef!',
        emoji: '🔺',
        difficulty: 'beginner',
        category: 'geometry',
        subtopics: [
          'Identify 2D shapes like starfish and bubbles',
          'Identify 3D shapes like treasure chests and shells',
          'Create patterns with ocean shapes and colors'
        ]
      },
      {
        id: 'comparison',
        title: 'Sea Creature Comparison',
        description: 'Compare sizes and numbers of sea friends!',
        emoji: '⚖️',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Compare numbers using greater than, less than',
          'Compare sizes of sea creatures',
          'Understand equal to concepts'
        ]
      },
      {
        id: 'counting-to-20',
        title: 'Advanced Seashell Counting',
        description: 'Master counting up to 20 with ocean friends!',
        emoji: '🔢',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Count objects up to 20',
          'Find missing numbers in sequences',
          'Match numbers to groups of sea creatures'
        ]
      },
      {
        id: '3d-shapes',
        title: '3D Ocean Shapes',
        description: 'Explore 3D shapes in underwater worlds!',
        emoji: '📦',
        difficulty: 'beginner',
        category: 'geometry',
        subtopics: [
          'Identify cubes, spheres, cylinders and cones',
          'Match 3D shapes to real ocean objects',
          'Understand 3D shape properties'
        ]
      },
      {
        id: 'classification',
        title: 'Sea Creature Sorting',
        description: 'Sort and classify ocean treasures!',
        emoji: '🗂️',
        difficulty: 'beginner',
        category: 'logic',
        subtopics: [
          'Sort objects into categories',
          'Identify what does not belong',
          'Understand grouping and classification'
        ]
      },
      {
        id: 'money-recognition',
        title: 'Coin Treasure',
        description: 'Identify coins like pirate treasure!',
        emoji: '🪙',
        difficulty: 'beginner',
        category: 'money',
        subtopics: [
          'Identify pennies, nickels, dimes, and quarters',
          'Match coins to their values',
          'Sort coins by type and value',
          'Understand basic money concepts'
        ]
      },
      {
        id: 'patterns',
        title: 'Ocean Patterns',
        description: 'Create and extend patterns with sea creatures!',
        emoji: '🎭',
        difficulty: 'beginner',
        category: 'patterns',
        subtopics: [
          'Create AB patterns (fish, whale, fish, whale)',
          'Extend existing patterns',
          'Identify pattern cores',
          'Create ABC patterns'
        ]
      },
      {
        id: 'ordinal-numbers',
        title: 'Sea Race Positions',
        description: 'Learn first, second, third with sea races!',
        emoji: '🏁',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Understand ordinal numbers 1st through 10th',
          'Identify positions in sequences',
          'Use ordinal numbers in context',
          'Match ordinal numbers to positions'
        ]
      }
    ]
  },
  {
    id: 'grade1',
    title: 'Grade 1',
    description: 'Dive into number adventures with ocean friends!',
    color: 'blue',
    icon: '🐬',
    age: 5,
    topics: [
      {
        id: 'addition',
        title: 'Dolphin Addition',
        description: 'Add sea treasures with dolphin friends!',
        emoji: '➕',
        difficulty: 'beginner',
        category: 'arithmetic',
        subtopics: [
          'Solve addition problems within 20',
          'Use counting strategies for addition',
          'Understand addition as putting together'
        ]
      },
      {
        id: 'subtraction',
        title: 'Subtraction Seas',
        description: 'Subtract sea treasures!',
        emoji: '➖',
        difficulty: 'beginner',
        category: 'arithmetic',
        subtopics: [
          'Solve subtraction problems within 20',
          'Use counting back strategies',
          'Understand subtraction as taking apart'
        ]
      },
      {
        id: 'place-value',
        title: 'Pearl Place Value Quest',
        description: 'Discover the secret of numbers with pearls!',
        emoji: '💎',
        difficulty: 'beginner',
        category: 'numbers',
        subtopics: [
          'Understand tens and ones like pearl clusters',
          'Read and write two-digit numbers',
          'Compare two-digit numbers'
        ]
      },
      {
        id: 'measurement',
        title: 'Seahorse Measurement',
        description: 'Measure ocean treasures with seahorses!',
        emoji: '📏',
        difficulty: 'beginner',
        category: 'measurement',
        subtopics: [
          'Measure length using non-standard units',
          'Compare objects by length and weight',
          'Estimate measurements'
        ]
      },
      {
        id: 'inverse-operations',
        title: 'Dolphin Fact Families',
        description: 'Discover how addition and subtraction are connected!',
        emoji: '🔄',
        difficulty: 'beginner',
        category: 'arithmetic',
        subtopics: [
          'Understand inverse operations',
          'Solve fact family problems',
          'Relate addition and subtraction'
        ]
      },
      {
        id: 'time-half-hour',
        title: 'Tide Time Telling',
        description: 'Learn to tell time with ocean clocks!',
        emoji: '⏰',
        difficulty: 'beginner',
        category: 'time',
        subtopics: [
          'Tell time to the hour and half-hour',
          'Read analog clocks',
          'Understand o\'clock and half past'
        ]
      },
      {
        id: 'coin-counting',
        title: 'Dolphin Coin Counting',
        description: 'Count coins with dolphin friends!',
        emoji: '💰',
        difficulty: 'beginner',
        category: 'money',
        subtopics: [
          'Count groups of pennies, nickels, and dimes',
          'Understand coin values',
          'Solve simple money problems',
          'Make small amounts with coins'
        ]
      },
      {
        id: 'time-quarter-hour',
        title: 'Tide Quarter Time',
        description: 'Tell time to quarter hours!',
        emoji: '🕒',
        difficulty: 'beginner',
        category: 'time',
        subtopics: [
          'Tell time to quarter past and quarter to',
          'Understand 15-minute intervals',
          'Read analog clocks to quarter hour',
          'Match digital and analog times'
        ]
      },
      {
        id: 'data-collection',
        title: 'Seahorse Data',
        description: 'Collect and organize data!',
        emoji: '📋',
        difficulty: 'beginner',
        category: 'data',
        subtopics: [
          'Use tally marks to collect data',
          'Create simple graphs',
          'Interpret basic data displays',
          'Answer questions about data'
        ]
      }
    ]
  },
  {
    id: 'grade2',
    title: 'Grade 2',
    age: 6,
    description: 'Swim deeper into math with whale-sized challenges!',
    color: 'teal',
    icon: '🐋',
    topics: [
      {
        id: 'word-problems',
        title: 'Whale Word Problems',
        description: 'Solve big problems with whale wisdom!',
        emoji: '🐋',
        difficulty: 'intermediate',
        category: 'problem-solving',
        subtopics: [
          'Solve one- and two-step word problems',
          'Addition and subtraction stories',
          'Comparison word problems'
        ]
      },
      {
        id: 'place-value',
        title: 'Treasure Chest Place Value',
        description: 'Unlock hundreds place with treasure!',
        emoji: '🎁',
        difficulty: 'intermediate',
        category: 'numbers',
        subtopics: [
          'Understand place value up to hundreds',
          'Read and write three-digit numbers',
          'Expanded form of numbers'
        ]
      },
      {
        id: 'measurement',
        title: 'Octopus Measurement',
        description: 'Measure with all eight arms!',
        emoji: '🐙',
        difficulty: 'intermediate',
        category: 'measurement',
        subtopics: [
          'Measure length using standard units',
          'Compare and estimate measurements',
          'Solve measurement word problems'
        ]
      },
      {
        id: 'money',
        title: 'Sea Treasure Money',
        description: 'Count coins like pirate treasure!',
        emoji: '🏴‍☠️',
        difficulty: 'intermediate',
        category: 'money',
        subtopics: [
          'Identify coin values',
          'Count mixed coins',
          'Solve money word problems'
        ]
      },
      {
        id: 'time-telling',
        title: 'Tide Time Telling',
        description: 'Tell time with ocean clocks!',
        emoji: '⏰',
        difficulty: 'intermediate',
        category: 'time',
        subtopics: [
          'Tell time to hour and half-hour',
          'Read analog and digital clocks',
          'Understand AM and PM'
        ]
      },
      {
        id: 'geometry',
        title: 'Shipwreck Geometry',
        description: 'Explore geometric treasures in shipwrecks!',
        emoji: '⚓',
        difficulty: 'intermediate',
        category: 'geometry',
        subtopics: [
          'Identify 2D and 3D shapes',
          'Count sides and vertices',
          'Recognize shape attributes'
        ]
      },
      {
        id: 'time-five-minutes',
        title: 'Precise Ocean Time',
        description: 'Tell time to the nearest 5 minutes!',
        emoji: '🕒',
        difficulty: 'intermediate',
        category: 'time',
        subtopics: [
          'Tell time to 5-minute intervals',
          'Count minutes around the clock',
          'Understand quarter past and quarter to'
        ]
      },
      {
        id: 'fluency-20',
        title: 'Quick Fish Facts',
        description: 'Master math facts within 20!',
        emoji: '⚡',
        difficulty: 'intermediate',
        category: 'arithmetic',
        subtopics: [
          'Fluently add and subtract within 20',
          'Use mental math strategies',
          'Solve problems quickly and accurately'
        ]
      },
      {
        id: 'standard-measurement',
        title: 'Standard Measurement',
        description: 'Measure with inches and centimeters!',
        emoji: '📐',
        difficulty: 'intermediate',
        category: 'measurement',
        subtopics: [
          'Use standard units of measurement',
          'Estimate lengths in inches and centimeters',
          'Compare measurements using standard units'
        ]
      },
      {
        id: 'money-word-problems',
        title: 'Pirate Money Problems',
        description: 'Solve money word problems with pirate treasure!',
        emoji: '🏴‍☠️',
        difficulty: 'intermediate',
        category: 'money',
        subtopics: [
          'Solve addition and subtraction money problems',
          'Calculate total costs',
          'Make change from small amounts',
          'Compare money amounts'
        ]
      },
      {
        id: 'arrays',
        title: 'Coral Arrays',
        description: 'Discover arrays in coral patterns!',
        emoji: '🪸',
        difficulty: 'intermediate',
        category: 'multiplication',
        subtopics: [
          'Understand arrays as repeated addition',
          'Create arrays with objects',
          'Relate arrays to multiplication',
          'Solve problems using arrays'
        ]
      },
      {
        id: 'repeated-addition',
        title: 'Repeated Addition Whales',
        description: 'Use repeated addition like whale songs!',
        emoji: '🎵',
        difficulty: 'intermediate',
        category: 'multiplication',
        subtopics: [
          'Use repeated addition to find totals',
          'Relate repeated addition to multiplication',
          'Solve problems with equal groups',
          'Write repeated addition equations'
        ]
      }
    ]
  },
  {
    id: 'grade3',
    title: 'Grade 3',
    age: 7,
    description: 'Navigate multiplication seas and fraction reefs!',
    color: 'green',
    icon: '🐢',
    topics: [
      {
        id: 'multiplication',
        title: 'Turtle Multiplication',
        description: 'Multiply like a patient turtle!',
        difficulty: 'intermediate',
        emoji: '🐢',
        category: 'multiplication',
        subtopics: [
          'Understand multiplication as repeated addition',
          'Multiply within 100',
          'Solve multiplication word problems',
          'Build multiplication fluency with facts up to 9×9'
        ]
      },
      {
        id: 'division',
        title: 'Division Dolphins',
        description: 'Divide treasures fairly!',
        difficulty: 'intermediate',
        emoji: '🐬',
        category: 'division',
        subtopics: [
          'Understand division as sharing',
          'Divide within 100',
          'Solve division word problems',
          'Relate division to multiplication facts'
        ]
      },
      {
        id: 'fractions',
        title: 'Coral Fraction Reef',
        description: 'Explore fractions in coral patterns!',
        difficulty: 'intermediate',
        emoji: '🪸',
        category: 'fractions',
        subtopics: [
          'Understand fractions as parts of wholes',
          'Identify equivalent fractions',
          'Compare fractions using symbols (> , < , =)',
          'Recognize common fractions (½, ⅓, ¼, ⅔, ¾)'
        ]
      },
      {
        id: 'measurement',
        title: 'Lighthouse Measurement',
        description: 'Measure area and perimeter of islands!',
        difficulty: 'intermediate',
        emoji: '🌅',
        category: 'measurement',
        subtopics: [
          'Solve area and perimeter problems',
          'Tell time to the minute',
          'Measure liquid volumes',
          'Calculate area of rectangles (length × width)',
          'Calculate perimeter of squares and rectangles'
        ]
      },
      {
        id: 'geometry',
        title: 'Geometric Ocean Patterns',
        description: 'Discover patterns in ocean life!',
        difficulty: 'intermediate',
        emoji: '🌊',
        category: 'geometry',
        subtopics: [
          'Categorize shapes by attributes',
          'Understand quadrilateral properties',
          'Recognize symmetry',
          'Identify polygons by number of sides (pentagon, hexagon, octagon)',
          'Describe shape attributes (sides, angles, equal sides)'
        ]
      },
      {
        id: 'multiplication-fluency',
        title: 'Lightning Multiplication',
        description: 'Master multiplication facts with speed and accuracy!',
        difficulty: 'intermediate',
        emoji: '⚡',
        category: 'multiplication',
        subtopics: [
          'Recall multiplication facts quickly',
          'Build fluency with challenging facts (7×8, 6×9, 8×8, etc.)',
          'Apply multiplication facts in timed practice'
        ]
      },
      {
        id: 'equivalent-fractions',
        title: 'Equivalent Fraction Currents',
        description: 'Discover fractions that are equal in value!',
        difficulty: 'intermediate',
        emoji: '🟰',
        category: 'fractions',
        subtopics: [
          'Understand equivalent fractions',
          'Find fractions equal to ½, ⅓, ¼, etc.',
          'Multiply numerator and denominator by same number'
        ]
      },
      {
        id: 'compare-fractions',
        title: 'Fraction Balance',
        description: 'Compare fractions to see which is larger!',
        difficulty: 'intermediate',
        emoji: '⚖️',
        category: 'fractions',
        subtopics: [
          'Compare fractions using >, <, and =',
          'Understand fraction size based on denominators',
          'Visualize fraction comparisons'
        ]
      },
      {
        id: 'area-perimeter-problems',
        title: 'Island Measurement Challenges',
        description: 'Solve real-world area and perimeter problems!',
        difficulty: 'intermediate',
        emoji: '📐',
        category: 'measurement',
        subtopics: [
          'Solve word problems involving area',
          'Solve word problems involving perimeter',
          'Distinguish between area and perimeter situations'
        ]
      },
      {
        id: 'shape-attributes',
        title: 'Shape Property Explorer',
        description: 'Learn what makes each shape unique!',
        difficulty: 'intermediate',
        emoji: '⬜',
        category: 'geometry',
        subtopics: [
          'Identify shape attributes and properties',
          'Describe characteristics of squares, rectangles, triangles',
          'Recognize polygons by their features'
        ]
      },
      {
        id: 'time-to-minute',
        title: 'Precise Ocean Time',
        description: 'Tell time accurately to the exact minute!',
        difficulty: 'intermediate',
        emoji: '⏰',
        category: 'time',
        subtopics: [
          'Tell time to the nearest minute',
          'Read analog clocks precisely',
          'Understand minute hand positions'
        ]
      },
      {
        id: 'money-math',
        title: 'Treasure Coin Math',
        description: 'Solve money problems with pirate treasure!',
        difficulty: 'intermediate',
        emoji: '💎',
        category: 'money',
        subtopics: [
          'Add and subtract money amounts',
          'Solve money word problems',
          'Make change from purchases',
          'Understand dollar and cent values'
        ]
      },
      {
        id: 'rounding',
        title: 'Rounding Reef',
        description: 'Round numbers to the nearest ten and hundred!',
        difficulty: 'intermediate',
        emoji: '🔢',
        category: 'numbers',
        subtopics: [
          'Round numbers to the nearest ten',
          'Round numbers to the nearest hundred',
          'Understand rounding rules',
          'Apply rounding in real-world situations'
        ]
      },
      {
        id: 'two-step-problems',
        title: 'Two-Step Ocean Challenges',
        description: 'Solve problems that need two operations!',
        difficulty: 'intermediate',
        emoji: '🤔',
        category: 'problem-solving',
        subtopics: [
          'Solve two-step word problems',
          'Use multiple operations (addition, subtraction, multiplication)',
          'Identify the steps needed to solve problems',
          'Check work by reading problems carefully'
        ]
      }
    ]
  },
  {
    id: 'grade4',
    title: 'Grade 4',
    age: 8,
    description: 'Explore the deep sea of large numbers, fractions, and geometry!',
    color: 'purple',
    icon: '🦑',
    topics: [
      {
        id: 'place-value',
        title: 'Deep Sea Place Value',
        description: 'Dive into millions place value!',
        difficulty: 'intermediate',
        emoji: '🌊',
        category: 'numbers',
        subtopics: [
          'Understand place value up to millions',
          'Read and write multi-digit numbers',
          'Compare large numbers',
          'Round numbers to any place value'
        ]
      },
      {
        id: 'multi-digit',
        title: 'Multi-Digit Operations',
        description: 'Master big number operations!',
        difficulty: 'intermediate',
        emoji: '🔢',
        category: 'arithmetic',
        subtopics: [
          'Add and subtract multi-digit numbers',
          'Multiply multi-digit numbers',
          'Divide multi-digit numbers by 1-digit',
          'Solve multi-step word problems'
        ]
      },
      {
        id: 'fractions',
        title: 'Kraken Fractions',
        description: 'Tame the kraken of fractions!',
        difficulty: 'intermediate',
        emoji: '🦑',
        category: 'fractions',
        subtopics: [
          'Add and subtract fractions with like denominators',
          'Multiply fractions by whole numbers',
          'Understand decimal equivalents',
          'Compare fractions with different denominators'
        ]
      },
      {
        id: 'decimals',
        title: 'Decimal Depths',
        description: 'Explore the world of decimals!',
        difficulty: 'intermediate',
        emoji: '💧',
        category: 'decimals',
        subtopics: [
          'Understand decimal notation for fractions',
          'Compare and order decimals',
          'Relate decimals to fractions',
          'Add and subtract decimals'
        ]
      },
      {
        id: 'factors-multiples',
        title: 'Factor Fish',
        description: 'Discover factors and multiples in coral patterns!',
        difficulty: 'intermediate',
        emoji: '🐠',
        category: 'numbers',
        subtopics: [
          'Understand factors and multiples',
          'Identify prime and composite numbers',
          'Find factor pairs',
          'Solve problems using factors and multiples'
        ]
      },
      {
        id: 'measurement-conversion',
        title: 'Measurement Manta Rays',
        description: 'Convert between measurement units!',
        difficulty: 'intermediate',
        emoji: '🐋',
        category: 'measurement',
        subtopics: [
          'Convert between different measurement units',
          'Solve measurement word problems',
          'Understand metric and customary systems',
          'Calculate with time intervals'
        ]
      },
      {
        id: 'geometry-lines',
        title: 'Geometric Ocean Lines',
        description: 'Explore lines, rays, and angles!',
        difficulty: 'intermediate',
        emoji: '📐',
        category: 'geometry',
        subtopics: [
          'Draw and identify lines, line segments, rays',
          'Understand angles and angle measurement',
          'Identify perpendicular and parallel lines',
          'Classify shapes by lines and angles'
        ]
      },
      {
        id: 'patterns-sequences',
        title: 'Ocean Pattern Puzzles',
        description: 'Solve patterns and sequences!',
        difficulty: 'intermediate',
        emoji: '🎭',
        category: 'patterns',
        subtopics: [
          'Generate and analyze patterns',
          'Understand number sequences',
          'Solve pattern-based word problems',
          'Extend geometric patterns'
        ]
      },
      {
        id: 'data-interpretation',
        title: 'Data Diving',
        description: 'Interpret data from ocean charts!',
        difficulty: 'intermediate',
        emoji: '📊',
        category: 'data',
        subtopics: [
          'Read and interpret bar graphs',
          'Understand line plots',
          'Solve problems using data',
          'Make observations from data displays'
        ]
      },
      {
        id: 'money-operations',
        title: 'Treasure Chest Money Operations',
        description: 'Master decimal money operations with pirate treasure!',
        difficulty: 'intermediate',
        emoji: '💰',
        category: 'money',
        subtopics: [
          'Add and subtract money amounts with decimals',
          'Multiply money by whole numbers',
          'Solve multi-step money word problems',
          'Make change from larger amounts',
          'Compare money values with decimals'
        ]
      },
      {
        id: 'area-perimeter',
        title: 'Island Area & Perimeter',
        description: 'Calculate area and perimeter of rectangular islands!',
        difficulty: 'intermediate',
        emoji: '🏝️',
        category: 'measurement',
        subtopics: [
          'Calculate area of rectangles (length × width)',
          'Calculate perimeter of polygons',
          'Solve area and perimeter word problems',
          'Find missing side lengths given area/perimeter',
          'Distinguish between area and perimeter situations'
        ]
      },
      {
        id: 'multiplicative-comparison',
        title: 'Whale Size Comparisons',
        description: 'Compare quantities using multiplication!',
        difficulty: 'intermediate',
        emoji: '🐋',
        category: 'multiplication',
        subtopics: [
          'Interpret multiplication as comparison (times as many)',
          'Solve multiplicative comparison word problems',
          'Write equations for comparison situations',
          'Use multiplication to compare quantities'
        ]
      },
      {
        id: 'angle-measurement',
        title: 'Coral Angle Measurement',
        description: 'Measure and draw angles in coral formations!',
        difficulty: 'intermediate',
        emoji: '📐',
        category: 'geometry',
        subtopics: [
          'Understand angle measurement in degrees',
          'Use protractors to measure angles',
          'Identify acute, obtuse, and right angles',
          'Draw angles of specified measures',
          'Solve angle measurement problems'
        ]
      },
      {
        id: 'multi-step-problems',
        title: 'Deep Sea Challenges',
        description: 'Solve complex multi-step problems!',
        difficulty: 'intermediate',
        emoji: '🤿',
        category: 'problem-solving',
        subtopics: [
          'Solve problems using all four operations',
          'Interpret remainders in division problems',
          'Use estimation to check reasonableness',
          'Write equations with variables',
          'Solve problems with multiple steps'
        ]
      },
      {
        id: 'metric-system',
        title: 'Metric Mermaid Measurements',
        description: 'Master the metric system with mermaid magic!',
        difficulty: 'intermediate',
        emoji: '🧜‍♀️',
        category: 'measurement',
        subtopics: [
          'Convert within metric system (km, m, cm, mm)',
          'Understand metric prefixes',
          'Solve metric conversion problems',
          'Compare metric measurements',
          'Use metric units in real-world contexts'
        ]
      }
    ]
  },
  {
    id: 'grade5',
    title: 'Grade 5',
    age: 9,
    description: 'Master the ocean of operations, fractions, and real-world math!',
    color: 'orange',
    icon: '🦈',
    topics: [
      {
        id: 'fractions',
        title: 'Fraction Currents',
        description: 'Navigate fraction operations!',
        difficulty: 'advanced',
        emoji: '🌊',
        category: 'fractions',
        subtopics: [
          'Add and subtract fractions with unlike denominators',
          'Multiply and divide fractions',
          'Solve fraction word problems',
          'Understand fractions as division'
        ]
      },
      {
        id: 'volume',
        title: 'Volume Voyage',
        description: 'Explore volume in underwater worlds!',
        difficulty: 'advanced',
        emoji: '📦',
        category: 'measurement',
        subtopics: [
          'Understand concepts of volume',
          'Calculate volume of rectangular prisms',
          'Solve volume word problems',
          'Relate volume to multiplication and addition'
        ]
      },
      {
        id: 'coordinates',
        title: 'Coordinate Ocean',
        description: 'Graph points on the coordinate sea!',
        difficulty: 'advanced',
        emoji: '🗺️',
        category: 'geometry',
        subtopics: [
          'Graph points on coordinate plane',
          'Solve real-world coordinate problems',
          'Understand coordinate system',
          'Interpret coordinate values'
        ]
      },
      {
        id: 'word-problems',
        title: 'Advanced Word Problems',
        description: 'Solve complex ocean challenges!',
        difficulty: 'advanced',
        emoji: '🤔',
        category: 'problem-solving',
        subtopics: [
          'Multi-step word problems',
          'Problems with fractions and decimals',
          'Real-world application problems',
          'Problems using all four operations'
        ]
      },
      {
        id: 'percentage',
        title: 'Percentage Pirates',
        description: 'Master percentages with pirate treasure!',
        difficulty: 'advanced',
        emoji: '🏴‍☠️',
        category: 'commercial-math',
        subtopics: [
          'Understand percentage as parts per hundred',
          'Convert between fractions, decimals, and percentages',
          'Calculate simple percentages',
          'Solve percentage word problems'
        ]
      },
      {
        id: 'profit-loss',
        title: 'Treasure Trade',
        description: 'Learn profit and loss with sea merchants!',
        difficulty: 'advanced',
        emoji: '💰',
        category: 'commercial-math',
        subtopics: [
          'Understand profit and loss concepts',
          'Calculate profit and loss amounts',
          'Find profit and loss percentages',
          'Solve business math problems'
        ]
      },
      {
        id: 'simple-interest',
        title: 'Interest Islands',
        description: 'Calculate simple interest on treasure!',
        difficulty: 'advanced',
        emoji: '🏝️',
        category: 'commercial-math',
        subtopics: [
          'Understand simple interest concept',
          'Use simple interest formula',
          'Calculate interest over time',
          'Solve interest word problems'
        ]
      },
      {
        id: 'average-mean',
        title: 'Average Ocean Depths',
        description: 'Find averages of sea measurements!',
        difficulty: 'advanced',
        emoji: '📏',
        category: 'data',
        subtopics: [
          'Understand mean/average',
          'Calculate average of numbers',
          'Solve average word problems',
          'Apply averages in real contexts'
        ]
      },
      {
        id: 'ratio-proportion',
        title: 'Coral Ratio Reef',
        description: 'Explore ratios and proportions in coral!',
        difficulty: 'advanced',
        emoji: '🪸',
        category: 'ratios',
        subtopics: [
          'Understand ratio concepts',
          'Solve ratio and proportion problems',
          'Use ratio reasoning',
          'Apply ratios in real-world situations'
        ]
      },
      {
        id: 'hcf-lcm',
        title: 'Prime Factor Fish',
        description: 'Find HCF and LCM with prime factors!',
        difficulty: 'advanced',
        emoji: '🐟',
        category: 'numbers',
        subtopics: [
          'Find Highest Common Factor (HCF)',
          'Find Least Common Multiple (LCM)',
          'Use prime factorization',
          'Apply HCF and LCM in problems'
        ]
      },
      {
        id: 'decimal-operations',
        title: 'Decimal Ocean Currents',
        description: 'Master all decimal operations!',
        difficulty: 'advanced',
        emoji: '💨',
        category: 'decimals',
        subtopics: [
          'Multiply decimals',
          'Divide decimals',
          'Solve decimal word problems',
          'Apply decimal operations in real contexts'
        ]
      },
      {
        id: 'unitary-method',
        title: 'Unitary Method Whales',
        description: 'Solve problems using unitary method!',
        difficulty: 'advanced',
        emoji: '🐋',
        category: 'commercial-math',
        subtopics: [
          'Understand unitary method concept',
          'Solve problems using unitary method',
          'Apply to real-world scenarios',
          'Use in ratio and proportion problems'
        ]
      }
    ]
  },
  {
    id: 'grade6',
    title: 'Grade 6',
    age: 10,
    description: 'Navigate ratios, algebra, and financial mathematics!',
    color: 'blue',
    icon: '🦀',
    topics: [
      {
        id: 'ratios',
        title: 'Crab Ratio Calculations',
        description: 'Master ratios and proportions!',
        difficulty: 'advanced',
        emoji: '🦀',
        category: 'ratios',
        subtopics: [
          'Understand ratio concepts and language',
          'Use ratio reasoning to solve problems',
          'Solve unit rate problems',
          'Find equivalent ratios'
        ]
      },
      {
        id: 'rates-unit-rates',
        title: 'Ocean Speed Calculations',
        description: 'Master rates and unit rates!',
        difficulty: 'advanced',
        emoji: '⚡',
        category: 'ratios',
        subtopics: [
          'Calculate unit rates',
          'Compare rates and unit rates',
          'Solve rate word problems',
          'Apply rates to real-world situations'
        ]
      },
      {
        id: 'negative-numbers',
        title: 'Negative Number Depths',
        description: 'Explore numbers below sea level!',
        difficulty: 'advanced',
        emoji: '🌡️',
        category: 'numbers',
        subtopics: [
          'Understand negative numbers',
          'Compare and order integers',
          'Perform operations with negative numbers',
          'Solve real-world problems with negatives'
        ]
      },
      {
        id: 'integer-operations',
        title: 'Deep Sea Integers',
        description: 'Master positive and negative numbers!',
        difficulty: 'advanced',
        emoji: '🌡️',
        category: 'numbers',
        subtopics: [
          'Add and subtract integers',
          'Multiply and divide integers',
          'Understand absolute value',
          'Solve real-world problems with integers'
        ]
      },
      {
        id: 'algebra-expressions',
        title: 'Algebraic Ocean Expressions',
        description: 'Introduce variables and expressions!',
        difficulty: 'advanced',
        emoji: '📝',
        category: 'algebra',
        subtopics: [
          'Use variables to represent numbers',
          'Write and evaluate algebraic expressions',
          'Understand algebraic properties',
          'Simplify expressions'
        ]
      },
      {
        id: 'algebraic-expressions',
        title: 'Advanced Expression Building',
        description: 'Master algebraic expressions and properties!',
        difficulty: 'advanced',
        emoji: '📝',
        category: 'algebra',
        subtopics: [
          'Apply distributive property',
          'Combine like terms',
          'Evaluate complex expressions',
          'Use commutative and associative properties'
        ]
      },
      {
        id: 'algebra-equations',
        title: 'Coral Equation Solving',
        description: 'Solve algebraic equations with sea variables!',
        difficulty: 'advanced',
        emoji: '🪸',
        category: 'algebra',
        subtopics: [
          'Solve one-step equations with whole numbers',
          'Solve two-step equations with integers',
          'Write equations from word problems',
          'Understand inverse operations in algebra'
        ]
      },
      {
        id: 'commercial-math',
        title: 'Sea Merchant Math',
        description: 'Master profit, loss, discount, and interest!',
        difficulty: 'advanced',
        emoji: '🏪',
        category: 'commercial-math',
        subtopics: [
          'Calculate profit and loss percentages',
          'Solve discount and commission problems',
          'Work with compound interest',
          'Solve tax calculation problems'
        ]
      },
      {
        id: 'geometry-area',
        title: 'Ocean Area Explorer',
        description: 'Find areas of complex shapes!',
        difficulty: 'advanced',
        emoji: '🔷',
        category: 'geometry',
        subtopics: [
          'Find area of triangles and parallelograms',
          'Calculate area of complex polygons',
          'Solve area word problems',
          'Understand composite figures'
        ]
      },
      {
        id: 'surface-area',
        title: 'Surface Area Explorers',
        description: 'Calculate surface area of 3D shapes!',
        difficulty: 'advanced',
        emoji: '📦',
        category: 'geometry',
        subtopics: [
          'Calculate surface area of rectangular prisms',
          'Calculate surface area of triangular prisms',
          'Solve surface area word problems',
          'Understand nets of 3D shapes'
        ]
      },
      {
        id: 'circle-geometry',
        title: 'Coral Circle Math',
        description: 'Explore circles, circumference, and area!',
        difficulty: 'advanced',
        emoji: '⭕',
        category: 'geometry',
        subtopics: [
          'Understand radius, diameter, and circumference',
          'Calculate circumference using π',
          'Calculate area of circles',
          'Solve circle geometry problems'
        ]
      },
      {
        id: 'statistics-probability',
        title: 'Ocean Data Analysis',
        description: 'Analyze data and understand probability!',
        difficulty: 'advanced',
        emoji: '🎲',
        category: 'data',
        subtopics: [
          'Calculate mean, median, mode, range',
          'Understand basic probability',
          'Interpret statistical data',
          'Make predictions from data'
        ]
      },
      {
        id: 'data-graphs',
        title: 'Ocean Data Visualization',
        description: 'Create and interpret various graphs!',
        difficulty: 'advanced',
        emoji: '📈',
        category: 'data',
        subtopics: [
          'Create and interpret histograms',
          'Understand box-and-whisker plots',
          'Analyze circle graphs (pie charts)',
          'Compare different data representations'
        ]
      },
      {
        id: 'probability',
        title: 'Crab Probability Games',
        description: 'Understand chance and probability!',
        difficulty: 'advanced',
        emoji: '🎯',
        category: 'data',
        subtopics: [
          'Calculate theoretical probability',
          'Understand experimental probability',
          'Solve probability word problems',
          'Work with simple and compound events'
        ]
      }
    ]
  },
  {
    id: 'grade7',
    title: 'Grade 7',
    age: 11,
    description: 'Master rational numbers, advanced geometry, and probability!',
    color: 'teal',
    icon: '🐙',
    topics: [
      {
        id: 'rational-numbers',
        title: 'Rational Number Reef',
        description: 'Explore positive and negative rational numbers!',
        difficulty: 'advanced',
        emoji: '🧮',
        category: 'numbers',
        subtopics: [
          'Add, subtract, multiply, and divide rational numbers',
          'Understand fractions, decimals, and integers as rational numbers',
          'Solve real-world problems with rational numbers',
          'Convert between fractions and decimals'
        ]
      },
      {
        id: 'algebraic-expressions',
        title: 'Algebraic Ocean Expressions',
        description: 'Master advanced algebraic expressions!',
        difficulty: 'advanced',
        emoji: '📝',
        category: 'algebra',
        subtopics: [
          'Simplify complex algebraic expressions',
          'Apply distributive property with rational numbers',
          'Combine like terms with coefficients',
          'Evaluate expressions with multiple variables'
        ]
      },
      {
        id: 'equations-inequalities',
        title: 'Equation & Inequality Depths',
        description: 'Solve complex equations and inequalities!',
        difficulty: 'advanced',
        emoji: '⚖️',
        category: 'algebra',
        subtopics: [
          'Solve multi-step equations with rational coefficients',
          'Solve and graph one-step and two-step inequalities',
          'Write equations from word problems',
          'Understand solution sets for inequalities'
        ]
      },
      {
        id: 'ratio-proportions',
        title: 'Coral Ratio Proportions',
        description: 'Master proportional relationships!',
        difficulty: 'advanced',
        emoji: '🪸',
        category: 'ratios',
        subtopics: [
          'Understand and identify proportional relationships',
          'Solve problems using proportional reasoning',
          'Calculate unit rates with complex quantities',
          'Apply proportions to scale drawings'
        ]
      },
      {
        id: 'percent-applications',
        title: 'Deep Sea Percentages',
        description: 'Apply percentages to real-world scenarios!',
        difficulty: 'advanced',
        emoji: '📊',
        category: 'commercial-math',
        subtopics: [
          'Calculate percent increase and decrease',
          'Solve problems involving sales tax, tips, and discounts',
          'Understand simple interest applications',
          'Analyze percent error in measurements'
        ]
      },
      {
        id: 'geometry-area',
        title: 'Ocean Area Explorer',
        description: 'Calculate areas of complex shapes!',
        difficulty: 'advanced',
        emoji: '🔷',
        category: 'geometry',
        subtopics: [
          'Calculate area of triangles, parallelograms, and trapezoids',
          'Find area of composite figures',
          'Solve area word problems with rational numbers',
          'Understand area formulas and their derivations'
        ]
      },
      {
        id: 'surface-area-volume',
        title: '3D Shape Surface & Volume',
        description: 'Master surface area and volume calculations!',
        difficulty: 'advanced',
        emoji: '📦',
        category: 'geometry',
        subtopics: [
          'Calculate surface area of prisms and pyramids',
          'Calculate volume of rectangular and triangular prisms',
          'Solve real-world problems involving surface area and volume',
          'Understand the relationship between 2D and 3D measurements'
        ]
      },
      {
        id: 'circle-geometry',
        title: 'Coral Circle Mathematics',
        description: 'Explore circles, circumference, and area!',
        difficulty: 'advanced',
        emoji: '⭕',
        category: 'geometry',
        subtopics: [
          'Calculate circumference using π',
          'Calculate area of circles',
          'Solve problems involving arcs and sectors',
          'Understand the relationship between radius, diameter, and circumference'
        ]
      },
      {
        id: 'angle-relationships',
        title: 'Angle Relationship Currents',
        description: 'Discover angle relationships and properties!',
        difficulty: 'advanced',
        emoji: '📐',
        category: 'geometry',
        subtopics: [
          'Identify complementary, supplementary, and vertical angles',
          'Solve problems involving angle relationships',
          'Understand angles formed by parallel lines and transversals',
          'Apply angle properties in geometric proofs'
        ]
      },
      {
        id: 'probability',
        title: 'Probability Pirates',
        description: 'Master probability concepts and calculations!',
        difficulty: 'advanced',
        emoji: '🎲',
        category: 'data',
        subtopics: [
          'Calculate theoretical and experimental probability',
          'Understand probability of simple and compound events',
          'Use probability to make predictions',
          'Analyze probability in real-world scenarios'
        ]
      },
      {
        id: 'statistics',
        title: 'Ocean Data Statistics',
        description: 'Analyze and interpret statistical data!',
        difficulty: 'advanced',
        emoji: '📈',
        category: 'data',
        subtopics: [
          'Calculate mean, median, mode, and range',
          'Create and interpret box plots and histograms',
          'Understand measures of variability',
          'Draw inferences from data samples'
        ]
      },
      {
        id: 'scale-drawings',
        title: 'Treasure Map Scale Drawings',
        description: 'Work with scale factors and proportional drawings!',
        difficulty: 'advanced',
        emoji: '🗺️',
        category: 'geometry',
        subtopics: [
          'Understand and use scale factors',
          'Create and interpret scale drawings',
          'Solve problems involving scale models',
          'Apply proportional reasoning to geometric figures'
        ]
      },
      {
        id: 'integer-operations',
        title: 'Deep Sea Integer Operations',
        description: 'Master operations with positive and negative numbers!',
        difficulty: 'advanced',
        emoji: '🌡️',
        category: 'numbers',
        subtopics: [
          'Add, subtract, multiply, and divide integers',
          'Understand absolute value and opposites',
          'Solve real-world problems with integers',
          'Apply integer operations in algebraic expressions'
        ]
      },
      {
        id: 'multi-step-problems',
        title: 'Multi-Step Ocean Challenges',
        description: 'Solve complex multi-step word problems!',
        difficulty: 'advanced',
        emoji: '🤿',
        category: 'problem-solving',
        subtopics: [
          'Solve problems using multiple operations',
          'Apply rational numbers in real-world contexts',
          'Use algebraic thinking in problem-solving',
          'Check reasonableness of solutions'
        ]
      }
    ]
  },
  {
    id: 'grade8',
    title: 'Grade 8',
    age: 12,
    description: 'Master functions, Pythagorean theorem, and geometric transformations!',
    color: 'purple',
    icon: '🐡',
    topics: [
      {
        id: 'pythagorean-theorem',
        title: 'Pythagorean Ocean Explorers',
        description: 'Discover the secrets of right triangles with the Pythagorean theorem!',
        difficulty: 'advanced',
        emoji: '📐',
        category: 'geometry',
        subtopics: [
          'Understand and apply the Pythagorean Theorem (a² + b² = c²)',
          'Find unknown side lengths of right triangles',
          'Solve real-world problems using Pythagorean theorem',
          'Identify Pythagorean triples',
          'Apply theorem to distance between points',
          'Use converse of Pythagorean theorem'
        ]
      },
      {
        id: 'functions',
        title: 'Function Ocean Currents',
        description: 'Explore functions as input-output relationships!',
        difficulty: 'advanced',
        emoji: '🔄',
        category: 'algebra',
        subtopics: [
          'Understand functions as rules assigning one output per input',
          'Use function notation (f(x))',
          'Create function tables and graphs',
          'Identify functions from sets of ordered pairs',
          'Understand domain and range concepts',
          'Evaluate functions for given inputs'
        ]
      },
      {
        id: 'transformations',
        title: 'Geometric Ocean Transformations',
        description: 'Master translations, rotations, reflections, and dilations!',
        difficulty: 'advanced',
        emoji: '✨',
        category: 'geometry',
        subtopics: [
          'Understand congruence through geometric transformations',
          'Perform translations (slides) of shapes',
          'Perform rotations (turns) around points',
          'Perform reflections (flips) across lines',
          'Understand and apply dilations (scale changes)',
          'Describe sequences of transformations'
        ]
      },
      {
        id: 'congruence-similarity',
        title: 'Coral Congruence & Similarity',
        description: 'Explore when shapes are exactly alike or proportionally alike!',
        difficulty: 'advanced',
        emoji: '🔺',
        category: 'geometry',
        subtopics: [
          'Understand and identify congruent figures',
          'Understand and identify similar figures',
          'Use transformations to prove congruence',
          'Calculate scale factors for similar figures',
          'Solve problems involving similar triangles',
          'Apply similarity to indirect measurement'
        ]
      },
      {
        id: 'exponents-roots',
        title: 'Exponent Ocean Depths',
        description: 'Dive into exponents, square roots, and cube roots!',
        difficulty: 'advanced',
        emoji: '⚡',
        category: 'algebra',
        subtopics: [
          'Apply exponent rules (product, quotient, power)',
          'Understand and calculate square roots',
          'Understand and calculate cube roots',
          'Solve equations with exponents and roots',
          'Estimate irrational square roots',
          'Apply exponents in geometric formulas'
        ]
      },
      {
        id: 'linear-equations',
        title: 'Linear Equation Waves',
        description: 'Master slope-intercept form and graphing linear equations!',
        difficulty: 'advanced',
        emoji: '📈',
        category: 'algebra',
        subtopics: [
          'Graph linear functions from equations',
          'Understand slope as rate of change',
          'Identify slope and y-intercept from equations',
          'Write linear equations from graphs and situations',
          'Solve real-world problems with linear functions',
          'Understand parallel and perpendicular slopes'
        ]
      },
      {
        id: 'systems-of-equations',
        title: 'System of Equation Seas',
        description: 'Solve systems of linear equations!',
        difficulty: 'advanced',
        emoji: '⚖️',
        category: 'algebra',
        subtopics: [
          'Solve systems of equations graphically',
          'Solve systems using substitution method',
          'Solve systems using elimination method',
          'Understand when systems have one, none, or infinite solutions',
          'Apply systems to real-world problems',
          'Compare different solving methods'
        ]
      },
      {
        id: 'scientific-notation',
        title: 'Scientific Notation Depths',
        description: 'Work with very large and very small numbers!',
        difficulty: 'advanced',
        emoji: '🔬',
        category: 'numbers',
        subtopics: [
          'Understand scientific notation format',
          'Convert between standard form and scientific notation',
          'Perform operations with scientific notation',
          'Apply scientific notation to real-world measurements',
          'Compare numbers in scientific notation',
          'Use scientific notation in calculations'
        ]
      },
      {
        id: 'volume-3d-shapes',
        title: '3D Ocean Volume',
        description: 'Calculate volume of cylinders, cones, and spheres!',
        difficulty: 'advanced',
        emoji: '🎱',
        category: 'geometry',
        subtopics: [
          'Calculate volume of cylinders',
          'Calculate volume of cones',
          'Calculate volume of spheres',
          'Solve volume word problems',
          'Understand volume formulas and their applications',
          'Compare volumes of different 3D shapes'
        ]
      },
      {
        id: 'bivariate-data',
        title: 'Ocean Data Patterns',
        description: 'Analyze relationships between two variables!',
        difficulty: 'advanced',
        emoji: '📊',
        category: 'data',
        subtopics: [
          'Create and interpret scatter plots',
          'Understand positive, negative, and no correlation',
          'Draw lines of best fit',
          'Use linear models to make predictions',
          'Analyze trends in bivariate data',
          'Calculate and interpret correlation'
        ]
      },
      {
        id: 'angle-relationships',
        title: 'Advanced Angle Relationships',
        description: 'Explore angles in parallel lines and triangles!',
        difficulty: 'advanced',
        emoji: '📐',
        category: 'geometry',
        subtopics: [
          'Understand angles formed by parallel lines and transversals',
          'Apply triangle sum theorem',
          'Use exterior angle theorem',
          'Solve multi-step angle problems',
          'Apply angle relationships in proofs',
          'Identify corresponding, alternate interior, and alternate exterior angles'
        ]
      },
      {
        id: 'real-numbers',
        title: 'Real Number Ocean',
        description: 'Explore rational and irrational numbers!',
        difficulty: 'advanced',
        emoji: '🔢',
        category: 'numbers',
        subtopics: [
          'Understand rational and irrational numbers',
          'Classify numbers in the real number system',
          'Estimate values of irrational numbers',
          'Compare and order real numbers',
          'Understand decimal expansions of rational vs irrational numbers',
          'Apply real numbers in geometric contexts'
        ]
      }
    ]
  }
];