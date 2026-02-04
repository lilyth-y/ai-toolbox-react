import { useTranslation } from 'react-i18next';
import { FC } from 'react';

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    supportedLanguages: ['en', 'ko'] as const,
  };
};

export const LanguageSwitcher: FC = () => {
  const { language, changeLanguage } = useAppTranslation();
  
  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
      }}
    >
      <option value="en">English</option>
      <option value="ko">한국어</option>
    </select>
  );
};
