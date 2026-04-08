import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coolmathszone.com'

export type GameEntry = {
  slug: string
  title: string
  heading: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  grade: string
  icon: string
  color: string
  buttonColor: string
  skill: string
  howToPlay: string
}

export const games: GameEntry[] = [
  {
    slug: 'math-popper',
    title: 'Math Popper',
    heading: 'Math Popper Challenge',
    description: 'Master foundational arithmetic by grabbing the correct answer bubbles. Avoid mistakes and watch the speed increase.',
    difficulty: 'Beginner',
    grade: 'Elementary',
    icon: '🔢',
    color: 'from-fuchsia-500 to-amber-500',
    buttonColor: 'bg-fuchsia-600 hover:bg-fuchsia-500',
    skill: 'Fast Arithmetic',
    howToPlay: 'Use your mouse or tap the correct answer bubbles to collect them. Avoid the wrong numbers to keep your lives. As your score goes up, the game gets faster and the math gets harder.',
  },
  {
    slug: 'algebra-dash',
    title: 'Algebra Dash',
    heading: 'Algebra Dash Challenge',
    description: 'Solve for x on the fly. Shift your way through multi-step algebra questions at breakneck speed.',
    difficulty: 'Advanced',
    grade: 'Middle / High',
    icon: '✖️',
    color: 'from-cyan-400 to-blue-600',
    buttonColor: 'bg-cyan-600 hover:bg-cyan-500',
    skill: 'Algebra Fluency',
    howToPlay: 'Keep your ship in the correct lane to solve for x. Equations appear above the lanes, so move quickly to match the solution and avoid wrong answers to maintain your speed and score.',
  },
  {
    slug: 'fraction-slicer',
    title: 'Fraction Slicer',
    heading: 'Fraction Slicer Challenge',
    description: 'Slice shapes to match target fractions. Master decimals and percentages through visual geometry.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '🍕',
    color: 'from-emerald-400 to-teal-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-500',
    skill: 'Fractions and Percents',
    howToPlay: 'A target fraction or percentage will appear. Move your mouse or finger across the shape to make a slice. If your slice divides the shape into the correct proportion, you score. Use the hint button if you get stuck.',
  },
  {
    slug: 'logic-link',
    title: 'Logic Link',
    heading: 'Logic Link Challenge',
    description: 'Connect nodes to reach the target sum or product. Plan your path carefully using PEMDAS.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '⛓️',
    color: 'from-violet-500 to-purple-700',
    buttonColor: 'bg-violet-600 hover:bg-violet-500',
    skill: 'Logic and Order of Operations',
    howToPlay: 'A target number and a grid of nodes will appear. Connect the nodes in the correct order to sum or multiply them to the goal. Plan your path carefully and use the hint button if you get stuck.',
  },
  {
    slug: 'prime-protector',
    title: 'Prime Protector',
    heading: 'Prime Protector Challenge',
    description: 'Catch the primes and avoid composites to keep your shield online in this fast-paced number defense game.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '🛡️',
    color: 'from-emerald-500 to-green-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-500',
    skill: 'Prime Numbers',
    howToPlay: 'A stream of numbers falls from the top of the screen. Use your ship to collect only prime numbers. Hitting a composite number or missing a prime will breach your shield.',
  },
  {
    slug: 'slope-slider',
    title: 'Slope Slider',
    heading: 'Slope Slider Challenge',
    description: 'Master y = mx + c. Adjust the ramp slope and intercept to launch your ship into the target zone.',
    difficulty: 'Advanced',
    grade: 'High School',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-500',
    skill: 'Linear Equations',
    howToPlay: 'A landing zone appears at a random distance and height. Adjust the slope and intercept to build a ramp, then launch the ship. Land in the green zone to score points and earn coins.',
  },
  {
    slug: 'angle-archer',
    title: 'Angle Archer',
    heading: 'Angle Archer Challenge',
    description: 'Aim for the bullseye. Master angles and degrees to hit targets across different terrains and wind speeds.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '🎯',
    color: 'from-emerald-400 to-teal-500',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-500',
    skill: 'Angles and Degrees',
    howToPlay: 'A target appears at a random distance. Adjust the launch angle and release your arrow. In higher difficulty modes, watch the wind resistance and hit the target to level up.',
  },
  {
    slug: 'binary-bridge',
    title: 'Binary Bridge',
    heading: 'Binary Bridge Challenge',
    description: 'Convert decimal to binary to power up the bridge segments and cross the digital abyss.',
    difficulty: 'Advanced',
    grade: 'High School',
    icon: '🌉',
    color: 'from-indigo-500 to-violet-600',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-500',
    skill: 'Binary Conversion',
    howToPlay: 'A target decimal value is displayed as your goal. Toggle the switches to activate the correct binary bits. If your binary sum matches the target, the bridge powers up and you can cross safely.',
  },
  {
    slug: 'root-reaper',
    title: 'Root Reaper',
    heading: 'Root Reaper Challenge',
    description: 'Harvest the square roots of perfect squares and master roots from 1 to 25 in a high-speed challenge.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '💀',
    color: 'from-purple-500 to-indigo-700',
    buttonColor: 'bg-purple-600 hover:bg-purple-500',
    skill: 'Square and Cube Roots',
    howToPlay: 'Identify the integer solution for square roots and cube roots. Pop the correct bubble to harvest points and level up into trickier roots.',
  },
  {
    slug: 'operator-overload',
    title: 'Operator Overload',
    heading: 'Operator Overload Challenge',
    description: 'Master the order of operations by solving multi-step equations before your circuits overload.',
    difficulty: 'Intermediate',
    grade: 'Middle School',
    icon: '⚡',
    color: 'from-orange-500 to-red-600',
    buttonColor: 'bg-orange-600 hover:bg-orange-500',
    skill: 'PEMDAS / BODMAS',
    howToPlay: 'Follow the rules of BODMAS or PEMDAS. Pop the bubble that matches the correct result and stay ahead of the time pressure.',
  },
  {
    slug: 'equation-billiards',
    title: 'Equation Billiards',
    heading: 'Equation Billiards Expert Table',
    description: 'Read the question at the top and sink the right value on a live billiards table with rebounds, collisions, and rising time pressure.',
    difficulty: 'Advanced',
    grade: 'High School',
    icon: '🎱',
    color: 'from-emerald-400 via-cyan-400 to-amber-400',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-500',
    skill: 'Mixed Expert Maths',
    howToPlay: 'A new equation appears at the top of the table each round. Click the ball with the correct answer before the timer runs out. Balls rebound off the rails, collide with each other, and the table gets faster and more crowded as you level up.',
  },
]

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug)
}

