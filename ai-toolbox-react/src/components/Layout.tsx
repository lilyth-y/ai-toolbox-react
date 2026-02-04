import React, { FC, ReactNode } from 'react';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '@hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '@hooks/useAppTranslation';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface LayoutProps {
  children: ReactNode;
  onOpenSettings?: () => void;
}

const Layout: FC<LayoutProps> = ({ children, onOpenSettings }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useAppTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="container">
      <div className="nav-bar">
        {!isHome ? (
          <Link to="/" className="back-btn">
            <span>←</span>
            {t('nav.home') || '메인으로'}
          </Link>
        ) : (
          <Link to="/tools" className="back-btn" style={{ flexDirection: 'row-reverse' }}>
            <span>→</span>
            {t('nav.explore') || '전체 도구 보기'}
          </Link>
        )}

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LanguageSwitcher />
          {onOpenSettings && (
            <button
              className="theme-btn"
              onClick={onOpenSettings}
              aria-label={t('nav.settings') || "설정"}
            >
              <Settings size={20} />
            </button>
          )}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={t('settings.theme') || "테마 변경"}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <header>
        <h1>{t('home.hero') || 'AI 시작하기'}</h1>
        <p className="subtitle">{t('home.subtitle') || '어떤 작업을 하고 싶으신가요?'}</p>
      </header>

      <main>
        {children}
      </main>

      <footer style={{
        marginTop: '60px',
        padding: '24px 0',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: '0.85rem'
      }}>
        <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
          {t('footer.privacy') || '개인정보처리방침'}
        </Link>
        <span style={{ margin: '0 12px' }}>•</span>
        <span>© 2026 AI Toolbox</span>
      </footer>
    </div>
  );
};

export default Layout;
