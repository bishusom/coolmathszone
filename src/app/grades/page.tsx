//app/grades/page.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import GradeCard from '@/components/ui/GradeCard';
import ResponsiveAd from '@/components/ResponsiveAd';
import { getAllGradeLevels } from '@/utils/gradeHelpers';
import { sortGrades, SortOrder } from '@/utils/sortHelpers';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';


export default function AllGradesPage() {
   const [sortOrder, setSortOrder] = useState<SortOrder>('age-asc');
     const allGrades = getAllGradeLevels();
     const sortedGrades = sortGrades(allGrades, sortOrder); 

  return (
    <PageContainer>
      {/* Hero Section with Grade Page Styling */}
      <section className="relative py-16 lg:py-20 overflow-hidden gradient-arctic-adventure text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-4xl animate-float">🔢</div>
          <div className="absolute top-40 right-20 text-3xl animate-float" style={{animationDelay: '2s'}}>📐</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-float" style={{animationDelay: '4s'}}>📊</div>
        </div>        
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Centered Back to Home Button */}
            <div className="flex justify-center mb-6">
              <Link href="/">
                <MagicButton className="text-lg">
                  ⋆.˚ 𓇼 Back to Home
                </MagicButton>
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🎓</span>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                    All Grade Levels
                  </h1>
                  <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
                </div>
              </div>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Discover math adventures for every learning stage. Choose your grade and start exploring!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad after Hero */}
      <section className="py-8 bg-gradient-to-r from-blue-700 to-cyan-700">
        <div className="container mx-auto px-4">
          <ResponsiveAd position="hero" />
        </div>
      </section>

      {/* Sorting Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {sortedGrades.length} Grade Levels
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortOrder('age-asc')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    sortOrder === 'age-asc'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Age ↑
                </button>
                <button
                  onClick={() => setSortOrder('age-desc')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    sortOrder === 'age-desc'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Age ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Levels Section - FIXED: Use sortedGrades instead of allGrades */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Choose Your <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Learning Path</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Interactive courses designed for every age and skill level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedGrades.map((grade) => ( // CHANGED: allGrades → sortedGrades
              <div key={grade.id} className="transform hover:scale-105 transition-transform duration-300">
                <GradeCard grade={grade} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <ContentCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">📚 Complete Math Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-black text-cyan-300 mb-2">{sortedGrades.length}</div>
                <div className="text-blue-100 text-lg">Grade Levels</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-teal-300 mb-2">
                  {sortedGrades.reduce((total, grade) => total + grade.topics.length, 0)}
                </div>
                <div className="text-blue-100 text-lg">Math Topics</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-300 mb-2">100+</div>
                <div className="text-blue-100 text-lg">Learning Games</div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <MagicButton className="text-lg">
                  🏠 Return to Homepage
                </MagicButton>
              </Link>
            </div>
          </ContentCard>
        </div>
      </section>

      {/* Ad before footer */}
      <section className="py-12 bg-gradient-to-r from-blue-700 to-cyan-700">
        <div className="container mx-auto px-4">
          <ResponsiveAd position="footer" />
        </div>
      </section>

      {/* Footer-like Section */}
      <Footer />
    </PageContainer>
  );
}