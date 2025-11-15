// components/framework/GradesFramework.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { generateExercises } from '@/utils/exerciseGenerators/index';
import { PageContainer, ContentCard, MagicButton, TextGradient } from '@/components/ui/PageContainer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { checkMoneyTopic } from '@/utils/topichelper';
import { getGradeConfig, getTopicTitle } from '@/utils/gradeHelpers'; 
import { gradeLevels } from '@/data/syllabus'
import type { ExerciseTemplate } from '@/utils/exerciseGenerators/grades';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/utils/currencyHelper'; // ADD THIS IMPORT


type GradeLevelId = typeof gradeLevels[number]['id'];

interface GradesFrameworkProps {
  grade: GradeLevelId;
  topic: string;
  initialExercise: ExerciseTemplate;
}

const bggradient = "gradient-arctic-adventure"
const buttonGradient = "gradient-ocean-blue"
const textGradient = "text-gradient-neon"

// Configuration for timing
const EXERCISE_CONFIG = {
  ERROR_DISPLAY_TIME: 3000,
  SUCCESS_DISPLAY_TIME: 1200,
  TRANSITION_DELAY: 500
};

// Exercise Completion Screen Component
function ExerciseCompletionScreen({ 
  score, 
  onContinue, 
  onNewTopic, 
  onGoHome,
  config 
}: {
  score: { correct: number; total: number };
  onContinue: () => void;
  onNewTopic: () => void;
  onGoHome: () => void;
  config: any;
}) {
  const percentage = (score.correct / score.total) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return 'Perfect! You got all questions right! 🎉';
    if (percentage >= 80) return 'Excellent work! You\'re doing great! 🌟';
    if (percentage >= 60) return 'Good job! Keep practicing! 👍';
    return 'Nice try! Practice makes perfect! 💪';
  };

  const getEmoji = () => {
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '⭐';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  return (
    <ContentCard className="p-8 mb-6 text-center" variant="solid">
      <div className="text-8xl mb-6 animate-bounce">
        {getEmoji()}
      </div>
      
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        Practice Complete!
      </h2>
      
      <div className="score-display mb-6">
        <div className="text-2xl font-semibold text-gray-700 mb-2">
          Your Score: {score.correct}/{score.total} ({Math.round(percentage)}%)
        </div>
        <div className="text-xl text-gray-600 mb-4">
          {getMessage()}
        </div>
        
        {/* Progress bar visualization */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ${
              percentage === 100 ? 'bg-gradient-to-r from-green-500 to-green-600' :
              percentage >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
              percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-orange-500 to-orange-600'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <MagicButton
          onClick={onContinue}
          gradient="gradient-mermaid-lagoon"
        >
          🔄 Practice Again
        </MagicButton>
        <Link href={`/grades/${config.title.toLowerCase().replace(' ', '')}`}>
          <MagicButton>
            🥟 Try Another Topic
          </MagicButton>
        </Link>
        <Link href="/">
          <MagicButton>
            𓇼 Go Home
          </MagicButton>
        </Link>
      </div>
    </ContentCard>
  );
}

export default function GradesFramework({ 
  grade, 
  topic, 
  initialExercise 
}: GradesFrameworkProps) {
  const [exercises, setExercises] = useState<ExerciseTemplate[]>([initialExercise]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showCompletion, setShowCompletion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(DEFAULT_CURRENCY); // ADD CURRENCY STATE
  
  // Analytics
  const analytics = useAnalytics();
  const sessionStartTime = useRef<Date>(new Date());
  const exerciseStartTime = useRef<Date>(new Date());
  const sessionHeartbeatInterval = useRef<NodeJS.Timeout | null>(null);

  // USE HELPER FUNCTIONS instead of hardcoded objects
  const config = getGradeConfig(grade);
  const topicTitle = getTopicTitle(grade, topic);

  const isEarlyGrade = ['kindergarten', 'grade1', 'grade2'].includes(grade);
  const exerciseCount = isEarlyGrade ? 5 : 10;

  // Check if this topic uses currency (money-related topics)
  const isMoneyTopic = checkMoneyTopic(grade, topic);

  useEffect(() => {
    setIsClient(true);
    
    // Load exercises asynchronously
    const loadExercises = async () => {
      setIsLoading(true);
      try {
        // PASS currencyCode to generateExercises for money topics
        const fullExercises = await generateExercises(
          grade, 
          topic, 
          exerciseCount,
          isMoneyTopic ? selectedCurrency : undefined // ADD THIS
        );
        
        setExercises(fullExercises);
        
        // Track session start
        analytics.trackSessionStart(grade, topic);
        analytics.trackTopicSelection(grade, topic);

        // Track first exercise start
        analytics.trackExerciseStart(grade, topic, fullExercises[0]?.id || 'unknown');
      } catch (error) {
        console.error('Error loading exercises:', error);
        // Fallback to initial exercise if loading fails
        setExercises([initialExercise]);
      } finally {
        setIsLoading(false);
      }
    };

    loadExercises();

    // Set up session heartbeat
    sessionHeartbeatInterval.current = setInterval(() => {
      const timeElapsed = Math.floor((new Date().getTime() - sessionStartTime.current.getTime()) / 1000);
      analytics.trackSessionHeartbeat(grade, topic, timeElapsed);
    }, 30000);

    return () => {
      if (sessionHeartbeatInterval.current) {
        clearInterval(sessionHeartbeatInterval.current);
      }
      const totalTime = Math.floor((new Date().getTime() - sessionStartTime.current.getTime()) / 1000);
      analytics.trackSessionEnd(grade, topic, totalTime, currentExercise);
    };
  }, [grade, topic, exerciseCount, selectedCurrency]);

  useEffect(() => {
    if (currentExercise > 0 && exercises[currentExercise]) {
      exerciseStartTime.current = new Date();
      analytics.trackExerciseStart(grade, topic, exercises[currentExercise].id);
    }
  }, [currentExercise, exercises]);

  const handleAnswer = (selectedOption: string) => {
    setSelectedAnswer(selectedOption);
    const responseTime = new Date().getTime() - exerciseStartTime.current.getTime();
    const isCorrect = selectedOption === exercises[currentExercise].correctAnswer;

    analytics.trackAnswerSubmission(
      grade,
      topic,
      exercises[currentExercise].id,
      currentExercise + 1,
      isCorrect,
      responseTime
    );

    // Use different timeout based on correctness
    const displayTime = isCorrect ? EXERCISE_CONFIG.SUCCESS_DISPLAY_TIME : EXERCISE_CONFIG.ERROR_DISPLAY_TIME;

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }
      
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setShowHint(false);
        setSelectedAnswer(null);
        setUserInput('');
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        const totalTime = Math.floor((new Date().getTime() - sessionStartTime.current.getTime()) / 1000);
        
        analytics.trackExerciseCompletion(
          grade,
          topic,
          exercises[currentExercise].id,
          finalScore,
          exercises.length,
          totalTime
        );

        if (finalScore / exercises.length >= 0.8) {
          analytics.trackTopicMastery(grade, topic, (finalScore / exercises.length) * 100);
        }

        // Show completion screen instead of auto-restarting
        setShowCompletion(true);
      }
    }, displayTime);
  };

  const handleInputSubmit = () => {
    if (userInput.trim()) {
      handleAnswer(userInput.trim());
    }
  };

  const handleHintClick = () => {
    setShowHint(!showHint);
    if (!showHint) {
      analytics.trackHintUsed(grade, topic, exercises[currentExercise].id, currentExercise + 1);
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    setShowCompletion(false);
    setCurrentExercise(0);
    setScore(0);
    setShowHint(false);
    setSelectedAnswer(null);
    setUserInput('');
    
    try {
      // PASS currencyCode to generateExercises for money topics
      const newExercises = await generateExercises(
        grade, 
        topic, 
        exerciseCount,
        isMoneyTopic ? selectedCurrency : undefined // ADD THIS
      );
      
      setExercises(newExercises);
      analytics.trackPracticeSetRestart(grade, topic);
    } catch (error) {
      console.error('Error generating new exercises:', error);
      // Fallback to initial exercise
      setExercises([initialExercise]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    // Currency change will trigger the useEffect to reload exercises
  };

  const handleNewTopic = () => {
    // Navigation will be handled by the Link component
  };

  const handleGoHome = () => {
    // Navigation will be handled by the Link component
  };

  const currentEx = exercises[currentExercise];

  if (!isClient || isLoading) {
    return (
      <PageContainer gradient={bggradient}>
        <div className="container mx-auto px-4 py-8">
          <NavBar grade={grade} topic={topic} config={config} topicTitle={topicTitle} />
          <ContentCard className="p-8 mb-6 text-center" variant="solid">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl animate-pulse">🌊</div>
              <h2 className="text-2xl font-bold text-gray-700">
                {isLoading ? 'Loading new exercises...' : 'Getting ready...'}
              </h2>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </ContentCard>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer gradient={bggradient}>
      <div className="container mx-auto px-4 py-8">
        <NavBar 
          grade={grade} 
          topic={topic} 
          config={config} 
          topicTitle={topicTitle}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
          isMoneyTopic={isMoneyTopic}
        />
        
        {/* Progress */}
        <ContentCard className="p-6 mb-6">
          <div className="flex items-center justify-between text-white">
            <div className="text-lg font-bold">
              {isEarlyGrade ? 'Exercise' : 'Challenge'} {currentExercise + 1} of {exercises.length}
            </div>
            <div className="flex-1 mx-6">
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${buttonGradient} transition-all duration-500`}
                  style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-lg font-bold">
              Score: <TextGradient gradient={textGradient}>{score}</TextGradient>
            </div>
          </div>
        </ContentCard>

        {/* Exercise Card or Completion Screen */}
        {showCompletion ? (
          <ExerciseCompletionScreen
            score={{ correct: score, total: exercises.length }}
            onContinue={handleContinue}
            onNewTopic={handleNewTopic}
            onGoHome={handleGoHome}
            config={config}
          />
        ) : (
          <ExerciseContent 
            exercise={currentEx} 
            selectedAnswer={selectedAnswer}
            userInput={userInput}
            onInputChange={setUserInput}
            onInputSubmit={handleInputSubmit}
            onAnswer={handleAnswer}
            showHint={showHint}
            onHintClick={handleHintClick}
            config={config}
          />
        )}

        {/* Navigation */}
        {!showCompletion && (
          <ContentCard className="p-6">
            <div className="flex justify-center space-x-4">
              <Link href={`/grades/${grade}`}>
                <MagicButton>
                  ← {config.emoji} Back to {config.title}
                </MagicButton>
              </Link>
              <MagicButton
                onClick={handleContinue}
                gradient={buttonGradient}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : '🔄 New Practice Set'}
              </MagicButton>
            </div>
          </ContentCard>
        )}
      </div>
    </PageContainer>
  );
}

// Exercise Content Component
function ExerciseContent({ 
  exercise, 
  selectedAnswer, 
  userInput, 
  onInputChange, 
  onInputSubmit, 
  onAnswer, 
  showHint, 
  onHintClick, 
  config,
  isInteractive = true 
}: any) {
  const isCorrect = selectedAnswer === exercise.correctAnswer;
  const showFeedback = selectedAnswer !== null;

  // Visual aid rendering helper
  const renderVisualAid = (visualAid: string) => {
    if (visualAid.startsWith('data:')) {
      // It's a Data URL (like clock SVG), render as image
      return (
        <div className="text-center mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-gray-100 shadow-lg">
          <img 
            src={visualAid} 
            alt="Visual aid"
            className="mx-auto max-w-full h-auto"
            style={{ maxHeight: '200px' }}
          />
        </div>
      );
    }
    
    // Regular emoji/text content
    return (
      <div className="text-8xl text-center mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-gray-100 shadow-lg">
        {visualAid}
      </div>
    );
  };

  return (
    <ContentCard className="p-8 mb-6" variant="solid">
      {/* Visual Aid */}
      {exercise.visualAid && (
        renderVisualAid(exercise.visualAid)
      )}
      
      {/* Question */}
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 leading-tight">
        {exercise.question}
      </h2>

      {/* Rest of the component remains the same */}
      {/* Feedback Section */}
      {showFeedback && (
        <div className={`mb-6 p-6 rounded-2xl border-2 ${
          isCorrect 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        } transition-all duration-500`}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className={`text-4xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '🎉' : '💡'}
            </div>
            <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Excellent!' : 'Let\'s Review'}
            </h3>
          </div>
          
          <div className="text-center">
            <p className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'} mb-3`}>
              {isCorrect ? (
                <span>
                  <span className="font-bold">Perfect!</span> You got it right! 
                  {exercise.question.includes('=') && ` ${exercise.question.split('=')[0].trim()} = ${exercise.correctAnswer}`}
                </span>
              ) : (
                <span>
                  <span className="font-bold">Good try!</span> The correct answer is <span className="font-bold text-blue-600">{exercise.correctAnswer}</span>
                </span>
              )}
            </p>
            
            {/* Additional explanation for wrong answers */}
            {!isCorrect && exercise.hints && exercise.hints.length > 1 && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm">
                  <span className="font-bold">Tip:</span> {exercise.hints[1] || exercise.hints[0]}
                </p>
              </div>
            )}
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>{isCorrect ? 'You\'re mastering this!' : 'Keep practicing - you\'ll get it!'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Choice Options */}
      {exercise.type === 'multiple-choice' && exercise.options && (
        <div className="grid grid-cols-2 gap-5 mb-8">
          {exercise.options.map((option: string, index: number) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === exercise.correctAnswer;
            
            let buttonClass = `p-6 rounded-2xl border-2 text-3xl font-bold transition-all transform `;
            
            if (showFeedback) {
              if (isCorrectOption) {
                buttonClass += 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-600 scale-105 shadow-lg';
              } else if (isSelected && !isCorrectOption) {
                buttonClass += 'bg-gradient-to-r from-red-400 to-red-600 text-white border-red-600 scale-105 shadow-lg opacity-80';
              } else {
                buttonClass += 'bg-gray-100 text-gray-400 border-gray-300 opacity-60 cursor-not-allowed';
              }
            } else {
              buttonClass += `bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 border-gray-200 hover:border-blue-300 hover:scale-105 hover:shadow-lg`;
            }

            return (
              <button
                key={index}
                onClick={() => isInteractive && onAnswer(option)}
                className={buttonClass}
                disabled={!isInteractive || selectedAnswer !== null}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{option}</span>
                  {showFeedback && isCorrectOption && (
                    <span className="text-2xl">✓</span>
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <span className="text-2xl">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
      
      {/* Fill in the Blank */}
      {exercise.type === 'fill-blank' && (
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onInputSubmit()}
              className={`px-4 py-3 text-2xl text-center border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                showFeedback
                  ? isCorrect
                    ? 'bg-green-50 border-green-500 text-green-700 focus:ring-green-200'
                    : 'bg-red-50 border-red-500 text-red-700 focus:ring-red-200'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="Your answer..."
              disabled={!isInteractive || selectedAnswer !== null}
            />
            <button
              onClick={onInputSubmit}
              disabled={!isInteractive || !userInput.trim() || selectedAnswer !== null}
              className={`px-6 py-3 ${config?.buttonGradient} text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Submit
            </button>
          </div>
          
          {/* Enhanced feedback for fill-blank */}
          {showFeedback && (
            <div className={`text-xl font-bold ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            } flex items-center space-x-2`}>
              <span>{isCorrect ? '🎉 Perfect!' : '💡 Almost!'}</span>
              {!isCorrect && (
                <span className="text-blue-600">The answer was: {exercise.correctAnswer}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hint System - Only show if no answer selected */}
      {isInteractive && !showFeedback && (
        <div className="text-center">
          <MagicButton 
            onClick={onHintClick}
            gradient={buttonGradient}
            className="text-lg"
          >
            {showHint ? 'Hide Hint' : '💡 Need Help?'}
          </MagicButton>
          {showHint && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
              <p className="text-yellow-800 text-lg font-semibold">{exercise.hints[0]}</p>
            </div>
          )}
        </div>
      )}

      {/* Continue Button after feedback */}
      {showFeedback && (
        <div className="text-center mt-6">
          <div className="animate-bounce-gentle">
            <button
              onClick={() => {
                // This will be handled by the parent component's timeout
                // We'll add a visual indicator that we're moving to next question
              }}
              className={`px-8 py-4 ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              } text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
              disabled
            >
              <div className="flex items-center space-x-2">
                <span>Next question in...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            {isCorrect ? 'Great job! Moving to next challenge...' : 'Reviewing the solution...'}
          </p>
        </div>
      )}
    </ContentCard>
  );
}

// Navigation Component
function NavBar({ grade, topic, selectedCurrency, onCurrencyChange, isMoneyTopic }: any) {
    // GET config and topicTitle inside NavBar using the same helper functions
    const config = getGradeConfig(grade);
    const topicTitle = getTopicTitle(grade, topic);
    
    return (
      <nav className="flex items-center justify-between mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-rainbow">
        <Link href="/">
          <MagicButton className="text-lg">
            ⋆.˚ 𓇼 CoolMathsZone 
          </MagicButton>
        </Link>
        
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">
            <span>{config.emoji} {config.title}</span>
            <span className="text-white/50 mx-3">•</span>
            <TextGradient gradient={textGradient}>
              {topicTitle}
            </TextGradient>
          </h1>
          {isMoneyTopic && (
            <div className="mt-2 flex items-center justify-center space-x-2">
              <span className="text-white/70 text-sm">Currency:</span>
              <select 
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-white/20 text-white border border-white/30 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {Object.entries(CURRENCIES).map(([code, currency]) => (
                  <option key={code} value={code} className="text-gray-800">
                    {currency.symbol} {currency.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <Link href={`/grades/${grade}`}>
          <MagicButton className="text-lg">
            🛟 {config.title} Topics
          </MagicButton>        
        </Link>
      </nav>
    );
  }