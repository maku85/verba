'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import LearnedWords from '../../components/LearnedWords';

const LearnedWordsPage = () => {
  const [learnedIds, setLearnedIds] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('verbaUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setLearnedIds(user.dailyWordsLearned || []);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto my-8">
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold shadow hover:bg-purple-700 transition"
          >
            ← Torna alla Home
          </Link>
        </div>
        <LearnedWords learnedIds={learnedIds} />
      </div>
    </div>
  );
};

export default LearnedWordsPage;
