export type GameMode = 'counting' | 'comparison' | 'shapes' | 'measurement' | 'addition' | 'subtraction';

export interface GameConfig {
  mode: GameMode;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  questions: number;
}

export interface GameQuestion {
  id: string;
  type: GameMode;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  image?: string;
  hint?: string;
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number;
  stars: 1 | 2 | 3;
}