import { getGradeLevel, getTopicsByGrade } from '@/utils/gradeHelpers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

interface PageProps {
  params: {
    grade: string;
  };
}

// Color gradients for each grade (matching your grade page)
const gradeColors: { [key: string]: string } = {
  kindergarten: 'from-pink-500 to-purple-500',
  grade1: 'from-blue-500 to-teal-500',
  grade2: 'from-teal-500 to-cyan-500',
  grade3: 'from-green-500 to-emerald-500',
  grade4: 'from-purple-500 to-indigo-500',
  grade5: 'from-orange-500 to-red-500',
  grade6: 'from-orange-500 to-red-500',
  grade7: 'from-green-500 to-emerald-500'
};

export default async function GradeWorksheetsPage({ params }: PageProps) {
  // Await the params since it's a Promise in Next.js 14
  const { grade: gradeId } = await params;
  const grade = getGradeLevel(gradeId);
  const topics = getTopicsByGrade(gradeId);
  
  if (!grade) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/worksheets" className="inline-block mb-6">
            <MagicButton className="text-lg">
              📄 Back to Worksheets
            </MagicButton>
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">{grade.icon}</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{grade.title} Worksheets</h1>
              <div className={`w-32 h-2 bg-gradient-to-r ${gradeColors[grade.id] || 'from-blue-500 to-purple-500'} rounded-full mx-auto`}></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Printable worksheets for {grade.description.toLowerCase()}
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {topics.map(topic => (
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
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </span>
                </div>
                
                <Link href={`/worksheets/${grade.id}/${topic.id}`} className="mt-auto">
                  <MagicButton className="w-full text-sm py-3">
                    Generate Worksheet →
                  </MagicButton>
                </Link>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Quick Action */}
        <ContentCard className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Practice?</h2>
          <p className="text-white/70 text-lg mb-6">
            Choose any topic above to generate a printable worksheet, or try a random topic!
          </p>
          <Link 
            href={`/worksheets/${grade.id}/${
              topics[Math.floor(Math.random() * topics.length)].id
            }`}
          >
            <MagicButton className="text-lg">
              🎲 Random Worksheet
            </MagicButton>
          </Link>
        </ContentCard>

        {/* Worksheet Benefits */}
        <ContentCard className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">📊 Worksheet Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">✍️</div>
              <h4 className="font-semibold text-white mb-2">Hands-on Learning</h4>
              <p className="text-white/70 text-sm">Writing by hand reinforces math concepts</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-white mb-2">Track Progress</h4>
              <p className="text-white/70 text-sm">See improvement over time with practice</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-white mb-2">Targeted Practice</h4>
              <p className="text-white/70 text-sm">Focus on specific skills that need work</p>
            </div>
          </div>
        </ContentCard>
      </div>
    </PageContainer>
  );
}