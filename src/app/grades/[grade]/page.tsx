// app/grades/[grade]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradeLevel } from '@/utils/gradeHelpers';
import ResponsiveAd from '@/components/ResponsiveAd';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

interface PageProps {
  params: Promise<{
    grade: string;
  }>;
}

// Color gradients for each grade
const gradeColors: { [key: string]: string } = {
  kindergarten: 'from-pink-500 to-purple-500',
  grade1: 'from-blue-500 to-teal-500',
  grade2: 'from-teal-500 to-cyan-500',
  grade3: 'from-green-500 to-emerald-500',
  grade4: 'from-purple-500 to-indigo-500',
  grade5: 'from-orange-500 to-red-500',
  grade6: 'from-orange-500 to-red-500',
  grade7: 'from-green-500 to-emerald-500',
  grade8: 'from-purple-500 to-indigo-500'
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade } = await params;
  const gradeLevel = getGradeLevel(grade);
  
  if (!gradeLevel) {
    return {
      title: 'Grade Not Found | CoolMathsZone'
    };
  }

  // FAQ Schema for the grade page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What math topics are covered in ${gradeLevel.title}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${gradeLevel.title} covers ${gradeLevel.topics.map(topic => topic.title).join(', ')}. These topics help build fundamental math skills appropriate for this grade level.`
        }
      },
      {
        '@type': 'Question',
        'name': `How difficult are the ${gradeLevel.title} math topics?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `The topics range from ${gradeLevel.topics.filter(t => t.difficulty === 'beginner').length} beginner topics to ${gradeLevel.topics.filter(t => t.difficulty === 'intermediate').length} intermediate topics, with varying levels to suit different learning paces.`
        }
      },
      {
        '@type': 'Question',
        'name': 'How often should students practice math?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We recommend practicing math for 15-20 minutes daily to build consistent skills and reinforce learning through regular engagement.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are the math topics aligned with educational standards?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, all our math topics are designed to align with common educational standards and curriculum requirements for each grade level.'
        }
      }
    ]
  };

  return {
    title: `${gradeLevel.title} | CoolMathsZone`,
    description: gradeLevel.description,
    alternates: {
      canonical: `https://coolmathszone.com/grades/${gradeLevel.id}`,
    },
    other: {
      'script:ld+json': JSON.stringify(faqSchema)
    }
  };
}

export default async function GradePage({ params }: PageProps) {
  const { grade } = await params;
  const gradeLevel = getGradeLevel(grade);

  if (!gradeLevel) {
    notFound();
  }

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
            <span className="text-6xl mr-4">{gradeLevel.icon}</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{gradeLevel.title}</h1>
              <div className={`w-32 h-2 bg-gradient-to-r ${gradeColors[gradeLevel.id] || 'from-blue-500 to-purple-500'} rounded-full mx-auto`}></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {gradeLevel.description}
          </p>
        </div>

        {/* Rest of your existing component remains the same */}
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gradeLevel.topics.map((topic) => (
            <ContentCard 
              key={topic.id} 
              className="p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center h-full flex flex-col">
                <div className="text-5xl mb-4">{topic.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3">{topic.title}</h3>
                <p className="text-white/70 mb-4 flex-grow">{topic.description}</p>
                
                {/* Difficulty Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    topic.difficulty === 'beginner' 
                      ? 'bg-green-500/20 text-green-300' 
                      : topic.difficulty === 'intermediate'
                      ? 'bg-purple-500/20 text-white'
                      : 'bg-red-500/20 text-yellow-300'
                  }`}>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </span>
                </div>
                
                <Link href={`/grades/${gradeLevel.id}/${topic.id}`} className="mt-auto">
                  <MagicButton className="w-full text-sm py-3">
                    Start Learning →
                  </MagicButton>
                </Link>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Ad before end */}
        <div className="mt-12">
          <ResponsiveAd position="content" />
        </div>

        {/* Quick Stats */}
        <ContentCard className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Dive In?</h2>
          <p className="text-white/70 text-lg mb-6">
            Choose any topic above to start your math adventure, or try a random challenge!
          </p>
          <Link 
            href={`/grades/${gradeLevel.id}/${
              gradeLevel.topics[Math.floor(Math.random() * gradeLevel.topics.length)].id
            }`}
          >
            <MagicButton className="text-lg">
              🎲 Start Random Adventure
            </MagicButton>
          </Link>
        </ContentCard>

        {/* Learning Tips */}
        <ContentCard className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">🌟 Learning Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-white mb-2">Focus on One Topic</h4>
              <p className="text-white/70 text-sm">Master each concept before moving to the next</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">⏱️</div>
              <h4 className="font-semibold text-white mb-2">Practice Daily</h4>
              <p className="text-white/70 text-sm">Just 15 minutes a day builds strong math skills</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎉</div>
              <h4 className="font-semibold text-white mb-2">Celebrate Progress</h4>
              <p className="text-white/70 text-sm">Every correct answer is a step toward math mastery</p>
            </div>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}