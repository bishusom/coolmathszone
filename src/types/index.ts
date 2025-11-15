// src/types/index.ts
export interface Topic {
  id: string;
  title: string;
  description: string;
  emoji: string; // Add this line
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  subtopics: string[];
}

export interface GradeLevel {
  id: string;
  title: string;
  age: number;
  description: string;
  color: string;
  icon: string;
  topics: Topic[];
}