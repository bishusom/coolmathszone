// src/utils/gradeHelpers.ts
import { gradeLevels } from '@/data/syllabus';
import type { GradeLevel, Topic } from '@/types';

/**
 * Get all grade levels
 */
export const getAllGradeLevels = (): GradeLevel[] => {
  return gradeLevels;
};

/**
 * Get a specific grade level by ID
 */
export const getGradeLevel = (gradeId: string): GradeLevel | undefined => {
  return gradeLevels.find(grade => grade.id === gradeId);
};

/**
 * Get a topic by grade ID and topic ID
 */
export const getTopic = (gradeId: string, topicId: string): Topic | undefined => {
  const grade = getGradeLevel(gradeId);
  return grade?.topics.find(topic => topic.id === topicId);
};

/**
 * Get all topics for a specific grade
 */
export const getTopicsByGrade = (gradeId: string): Topic[] => {
  const grade = getGradeLevel(gradeId);
  return grade?.topics || [];
};

/**
 * Get grade config for UI components
 */
export const getGradeConfig = (gradeId: string) => {
  const grade = getGradeLevel(gradeId);
  return grade ? {
    emoji: grade.icon,
    title: grade.title,
    color: grade.color,
    description: grade.description
  } : {
    emoji: '🌟',
    title: gradeId,
    color: 'blue',
    description: 'Math practice'
  };
};

/**
 * Get topic title by IDs
 */
export const getTopicTitle = (gradeId: string, topicId: string): string => {
  const topic = getTopic(gradeId, topicId);
  return topic?.title || topicId;
};

/**
 * Check if grade exists
 */
export const isValidGrade = (gradeId: string): boolean => {
  return gradeLevels.some(grade => grade.id === gradeId);
};

/**
 * Check if topic exists in grade
 */
export const isValidTopic = (gradeId: string, topicId: string): boolean => {
  return getTopic(gradeId, topicId) !== undefined;
};

/**
 * Get random topic from a grade
 */
export const getRandomTopic = (gradeId: string): Topic | undefined => {
  const topics = getTopicsByGrade(gradeId);
  if (topics.length === 0) return undefined;
  return topics[Math.floor(Math.random() * topics.length)];
};