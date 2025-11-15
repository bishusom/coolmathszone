// utils/exerciseGenerators/index.ts
import type { ExerciseTemplate, ExerciseSession } from '@/utils/exerciseGenerators/grades';
import { generateQuestionKey } from '@/utils/exerciseGenerators/grades';

// Define the generator function type
type TopicGenerator = (currencyCode?: string) => ExerciseTemplate;

// Define the grade generators interface
interface GradeGenerators {
  [topic: string]: TopicGenerator;
}

// Dynamic imports for each grade level with proper typing
const gradeModules: { [grade: string]: () => Promise<{ [key: string]: GradeGenerators }> } = {
  kindergarten: () => import('@/utils/exerciseGenerators/kindergarten'),
  grade1: () => import('@/utils/exerciseGenerators/grade1'),
  grade2: () => import('@/utils/exerciseGenerators/grade2'),
  grade3: () => import('@/utils/exerciseGenerators/grade3'),
  grade4: () => import('@/utils/exerciseGenerators/grade4'),
  grade5: () => import('@/utils/exerciseGenerators/grade5'),
  grade6: () => import('@/utils/exerciseGenerators/grade6'),
  grade7: () => import('@/utils/exerciseGenerators/grade7'),
  grade8: () => import('@/utils/exerciseGenerators/grade8')
};

// Fallback generator for when topics are not found
function createGenericFallback(index: number): ExerciseTemplate {
  const encouragements = [
    "Great job! Let's try another one!",
    "You're doing amazing! Keep going!",
    "Math practice makes you smarter!",
    "Learning is fun! Try this one:",
    "You've got this! Next challenge:"
  ];
  
  const fallbackQuestions = [
    { q: "What comes next? 2, 4, 6, ?", a: "8", opts: ["6", "7", "8", "9"] },
    { q: "Which shape has 3 sides?", a: "triangle", opts: ["circle", "square", "triangle", "rectangle"] },
    { q: "How many fingers do you have?", a: "10", opts: ["5", "8", "10", "12"] },
    { q: "What is 5 + 3?", a: "8", opts: ["7", "8", "9", "10"] },
    { q: "Which animal says 'meow'?", a: "cat", opts: ["dog", "cat", "cow", "duck"] }
  ];
  
  const selected = fallbackQuestions[index % fallbackQuestions.length];
  
  return {
    id: `encouragement-${Date.now()}-${index}`,
    type: 'multiple-choice',
    question: `${encouragements[index % encouragements.length]} ${selected.q}`,
    options: selected.opts,
    correctAnswer: selected.a,
    hints: ['You can do it!', 'Think carefully!'],
    visualAid: '🌟'
  };
}

// Generate a single exercise (for initial page load)
export async function generateFirstExercise(grade: string, topic: string, currencyCode?: string): Promise<ExerciseTemplate> {
  try {
    console.log(`🔍 generateFirstExercise called for: ${grade}, ${topic}, currency: ${currencyCode}`);
    
    const moduleLoader = gradeModules[grade];
    if (!moduleLoader) {
      console.error(`❌ No module loader found for grade: ${grade}`);
      return createGenericFallback(0);
    }
    
    console.log(`📦 Loading module for grade: ${grade}`);
    const module = await moduleLoader();
    console.log(`✅ Module loaded:`, Object.keys(module));
    
    const gradeGeneratorsKey = `${grade}Generators` as keyof typeof module;
    const gradeGenerators = module[gradeGeneratorsKey] as GradeGenerators | undefined;
    console.log(`🔧 Grade generators:`, gradeGenerators ? Object.keys(gradeGenerators) : 'NOT FOUND');
    
    const topicGenerator = gradeGenerators?.[topic] as TopicGenerator | undefined;
    console.log(`🎯 Topic generator for "${topic}":`, topicGenerator ? 'FOUND' : 'NOT FOUND');
    
    if (topicGenerator) {
      const exercise = topicGenerator(currencyCode); // PASS currencyCode HERE
      console.log(`✅ Exercise generated:`, exercise.question);
      return exercise;
    }
    
    console.error(`❌ Topic generator not found for: ${topic}`);
    return createGenericFallback(0);
  } catch (error) {
    console.error('❌ Error generating first exercise:', error);
    return createGenericFallback(0);
  }
}

// Main session creation function
export function createExerciseSession(): ExerciseSession {
  const usedQuestions = new Set<string>();
  
  return {
    usedQuestions,
    getNextExercise: async (grade: string, topic: string, currencyCode?: string): Promise<ExerciseTemplate | null> => {
      try {
        const moduleLoader = gradeModules[grade];
        if (!moduleLoader) return null;
        
        const module = await moduleLoader();
        const gradeGeneratorsKey = `${grade}Generators` as keyof typeof module;
        const gradeGenerators = module[gradeGeneratorsKey] as GradeGenerators | undefined;
        const topicGenerator = gradeGenerators?.[topic] as TopicGenerator | undefined;
        
        if (!topicGenerator) return null;
        
        // Try up to 100 times to generate a unique question
        for (let attempt = 0; attempt < 100; attempt++) {
          const exercise = topicGenerator(currencyCode); // PASS currencyCode HERE
          const questionKey = generateQuestionKey(exercise, grade, topic);
          
          if (!usedQuestions.has(questionKey)) {
            usedQuestions.add(questionKey);
            console.log(`✅ Generated unique question for ${grade}-${topic}, attempt ${attempt + 1}`);
            return exercise;
          }
        }
        
        console.error(`❌ Could not generate unique question after 100 attempts for ${grade}-${topic}`);
        return null;
      } catch (error) {
        console.error('Error loading exercise generator:', error);
        return null;
      }
    }
  };
}

