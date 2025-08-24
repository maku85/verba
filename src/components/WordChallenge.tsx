import React, { useState, useEffect, useCallback } from 'react';
import { Gem } from 'lucide-react';

import {
  calculateLevelAndProgress,
  calculateXP,
  getCurrentTitle,
  getHint,
} from '../utils/gameHelpers';
import { titles } from '../data/gameConfig';
import { translations } from '../data/translations';
import { User } from '../types/user';
import { Word } from '../types/word';
import wordsData from '../data/words.json';

interface WordChallengeProps {
  setCurrentUser: any;
  language: 'it' | 'en' | 'es' | 'fr';
}

const WordChallenge: React.FC<WordChallengeProps> = ({
  setCurrentUser,
  language,
}) => {
  const t = translations[language];
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDefinition, setShowDefinition] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const words: Word[] = wordsData as Word[];

  const chooseNewWord = useCallback(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setAnswer('');
    setFeedback('');
    setShowDefinition(false);
    setHintsUsed(0);
    setShowHint(false);
    setIsCorrect(false);
    setShake(false);
  }, [words]);

  const updateUserWithXP = (xpGained: number) => {
    setCurrentUser((prev: User) => {
      const newExperience = prev.experience + xpGained;
      const { level, levelProgress } = calculateLevelAndProgress(newExperience);
      
      return {
        ...prev,
        experience: newExperience,
        level,
        levelProgress,
        totalWordsLearned: prev.totalWordsLearned + 1,
      };
    });
  };

  const verifyAnswer = () => {
    if (!currentWord) return;

    const rightAnswer =
      answer.toLowerCase().trim() === currentWord.word.toLowerCase();

    if (rightAnswer) {
      const xpGained = calculateXP(currentWord, hintsUsed);
      
      updateUserWithXP(xpGained);
      
      setCurrentUser((prev: User) => ({
        ...prev,
        points: prev.points + currentWord.points,
        title: getCurrentTitle(prev.points + currentWord.points, titles),
      }));

      setIsCorrect(true);
      
      setFeedback(
        `🎉 Corretto! +${currentWord.points} punti, +${xpGained} XP!`
      );
    } else {
      setFeedback(`❌ Non corretto. La parola era: ${currentWord.word}`);
      triggerShake();
    }

    setShowDefinition(true);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const useHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
      setShowHint(true);
      setCurrentUser((prev: User) => ({
        ...prev,
        points: Math.max(0, prev.points - 2)
      }));
    }
  };

  useEffect(() => {
    if (!currentWord) chooseNewWord();
  }, []);

  if(!currentWord) return null;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-12 border border-slate-700">
              <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white mb-3">
            {t.wordChallenge}
          </h2>
          <p className="text-xl text-slate-300">
            {t.challengeDescription}
          </p>
        </div>

      {!showDefinition && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-purple-500/20">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3 bg-purple-500/20 backdrop-blur-lg px-4 py-2 rounded-xl">
              <Gem className="text-purple-300" size={20} />
                          <span className="font-bold text-purple-300">
              {currentWord.points} {t.points}
            </span>
            </div>
          </div>

          <p className="text-2xl text-white mb-6 leading-relaxed font-medium">
            "{currentWord.definition}"
          </p>

          <div className="text-lg text-slate-300">
            <strong>{t.category}:</strong> {currentWord.category}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {!showDefinition && (
          <>
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={t.writeWordHere}
                className={`w-full p-6 bg-slate-700 border-2 rounded-2xl text-xl text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                  shake ? 'animate-bounce border-red-500' : 
                  isCorrect ? 'border-emerald-500' : 
                  'border-slate-600 focus:border-purple-500'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && verifyAnswer()}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={verifyAnswer}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                {t.verifyAnswer}
              </button>
              <button
                onClick={useHint}
                disabled={hintsUsed >= 3}
                className={`px-6 py-4 border-2 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  hintsUsed >= 3 
                    ? 'border-slate-500 text-slate-400 opacity-50 cursor-not-allowed' 
                    : 'border-amber-500 text-amber-400 hover:bg-amber-500/10 hover:scale-105'
                }`}
              >
                💡 {t.help} ({3 - hintsUsed} {t.remaining})
              </button>
              <button
                onClick={() => setShowDefinition(true)}
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-2xl font-bold text-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                {t.showSolution}
              </button>
            </div>

            {showHint && (
              <div className="bg-amber-500/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl animate-pulse">💡</span>
                  <h4 className="text-lg font-bold text-amber-300">{t.hint}</h4>
                </div>
                <p className="text-amber-200 text-lg">{getHint(currentWord.word, hintsUsed)}</p>
                <p className="text-amber-300 text-sm mt-2">
                  ⚠️ {t.hintPenalty}
                </p>
              </div>
            )}
          </>
        )}

        {feedback && (
          <div
            className={`p-6 rounded-2xl text-center font-bold text-lg transition-all duration-500 ${
              feedback.includes('Corretto')
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 scale-105'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}
          >
            {feedback}
          </div>
        )}

        {showDefinition && (
          <div className="bg-slate-700/50 backdrop-blur-lg rounded-2xl p-8 space-y-4 border border-slate-600">
            <h3 className="text-3xl font-black text-purple-400">
              {currentWord.word}
            </h3>
            <p className="text-white text-lg">
              <strong>{t.definition}:</strong> {currentWord.definition}
            </p>
            <p className="text-slate-300 text-lg">
              <strong>{t.example}:</strong> <em>"{currentWord.example}"</em>
            </p>
            <button
              onClick={chooseNewWord}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 mt-6"
            >
              {t.nextWord}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordChallenge; 