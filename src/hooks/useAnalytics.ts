// src/hooks/useAnalytics.ts
import { 
  trackEvent,
  trackPageView,
  trackExerciseStart,
  trackExerciseCompletion,
  trackAnswerSubmission,
  trackHintUsed,
  trackSessionHeartbeat,
  trackSessionStart,
  trackSessionEnd,
  trackLevelUp,
  trackTopicMastery,
  trackError,
  trackPracticeSetRestart,
  trackTopicSelection,
  trackGameStart,
  trackGameWin,
  trackGameOver,
  trackAuthPromptShown,
  trackAuthSignupStarted,
  trackAuthSignupCompleted
} from '@/utils/analytics';

export const useAnalytics = () => {
  return {
    // Core events
    trackEvent,
    trackPageView,
    
    // Exercise events
    trackExerciseStart,
    trackExerciseCompletion,
    trackAnswerSubmission,
    trackHintUsed,
    
    // Session events
    trackSessionHeartbeat,
    trackSessionStart,
    trackSessionEnd,
    
    // Progress events
    trackLevelUp,
    trackTopicMastery,
    
    // Error events
    trackError,
    
    // Engagement events
    trackPracticeSetRestart,
    trackTopicSelection,

    // Game events
    trackGameStart,
    trackGameWin,
    trackGameOver,

    // Auth funnel events
    trackAuthPromptShown,
    trackAuthSignupStarted,
    trackAuthSignupCompleted
  };
};
