// utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// GA4 Event Tracking
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      app_name: 'CoolMathsZone',
      app_version: '1.0.0'
    });
  }
  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}:`, parameters);
  }
};

// Page Views
export const trackPageView = (pageTitle: string, pageLocation: string) => {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_location: pageLocation
  });
};

// Exercise Events
export const trackExerciseStart = (grade: string, topic: string, exerciseId: string) => {
  trackEvent('exercise_start', {
    grade_level: grade,
    topic_area: topic,
    exercise_id: exerciseId,
    timestamp: new Date().toISOString()
  });
};

export const trackExerciseCompletion = (
  grade: string, 
  topic: string, 
  exerciseId: string, 
  score: number, 
  total: number,
  timeSpent: number
) => {
  const percentage = Math.round((score / total) * 100);
  
  trackEvent('exercise_complete', {
    grade_level: grade,
    topic_area: topic,
    exercise_id: exerciseId,
    score: score,
    total_questions: total,
    percentage_correct: percentage,
    time_spent_seconds: timeSpent,
    performance: percentage >= 80 ? 'excellent' : percentage >= 60 ? 'good' : 'needs_practice'
  });
};

export const trackAnswerSubmission = (
  grade: string,
  topic: string,
  exerciseId: string,
  questionNumber: number,
  isCorrect: boolean,
  responseTime: number
) => {
  trackEvent('answer_submit', {
    grade_level: grade,
    topic_area: topic,
    exercise_id: exerciseId,
    question_number: questionNumber,
    is_correct: isCorrect,
    response_time_ms: responseTime
  });
};

export const trackHintUsed = (grade: string, topic: string, exerciseId: string, questionNumber: number) => {
  trackEvent('hint_used', {
    grade_level: grade,
    topic_area: topic,
    exercise_id: exerciseId,
    question_number: questionNumber
  });
};

// Session Tracking
export const trackSessionHeartbeat = (grade: string, topic: string, timeElapsed: number) => {
  trackEvent('session_heartbeat', {
    grade_level: grade,
    topic_area: topic,
    session_duration: timeElapsed
  });
};

export const trackSessionStart = (grade: string, topic: string) => {
  trackEvent('session_start', {
    grade_level: grade,
    topic_area: topic,
    timestamp: new Date().toISOString()
  });
};

export const trackSessionEnd = (grade: string, topic: string, totalTime: number, exercisesCompleted: number) => {
  trackEvent('session_end', {
    grade_level: grade,
    topic_area: topic,
    total_session_time: totalTime,
    exercises_completed: exercisesCompleted
  });
};

// User Progress Events
export const trackLevelUp = (oldGrade: string, newGrade: string) => {
  trackEvent('level_up', {
    previous_level: oldGrade,
    new_level: newGrade,
    achievement_unlocked: true
  });
};

export const trackTopicMastery = (grade: string, topic: string, masteryPercentage: number) => {
  trackEvent('topic_mastery', {
    grade_level: grade,
    topic_area: topic,
    mastery_percentage: masteryPercentage,
    mastery_status: masteryPercentage >= 90 ? 'mastered' : masteryPercentage >= 70 ? 'proficient' : 'learning'
  });
};

// Error Tracking
export const trackError = (errorType: string, errorMessage: string, context: Record<string, any> = {}) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    ...context
  });
};

// Engagement Events
export const trackPracticeSetRestart = (grade: string, topic: string) => {
  trackEvent('practice_restart', {
    grade_level: grade,
    topic_area: topic
  });
};

export const trackTopicSelection = (grade: string, topic: string) => {
  trackEvent('topic_selected', {
    grade_level: grade,
    topic_area: topic
  });
};