export interface Word {
  word: string;
  definition: string;
  example: string;
  category: 'Verbo' | 'Sostantivo' | 'Aggettivo';
  difficulty: 1 | 2 | 3;
  points: number;
}

export interface DailyWord extends Word {
  date: string;
} 