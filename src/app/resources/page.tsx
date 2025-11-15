// app/resources/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export const metadata: Metadata = {
  title: 'Math Resources & Strategies | CoolMathsZone',
  description: 'Explore helpful math strategies, tips, and learning resources for all grade levels.'
};

const resourceCategories = [
  {
    id: 'addition-strategies',
    title: 'Addition Strategies',
    emoji: '➕',
    description: 'Learn different methods to master addition',
    color: 'from-green-500 to-emerald-500',
    topics: ['Counting On', 'Using Objects', 'Number Line', 'Doubles Facts', 'Making Ten']
  },
  {
    id: 'subtraction-strategies',
    title: 'Subtraction Strategies',
    emoji: '➖',
    description: 'Various techniques for subtraction problems',
    color: 'from-blue-500 to-cyan-500',
    topics: ['Counting Back', 'Using Objects', 'Number Line', 'Related Facts', 'Subtracting Zero']
  },
  {
    id: 'multiplication-strategies',
    title: 'Multiplication Strategies',
    emoji: '✖️',
    description: 'Master multiplication with fun methods',
    color: 'from-purple-500 to-pink-500',
    topics: ['Repeated Addition', 'Arrays', 'Skip Counting', 'Doubling', 'Zero Property']
  },
  {
    id: 'division-strategies',
    title: 'Division Strategies',
    emoji: '➗',
    description: 'Learn division through different approaches',
    color: 'from-orange-500 to-red-500',
    topics: ['Equal Sharing', 'Repeated Subtraction', 'Multiplication Facts', 'Arrays', 'Dividing by One']
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    emoji: '🤔',
    description: 'Strategies for tackling word problems',
    color: 'from-yellow-500 to-amber-500',
    topics: ['Understand the Problem', 'Make a Plan', 'Solve', 'Check Your Work']
  },
  {
    id: 'study-tips',
    title: 'Study Tips',
    emoji: '📚',
    description: 'Effective ways to learn and remember math',
    color: 'from-indigo-500 to-purple-500',
    topics: ['Daily Practice', 'Flashcards', 'Math Games', 'Real-World Applications']
  }
];

export default function ResourcesPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <MagicButton className="text-lg">
              𓇼 Back to Math Adventures
            </MagicButton>
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">📚</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Math Resources</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover helpful strategies, tips, and techniques to master math concepts at every level.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resourceCategories.map((category) => (
            <ContentCard 
              key={category.id} 
              className="p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center h-full flex flex-col">
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                <p className="text-white/70 mb-4 flex-grow">{category.description}</p>
                
                {/* Topics List */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {category.topics.slice(0, 3).map((topic, index) => (
                      <span 
                        key={index}
                        className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {category.topics.length > 3 && (
                      <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
                        +{category.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <Link href={`/resources/${category.id}`} className="mt-auto">
                  <MagicButton className="w-full text-sm py-3">
                    Explore Strategies →
                  </MagicButton>
                </Link>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Quick Access Section */}
        <ContentCard className="p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Strategy Finder</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/resources/addition-strategies" className="group">
              <div className="bg-green-50/20 p-4 rounded-lg hover:bg-green-500/30 transition-colors">
                <div className="text-3xl mb-2">➕</div>
                <p className="text-white font-semibold">Addition</p>
              </div>
            </Link>
            <Link href="/resources/subtraction-strategies" className="group">
              <div className="bg-blue-500/20 p-4 rounded-lg hover:bg-blue-50/30 transition-colors">
                <div className="text-3xl mb-2">➖</div>
                <p className="text-white font-semibold">Subtraction</p>
              </div>
            </Link>
            <Link href="/resources/multiplication-strategies" className="group">
              <div className="bg-purple-500/20 p-4 rounded-lg hover:bg-purple-500/30 transition-colors">
                <div className="text-3xl mb-2">✖️</div>
                <p className="text-white font-semibold">Multiplication</p>
              </div>
            </Link>
            <Link href="/resources/division-strategies" className="group">
              <div className="bg-orange-500/20 p-4 rounded-lg hover:bg-orange-50/30 transition-colors">
                <div className="text-3xl mb-2">➗</div>
                <p className="text-white font-semibold">Division</p>
              </div>
            </Link>
          </div>
        </ContentCard>

        {/* Learning Tips */}
        <ContentCard className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🌟 How to Use These Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-white mb-2">Choose Your Strategy</h4>
              <p className="text-white/70 text-sm">Pick the method that makes the most sense to you</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-semibold text-white mb-2">Practice Regularly</h4>
              <p className="text-white/70 text-sm">Try different strategies to find your favorite</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold text-white mb-2">Apply Everywhere</h4>
              <p className="text-white/70 text-sm">Use these strategies in your daily math practice</p>
            </div>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}