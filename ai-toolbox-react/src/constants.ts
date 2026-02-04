/**
 * AI Toolbox Configuration
 * 
 * 이 파일에서 프로젝트의 주요 ID와 설정을 한 곳에서 관리할 수 있습니다.
 * 배포 전에 아래 값들을 실제 본인의 ID로 교체하세요.
 * 
 * 환경변수 사용 권장: .env 파일을 생성하고 민감한 정보를 관리하세요.
 * 예: cp .env.example .env
 */

export interface AdSlots {
  HOME_TOP: string;
  HOME_BOTTOM: string;
  TOOL_INFEED: string;
  TOOL_INFEED_LAYOUT_KEY: string;
}

export interface AppConfig {
  GA4_MEASUREMENT_ID: string;
  ADSENSE_CLIENT_ID: string;
  AD_SLOTS: AdSlots;
  SITE_TITLE: string;
  SITE_URL: string;
  CONTACT_EMAIL: string;
}

export const CONFIG: AppConfig = {
  // 1. Google Analytics 4 (GA4)
  // https://analytics.google.com/ 에서 발급받은 측정 ID (G-XXXXXXXXXX)
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_ID || 'G-XXXXXXXXXX',

  // 2. Google AdSense
  // https://adsense.google.com/ 에서 발급받은 게시자 ID (ca-pub-XXXXXXXXXX)
  ADSENSE_CLIENT_ID: import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4436930755923908',

  // 광고 슬롯 ID (AdSense 대시보드에서 생성)
  AD_SLOTS: {
    // 디스플레이 광고 (상하단 공통 사용 또는 분리 가능)
    HOME_TOP: import.meta.env.VITE_AD_SLOT_HOME_TOP || '7889384566',
    HOME_BOTTOM: import.meta.env.VITE_AD_SLOT_HOME_BOTTOM || '7889384566',

    // 리스트 중간 광고 (In-Feed)
    // 인피드 광고 단위가 있다면 별도 ID와 Layout Key가 필요합니다.
    // 현재는 디스플레이 광고 ID를 재사용합니다.
    TOOL_INFEED: import.meta.env.VITE_AD_SLOT_TOOL_INFEED || '7889384566',
    TOOL_INFEED_LAYOUT_KEY: '', // 인피드 광고 생성 시 '-fb+5w...' 형태의 키 입력
  },

  // 3. SEO & Metadata
  SITE_TITLE: import.meta.env.VITE_SITE_TITLE || 'AI Toolbox',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://ai-toolbox.web.app',

  // 4. Contact
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'contact@example.com',
};

// 제휴 링크 설정 (Affiliate Links)
// 실제 제휴 코드를 여기에 입력하면 tools.ts 등에 자동으로 적용되도록 확장 가능
export interface AffiliateLinksConfig {
  [key: string]: string;
}

export const AFFILIATE_LINKS: AffiliateLinksConfig = {
  CHATGPT: 'https://chat.openai.com/invite/sample',
  PERPLEXITY: 'https://perplexity.ai/pro?referral_code=sample',
  // ...
};
