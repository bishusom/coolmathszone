// components/SearchExercises.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ContentCard } from '@/components/ui/PageContainer';

interface SearchExercisesProps {
  allTopics: Array<{
    id: string;
    title: string;
    description: string;
    emoji: string;
    category: string;
    difficulty: string;
    grade: string;
    gradeId: string;
    gradeIcon: string;
  }>;
}

export default function SearchExercises({ allTopics }: SearchExercisesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTopics = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <ContentCard className="p-6 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">🔍 Find Exercises</h2>
          <p className="text-white/90 font-bold mb-4">Search for specific topics like "multiplication", "fractions", or "geometry"</p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search exercises..."
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="text-white/60 mt-2">
              Found {filteredTopics.length} exercise{filteredTopics.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </ContentCard>

      {/* Search Results */}
      {searchTerm && (
        <ContentCard className="p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.slice(0, 6).map((topic) => (
              <Link 
                key={`${topic.gradeId}-${topic.id}`}
                href={`/grades/${topic.gradeId}/${topic.id}`}
                className="block"
              >
                <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-start mb-2">
                    <span className="text-2xl mr-3">{topic.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-white">{topic.title}</h4>
                      <p className="text-white/60 text-sm">{topic.grade}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{topic.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-xs capitalize">{topic.category.replace(/-/g, ' ')}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      topic.difficulty === 'beginner' 
                        ? 'bg-green-500/20 text-green-300' 
                        : topic.difficulty === 'intermediate'
                        ? 'bg-purple-500/20 text-white'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filteredTopics.length > 6 && (
            <div className="text-center mt-4">
              <p className="text-white/60">
                And {filteredTopics.length - 6} more exercises...
              </p>
            </div>
          )}
        </ContentCard>
      )}
    </>
  );
}