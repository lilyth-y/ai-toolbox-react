import React, { useState, useEffect, FC } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppTranslation } from '@hooks/useAppTranslation';

/**
 * GDPR Cookie Consent Banner
 * Required for AdSense compliance in EEA, UK, and Switzerland
 */
const CookieConsent: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { t } = useAppTranslation();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setIsVisible(false);

    // Enable personalized ads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag?.('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setIsVisible(false);

    // Disable personalized ads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag?.('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className={`cookie-banner ${isMinimized ? 'minimized' : ''}`}>
        {isMinimized ? (
          <button
            className="cookie-expand-btn"
            onClick={() => setIsMinimized(false)}
            aria-label={t('cookie.open') || "쿠키 설정 열기"}
          >
            <Cookie size={20} />
          </button>
        ) : (
          <>
            <div className="cookie-header">
              <div className="cookie-icon">
                <Shield size={24} />
              </div>
              <button
                className="cookie-minimize"
                onClick={() => setIsMinimized(true)}
                aria-label={t('common.minimize') || "최소화"}
              >
                <X size={18} />
              </button>
            </div>

            <div className="cookie-content">
              <h3>🍪 {t('cookie.title') || '쿠키 및 개인정보 동의'}</h3>
              <p>
                {t('cookie.description') || 
                  "이 사이트는 광고 및 분석을 위해 쿠키를 사용합니다. '동의'를 클릭하시면 맞춤 광고를 제공하고, '거부'를 선택하시면 일반 광고만 표시됩니다."}
              </p>
              <Link to="/privacy" className="cookie-privacy-link">
                {t('cookie.viewPolicy') || '개인정보처리방침 보기'}
              </Link>
            </div>

            <div className="cookie-actions">
              <button
                className="cookie-btn reject"
                onClick={handleReject}
              >
                {t('cookie.reject') || '거부'}
              </button>
              <button
                className="cookie-btn accept"
                onClick={handleAccept}
              >
                <Check size={16} />
                {t('cookie.accept') || '동의'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
