import React from 'react';

const Header: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
};
import { useTranslations } from '../hooks/useTranslations';

export default Header;
