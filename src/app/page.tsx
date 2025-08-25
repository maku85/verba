'use client';

import React, { useState, useEffect } from 'react';

import Header from '@/components/Header';
import DailyWordComponent from '@/components/DailyWord';
import WordChallenge from '@/components/WordChallenge';
import OfflineIndicator from '@/components/OfflineIndicator';
import UserStats from '@/components/UserStats';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    name: 'Esploratore',
    level: 1,
    points: 0,
    experience: 0,
    levelProgress: 0,
    totalWordsLearned: 0,
    title: 'Novizio delle Parole',
    dailyWordsLearned: [] as string[],
    hasLearnedDailyWord: false,
  });
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const setCurrentUserAndSave = (update: any) => {
    setCurrentUser((prev: any) => {
      const newUser = typeof update === 'function' ? update(prev) : update;
      localStorage.setItem('verbaUser', JSON.stringify(newUser));
      return newUser;
    });
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const savedUser = localStorage.getItem('verbaUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsUserLoaded(true);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isUserLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Caricamento...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 my-8">
        <Header
          title="Parole Preziose"
          subtitle="Scopri il tesoro nascosto dell'italiano"
        />

        <div className="mb-6 flex justify-end">
          <a
            href="/learned-words"
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold shadow hover:bg-purple-700 transition"
          >
            Parole imparate
          </a>
        </div>

        <DailyWordComponent
          currentUser={currentUser}
          setCurrentUser={setCurrentUserAndSave}
          language="it"
        />

        <WordChallenge setCurrentUser={setCurrentUserAndSave} language="it" />

        <UserStats currentUser={currentUser} language="it" />
      </div>

      <OfflineIndicator isOnline={isOnline} />
    </div>
  );
};

export default App;
