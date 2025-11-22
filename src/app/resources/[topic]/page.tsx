// app/resources/[topic]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';
import Footer from '@/components/ui/Footer';
import { resourceData } from '@/data/resources-strategies';
import { MultiplicationTablesInteractive } from './MultiplicationTablesInteractive';
import { StrategiesSection } from './StartegiesSection';

interface PageProps {
  params: Promise<{
    topic: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const resource = resourceData[topic];
  
  if (!resource) {
    return {
      title: 'Resource Not Found | CoolMathsZone',
      description: 'The requested math resource was not found.'
    };
  }

  return {
    title: `${resource.title} | CoolMathsZone Resources`,
    description: resource.description,
    alternates: {
      canonical: `https://coolmathszone.com/resources/${topic}`
    },
    openGraph: {
      title: `${resource.title} | CoolMathsZone`,
      description: resource.description,
      type: 'website',
    }
  };
}

export default async function ResourceTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const resource = resourceData[topic];

  if (!resource) {
    notFound();
  }

  const isMultiplicationTables = topic === 'multiplication-tables';

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

        {/* Content based on resource type */}
        {isMultiplicationTables ? (
          <MultiplicationTablesInteractive />
        ) : (
          <StrategiesSection strategies={resource.strategies || []} />
        )}

        {/* Practice Section */}
        <ContentCard className="p-8 text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Practice?</h2>
          <p className="text-white/70 text-lg mb-6">
            Now that you've learned these {isMultiplicationTables ? 'tables' : 'strategies'}, try them out with real math problems!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <MagicButton className="text-lg">
                🎮 Practice with Games
              </MagicButton>
            </Link>
            <Link href="/resources">
              <MagicButton className="text-lg">
                📚 More Resources
              </MagicButton>
            </Link>
          </div>
        </ContentCard>

        {/* Tips Section */}
        <TipsSection isMultiplicationTables={isMultiplicationTables} />
      </div>
      <Footer />
    </PageContainer>
  );
}

// Tips Section Component
function TipsSection({ isMultiplicationTables }: { isMultiplicationTables: boolean }) {
  return (
    <ContentCard className="p-8 mt-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">💡 Pro Tips</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isMultiplicationTables ? (
          <>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Practice Daily</h4>
              <p className="text-white/70 text-sm">Just 5-10 minutes of table practice each day builds strong recall.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Use Patterns</h4>
              <p className="text-white/70 text-sm">Notice patterns like 5× always ends in 0 or 5, 9× has digit patterns.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Learn in Chunks</h4>
              <p className="text-white/70 text-sm">Master 2-5 tables first, then 6-9, then 10-12, and so on.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Use Real Examples</h4>
              <p className="text-white/70 text-sm">Apply tables to real situations: 4 packs of 6 cookies = 24 cookies.</p>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </ContentCard>
  );
}