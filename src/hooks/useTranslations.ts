import { useLocale, useTranslations as useIntlTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export type Language = 'it' | 'en';

export const useTranslations = () => {
  const locale = useLocale() as Language;
  const t = useIntlTranslations();
  const router = useRouter();
  const changeLanguage = (newLanguage: Language) => {
    router.push(`/${newLanguage}`);
    localStorage.setItem('verbaLanguage', newLanguage);
  };

  return { language: locale, changeLanguage, t };
};
