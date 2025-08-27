import React from 'react';
import { Crown, Trophy, Target, Star } from 'lucide-react';

import { useTranslations } from '../hooks/useTranslations';

interface UserStatsProps {
  currentUser: {
    name: string;
    title: string;
    level: number;
    experience: number;
    levelProgress: number;
    points: number;
    totalWordsLearned: number;
  };
}

const UserStats: React.FC<UserStatsProps> = ({ currentUser }) => {
  const { t } = useTranslations();

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 border border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
            <Crown className="text-white" size={28} />
          </div>
          <div className="flex items-center gap-4">
            <span
              className="text-3xl font-bold text-white"
              style={{ minWidth: '120px', display: 'inline-block' }}
            >
              {currentUser.name}
            </span>
            <div
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mt-2 inline-block"
              style={{ minWidth: '100px' }}
            >
              {currentUser.title}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-slate-700/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-600">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-white">
            {t('level')} {currentUser.level}
          </span>
          <span
            className="text-sm text-slate-300"
            style={{ minWidth: '60px', display: 'inline-block' }}
          >
            {currentUser.experience} XP
          </span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${currentUser.levelProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>
            {t('level')} {currentUser.level}
          </span>
          <span>
            {t('level')} {currentUser.level + 1}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1">
          <Trophy className="mx-auto text-white mb-2 sm:mb-3" size={24} />
          <div
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ minHeight: '40px' }}
          >
            {currentUser.points}
          </div>
          <div className="text-sm sm:text-base text-blue-100 font-semibold">
            {t('points')}
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <Target className="mx-auto text-white mb-3" size={32} />
          <div
            className="text-3xl font-black text-white"
            style={{ minHeight: '40px' }}
          >
            {currentUser.totalWordsLearned || 0}
          </div>
          <div className="text-emerald-100 font-semibold">
            {t('wordsDiscovered')}
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-br from-yellow-500 to-orange-600 p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <Star className="mx-auto text-white mb-2 sm:mb-3" size={24} />
          <div
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ minHeight: '40px' }}
          >
            {currentUser.experience}
          </div>
          <div className="text-sm sm:text-base text-yellow-100 font-semibold">
            {t('totalXP')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
