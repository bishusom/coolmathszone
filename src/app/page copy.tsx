'use client'

import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/ui/Layout';
import GradeCard from '@/components/ui/GradeCard';
import ResponsiveAd from '@/components/ResponsiveAd';
import { getAllGradeLevels } from '@/utils/gradeHelpers';
import { sortGrades, SortOrder } from '@/utils/sortHelpers';

export default function Home() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('age-asc');
  const allGrades = getAllGradeLevels();
  const sortedGrades = sortGrades(allGrades, sortOrder);

  return (
    <Layout>
      {/* Ocean Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-arctic-adventure text-white">
        
        <div className="absolute inset-0">
          {/* Floating math symbols */}
          <div className="absolute top-20 left-10 text-4xl animate-float">🔢</div>
          <div className="absolute top-40 right-20 text-3xl animate-float" style={{animationDelay: '2s'}}>📐</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-float" style={{animationDelay: '4s'}}>📊</div>
          <div className="absolute bottom-40 right-10 text-4xl animate-float" style={{animationDelay: '1s'}}>∑</div>
          <div className="absolute top-1/3 left-1/4 text-2xl animate-float" style={{animationDelay: '3s'}}>∞</div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              Math is
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                MAGICAL! ✨
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-blue-100 font-light leading-relaxed">
              Turn numbers into adventures and equations into superpowers!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/grades">
                <button className="bg-white text-blue-600 font-black text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-cyan-50 border-2 border-cyan-300">
                  🐬 View All Grades
                </button>
              </Link>
              <Link href="/grades/grade3/multiplication">
                <button className="border-2 border-cyan-300 text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-cyan-300 hover:text-blue-600 transition-all duration-300 bg-white/10 backdrop-blur-sm">
                  🌊 Try Sample Lesson
                </button>
              </Link>
            </div>

            {/* Fun stats - Updated to blue theme */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-300">100+</div>
                <div className="text-blue-200 text-sm">Math Games</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-teal-300">K - 8</div>
                <div className="text-blue-200 text-sm">Grade Levels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-300">∞</div>
                <div className="text-blue-200 text-sm">Fun!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad after Hero Section */}
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

      {/* Grade Levels Section */}
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
            {sortedGrades.map((grade, index) => (
              <div key={grade.id} className="transform hover:scale-105 transition-transform duration-300">
                <GradeCard grade={grade} />
              </div>
            ))}
          </div>

          {/* Ad in the middle of content */}
          <div className="mt-16">
            <ResponsiveAd position="content" />
          </div>
        </div>
      </section>  

      {/* Features Section - Updated to ocean theme */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why <span className="text-cyan-300">CoolMathsZone</span>?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dive deep into learning with our ocean of features!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-cyan-300/30 hover:border-cyan-300/50">
              <div className="w-20 h-20 bg-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                📚
              </div>
              <h3 className="text-2xl font-black mb-4 text-cyan-300">Comprehensive</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Complete curriculum from Kindergarten to High School
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-teal-300/30 hover:border-teal-300/50">
              <div className="w-20 h-20 bg-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                🎯
              </div>
              <h3 className="text-2xl font-black mb-4 text-teal-300">Interactive</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Engaging exercises with instant feedback
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-blue-300/30 hover:border-blue-300/50">
              <div className="w-20 h-20 bg-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                📱
              </div>
              <h3 className="text-2xl font-black mb-4 text-blue-300">Anywhere</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Learn on any device, anytime
              </p>
            </div>
          </div>
          {/* Ad after features */}
          <div className="mt-16">
            <ResponsiveAd position="content" />
          </div>
        </div>
      </section>

      {/* Final Ad Section */}
      <section className="py-12 bg-gradient-to-r from-blue-700 to-cyan-700">
        <div className="container mx-auto px-4">
          <ResponsiveAd position="footer" />
        </div>
      </section>
    </Layout>
  );
}