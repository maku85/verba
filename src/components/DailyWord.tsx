import React, { useState, useEffect } from 'react';
import { Gift, Star, Trophy } from 'lucide-react';

import {
  calculateLevelAndProgress,
  getDifficultyColor,
  getDifficultyText,
} from '../utils/gameHelpers';
import { DailyWord as DailyWordType, Word } from '../types/word';
import { translations } from '../data/translations';
import { User } from '../types/user';
import wordsData from '../data/words.json';

interface DailyWordProps {
  currentUser: User;
  setCurrentUser: any;
  language: 'it' | 'en' | 'es' | 'fr';
}

const DailyWord: React.FC<DailyWordProps> = ({
  currentUser,
  setCurrentUser,
  language,
}) => {
  const t = translations[language];
  const [dailyWord, setDailyWord] = useState<DailyWordType | null>(null);
  const words: Word[] = wordsData as Word[];

  const getTodayISO = () => new Date().toISOString().slice(0, 10);

  const initDailyWord = () => {
    const today = getTodayISO();
    const seed = today
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const wordIndex = seed % words.length;
    const dailyWord = {
      ...words[wordIndex],
      date: today,
      points: words[wordIndex].points + 5,
    };
    setDailyWord(dailyWord);
  };

  const [hasLearnedDailyWord, setHasLearnedDailyWord] = useState(false);

  const learnDailyWord = () => {
    if (!dailyWord || hasLearnedDailyWord) return;

    const newLearnedWords = [
      ...(currentUser.dailyWordsLearned || []),
      dailyWord.id,
    ];
    const dailyWordXP = dailyWord.points + 5;
    const newExperience = currentUser.experience + dailyWordXP;
    const { level, levelProgress } = calculateLevelAndProgress(newExperience);

    setCurrentUser((prev: User) => ({
      ...prev,
      points: prev.points + dailyWord.points,
      dailyWordsLearned: newLearnedWords,
      experience: newExperience,
      totalWordsLearned: prev.totalWordsLearned + 1,
      level,
      levelProgress,
    }));
    setHasLearnedDailyWord(true);
  };

  useEffect(() => {
    initDailyWord();
  }, [currentUser]);

  useEffect(() => {
    if (!dailyWord) return;
    const dailyWordsLearned = currentUser.dailyWordsLearned || [];
    setHasLearnedDailyWord(dailyWordsLearned.includes(dailyWord.id));
  }, [currentUser, dailyWord]);

  if (!dailyWord) return null;

  return (
    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-3xl shadow-2xl p-4 md:p-8 mb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/90 via-orange-500/90 to-pink-500/90"></div>
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-4xl font-black text-white">
              {t.dailyWordTitle}
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-2xl">
            <Gift className="text-white" size={24} />
            <span className="text-white font-bold text-sm md:text-lg">
              +{dailyWord.points} {t.points}
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
              {dailyWord.word}
            </h3>
            <span
              className={`px-2 md:px-4 py-1 md:py-2 rounded-full text-sm font-bold ${getDifficultyColor(
                dailyWord.difficulty
              )} bg-white`}
            >
              {getDifficultyText(dailyWord.difficulty)} • {dailyWord.category}
            </span>
          </div>
          <p className="text-base md:text-xl text-white/90 mb-4 leading-relaxed">
            <div className="example">
              <strong>Esempio d'uso:</strong> {dailyWord.example}
            </div>
            {dailyWord.curiosity && (
              <div className="curiosity">
                <strong>Curiosità:</strong> {dailyWord.curiosity}
              </div>
            )}
            <strong>{t.definition}:</strong> {dailyWord.definition}
          </p>
          <p className="text-base md:text-lg text-white/80 mb-4">
            <strong>{t.example}:</strong> <em>"{dailyWord.example}"</em>
          </p>
        </div>

        {!hasLearnedDailyWord ? (
          <button
            onClick={learnDailyWord}
            className="w-full bg-white text-orange-600 py-2 md:py-4 px-4 md:px-8 rounded-2xl font-black text-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:scale-105"
          >
            <Star size={24} />
            {t.learned}
          </button>
        ) : (
          <div className="w-full bg-emerald-500 text-white py-4 px-8 rounded-2xl font-black text-lg text-center flex items-center justify-center gap-3 shadow-lg">
            <Trophy size={24} />
            {t.dailyWordCompleted}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyWord;
