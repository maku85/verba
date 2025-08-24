import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'it' | 'en' | 'es' | 'fr';
  onLanguageChange: (language: 'it' | 'en' | 'es' | 'fr') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ] as const;

  return (
    <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-lg rounded-xl p-2 border border-slate-600">
      <Globe className="text-slate-300" size={20} />
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            language === lang.code
              ? 'bg-purple-500 text-white shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector; 