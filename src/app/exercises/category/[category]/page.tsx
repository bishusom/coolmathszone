// app/exercises/category/[category]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';
import { gradeLevels } from '@/data/syllabus';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// Map URL-friendly category names to actual category names
const categoryMap: { [key: string]: string } = {
  'multiplication': 'multiplication',
  'division': 'division',
  'fractions': 'fractions',
  'algebra': 'algebra',
  'geometry': 'geometry',
  'money': 'money',
  'numbers': 'numbers',
  'arithmetic': 'arithmetic',
  'decimals': 'decimals',
  'time': 'time',
  'measurement': 'measurement',
  'data': 'data',
  'patterns': 'patterns',
  'logic': 'logic',
  'ratios': 'ratios',
  'commercial-math': 'commercial-math',
  'problem-solving': 'problem-solving'
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const actualCategory = categoryMap[category];
  
  if (!actualCategory) {
    return {
      title: 'Category Not Found | CoolMathsZone'
    };
  }

  // Get all topics for this category for FAQ
  const categoryTopics = gradeLevels.flatMap(grade => 
    grade.topics.filter(topic => topic.category === actualCategory)
  );

  const categoryName = actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1).replace(/-/g, ' ');
  
  // Get grade levels count by checking which grades have this category
  const gradeLevelsWithCategory = gradeLevels.filter(grade => 
    grade.topics.some(topic => topic.category === actualCategory)
  );
  const gradeLevelsCount = gradeLevelsWithCategory.length;
  
  const difficultyLevels = Array.from(new Set(categoryTopics.map(t => t.difficulty)));

  // FAQ Schema for category page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is ${categoryName} in mathematics?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${categoryName} is a fundamental mathematical concept that ${getCategoryDescription(actualCategory)}. Our exercises help students master this important area through interactive practice and real-world applications.`
        }
      },
      {
        '@type': 'Question',
        'name': `Which grade levels include ${categoryName} exercises?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `We offer ${categoryName} exercises across ${gradeLevelsCount} grade levels, from ${getGradeRange(gradeLevelsWithCategory)}. Each grade level presents age-appropriate challenges that build upon previous knowledge.`
        }
      },
      {
        '@type': 'Question',
        'name': `What difficulty levels are available for ${categoryName} exercises?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Our ${categoryName} exercises cover ${difficultyLevels.length} difficulty levels: ${difficultyLevels.map(level => level.charAt(0).toUpperCase() + level.slice(1)).join(' and ')}. This allows students to progress from basic understanding to advanced application.`
        }
      },
      {
        '@type': 'Question',
        'name': `How many ${categoryName} exercises are available?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `We currently offer ${categoryTopics.length} unique ${categoryName.toLowerCase()} exercises, with multiple practice problems available for each topic to ensure comprehensive mastery.`
        }
      },
      {
        '@type': 'Question',
        'name': `Are ${categoryName} exercises interactive?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Yes! All our ${categoryName} exercises are designed to be interactive and engaging, featuring visual aids, step-by-step hints, immediate feedback, and multiple question formats to make learning effective and enjoyable.`
        }
      },
      {
        '@type': 'Question',
        'name': `How does ${categoryName} relate to real-world applications?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${categoryName} has numerous real-world applications ${getRealWorldApplications(actualCategory)}. Our exercises include practical scenarios to help students understand how these mathematical concepts are used in everyday life.`
        }
      },
      {
        '@type': 'Question',
        'name': `Can students track their progress in ${categoryName}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `While we focus on immediate practice and learning, students can work through exercises systematically by grade level and difficulty. Regular practice with our ${categoryName} exercises builds confidence and mathematical proficiency.`
        }
      },
      {
        '@type': 'Question',
        'name': `What are the benefits of practicing ${categoryName} regularly?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Regular practice of ${categoryName} helps develop ${getBenefits(actualCategory)}. These skills are essential for academic success and practical problem-solving in daily life.`
        }
      }
    ]
  };

  return {
    title: `${categoryName} Exercises | CoolMathsZone`,
    description: `Math exercises for ${categoryName} across all grade levels. ${categoryTopics.length} interactive exercises available for ${gradeLevelsCount} grade levels.`,
    alternates: {
      canonical: `https://coolmathszone.com/exercises/category/${categoryName.toLowerCase()}`
    },
    other: {
      'script:ld+json': JSON.stringify(faqSchema)
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const actualCategory = categoryMap[category];

  if (!actualCategory) {
    notFound();
  }

  // Get all topics for this category across all grades
  const categoryTopics = gradeLevels.flatMap(grade => 
    grade.topics
      .filter(topic => topic.category === actualCategory)
      .map(topic => ({
        ...topic,
        grade: grade.title,
        gradeId: grade.id,
        gradeIcon: grade.icon,
        gradeColor: grade.color
      }))
  ).sort((a, b) => {
    // Sort by grade level (kindergarten to grade 7)
    const gradeOrder = ['kindergarten', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7', 'grade8'];
    return gradeOrder.indexOf(a.gradeId) - gradeOrder.indexOf(b.gradeId);
  });

  if (categoryTopics.length === 0) {
    notFound();
  }

  const categoryName = actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1).replace(/-/g, ' ');
  const gradeLevelsWithCategory = gradeLevels.filter(grade => 
    grade.topics.some(topic => topic.category === actualCategory)
  );
  const gradeLevelsCount = gradeLevelsWithCategory.length;
  const difficultyLevels = Array.from(new Set(categoryTopics.map(t => t.difficulty)));

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-4 mb-6">
            <Link href="/" className="inline-block">
              <MagicButton className="text-sm">
                𓇼 Home
              </MagicButton>
            </Link>
            <Link href="/exercises" className="inline-block">
              <MagicButton className="text-sm">
                🏋️ All Exercises
              </MagicButton>
            </Link>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">{getCategoryEmoji(actualCategory)}</span>
            <div>
              <h1 className="text-5xl font-black text-white mb-2">{categoryName} Exercises</h1>
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explore {categoryName.toLowerCase()} exercises across {gradeLevelsCount} grade levels and {difficultyLevels.length} difficulty levels
          </p>
        </div>

        {/* Exercises by Grade Level */}
        <div className="space-y-8">
          {gradeLevels
            .filter(grade => grade.topics.some(topic => topic.category === actualCategory))
            .map((grade) => (
              <div key={grade.id}>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <span className="text-3xl mr-3">{grade.icon}</span>
                  {grade.title} {categoryName}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grade.topics
                    .filter(topic => topic.category === actualCategory)
                    .map((topic) => (
                      <ContentCard 
                        key={topic.id}
                        className="p-4 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-start mb-3">
                          <span className="text-3xl mr-3">{topic.emoji}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg mb-1">{topic.title}</h3>
                            <p className="text-white/70 text-sm">{topic.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            topic.difficulty === 'beginner' 
                              ? 'bg-green-500/20 text-green-300' 
                              : topic.difficulty === 'intermediate'
                              ? 'bg-purple-500/20 text-white'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {topic.difficulty}
                          </span>
                          
                          <Link href={`/grades/${grade.id}/${topic.id}`}>
                            <MagicButton className="text-xs py-1 px-3">
                              Practice →
                            </MagicButton>
                          </Link>
                        </div>
                      </ContentCard>
                    ))}
                </div>
              </div>
            ))}
        </div>

        {/* Quick Stats */}
        <ContentCard className="p-6 mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-bold text-white">{categoryTopics.length}</div>
              <div className="text-white/70">Total Exercises</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {gradeLevelsCount}
              </div>
              <div className="text-white/70">Grade Levels</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {difficultyLevels.length}
              </div>
              <div className="text-white/70">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.max(...gradeLevels.map(grade => 
                  grade.topics.filter(topic => topic.category === actualCategory).length
                ))}
              </div>
              <div className="text-white/70">Most in One Grade</div>
            </div>
          </div>
        </ContentCard>

        {/* Learning Tips for this Category */}
        <ContentCard className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">💡 {categoryName} Learning Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getLearningTips(actualCategory).map((tip, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">{tip.title}</h4>
                <p className="text-white/70 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* Related Categories */}
        <ContentCard className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🔗 Related Categories</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {getRelatedCategories(actualCategory).map(relatedCategory => (
              <Link 
                key={relatedCategory}
                href={`/exercises/category/${relatedCategory}`}
                className="bg-white/10 text-white/80 hover:text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors"
              >
                {getCategoryDisplayName(relatedCategory)}
              </Link>
            ))}
          </div>
        </ContentCard>
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

