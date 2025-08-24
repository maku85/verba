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
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);  

  useEffect(() => {
    const savedUser = localStorage.getItem('verbaUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('verbaUser', JSON.stringify(currentUser));
  }, [currentUser]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 my-8">
        <Header title="Parole Preziose" subtitle="Scopri il tesoro nascosto dell'italiano" />

        <DailyWordComponent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          language="it"
        />

        <WordChallenge
          setCurrentUser={setCurrentUser}
          language="it"
        />

        <UserStats currentUser={currentUser} language="it" />
      </div>

      <OfflineIndicator isOnline={isOnline} />
    </div>
  );
};

export default App;