export function getRelatedGames(slug: string, count = 3) {
  const index = games.findIndex((game) => game.slug === slug)

  if (index === -1) {
    return games.slice(0, count)
  }

  const related: GameEntry[] = []

  for (let offset = 1; related.length < count && offset < games.length; offset += 1) {
    related.push(games[(index + offset) % games.length])
  }

  return related
}

export function getAdjacentGames(slug: string) {
  const index = games.findIndex((game) => game.slug === slug)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: games[(index - 1 + games.length) % games.length],
    next: games[(index + 1) % games.length],
  }
}

export function buildGameMetadata(slug: string): Metadata {
  const game = getGameBySlug(slug)

  if (!game) {
    return {
      title: 'Math Games | CoolMathsZone',
      description: 'Play interactive math games at CoolMathsZone.',
      alternates: {
        canonical: `${siteUrl}/games`,
      },
    }
  }

  const canonical = `${siteUrl}/games/${game.slug}`
  const ogImage = `/images/og/${game.slug}.webp`

  return {
    title: `${game.title} | CoolMathsZone`,
    description: `${game.description} Best for ${game.grade} learners.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${game.title} | CoolMathsZone`,
      description: `${game.description} Best for ${game.grade} learners.`,
      url: canonical,
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} | CoolMathsZone`,
      description: `${game.description} Best for ${game.grade} learners.`,
      images: [ogImage],
    },
  }
}
