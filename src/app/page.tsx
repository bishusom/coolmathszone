'use client'

import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/ui/Layout';
import GradeCard from '@/components/ui/GradeCard';
import ResponsiveAd from '@/components/ResponsiveAd';
import DailyMathSurprise from '@/components/home/DailyMathSurprise';
import { getAllGradeLevels } from '@/utils/gradeHelpers';
import { sortGrades, SortOrder } from '@/utils/sortHelpers';

export default function Home() {
  const [sortOrder, setSortOrder] = useState<SortOrder>('age-asc');
  const allGrades = getAllGradeLevels();
  const sortedGrades = sortGrades(allGrades, sortOrder);
  const featuredGames = [
    {
      title: 'Equation Billiards',
      href: '/games/equation-billiards',
      icon: '🎱',
      skill: 'Mixed Expert Maths',
      description: 'Track rebounding answer balls while solving roots, powers, and algebra under a live timer.',
      color: 'from-emerald-400 via-cyan-400 to-amber-400',
      accent: 'text-emerald-100',
    },
    {
      title: 'Math Popper',
      href: '/games/math-popper',
      icon: '🔢',
      skill: 'Fast Arithmetic',
      description: 'Pop the right answers before the board speeds up.',
      color: 'from-fuchsia-500 to-amber-500',
      accent: 'text-fuchsia-100',
    },
    {
      title: 'Algebra Dash',
      href: '/games/algebra-dash',
      icon: '✖️',
      skill: 'Algebra Fluency',
      description: 'Race through equations and solve for x under pressure.',
      color: 'from-cyan-400 to-blue-600',
      accent: 'text-cyan-100',
    },
  ];

  return (
    <Layout>
      {/* Deepened Sunlit Ocean Hero Section */}
      <section className="relative py-4 md:py-5 bg-gradient-to-b from-cyan-300 to-blue-400 text-teal-950 overflow-hidden">
        {/* Sunrays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-32 h-[150%] bg-white/20 animate-sunray blur-2xl origin-top"></div>
          <div className="absolute -top-32 left-2/4 w-48 h-[150%] bg-white/30 animate-sunray blur-3xl origin-top" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -top-32 left-3/4 w-24 h-[150%] bg-white/20 animate-sunray blur-xl origin-top" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full border border-white/50 bg-white/20 animate-bubble" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-5 left-1/4 w-6 h-6 rounded-full border border-white/50 bg-white/20 animate-bubble" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-3 h-3 rounded-full border border-white/50 bg-white/20 animate-bubble" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-8 right-10 w-5 h-5 rounded-full border border-white/50 bg-white/20 animate-bubble" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Animated wave/bottom decor */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-300/40 to-transparent"></div>
          <div className="flex justify-center space-x-8 absolute -bottom-4 left-0 right-0">
            {['🐠', '🐚', '🐬', '🦀', '🐳', '🐙', '🐡', '🦑'].map((emoji, i) => (
              <div
                key={i}
                className="animate-float-sea opacity-70"
                style={{
                  animationDelay: `${i * 1.2}s`,
                  fontSize: `${1.2 + (i % 4) * 0.4}rem`
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm md:text-base text-teal-900/80 mb-2 font-black uppercase tracking-wider">
            Cool Maths Zone
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 drop-shadow-sm leading-tight max-w-4xl mx-auto">
            Cool Maths Zone: Fun Math Games in the <span className="text-blue-600">Coral Kingdom!</span>
          </h1>
          <p className="text-base md:text-lg text-teal-800 mb-4 max-w-2xl mx-auto font-medium">
            Play cool math games, practise maths skills, and explore lessons from Kindergarten to 8th grade.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/grades">
              <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all hover:scale-105 border border-amber-300/50">
                <span>🌟</span> Start Your Adventure!
              </button>
            </Link>
            <Link href="/games">
              <button className="bg-white/60 hover:bg-white text-teal-800 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm backdrop-blur-sm border border-white transition-all hover:scale-105">
                <span>🐠</span> Play Games First
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Coral Bento Hub */}
      <section className="py-6 md:py-8 bg-gradient-to-b from-blue-400 via-cyan-200 to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-32 translate-y-32"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
              {/* Featured Games (Stacked in Card) */}
              <div className="lg:col-span-2 lg:row-span-2 rounded-[2.5rem] border-2 border-white/70 bg-black/5 backdrop-blur-md p-8 shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">Featured Games</h3>
                  <Link href="/games" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                    All Games
                  </Link>
                </div>
                
                <div className="flex flex-col gap-4 flex-grow">
                  {/* Game 1 */}
                  <div className="flex-1 relative group overflow-hidden rounded-3xl border border-white/50 shadow-lg bg-white/40 backdrop-blur-sm text-blue-950 p-6 hover:bg-white/60 transition-all hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                    <div className="relative z-10 flex items-center gap-6">
                      <div className="text-5xl shrink-0 group-hover:rotate-12 transition-transform duration-500">🎱</div>
                      <div>
                        <h3 className="text-xl font-black mb-1">Equation Billiards</h3>
                        <p className="text-xs text-teal-900/80 mb-3 font-medium line-clamp-1">Solve roots and algebra with rebounding balls!</p>
                        <Link href="/games/equation-billiards">
                          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-all">
                            Play Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Game 2 */}
                  <div className="flex-1 relative group overflow-hidden rounded-3xl border border-white/50 shadow-lg bg-white/40 backdrop-blur-sm text-purple-950 p-6 hover:bg-white/60 transition-all hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-300/20 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
                    <div className="relative z-10 flex items-center gap-6">
                      <div className="text-5xl shrink-0 group-hover:rotate-12 transition-transform duration-500">🔢</div>
                      <div>
                        <h3 className="text-xl font-black mb-1">Math Popper</h3>
                        <p className="text-xs text-fuchsia-900/80 mb-3 font-medium line-clamp-1">Pop answers before the board speeds up!</p>
                        <Link href="/games/math-popper">
                          <button className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-all">
                            Play Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Navigator (Wide) */}
              <div className="lg:col-span-2 lg:row-span-1 rounded-[2.5rem] border-2 border-white/70 bg-white/70 backdrop-blur-md p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-teal-900">Explore Grades</h3>
                  <Link href="/grades" className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:bg-cyan-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700">
                    All Grades
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sortedGrades.slice(0, 4).map((grade) => (
                    <Link
                      key={grade.id}
                      href={`/grades/${grade.id}`}
                      className="group flex flex-col items-center p-4 rounded-2xl border border-white shadow-md bg-gradient-to-br from-cyan-50 to-blue-100 text-teal-800 hover:shadow-cyan-300/40 hover:scale-105 transition-all text-center relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-12 h-12 bg-white/60 rounded-full translate-x-4 -translate-y-4"></div>
                      <span className="text-3xl mb-2 group-hover:animate-bounce-gentle transition-transform relative z-10">{grade.icon}</span>
                      <span className="text-xs font-black uppercase tracking-wider relative z-10">{grade.title}</span>
                    </Link>
                  ))}
                  <div className="sm:hidden col-span-2">
                    <Link href="/grades" className="flex items-center justify-center p-4 rounded-2xl bg-cyan-600 border border-cyan-500 text-white font-black text-sm shadow-md shadow-cyan-500/20 hover:bg-cyan-700 transition-colors">
                      All Grades
                    </Link>
                  </div>
                </div>
              </div>

              {/* Daily Surprise (Medium) */}
              <div className="lg:col-span-1 lg:row-span-1 rounded-[2.5rem] overflow-hidden shadow-xl border-2 border-white/70 bg-white/50 backdrop-blur-md">
                <DailyMathSurprise isCompact={true} />
              </div>

              {/* Stats/Quick Info (Medium) */}
              <div className="lg:col-span-1 lg:row-span-1 rounded-[2.5rem] bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50 text-orange-900 border-2 border-white/60 p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/40 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                <h3 className="text-lg font-black mb-4 relative z-10 uppercase tracking-widest text-orange-700 italic">Ocean Stats</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="text-sm font-bold">14+ Math Games</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-xl">🧠</span>
                    <span className="text-sm font-bold">Grades K to 8</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-xl">✨</span>
                    <span className="text-sm font-bold">Instant Progress</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Ad after primary homepage content */}
      <section className="py-4 bg-blue-100">
        <div className="container mx-auto px-4">
          <ResponsiveAd position="hero" />
        </div>
      </section>

      {/* Simplified Features Row */}
      <section className="py-10 bg-blue-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur border border-white shadow-sm group hover:scale-105 transition-all text-teal-900">
              <div className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center text-lg shadow-sm group-hover:rotate-12 transition-transform">📚</div>
              <div className="font-black uppercase tracking-wider text-[10px] md:text-xs">Comprehensive Curriculum</div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur border border-white shadow-sm group hover:scale-105 transition-all text-teal-900">
              <div className="w-10 h-10 bg-white text-emerald-500 rounded-full flex items-center justify-center text-lg shadow-sm group-hover:rotate-12 transition-transform">🎯</div>
              <div className="font-black uppercase tracking-wider text-[10px] md:text-xs">Interactive Feedback</div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur border border-white shadow-sm group hover:scale-105 transition-all text-teal-900">
              <div className="w-10 h-10 bg-white text-indigo-500 rounded-full flex items-center justify-center text-lg shadow-sm group-hover:rotate-12 transition-transform">📱</div>
              <div className="font-black uppercase tracking-wider text-[10px] md:text-xs">Play On Any Device</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Ad Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-300 to-blue-400">
        <div className="container mx-auto px-4">
          <ResponsiveAd position="footer" />
        </div>
      </section>
    </Layout>
  );
}
