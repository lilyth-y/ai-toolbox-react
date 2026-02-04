import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import SEO from './SEO';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontSize: '1.1rem',
        color: 'var(--text-primary)',
        marginBottom: '12px',
        fontWeight: 600
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
};

const PrivacyPolicy: FC = () => {
  const { t } = useAppTranslation();

  return (
    <div className="container">
      <SEO
        title={t('privacy.title') || "개인정보처리방침"}
        description={t('privacy.description') || "AI Toolbox의 개인정보 수집 및 처리 방침에 대해 설명합니다."}
      />
      <div className="nav-bar">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          {t('common.home') || '메인으로'}
        </Link>
      </div>

      <div className="privacy-page glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Shield size={32} style={{ color: 'var(--primary-aurora)' }} />
          <h1 style={{ fontSize: '2rem', margin: 0 }}>
            {t('privacy.title') || '개인정보처리방침'}
          </h1>
        </div>

        <div className="policy-content" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '24px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>AI Toolbox</strong>
            {t('privacy.intro') || "('https://ai-toolbox.web.app' 이하 '사이트')는 개인정보보호법에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다."}
          </p>

          <Section title={t('privacy.section1') || "1. 수집하는 개인정보"}>
            <p>{t('privacy.section1Text') || "본 사이트는 서비스 제공을 위해 최소한의 정보만을 수집합니다:"}</p>
            <ul>
              <li><strong>{t('privacy.auto') || "자동 수집 정보"}:</strong> {t('privacy.autoText') || "방문 기록, 접속 IP, 브라우저 유형, 기기 정보"}</li>
              <li><strong>{t('privacy.cookies') || "쿠키"}:</strong> {t('privacy.cookiesText') || "사용자 설정(테마, 즐겨찾기) 저장 목적"}</li>
              <li><strong>{t('privacy.apiKey') || "API 키"}:</strong> {t('privacy.apiKeyText') || "사용자가 직접 입력한 Gemini API 키 (로컬 저장, 서버 전송 안 함)"}</li>
            </ul>
          </Section>

          <Section title={t('privacy.section2') || "2. 개인정보의 이용 목적"}>
            <ul>
              <li>{t('privacy.purpose1') || "서비스 제공 및 사용자 경험 개선"}</li>
              <li>{t('privacy.purpose2') || "광고 게재 (Google AdSense)"}</li>
              <li>{t('privacy.purpose3') || "서비스 이용 통계 분석"}</li>
            </ul>
          </Section>

          <Section title={t('privacy.section3') || "3. 광고 및 쿠키"}>
            <p>
              {t('privacy.section3Text1') || "본 사이트는 Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여 사용자의 관심사에 기반한 광고를 표시할 수 있습니다."}
            </p>
            <p>
              {t('privacy.section3Text2') || "사용자는 "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent-cyan)' }}>
                {t('privacy.googleAds') || "Google 광고 설정"}
              </a>
              {t('privacy.section3Text3') || "에서 맞춤 광고를 비활성화할 수 있습니다."}
            </p>
          </Section>

          <Section title={t('privacy.section4') || "4. 개인정보의 보유 및 파기"}>
            <p>
              {t('privacy.section4Text') || 
                "수집된 정보는 서비스 이용 기간 동안만 보유하며, 브라우저의 로컬 스토리지에 저장된 데이터는 사용자가 직접 삭제할 수 있습니다."}
            </p>
          </Section>

          <Section title={t('privacy.section5') || "5. 제3자 서비스"}>
            <p>{t('privacy.section5Text') || "본 사이트는 다음의 제3자 서비스를 사용합니다:"}</p>
            <ul>
              <li><strong>Google AdSense:</strong> {t('privacy.adSense') || "광고 게재"}</li>
              <li><strong>Google Analytics:</strong> {t('privacy.analytics') || "방문 통계 (선택적)"}</li>
              <li><strong>Firebase Hosting:</strong> {t('privacy.firebase') || "웹사이트 호스팅"}</li>
            </ul>
          </Section>

          <Section title={t('privacy.section6') || "6. 이용자의 권리"}>
            <p>
              {t('privacy.section6Text') || 
                "이용자는 언제든지 브라우저 설정에서 쿠키를 삭제하거나, 로컬 스토리지를 초기화하여 저장된 데이터를 삭제할 수 있습니다."}
            </p>
          </Section>

          <Section title={t('privacy.section7') || "7. 문의"}>
            <p>
              {t('privacy.section7Text') || "개인정보 관련 문의사항은 이메일로 연락해 주시기 바랍니다."}
            </p>
          </Section>

          <p style={{ marginTop: '40px', fontSize: '0.85rem', opacity: 0.6 }}>
            {t('privacy.date') || "시행일: 2026년 2월 3일"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
