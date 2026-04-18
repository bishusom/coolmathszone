'use client';

import { useState } from 'react';
import Link from 'next/link';
import GradesFramework from '@/components/framework/GradesFrameWork';
import { PageContainer, ContentCard, MagicButton } from '@/components/ui/PageContainer';
import type { ExerciseTemplate } from '@/utils/exerciseGenerators/grades';

interface TopicLessonContent {
  learning_goal: string;
  prerequisites: string[];
  core_explanation: string;
  key_rules: string[];
  summary: string;
  common_mistakes: string[];
  teaching_tips: string[];
}

interface TopicLessonFlowProps {
  gradeId: string;
  gradeTitle: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string;
  concept: TopicLessonContent | null;
  initialExercise: ExerciseTemplate;
}

export function TopicLessonFlow({
  gradeId,
  gradeTitle,
  topicId,
  topicTitle,
  topicDescription,
  concept,
  initialExercise,
}: TopicLessonFlowProps) {
  const [showPractice, setShowPractice] = useState(false);

  const handlePrimaryCta = () => {
    setShowPractice((current) => {
      const next = !current;
      if (!next) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <Link href={`/grades/${gradeId}`} className="inline-block mb-5">
            <MagicButton className="text-base py-3 px-6">
              𓇼 Back to {gradeTitle}
            </MagicButton>
          </Link>

          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="text-5xl md:text-6xl">📘</span>
            <div className="text-left">
              <p className="text-cyan-200/90 font-semibold uppercase tracking-[0.3em] text-xs md:text-sm mb-2">
                {gradeTitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {topicTitle}
              </h1>
              <div className="mt-3 h-2 w-28 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />
            </div>
          </div>

          <p className="text-white/75 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            {concept?.learning_goal || topicDescription || 'Start with the concept notes below, then practice.'}
          </p>

          <div className="sticky top-4 z-30 mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <MagicButton className="text-base py-3 px-6" onClick={handlePrimaryCta}>
              {showPractice ? '🐚 Back to Concept' : '🌊 Start Practice'}
            </MagicButton>
          </div>
        </div>

        {!showPractice && concept && (
          <ContentCard variant="dark" className="p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Concept Note</h2>
            <div className="space-y-6 text-white/90">
              <section>
                <h3 className="text-lg font-semibold text-cyan-200 mb-2">Learning Goal</h3>
                <p>{concept.learning_goal}</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold text-cyan-200 mb-2">Core Explanation</h3>
                <p>{concept.core_explanation}</p>
              </section>
              {concept.prerequisites.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {concept.prerequisites.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              {concept.key_rules.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">Key Rules</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {concept.key_rules.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              {concept.common_mistakes.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">Common Mistakes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {concept.common_mistakes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              {concept.teaching_tips.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">Teaching Tips</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {concept.teaching_tips.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
              <section>
                <h3 className="text-lg font-semibold text-cyan-200 mb-2">Summary</h3>
                <p>{concept.summary}</p>
              </section>
            </div>
          </ContentCard>
        )}

        {showPractice && (
          <div id="practice-problems">
            <GradesFramework grade={gradeId as any} topic={topicId} initialExercise={initialExercise} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
