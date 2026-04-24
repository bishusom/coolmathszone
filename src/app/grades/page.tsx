//app/grades/page.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/ui/Layout';
import GradeCard from '@/components/ui/GradeCard';
import ResponsiveAd from '@/components/ResponsiveAd';
import { getAllGradeLevels } from '@/utils/gradeHelpers';
import { sortGrades, SortOrder } from '@/utils/sortHelpers';
import { ContentCard, MagicButton } from '@/components/ui/PageContainer';

export default function AllGradesPage() {
   const [sortOrder, setSortOrder] = useState<SortOrder>('age-asc');
     const allGrades = getAllGradeLevels();
     const sortedGrades = sortGrades(allGrades, sortOrder); 

  return (
    <Layout>
      {/* Compact Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden gradient-arctic-adventure text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-4xl animate-float">🔢</div>
          <div className="absolute top-20 right-20 text-3xl animate-float" style={{animationDelay: '2s'}}>📐</div>
        </div>        
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 flex items-center justify-center gap-4">
              <span>🎓</span> All Grade Levels
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover interactive math adventures tailored for every learning stage. 
              From Kindergarten treasures to Grade 8 challenges, dive into a sea of knowledge!
            </p>
          </div>
        </div>
      </section>

      {/* Grade Levels Section - Now with Integrated Controls */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-blue-200 pb-8">
            <div className="text-left">
              <h2 className="text-3xl font-black text-gray-800 mb-2">
                Choose Your <span className="text-blue-600">Learning Path</span>
              </h2>
              <p className="text-gray-600">
                Exploring {sortedGrades.length} interactive grade levels
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-blue-100">
              <span className="text-gray-500 text-sm font-bold uppercase tracking-wider ml-2">Sort By</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortOrder('age-asc')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                    sortOrder === 'age-asc'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Younger First
                </button>
                <button
                  onClick={() => setSortOrder('age-desc')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
                    sortOrder === 'age-desc'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Older First
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {sortedGrades.map((grade) => (
              <div key={grade.id} className="transform hover:scale-105 transition-transform duration-300">
                <GradeCard grade={grade} />
              </div>
            ))}
          </div>

          {/* Ad Integrated within Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <ResponsiveAd position="content" />
          </div>

          {/* Educational Content Section - Solving "Thin Content" */}
          <div className="max-w-4xl mx-auto">
            <ContentCard className="p-8 md:p-12" variant="solid">
              <h2 className="text-3xl font-black text-gray-800 mb-6">🌊 A Sea of Mathematical Discovery</h2>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  Welcome to <strong>CoolMathsZone</strong>, where we turn mathematical concepts into an underwater adventure! 
                  Our curriculum is meticulously designed to support students from their very first steps in 
                  counting to complex algebraic thinking.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-700 mb-2">Pedagogical Approach</h3>
                    <p className="text-sm">
                      We follow a "Concrete-Pictorial-Abstract" progression. Every grade level starts with 
                      visual aids and interactive "treasure" themes before moving to formal mathematical notation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-700 mb-2">Standards Alignment</h3>
                    <p className="text-sm">
                      Whether you're following Common Core, state standards, or international curricula, 
                      our grade-wise topics cover the essential "building blocks" of math mastery.
                    </p>
                  </div>
                </div>
                <p>
                  By choosing a grade level, students gain access to specialized practice sets, 
                  interactive lessons, and instant feedback systems. Our goal is to build <strong>confidence</strong> 
                  alongside <strong>competence</strong>, making math the favorite part of every student's day.
                </p>
              </div>
            </ContentCard>
          </div>
        </div>
      </section>

      {/* Stats Section - Re-styled for density */}
      <section className="py-12 bg-white border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-black text-blue-600">{sortedGrades.length}</div>
              <div className="text-gray-500 text-sm font-bold uppercase">Grades</div>
            </div>
            <div>
              <div className="text-3xl font-black text-teal-600">
                {sortedGrades.reduce((total, grade) => total + grade.topics.length, 0)}
              </div>
              <div className="text-gray-500 text-sm font-bold uppercase">Topics</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-600">100+</div>
              <div className="text-gray-500 text-sm font-bold uppercase">Games</div>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-600">Free</div>
              <div className="text-gray-500 text-sm font-bold uppercase">Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Ad */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <ResponsiveAd position="footer" />
        </div>
      </section>
    </Layout>
  );
}