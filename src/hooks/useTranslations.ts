import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export type Language = 'it' | 'en' | 'es' | 'fr';

export const useTranslations = () => {
  const [language, setLanguage] = useState<Language>('it');

  useEffect(() => {
    // Carica la lingua salvata dal localStorage
    const savedLanguage = localStorage.getItem('verbaLanguage') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('verbaLanguage', newLanguage);
  };

  const t = translations[language];

  return { language, changeLanguage, t };
}; 