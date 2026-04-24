// app/grades/layout.tsx
import type { Metadata } from 'next';
import { getAllGradeLevels } from '@/utils/gradeHelpers';

import { getMetadataAlternates } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const allGrades = getAllGradeLevels();
  const totalTopics = allGrades.reduce((total, grade) => total + grade.topics.length, 0);

  return {
    title: `All Grade Levels (${allGrades.length} Grades) - Math Learning Platform`,
    description: `Explore ${allGrades.length} grade levels with ${totalTopics}+ math topics. Interactive courses designed for every age and skill level.`,
    keywords: `math grades, ${allGrades.map(grade => grade.title).join(', ')}, learning levels`,
    openGraph: {
      title: `All Grade Levels - ${allGrades.length} Math Grades`,
      description: `Discover ${allGrades.length} grade levels with interactive math courses`,
      type: 'website',
    },
    alternates: getMetadataAlternates('grades'),
  };
}

export default function GradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}