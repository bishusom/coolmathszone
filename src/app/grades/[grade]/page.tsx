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

import { getMetadataAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade } = await params;
  const gradeLevel = getGradeLevel(grade);
  
  if (!gradeLevel) {
    return {
      title: 'Grade Not Found | CoolMathsZone'
    };
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://coolmathszone.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Grades',
        'item': 'https://coolmathszone.com/grades'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': gradeLevel.title,
        'item': `https://coolmathszone.com/grades/${gradeLevel.id}`
      }
    ]
  };

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
    alternates: getMetadataAlternates(`grades/${gradeLevel.id}`),
    other: {
      'script:ld+json': [
        JSON.stringify(breadcrumbSchema),
        JSON.stringify(faqSchema)
      ]
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
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
          <div className="flex-shrink-0 text-center">
            <Link href="/grades" className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all border border-white/10 text-sm font-bold">
              <span>←</span> Back to All Grades
            </Link>
            <div className="text-8xl md:text-9xl filter drop-shadow-lg animate-float">
              {gradeLevel.icon}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              {gradeLevel.title}
            </h1>
            <div className={`w-32 h-2 bg-gradient-to-r ${gradeColors[gradeLevel.id] || 'from-blue-500 to-purple-500'} rounded-full mb-6 mx-auto md:mx-0`}></div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl font-medium">
              {gradeLevel.description} Dive into {gradeLevel.topics.length} specialized math topics designed for success.
            </p>
          </div>
        </div>

        {/* Grade Curriculum Overview - Solving "Thin Content" */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>📖</span> What You'll Learn in {gradeLevel.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gradeLevel.topics.slice(0, 6).map(topic => (
                <div key={topic.id} className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-inner group hover:bg-black/40 transition-colors">
                  <h3 className="font-bold text-cyan-200 mb-1 flex items-center gap-2">
                    <span className="text-lg">{topic.emoji}</span> {topic.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <ContentCard className="p-6" variant="solid">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Grade Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Total Topics</span>
                <span className="font-bold text-blue-600">{gradeLevel.topics.length}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Skill Level</span>
                <span className="font-bold text-teal-600">{gradeLevel.id === 'kindergarten' ? 'Introductory' : 'Developing'}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Target Age</span>
                <span className="font-bold text-purple-600">{gradeLevel.age}+ Years</span>
              </div>
            </div>
            <Link href="#topics-grid" className="block mt-6">
              <MagicButton className="w-full">
                Explore All Topics ↓
              </MagicButton>
            </Link>
          </ContentCard>
        </div>

        {/* Topics Grid */}
        <div id="topics-grid" className="scroll-mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">Interactive <span className="text-cyan-300">Workshops</span></h2>
            <div className="text-white/60 text-sm font-bold uppercase tracking-widest">
              {gradeLevel.topics.length} Modules Available
            </div>
          </div>
          
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
        </div>

        {/* Ad before end */}
        <div className="mt-12 mb-12">
          <ResponsiveAd position="content" />
        </div>

        {/* Quick Stats & Tips Re-styled for horizontal space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContentCard className="p-8 text-center flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for a Challenge?</h2>
            <p className="text-white/70 text-lg mb-6">
              Not sure where to start? Let the sea currents decide your next math adventure!
            </p>
            <Link 
              href={`/grades/${gradeLevel.id}/${
                gradeLevel.topics[Math.floor(Math.random() * gradeLevel.topics.length)].id
              }`}
            >
              <MagicButton className="text-lg px-8">
                🎲 Random Adventure
              </MagicButton>
            </Link>
          </ContentCard>

          <ContentCard className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🌟 Success Tips</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10">
                <span className="text-3xl">🎯</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Focus on Mastery</h4>
                  <p className="text-white/70 text-xs">Finish one module before diving into the next.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10">
                <span className="text-3xl">⏱️</span>
                <div>
                  <h4 className="font-bold text-white text-sm">Consistent Practice</h4>
                  <p className="text-white/70 text-xs">15 minutes a day builds unstoppable math skills.</p>
                </div>
              </div>
            </div>
          </ContentCard>
        </div>
      </div>
    </PageContainer>
  );
}
