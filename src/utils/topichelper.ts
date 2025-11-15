// utils/topicHelper.ts
import { gradeLevels } from '@/data/syllabus';

export function checkMoneyTopic(grade: string, topic: string): boolean {
  const gradeLevel = gradeLevels.find(g => g.id === grade);
  const topicData = gradeLevel?.topics.find(t => t.id === topic);
  
  // Primary check: explicit category
  if (topicData?.category === 'money' || topicData?.category === 'commercial-math') return true;
  
  // Fallback: topic name pattern matching
  return topic.includes('money') || topic.includes('currency') || topic.includes('coin');
}