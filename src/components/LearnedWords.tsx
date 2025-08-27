import React, { useState } from 'react';

import wordsData from '../data/words.json';
import { useTranslations } from '../hooks/useTranslations';
import { Word } from '../types/word';

interface LearnedWordsProps {
  learnedIds: string[];
}

const LearnedWords: React.FC<LearnedWordsProps> = ({ learnedIds }) => {
  const [search, setSearch] = useState('');
  const words: Word[] = wordsData as Word[];
  const learnedWords = words.filter((word) => learnedIds.includes(word.id));
  const filteredWords = learnedWords.filter(
    (word) =>
      word.word.toLowerCase().includes(search.toLowerCase()) ||
      word.definition.toLowerCase().includes(search.toLowerCase()) ||
      (word.example &&
        word.example.toLowerCase().includes(search.toLowerCase())) ||
      (word.curiosity &&
        word.curiosity.toLowerCase().includes(search.toLowerCase()))
  );

  const { t } = useTranslations();
  if (learnedWords.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        {t('noLearnedWords')}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white/10 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {t('wordsDiscovered')}
      </h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('filterWords')}
        className="w-full mb-6 px-4 py-2 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <ul className="space-y-4">
        {filteredWords.length === 0 ? (
          <li className="text-center text-slate-400 py-8">Nessun risultato.</li>
        ) : (
          filteredWords.map((word) => (
            <li
              key={word.id}
              className="bg-white/20 rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-purple-700">
                  {word.word}
                </span>
                <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold">
                  {word.category}
                </span>
              </div>
              <div className="mt-2 text-slate-800">{word.definition}</div>
              {word.example && (
                <div className="mt-1 text-slate-600">
                  <strong>Esempio:</strong> {word.example}
                </div>
              )}
              {word.curiosity && (
                <div className="mt-1 text-slate-500 italic">
                  <strong>Curiosità:</strong> {word.curiosity}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LearnedWords;