// Helper function to get related categories (returns URL-friendly slugs)
function getRelatedCategories(category: string): string[] {
  const relatedMap: { [key: string]: string[] } = {
    'multiplication': ['division', 'arithmetic', 'numbers'],
    'division': ['multiplication', 'arithmetic', 'fractions'],
    'fractions': ['decimals', 'ratios', 'algebra'],
    'algebra': ['arithmetic', 'problem-solving', 'numbers'],
    'geometry': ['measurement', 'patterns', 'logic'],
    'money': ['commercial-math', 'decimals', 'arithmetic'],
    'numbers': ['arithmetic', 'algebra', 'measurement'],
    'arithmetic': ['numbers', 'problem-solving', 'algebra'],
    'decimals': ['fractions', 'money', 'numbers'],
    'time': ['measurement', 'money', 'problem-solving'],
    'measurement': ['geometry', 'numbers', 'data'],
    'data': ['measurement', 'logic', 'patterns'],
    'patterns': ['logic', 'algebra', 'geometry'],
    'logic': ['problem-solving', 'patterns', 'data'],
    'ratios': ['fractions', 'algebra', 'commercial-math'],
    'commercial-math': ['money', 'ratios', 'decimals'],
    'problem-solving': ['logic', 'arithmetic', 'algebra']
  };
  
  return relatedMap[category] || ['arithmetic', 'numbers', 'problem-solving'];
}

