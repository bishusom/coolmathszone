import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import ResponsiveAd from '@/components/ResponsiveAd';
import { getAllGradeLevels } from '@/utils/gradeHelpers';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

export default function WorksheetsPage() {
  const gradeLevels = getAllGradeLevels();

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
            <span className="text-6xl mr-4">📄</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Math Worksheets</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Generate printable worksheets for practice and offline learning
          </p>
        </div>

        {/* Ad after header */}
        <div className="mb-12">
          <ResponsiveAd position="hero" />
        </div>

        {/* Grades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gradeLevels.map(grade => (
            <ContentCard 
              key={grade.id} 
              className="p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center h-full flex flex-col">
                <div className="text-5xl mb-4">{grade.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{grade.title}</h3>
                <p className="text-white/70 mb-4 flex-grow">{grade.description}</p>
                
                {/* Topics Count Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300">
                    {grade.topics.length} topics available
                  </span>
                </div>
                
                <Link href={`/worksheets/${grade.id}`} className="mt-auto">
                  <MagicButton className="w-full text-sm py-3">
                    View Worksheets →
                  </MagicButton>
                </Link>
              </div>
            </ContentCard>
          ))}
        </div>

        {/* Ad in content */}
        <div className="mb-12">
          <ResponsiveAd position="content" />
        </div>

        {/* Quick Generator Section */}
        <ContentCard className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Worksheet Generator</h2>
          <p className="text-white/70 text-lg mb-6">
            Generate a custom worksheet with mixed topics from all grades
          </p>
          <Link href="/worksheets/generate">
            <MagicButton className="text-lg">
              🎨 Create Custom Worksheet
            </MagicButton>
          </Link>
        </ContentCard>

        {/* Worksheet Tips */}
        <ContentCard className="p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">📝 Worksheet Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🖨️</div>
              <h4 className="font-semibold text-white mb-2">Print & Practice</h4>
              <p className="text-white/70 text-sm">Download and print worksheets for offline practice</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">📚</div>
              <h4 className="font-semibold text-white mb-2">Organized by Topic</h4>
              <p className="text-white/70 text-sm">Find worksheets for specific math concepts</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-white mb-2">Targeted Practice</h4>
              <p className="text-white/70 text-sm">Focus on areas that need improvement</p>
            </div>
          </div>
        </ContentCard>

        {/* Ad before footer */}
        <div className="mt-12">
          <ResponsiveAd position="footer" />
        </div>
        
      </div>
      <Footer />
    </PageContainer>
  );
}