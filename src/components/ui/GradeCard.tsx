import Link from 'next/link';
import { GradeLevel } from '@/types';

interface GradeCardProps {
  grade: GradeLevel;
}

const colorConfig = {
  pink: {
    gradient: 'from-pink-500 to-rose-500',
    light: 'bg-pink-50',
    medium: 'bg-pink-100',
    dark: 'text-pink-700',
    border: 'border-pink-200',
    glow: 'hover:shadow-pink-200'
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    light: 'bg-blue-50',
    medium: 'bg-blue-100',
    dark: 'text-blue-700',
    border: 'border-blue-200',
    glow: 'hover:shadow-blue-200'
  },
  purple: {
    gradient: 'from-purple-500 to-violet-500',
    light: 'bg-purple-50',
    medium: 'bg-purple-100',
    dark: 'text-purple-700',
    border: 'border-purple-200',
    glow: 'hover:shadow-purple-200'
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    light: 'bg-green-50',
    medium: 'bg-green-100',
    dark: 'text-green-700',
    border: 'border-green-200',
    glow: 'hover:shadow-green-200'
  },
  yellow: {
    gradient: 'from-yellow-500 to-amber-500',
    light: 'bg-yellow-50',
    medium: 'bg-yellow-100',
    dark: 'text-yellow-700',
    border: 'border-yellow-200',
    glow: 'hover:shadow-yellow-200'
  },
  teal: {
    gradient: 'from-teal-500 to-cyan-500',
    light: 'bg-teal-50',
    medium: 'bg-teal-100',
    dark: 'text-teal-700',
    border: 'border-teal-200',
    glow: 'hover:shadow-teal-200'
  },
  ocean: {
    gradient: 'from-blue-400 to-cyan-400',
    light: 'bg-blue-50',
    medium: 'bg-blue-100',
    dark: 'text-blue-700',
    border: 'border-blue-200',
    glow: 'hover:shadow-blue-200'
  }
};

export default function GradeCard({ grade }: GradeCardProps) {
  const colors = colorConfig[grade.color as keyof typeof colorConfig] || colorConfig.blue;

  return (
    <Link href={`/grades/${grade.id}`}>
      <div className={`bg-white rounded-3xl shadow-xl ${colors.border} border-2 overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full flex flex-col ${colors.glow} hover:shadow-2xl`}>
        
        {/* Header with Animated Gradient */}
        <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-4xl animate-bounce-gentle">{grade.icon}</div>
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-bold border border-white/40">
                {grade.topics.length} TOPICS
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2 drop-shadow-lg">{grade.title}</h3>
            <p className="text-white/90 font-medium text-sm">{grade.description}</p>
          </div>
        </div>
        
        {/* Content with Fun Icons */}
        <div className="p-6 flex-grow bg-gradient-to-br from-white to-gray-50">
          <div className="space-y-4 mb-4">
            {grade.topics.slice(0, 3).map((topic, index) => (
              <div key={index} className="flex items-center group/item">
                <div className={`w-8 h-8 rounded-full ${colors.light} flex items-center justify-center mr-3 group-hover/item:scale-125 transition-transform duration-300`}>
                  <div className={`w-3 h-3 rounded-full ${colors.dark}`}></div>
                </div>
                <span className="text-gray-800 font-semibold text-sm leading-tight group-hover/item:text-gray-900 transition-colors">
                  {topic.title}
                </span>
              </div>
            ))}
            {grade.topics.length > 3 && (
              <div className="flex items-center text-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-lg">✨</span>
                </div>
                <span className="text-sm font-medium">
                  +{grade.topics.length - 3} more magical topics!
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Animated Footer */}
        <div className="px-6 pb-6 bg-gradient-to-br from-white to-gray-50">
          <div className={`${colors.light} rounded-2xl p-4 text-center group-hover:${colors.medium} transition-all duration-300 border-2 ${colors.border} group-hover:scale-105`}>
            <span className={`font-black text-sm ${colors.dark} flex items-center justify-center space-x-2`}>
              <span>Start Adventure!</span>
              <span className="group-hover:translate-x-1 transition-transform">🚢</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}