// Helper function to convert URL slug to display name
function getCategoryDisplayName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to get category description for FAQ
function getCategoryDescription(category: string): string {
  const descriptions: { [key: string]: string } = {
    'multiplication': 'involves repeated addition and helps students understand scaling and groups of numbers',
    'division': 'teaches sharing and grouping concepts, building foundational skills for fractions and ratios',
    'fractions': 'represent parts of a whole and are essential for understanding proportions and percentages',
    'algebra': 'introduces variables and equations to solve problems with unknown quantities',
    'geometry': 'explores shapes, sizes, positions, and properties of space',
    'money': 'practices financial literacy through counting, making change, and understanding currency',
    'numbers': 'builds foundational understanding of counting, place value, and number relationships',
    'arithmetic': 'covers basic operations including addition, subtraction, multiplication, and division',
    'decimals': 'extends place value understanding to include tenths, hundredths, and thousandths',
    'time': 'teaches clock reading, elapsed time, and scheduling concepts',
    'measurement': 'covers length, weight, volume, and unit conversions',
    'data': 'involves collecting, organizing, and interpreting information through graphs and charts',
    'patterns': 'develops logical thinking through sequence recognition and prediction',
    'logic': 'builds reasoning skills through puzzles, deductions, and problem-solving strategies',
    'ratios': 'compares quantities and establishes proportional relationships',
    'commercial-math': 'applies mathematical concepts to business and financial scenarios',
    'problem-solving': 'develops critical thinking through real-world application of multiple math concepts'
  };
  
  return descriptions[category] || 'helps develop essential mathematical thinking and problem-solving skills';
}

// Helper function to get grade range for FAQ
function getGradeRange(gradeLevelsWithCategory: any[]): string {
  const gradeOrder = ['kindergarten', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 'grade7', 'grade8'];
  const sortedGrades = gradeLevelsWithCategory.sort((a, b) => gradeOrder.indexOf(a.id) - gradeOrder.indexOf(b.id));
  
  if (sortedGrades.length === 1) {
    return sortedGrades[0].title;
  }
  
  const firstGrade = sortedGrades[0].title;
  const lastGrade = sortedGrades[sortedGrades.length - 1].title;
  return `${firstGrade} to ${lastGrade}`;
}

