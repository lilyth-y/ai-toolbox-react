# AI Toolbox & Learning Hub 🚀

**AI Toolbox**는 학생, 교육자, 연구자를 위한 현대적이고 인터랙티브한 웹 플랫폼입니다. 최적의 AI 도구를 발견하고 효과적으로 사용하는 방법을 배울 수 있습니다.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ 주요 기능

### 1. 🎯 인터랙티브 도구 마법사
- **역할**(학생, 교육자, 연구자)과 **목표**(글쓰기, 코딩, 디자인, 영상, 음악)에 따라 최적의 AI 도구를 추천
- ChatGPT, Perplexity, Cursor, Midjourney, Runway, Suno 등 직접 링크 제공

### 2. 🧪 인터랙티브 프롬프트 랩 (실제 AI 연동)
- 다크 모드 코드 에디터 환경에서 프롬프트 엔지니어링 연습
- **시뮬레이션 모드**: 인터넷 연결 없이 휴리스틱 피드백 제공
- **실제 AI 모드 (Gemini)**: 자신의 Google Gemini API 키로 실시간 피드백 및 자동 최적화
- **타이핑 효과**: AI가 단계별로 개선된 프롬프트를 "작성"하는 모습 표시

### 3. 🎓 온보딩 학습 허브
- **Chapter 1 (기초)**: **RTF** (Role, Task, Format) 공식 학습
- **Chapter 2 (고급)**: **CO-STAR** 프레임워크 및 Chain of Thought 기법
- **Chapter 3 (역할별)**: 개발자 및 연구자를 위한 팁

### 4. 🎨 프리미엄 UI/UX
- **다크/라이트 모드** 지원
- Pretendard 폰트 및 SVG 아이콘으로 깔끔한 SaaS 스타일
- 완전 반응형 디자인

## 🛠️ 기술 스택

- **Frontend**: React 19, React Router v7
- **Build Tool**: Vite 7
- **Styling**: CSS Variables, Flexbox/Grid
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4, AdSense
- **SEO**: React Helmet Async, React Share
- **API**: Google Gemini (사용자 자체 키)

## 🚀 시작하기

### 사전 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd ai-toolbox-react

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일을 열고 실제 API 키 입력
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 프리뷰

```bash
npm run preview
```

## ⚙️ 환경변수 설정

`.env` 파일을 생성하고 다음 값들을 설정하세요:

```env
# Google Analytics
VITE_GA4_ID=G-XXXXXXXXXX

# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
VITE_AD_SLOT_HOME_TOP=XXXXXXXXXX
VITE_AD_SLOT_HOME_BOTTOM=XXXXXXXXXX

# Site Config
VITE_SITE_TITLE=AI Toolbox
VITE_SITE_URL=https://yourdomain.com
VITE_CONTACT_EMAIL=contact@yourdomain.com
```

**중요**: 실제 API 키를 발급받아 사용하세요:
- [Google Analytics](https://analytics.google.com/)
- [Google AdSense](https://adsense.google.com/)

## 📁 프로젝트 구조

```
ai-toolbox-react/
├── public/              # 정적 파일 (ads.txt, robots.txt, sitemap.xml)
├── src/
│   ├── components/      # React 컴포넌트
│   │   ├── AdBanner.jsx
│   │   ├── ErrorBoundary.jsx  # 에러 처리
│   │   ├── Layout.jsx
│   │   ├── PromptLab.jsx
│   │   ├── SEO.jsx
│   │   ├── ToolExplorer.jsx
│   │   └── Wizard.jsx
│   ├── context/         # Context API
│   │   └── ToastContext.jsx
│   ├── data/           # 데이터 파일
│   │   └── tools.js    # AI 도구 목록
│   ├── hooks/          # Custom Hooks
│   │   ├── useGemini.js
│   │   └── useTheme.js
│   ├── constants.js    # 설정 상수
│   ├── App.jsx         # 메인 앱
│   └── main.jsx        # 엔트리 포인트
├── .env.example        # 환경변수 템플릿
├── eslint.config.js    # ESLint 설정
├── vite.config.js      # Vite 설정
└── package.json
```

## 🔒 보안 고려사항

- **API 키 관리**: 모든 민감한 정보는 `.env` 파일에 보관하고 `.gitignore`에 추가
- **BYOK (Bring Your Own Key)**: Gemini API는 사용자가 직접 브라우저에서 입력 (LocalStorage)
- **Header 전송**: API 키는 URL 파라미터가 아닌 HTTP Header로 전송

## 📦 배포

### Firebase Hosting

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# 로그인
firebase login

# 초기화 (이미 firebase.json이 있다면 생략)
firebase init hosting

# 빌드 & 배포
npm run build
firebase deploy
```

#### GitHub Actions에서 develop 배포 검증하기

- `develop` 브랜치 push 시 `React App CI/CD`가 실행됩니다.
- `Deploy to Firebase Hosting` 성공을 위해 아래 Secrets가 필요합니다.
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_SERVICE_ACCOUNT`

### Netlify

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인 & 배포
netlify login
netlify deploy --prod
```

## 🧪 테스트 (향후 추가 예정)

```bash
# 테스트 실행
npm test

# 단일 실행 (CI용)
npm test -- --run

# 커버리지 리포트
npm run test:coverage
```

**현재 테스트 현황**:
- ✅ useGemini hook (5개 테스트)
- 추가 예정: ToolExplorer, ToastContext 등

---

## 📱 PWA 기능

이 앱은 Progressive Web App으로 다음 기능을 제공합니다:

- 📲 **홈 화면에 추가**: 네이티브 앱처럼 설치 가능
- 🔄 **자동 업데이트**: 새 버전 자동 감지 및 업데이트
- 📡 **오프라인 지원**: Service Worker로 오프라인에서도 작동
- ⚡ **빠른 로딩**: 주요 리소스 사전 캐싱

### PWA 테스트
```bash
npm run build
npm run preview

# Chrome DevTools > Application > Service Workers 확인
```

---

## 📝 라이선스

이 프로젝트는 교육 목적으로 오픈소스로 제공됩니다.

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의: [VITE_CONTACT_EMAIL]

---

Made with ❤️ for AI learners
