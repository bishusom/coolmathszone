// app/grades/[grade]/[topic]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GradesFramework from '@/components/framework/GradesFrameWork';
import { generateFirstExercise, generatePrimaryFirstExercise } from '@/utils/exerciseGenerators/index';
import { getAllGradeLevels, getGradeLevel, getTopic, isValidGrade, isValidTopic } from '@/utils/gradeHelpers';
import { checkMoneyTopic } from '@/utils/topichelper';
import type { ExerciseTemplate } from '@/utils/exerciseGenerators/grades';

interface PageProps {
  params: Promise<{
    grade: string;
    topic: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade, topic } = await params;
  
  const gradeLevel = getGradeLevel(grade);
  const topicData = getTopic(grade, topic);

  if (!gradeLevel || !topicData) {
    return {
      title: 'Topic Not Found'
    };
  }

  // Enhanced FAQ Schema for topic page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is ${topicData.title} in ${gradeLevel.title} math?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': topicData.description || `${topicData.title} is a fundamental math concept taught in ${gradeLevel.title} that helps students develop essential mathematical skills through interactive exercises and practice problems.`
        }
      },
      {
        '@type': 'Question',
        'name': `What type of exercises are included in ${topicData.title} practice?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Our ${topicData.title} exercises include multiple-choice questions, interactive problems, visual aids, and step-by-step hints designed to make learning engaging and effective for ${gradeLevel.title} students.`
        }
      },
      {
        '@type': 'Question',
        'name': `How difficult is the ${topicData.title} content for ${gradeLevel.title}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `This topic is rated as ${topicData.difficulty} difficulty level, making it ${topicData.difficulty === 'beginner' ? 'perfect for students starting to learn this concept' : topicData.difficulty === 'intermediate' ? 'suitable for students with some prior knowledge' : 'challenging for students ready for advanced problems'}.`
        }
      },
      {
        '@type': 'Question',
        'name': 'Are hints available if I get stuck on an exercise?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! Every exercise includes helpful hints and step-by-step guidance to support learning. We encourage students to try solving problems first, then use hints when needed to understand the concepts better.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How does this topic align with educational standards?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Our ${topicData.title} content is carefully designed to align with common core and state educational standards for ${gradeLevel.title}, ensuring students learn age-appropriate and curriculum-relevant mathematical concepts.`
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I track my progress in this topic?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'While we focus on immediate practice and learning, each session helps build mathematical proficiency. Regular practice with our interactive exercises reinforces understanding and builds confidence in this topic.'
        }
      }
    ]
  };

  return {
    title: `${topicData.title} - ${gradeLevel.title} | CoolMathsZone`,
    description: topicData.description || `Practice ${topicData.title} with interactive exercises for ${gradeLevel.title} students.`,
    alternates: {
      canonical: `https://coolmathszone.com/grades/${gradeLevel.id}/${topicData.id}`,
    },
    other: {
      'script:ld+json': JSON.stringify(faqSchema)
    }
  };
}

export default async function TopicPage({ params, searchParams }: PageProps) {
  const { grade, topic } = await params;
  const searchParamsObj = await searchParams;
  const currencyCode = searchParamsObj.currency as string;

  // Validate grade and topic using helper
  if (!isValidGrade(grade) || !isValidTopic(grade, topic)) {
    notFound();
  }

  try {
    const isMoneyTopic = checkMoneyTopic(grade, topic);
    
    const firstExercise = ['kindergarten', 'grade1', 'grade2'].includes(grade)
      ? await generateFirstExercise(grade, topic, isMoneyTopic ? currencyCode : undefined)
      : await generatePrimaryFirstExercise(grade, topic, isMoneyTopic ? currencyCode : undefined);
    
    return <GradesFramework grade={grade as any} topic={topic} initialExercise={firstExercise} />;
  } catch (error) {
    console.error('Error generating first exercise:', error);
    const fallbackExercise: ExerciseTemplate = {
      id: 'fallback-exercise',
      type: 'multiple-choice',
      question: 'Welcome to your math practice! Click the buttons to get started.',
      options: ['Start', 'Learning', 'Math', 'Fun'],
      correctAnswer: 'Start',
      hints: ['Click any option to begin your practice session!'],
      visualAid: '🌟'
    };
    return <GradesFramework grade={grade as any} topic={topic} initialExercise={fallbackExercise} />;
  }
}

// Generate static params
export async function generateStaticParams() {
  const gradeLevels = getAllGradeLevels();
  const params: { grade: string; topic: string }[] = [];

  gradeLevels.forEach(gradeLevel => {
    gradeLevel.topics.forEach(topic => {
      params.push({
        grade: gradeLevel.id,
        topic: topic.id
      });
    });
  });

  return params;
}