// Helper function to get real-world applications
function getRealWorldApplications(category: string): string {
  const applications: { [key: string]: string } = {
    'multiplication': 'such as calculating total costs, area measurements, and scaling recipes',
    'division': 'including sharing items equally, calculating rates, and budgeting',
    'fractions': 'in cooking measurements, financial calculations, and probability',
    'algebra': 'for solving real-life problems with unknown variables and patterns',
    'geometry': 'in construction, design, navigation, and spatial planning',
    'money': 'for everyday shopping, budgeting, saving, and financial decision-making',
    'numbers': 'in counting, ordering, comparing quantities, and basic calculations',
    'arithmetic': 'for daily calculations, shopping, time management, and basic finances',
    'decimals': 'in money calculations, scientific measurements, and statistical data',
    'time': 'for scheduling, planning activities, and understanding duration',
    'measurement': 'in cooking, construction, sports, and scientific experiments',
    'data': 'for interpreting charts, making informed decisions, and understanding trends',
    'patterns': 'in predicting sequences, coding, and recognizing natural rhythms',
    'logic': 'for critical thinking, programming, and strategic planning',
    'ratios': 'in scaling recipes, map reading, and understanding proportions',
    'commercial-math': 'for business calculations, profit analysis, and financial planning',
    'problem-solving': 'across all daily life situations requiring analytical thinking'
  };
  
  return applications[category] || 'across various daily life and professional scenarios';
}

// Helper function to get benefits
function getBenefits(category: string): string {
  const benefits: { [key: string]: string } = {
    'multiplication': 'quick mental calculation skills, pattern recognition, and foundational algebra understanding',
    'division': 'fair sharing concepts, inverse operation understanding, and fraction preparation',
    'fractions': 'proportional reasoning, percentage understanding, and advanced math preparation',
    'algebra': 'abstract thinking, pattern recognition, and problem-solving with variables',
    'geometry': 'spatial awareness, visual thinking, and practical measurement skills',
    'money': 'financial literacy, decimal understanding, and real-world application skills',
    'numbers': 'foundational counting skills, place value understanding, and number sense',
    'arithmetic': 'basic calculation fluency, mental math skills, and everyday problem-solving ability',
    'decimals': 'precision in measurement, money management skills, and scientific thinking',
    'time': 'time management skills, scheduling ability, and understanding duration concepts',
    'measurement': 'precision skills, unit conversion ability, and practical application knowledge',
    'data': 'analytical thinking, graph interpretation skills, and evidence-based decision making',
    'patterns': 'logical reasoning, prediction skills, and sequence recognition ability',
    'logic': 'critical thinking, deductive reasoning, and systematic problem-solving approach',
    'ratios': 'proportional thinking, comparison skills, and rate calculation ability',
    'commercial-math': 'business mathematics understanding, financial planning skills, and economic literacy',
    'problem-solving': 'critical thinking, multiple strategy application, and real-world solution finding'
  };
  
  return benefits[category] || 'critical thinking, logical reasoning, and practical problem-solving abilities';
}

// Helper function to get learning tips for each category
function getLearningTips(category: string): Array<{title: string, description: string}> {
  const tipsMap: { [key: string]: Array<{title: string, description: string}> } = {
    'multiplication': [
      { title: 'Master Times Tables', description: 'Practice multiplication tables regularly to build speed and confidence.' },
      { title: 'Use Visual Groups', description: 'Think of multiplication as equal groups or arrays to understand the concept.' }
    ],
    'fractions': [
      { title: 'Start with Visuals', description: 'Use pizza or pie charts to understand fraction parts and wholes.' },
      { title: 'Practice Equivalents', description: 'Learn how different fractions can represent the same value.' }
    ],
    'geometry': [
      { title: 'Hands-On Learning', description: 'Use physical shapes and measuring tools to understand spatial concepts.' },
      { title: 'Real-World Examples', description: 'Identify geometric shapes in everyday objects around you.' }
    ]
    // Add more category-specific tips as needed
  };
  
  return tipsMap[category] || [
    { title: 'Practice Regularly', description: 'Short, consistent practice sessions are more effective than long, irregular ones.' },
    { title: 'Start with Basics', description: 'Master fundamental concepts before moving to more advanced topics.' }
  ];
}