// app/exercises/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { gradeLevels } from '@/data/syllabus';
import ResponsiveAd from '@/components/ResponsiveAd';
import SearchExercises from '@/components/SearchExercises';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';

// Extract all unique categories across all grades
const allCategories = Array.from(
  new Set(
    gradeLevels.flatMap(grade => 
      grade.topics.map(topic => topic.category)
    )
  )
).sort();

// Get topic counts by category
const getTopicCountByCategory = (category: string) => {
  return gradeLevels.reduce((count, grade) => {
    return count + grade.topics.filter(topic => topic.category === category).length;
  }, 0);
};

// Get all topics for search
const getAllTopicsForSearch = () => {
  return gradeLevels.flatMap(grade => 
    grade.topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      emoji: topic.emoji,
      category: topic.category,
      difficulty: topic.difficulty,
      grade: grade.title,
      gradeId: grade.id,
      gradeIcon: grade.icon
    }))
  );
};

export const metadata: Metadata = {
  title: 'Math Exercises by Topic | CoolMathsZone',
  description: 'Browse and search math exercises across all grade levels. Find multiplication, fractions, geometry, and more!',
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What types of math exercises are available?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We offer a wide range of math exercises covering numbers, arithmetic, geometry, multiplication, division, fractions, decimals, money math, time, measurement, data analysis, patterns, logic, algebra, ratios, commercial math, and problem-solving across all grade levels from Kindergarten to Grade 7.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How can I find exercises for a specific math topic?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'You can browse exercises by category using our category grid, search for specific topics using the search bar, filter by grade level, or explore popular topics like multiplication, fractions, and geometry that are prominently featured on the page.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are the exercises organized by difficulty level?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, all exercises are categorized by difficulty levels (beginner, intermediate, advanced) and organized by grade level to ensure age-appropriate challenges. Each exercise clearly indicates its difficulty to help students choose the right practice material.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I search for exercises across all grade levels?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Absolutely! Our search functionality allows you to find exercises across all grade levels simultaneously. This is perfect for students who want to review previous concepts or challenge themselves with more advanced topics.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How many math exercises are available in total?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `We currently offer ${gradeLevels.reduce((total, grade) => total + grade.topics.length, 0)} unique math topics across ${gradeLevels.length} grade levels, with multiple exercises available for each topic to provide comprehensive practice and mastery.`
          }
        },
        {
          '@type': 'Question',
          'name': 'Are the exercises interactive and engaging?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, all our math exercises are designed to be interactive and engaging with visual aids, emojis, step-by-step hints, and multiple question formats to make learning math fun and effective for students of all ages.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do you cover all major math categories?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `We cover ${allCategories.length} major math categories including ${allCategories.slice(0, 5).join(', ')}${allCategories.length > 5 ? ' and more' : ''}. Our comprehensive curriculum ensures students get well-rounded math practice across all essential mathematical domains.`
          }
        },
        {
          '@type': 'Question',
          'name': 'How often are new exercises added?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We regularly update our exercise library with new topics, problems, and interactive content to keep the learning experience fresh and aligned with educational standards and student needs.'
          }
        }
      ]
    })
  }
};

export default function ExercisesPage() {
  const allTopics = getAllTopicsForSearch();
  const totalExercises = gradeLevels.reduce((total, grade) => total + grade.topics.length, 0);

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
            <span className="text-6xl mr-4">🎣</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">Math Exercises</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Browse math exercises by topic across all grade levels. Find exactly what you want to practice!
          </p>
        </div>

        {/* Ad after header */}
        <div className="mb-12">
          <ResponsiveAd position="hero" />
        </div>

        {/* Search Component (Client-side) */}
        <SearchExercises allTopics={allTopics} />

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {allCategories.map((category) => (
            <Link 
              key={category} 
              href={`/exercises/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <ContentCard className="p-4 text-center hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-2">
                  {getCategoryEmoji(category)}
                </div>
                <h3 className="font-semibold text-white mb-1 capitalize">
                  {category.replace(/-/g, ' ')}
                </h3>
                <p className="text-white/60 text-sm">
                  {getTopicCountByCategory(category)} exercises
                </p>
              </ContentCard>
            </Link>
          ))}
        </div>

        {/* Popular Topics */}
        <ContentCard className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🌟 Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'multiplication', name: 'Multiplication', count: getTopicCountByCategory('multiplication') },
              { category: 'fractions', name: 'Fractions', count: getTopicCountByCategory('fractions') },
              { category: 'geometry', name: 'Geometry', count: getTopicCountByCategory('geometry') },
              { category: 'algebra', name: 'Algebra', count: getTopicCountByCategory('algebra') },
              { category: 'money', name: 'Money Math', count: getTopicCountByCategory('money') },
              { category: 'problem-solving', name: 'Word Problems', count: getTopicCountByCategory('problem-solving') },
            ].map((topic) => (
              <Link 
                key={topic.category}
                href={`/exercises/category/${topic.category}`}
                className="block"
              >
                <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">{topic.name}</span>
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                      {topic.count} exercises
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    Across {gradeLevels.filter(grade => 
                      grade.topics.some(t => t.category === topic.category)
                    ).length} grade levels
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ContentCard>

        {/* Browse by Grade */}
        <ContentCard className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">📚 Browse by Grade Level</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {gradeLevels.map((grade) => (
              <Link 
                key={grade.id}
                href={`/grades/${grade.id}`}
                className="text-center group"
              >
                <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="text-2xl mb-2">{grade.icon}</div>
                  <div className="text-white font-semibold text-sm">{grade.title}</div>
                  <div className="text-white/60 text-xs mt-1">
                    {grade.topics.length} topics
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ContentCard>

        {/* Quick Stats */}
        <ContentCard className="p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">📊 Exercise Library Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold text-white">{totalExercises}</div>
              <div className="text-white/70 text-sm">Total Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{gradeLevels.length}</div>
              <div className="text-white/70 text-sm">Grade Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{allCategories.length}</div>
              <div className="text-white/70 text-sm">Math Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{Math.max(...gradeLevels.map(g => g.topics.length))}</div>
              <div className="text-white/70 text-sm">Most in One Grade</div>
            </div>
          </div>
        </ContentCard>

        {/* Ad before end */}
        <div className="mt-12">
          <ResponsiveAd position="footer" />
        </div>
      
      </div>
    </PageContainer>
  );
}

// Helper function to get emojis for categories
function getCategoryEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    'numbers': '🔢',
    'arithmetic': '➕',
    'geometry': '🔺',
    'multiplication': '✖️',
    'division': '➗',
    'fractions': '½',
    'decimals': '0.5',
    'money': '💰',
    'time': '⏰',
    'measurement': '📏',
    'data': '📊',
    'patterns': '🎭',
    'logic': '🤔',
    'algebra': '📝',
    'ratios': '🔄',
    'commercial-math': '🏪',
    'problem-solving': '🎯'
  };
  
  return emojiMap[category] || '📚';
}