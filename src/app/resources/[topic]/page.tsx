// app/resources/[topic]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';
import  Footer from '@/components/ui/Footer'

interface PageProps {
  params: Promise<{
    topic: string;
  }>;
}

const resourceData: { [key: string]: any } = {
  'addition-strategies': {
    title: 'Addition Strategies',
    emoji: '➕',
    description: 'Learn different methods to master addition',
    color: 'from-green-500 to-emerald-500',
    strategies: [
      {
        name: 'Counting On',
        description: 'Start with the larger number and count up',
        example: '5 + 3: Start at 5, count up 3: 6, 7, 8 → Answer: 8',
        emoji: '5️⃣ → 6️⃣, 7️⃣, 8️⃣'
      },
      {
        name: 'Using Objects',
        description: 'Use physical objects like blocks or drawings',
        example: '4 + 2: Draw 4 apples 🍎🍎🍎🍎 + 2 more 🍎🍎 = 6 apples',
        emoji: '🍎🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎🍎'
      },
      {
        name: 'Number Line',
        description: 'Jump forward on a number line',
        example: '3 + 4: Start at 3 → jump 4 → land on 7',
        emoji: '[3]→(4)→[7]'
      },
      {
        name: 'Doubles Facts',
        description: 'Memorize special doubles combinations',
        example: '1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10',
        emoji: '✨ Double Power! ✨'
      },
      {
        name: 'Making Ten',
        description: 'Break numbers to make 10 first',
        example: '8 + 5 = (8 + 2) + 3 = 10 + 3 = 13',
        emoji: '8️⃣ + 5️⃣ = (8️⃣+2️⃣)+3️⃣ = 10️⃣+3️⃣ = 13️⃣'
      }
    ]
  },
  'subtraction-strategies': {
    title: 'Subtraction Strategies',
    emoji: '➖',
    description: 'Various techniques for subtraction problems',
    color: 'from-blue-500 to-cyan-500',
    strategies: [
      {
        name: 'Counting Back',
        description: 'Start with the first number and count backwards',
        example: '7 - 3: Start at 7, count back 3: 6, 5, 4 → Answer: 4',
        emoji: '7️⃣ ← 6️⃣, 5️⃣, 4️⃣'
      },
      {
        name: 'Using Objects',
        description: 'Remove objects from a group',
        example: '5 - 2: Start with 5 cookies 🍪🍪🍪🍪🍪, take away 2 → 3 left',
        emoji: '🍪🍪🍪🍪🍪 - 🍪🍪 = 🍪🍪🍪'
      },
      {
        name: 'Number Line',
        description: 'Jump backward on a number line',
        example: '9 - 4: Start at 9 ← jump 4 ← land on 5',
        emoji: '[9]←(4)←[5]'
      },
      {
        name: 'Related Facts',
        description: 'Use addition facts you know',
        example: '10 - 7: Think "7 + what = 10?" → 7 + 3 = 10, so answer is 3',
        emoji: '7️⃣ + ? = 10️⃣ → 3️⃣'
      },
      {
        name: 'Subtracting Zero',
        description: 'Special rule for subtracting zero',
        example: '8 - 0 = 8 (Any number minus zero is itself)',
        emoji: '8️⃣ - 0️⃣ = 8️⃣ (Magic!)'
      }
    ]
  },
  'multiplication-strategies': {
    title: 'Multiplication Strategies',
    emoji: '✖️',
    description: 'Master multiplication with fun methods',
    color: 'from-purple-500 to-pink-500',
    strategies: [
      {
        name: 'Repeated Addition',
        description: 'Add equal groups repeatedly',
        example: '3 × 4 = 4 + 4 + 4 = 12',
        emoji: '4️⃣ + 4️⃣ + 4️⃣ = 12️⃣'
      },
      {
        name: 'Arrays',
        description: 'Create rows and columns',
        example: '5 × 3 = 5 rows × 3 columns = 15 squares',
        emoji: '5 rows × 3 cols = 15'
      },
      {
        name: 'Skip Counting',
        description: 'Count by the multiplier',
        example: '6 × 4: Count by 4s six times: 4, 8, 12, 16, 20, 24',
        emoji: '4️⃣→8️⃣→12️⃣→16️⃣→20️⃣→24️⃣'
      },
      {
        name: 'Doubling',
        description: 'Double known facts',
        example: '4 × 6: 2 × 6 = 12, so 4 × 6 = 12 + 12 = 24',
        emoji: '2×6=12 → 4×6=24'
      },
      {
        name: 'Zero Property',
        description: 'Special rule for multiplying by zero',
        example: '7 × 0 = 0 (Any number times zero is zero)',
        emoji: '7️⃣ × 0️⃣ = 0️⃣ (Poof!)'
      }
    ]
  },
  'division-strategies': {
    title: 'Division Strategies',
    emoji: '➗',
    description: 'Learn division through different approaches',
    color: 'from-orange-500 to-red-500',
    strategies: [
      {
        name: 'Equal Sharing',
        description: 'Share equally into groups',
        example: '12 ÷ 3: Share 12 cookies among 3 friends → 4 each',
        emoji: '12🍪 ÷ 3 = 4🍪 each'
      },
      {
        name: 'Repeated Subtraction',
        description: 'Subtract the divisor repeatedly',
        example: '15 ÷ 5: 15-5=10 (1), 10-5=5 (2), 5-5=0 (3) → Answer: 3',
        emoji: '15 - 5 - 5 - 5=0 → 3 times'
      },
      {
        name: 'Using Multiplication Facts',
        description: 'Think of related multiplication',
        example: '24 ÷ 6: Think "What times 6 equals 24?" → 6 × 4 = 24',
        emoji: '6 × ? = 24 → 4'
      },
      {
        name: 'Arrays',
        description: 'Organize into rows/columns',
        example: '18 ÷ 3: 18 squares in 3 rows = 6 per row',
        emoji: '18 in 3 rows → 6 each'
      },
      {
        name: 'Dividing by One',
        description: 'Special rule for dividing by one',
        example: '9 ÷ 1 = 9 (Any number divided by 1 is itself)',
        emoji: '9️⃣ ÷ 1️⃣ = 9️⃣ (Easy!)'
      }
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const resource = resourceData[topic];
  
  if (!resource) {
    return {
      title: 'Resource Not Found | CoolMathsZone'
    };
  }

  return {
    title: `${resource.title} | CoolMathsZone Resources`,
    description: resource.description
  };
}

export default async function ResourceTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const resource = resourceData[topic];

  if (!resource) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-4 mb-6">
            <Link href="/" className="inline-block">
              <MagicButton className="text-sm">
                𓇼 Home
              </MagicButton>
            </Link>
            <Link href="/resources" className="inline-block">
              <MagicButton className="text-sm">
                📚 All Resources
              </MagicButton>
            </Link>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">{resource.emoji}</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{resource.title}</h1>
              <div className={`w-32 h-2 bg-gradient-to-r ${resource.color} rounded-full mx-auto`}></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resource.strategies.map((strategy: any, index: number) => (
            <ContentCard 
              key={index}
              className="p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="text-4xl text-white/90 mr-4">{strategy.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{strategy.name}</h3>
                  <p className="text-white/70">{strategy.description}</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/90 font-semibold mb-2">Example:</p>
                <p className="text-white/90 font-semibold">{strategy.example}</p>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Practice Section */}
        <ContentCard className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Practice?</h2>
          <p className="text-white/70 text-lg mb-6">
            Now that you've learned these strategies, try them out with real math problems!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <MagicButton className="text-lg">
                🎮 Practice with Games
              </MagicButton>
            </Link>
            <Link href="/resources">
              <MagicButton className="text-lg">
                📚 More Strategies
              </MagicButton>
            </Link>
          </div>
        </ContentCard>

        {/* Tips Section */}
        <ContentCard className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Try Multiple Strategies</h4>
              <p className="text-white/70 text-sm">Different problems might be easier with different methods. Practice them all!</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Use What Feels Natural</h4>
              <p className="text-white/70 text-sm">Stick with the strategy that makes the most sense to you personally.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Check Your Work</h4>
              <p className="text-white/70 text-sm">Use a different strategy to verify your answer is correct.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Practice Daily</h4>
              <p className="text-white/70 text-sm">Just 10 minutes of practice each day builds strong math skills.</p>
            </div>
          </div>
        </ContentCard>
      </div>
      <Footer />
    </PageContainer>
  );
}