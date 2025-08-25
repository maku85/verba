export interface User {
  name: string;
  level: number;
  points: number;
  experience: number;
  levelProgress: number;
  totalWordsLearned: number;
  title: string;
  dailyWordsLearned: string[];
  hasLearnedDailyWord: boolean;
}