// Enhanced generateExercises with async support
export async function generateExercises(grade: string, topic: string, count: number = 5, currencyCode?: string): Promise<ExerciseTemplate[]> {
  try {
    const session = createExerciseSession();
    const exercises: ExerciseTemplate[] = [];
    
    for (let i = 0; i < count; i++) {
      const exercise = await session.getNextExercise(grade, topic, currencyCode); // PASS currencyCode HERE
      if (exercise) {
        exercises.push(exercise);
      } else {
        // ... fallback logic remains the same but pass currencyCode to topicGenerator
        try {
          const moduleLoader = gradeModules[grade];
          if (moduleLoader) {
            const module = await moduleLoader();
            const gradeGeneratorsKey = `${grade}Generators` as keyof typeof module;
            const gradeGenerators = module[gradeGeneratorsKey] as GradeGenerators | undefined;
            const topicGenerator = gradeGenerators?.[topic] as TopicGenerator | undefined;
            
            if (topicGenerator) {
              const fallbackExercise = topicGenerator(currencyCode); // PASS currencyCode HERE
              const uniqueId = `fallback-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`;
              const uniqueExercise = {
                ...fallbackExercise,
                id: uniqueId,
                hints: [...fallbackExercise.hints, `Variation ${i + 1}`]
              };
              
              exercises.push(uniqueExercise);
              continue;
            }
          }
        } catch (error) {
          console.error('Error generating fallback exercise:', error);
        }
        
        const ultimateFallback = createGenericFallback(i);
        const ultimateId = `ultimate-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`;
        exercises.push({
          ...ultimateFallback,
          id: ultimateId
        });
      }
    }
    
    console.log(`🎯 Generated ${exercises.length} exercises for ${grade}-${topic}`);
    return exercises;
  } catch (error) {
    console.error('Error generating exercises:', error);
    return Array(count).fill(null).map((_, index) => ({
      ...createGenericFallback(index),
      id: `error-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
    }));
  }
}

// Deterministic first exercise generator for server-side rendering
export async function generatePrimaryFirstExercise(grade: string, topic: string, currencyCode?: string): Promise<ExerciseTemplate> {
  try {
    const exercises = await generateExercises(grade, topic, 1, currencyCode); // PASS currencyCode HERE
    return exercises[0] || createGenericFallback(0);
  } catch (error) {
    console.error('Error generating primary first exercise:', error);
    return createGenericFallback(0);
  }
}

// Utility function to check if a topic exists
export async function topicExists(grade: string, topic: string): Promise<boolean> {
  try {
    const moduleLoader = gradeModules[grade];
    if (!moduleLoader) return false;
    
    const module = await moduleLoader();
    const gradeGeneratorsKey = `${grade}Generators` as keyof typeof module;
    const gradeGenerators = module[gradeGeneratorsKey] as GradeGenerators | undefined;
    const topicGenerator = gradeGenerators?.[topic] as TopicGenerator | undefined;
    return !!topicGenerator;
  } catch (error) {
    return false;
  }
}

// Debug function that returns exercises instead of void
export async function debugExerciseGeneration(grade: string, topic: string, count: number = 5): Promise<ExerciseTemplate[]> {
  console.log(`🔍 DEBUG: Generating ${count} exercises for ${grade}-${topic}`);
  
  const session = createExerciseSession();
  const exercises: ExerciseTemplate[] = [];
  const seenQuestions = new Set<string>();
  let duplicates = 0;
  
  for (let i = 0; i < count; i++) {
    const exercise = await session.getNextExercise(grade, topic);
    if (exercise) {
      const key = generateQuestionKey(exercise, grade, topic);
      if (seenQuestions.has(key)) {
        console.log(`❌ DUPLICATE DETECTED: ${exercise.question}`);
        duplicates++;
        // Still add it but mark as duplicate
        exercises.push({
          ...exercise,
          id: `${exercise.id}-duplicate-${i}`
        });
      } else {
        seenQuestions.add(key);
        console.log(`✅ Unique ${i + 1}: ${exercise.question}`);
        exercises.push(exercise);
      }
    } else {
      console.log(`❌ FAILED to generate exercise ${i + 1}`);
      // Add fallback
      exercises.push({
        ...createGenericFallback(i),
        id: `failed-${Date.now()}-${i}`
      });
    }
  }
  
  console.log(`📊 DEBUG RESULTS: ${exercises.length - duplicates} unique questions, ${duplicates} duplicates out of ${count} attempts`);
  return exercises;
}


// Export helper functions for direct use if needed
export { ensureFourOptions, generateQuestionKey } from '@/utils/exerciseGenerators/grades';