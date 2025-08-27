import { Word } from '../types/word';

export const getDifficultyColor = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
    case 2:
      return 'text-amber-700 bg-amber-50 border border-amber-200';
    case 3:
      return 'text-rose-700 bg-rose-50 border border-rose-200';
    default:
      return 'text-slate-700 bg-slate-50 border border-slate-200';
  }
};

export const getDifficultyText = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return 'Facile';
    case 2:
      return 'Medio';
    case 3:
      return 'Difficile';
    default:
      return 'Sconosciuto';
  }
};

export const calculateXP = (word: Word, hintsUsed: number): number => {
  let xp = word.points;
  if (hintsUsed === 0) xp *= 1.2;
  return Math.round(xp);
};

export const calculateLevelAndProgress = (experience: number) => {
  const baseXP = 100;
  const level = Math.floor(experience / baseXP) + 1;
  const levelProgress = ((experience % baseXP) / baseXP) * 100;
  return { level, levelProgress };
};

export const getCurrentTitle = (points: number, titles: Array<{ name: string; minpoints: number }>): string => {
  for (let i = titles.length - 1; i >= 0; i--) {
    if (points >= titles[i].minpoints) {
      return titles[i].name;
    }
  }
  return titles[0].name;
};

export const getHint = (word: string, hintsUsed: number): string => {
  if (hintsUsed === 0) {
    return `La parola inizia con "${word[0]}" e finisce con "${word[word.length - 1]}"`;
  } else if (hintsUsed === 1) {
    return `La parola ha ${word.length} lettere`;
  } else if (hintsUsed === 2) {
    return `La parola contiene le lettere: ${word.split('').sort().join(', ')}`;
  }
  return '';
}; 