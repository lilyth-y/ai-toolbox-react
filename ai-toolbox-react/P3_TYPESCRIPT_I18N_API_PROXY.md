# P3 장기 개선사항 - TypeScript, i18n, API 프록시 마이그레이션 가이드

## ✅ 완료된 작업

### 1. ✨ TypeScript 마이그레이션
**상태**: 기본 설정 완료

#### 설정된 파일
- ✅ `tsconfig.json` - 메인 TypeScript 설정
  - 경로 별칭 설정 (@components, @hooks, @utils 등)
  - 엄격한 타입 체크 활성화
  - ES2020 타겟 설정
  
- ✅ `tsconfig.node.json` - 빌드 도구 설정
- ✅ `vite.config.js` → `vite.config.ts` 준비
- ✅ 경로 별칭 설정 (vite.config.js에 추가)

#### 변환된 핵심 파일
- ✅ `src/components/ErrorBoundary.tsx` - React.Component with types
- ✅ `src/main.tsx` - Entry point with i18n setup
- ✅ `src/App.tsx` - Main app component with types
- ✅ `src/hooks/useGemini.ts` - API hook with interface definitions

#### 다음 마이그레이션 단계
```bash
# 1. TypeScript 설치
npm install --save-dev typescript

# 2. JSX → TSX 변환 (우선순위 순)
# High Priority:
# - src/hooks/*.jsx → .ts
# - src/context/*.jsx → .ts
# - src/components/Layout.jsx → .tsx

# Medium Priority:
# - src/components/*.jsx → .tsx
# - src/data/*.js → .ts

# Low Priority:
# - src/assets/ (이미지 파일)
# - Test files
```

#### 타입 정의 모범 사례
```typescript
// Props 정의
interface ToolProps {
  id: string;
  name: string;
  onClick: (id: string) => void;
}

// Component 정의
const Tool: React.FC<ToolProps> = ({ id, name, onClick }) => (
  <div onClick={() => onClick(id)}>{name}</div>
);

// Hook 반환값
interface UseGeminiReturn {
  callApi: (prompt: string) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export const useGemini = (): UseGeminiReturn => {
  // ...
};
```

---

### 2. 🌍 국제화(i18n) 완전 구성
**상태**: 설정 완료, 통합 필요

#### 설치된 패키지
```json
{
  "i18next": "^23.7.6",
  "react-i18next": "^14.0.0",
  "i18next-browser-languagedetector": "^8.0.0"
}
```

#### 생성된 파일
- ✅ `src/i18n/config.ts` - i18n 설정
  - 자동 언어 감지 (브라우저 언어 기반)
  - localStorage에 사용자 선택 저장
  - 폴백: English (en)

- ✅ `src/i18n/locales/en.json` - 영어 번역
  - common, nav, home, tools, categories, promptLab, learning, settings, footer, messages
  
- ✅ `src/i18n/locales/ko.json` - 한국어 번역
  - 모든 섹션의 한국어 번역

- ✅ `src/hooks/useAppTranslation.ts` - Custom hook
  - `useAppTranslation()` - useTranslation() 래퍼
  - `LanguageSwitcher` 컴포넌트 - 언어 선택 드롭다운

#### 컴포넌트 통합 방법

**Step 1: Main.tsx에 i18n 초기화**
```typescript
import './i18n/config'  // 이미 추가됨
```

**Step 2: 컴포넌트에서 사용**
```typescript
import { useAppTranslation } from '@hooks/useAppTranslation';

const Wizard: FC = () => {
  const { t } = useAppTranslation();
  
  return (
    <div>
      <h1>{t('home.hero')}</h1>
      <p>{t('home.subtitle')}</p>
      <button>{t('home.cta')}</button>
    </div>
  );
};
```

**Step 3: 네비게이션에 언어 선택 추가**
```typescript
import { LanguageSwitcher } from '@hooks/useAppTranslation';

const Layout: FC = () => {
  return (
    <header>
      {/* ... */}
      <LanguageSwitcher />
    </header>
  );
};
```

#### 지원 언어
- 🇺🇸 English (en)
- 🇰🇷 한국어 (ko)

#### 새 언어 추가 방법
1. `src/i18n/locales/xx.json` 생성 (xx = 언어 코드)
2. 모든 키 번역
3. `src/hooks/useAppTranslation.ts`의 `supportedLanguages`에 추가
4. `src/i18n/config.ts`의 resources에 추가

---

### 3. 🔒 Firebase Cloud Functions API 프록시
**상태**: 함수 구현 완료, 배포 준비

#### 생성된 파일
- ✅ `firebase-functions/functions/src/index.ts`
  - `geminiProxy` - Gemini API 프록시 함수
  - `apiHealth` - 헬스 체크 함수
  - CORS 설정으로 승인된 도메인만 접근 가능

- ✅ `firebase-functions/functions/package.json`
  - firebase-functions, cors 의존성
  - TypeScript 빌드 스크립트

- ✅ `firebase-functions/functions/tsconfig.json`
  - 함수용 TypeScript 설정

- ✅ `src/hooks/useGemini.ts` - 업데이트됨
  - 이제 Cloud Functions 프록시 호출
  - 클라이언트에서 API 키 노출 안 함
  - `VITE_GEMINI_PROXY_URL` 환경변수 사용

#### 배포 전 설정

**Step 1: Firebase 프로젝트 연결**
```bash
firebase login
firebase init functions
cd firebase-functions/functions
npm install
npm run build
```

**Step 2: Secret Manager에 API 키 등록**
```bash
# Option A: Firebase Config (간단함)
firebase functions:config:set gemini.api_key="YOUR_KEY"

# Option B: Google Secret Manager (권장, 안전함)
gcloud secrets create GEMINI_API_KEY --data-file=- <<< "YOUR_API_KEY"
```

**Step 3: 환경 변수 설정**
```bash
# .env 파일에 추가
VITE_GEMINI_PROXY_URL=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/geminiProxy
```

**Step 4: 로컬 테스트**
```bash
firebase emulators:start --only functions
# 다른 터미널에서
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/geminiProxy \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello"}'
```

**Step 5: 배포**
```bash
firebase deploy --only functions
```

#### API 엔드포인트

**POST /geminiProxy**
```json
// Request
{
  "prompt": "What is AI?",
  "model": "gemini-pro"  // optional
}

// Response
{
  "success": true,
  "data": "AI (Artificial Intelligence) is..."
}
```

**GET /apiHealth**
```json
{
  "status": "ok",
  "timestamp": "2026-02-03T12:00:00Z",
  "version": "1.0.0"
}
```

#### 보안 기능
✅ API 키 Secret Manager 저장  
✅ CORS 설정으로 도메인 제한  
✅ POST 요청만 허용  
✅ 에러 메시지 숨김 (프로덕션)  

---

## 📋 통합 체크리스트

### TypeScript 통합
- [ ] 모든 `.jsx` 파일을 `.tsx`로 변환
- [ ] 모든 `.js`를 `.ts`로 변환
- [ ] PropTypes를 TypeScript 인터페이스로 대체
- [ ] 컴포넌트에서 `as const` 사용하여 타입 추론 개선
- [ ] `npm run build` 성공 확인
- [ ] `npm run lint` 오류 없음 확인

### i18n 통합
- [ ] 모든 텍스트를 `t()` 호출로 변경
- [ ] 네비게이션에 `LanguageSwitcher` 추가
- [ ] localStorage에서 언어 설정 확인
- [ ] 모든 페이지에서 동적 텍스트 업데이트 확인
- [ ] 새 콘텐츠 추가 시 번역 추가

### Firebase Functions 통합
- [ ] Firebase 프로젝트 생성/연결
- [ ] Secret Manager에 API 키 등록
- [ ] 로컬 에뮬레이터로 테스트
- [ ] `VITE_GEMINI_PROXY_URL` 환경변수 설정
- [ ] 프로덕션 배포
- [ ] useGemini 훅이 프록시 URL 사용 확인

---

## 🚀 배포 순서

1. **TypeScript 마이그레이션 완료** (높은 우선순위)
2. **i18n 컴포넌트 통합** (중간 우선순위)
3. **Firebase Functions 배포** (높은 우선순위 - 보안)
4. **전체 테스트 및 QA**
5. **프로덕션 배포**

---

## 📚 참고 자료

### TypeScript
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Vite + TypeScript](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)

### i18n
- [i18next 공식 문서](https://www.i18next.com/)
- [react-i18next 가이드](https://react.i18next.com/)

### Firebase
- [Firebase Functions 문서](https://firebase.google.com/docs/functions)
- [Secret Manager](https://cloud.google.com/secret-manager/docs)
- [Gemini API](https://ai.google.dev/)

---

## 🆘 문제 해결

### TypeScript 오류
```bash
# 타입 체크
npx tsc --noEmit

# Vite로 빌드
npm run build
```

### i18n 키 누락
```bash
# JSON 유효성 검사
npx json-verify src/i18n/locales/*.json
```

### Firebase Functions 오류
```bash
# 로그 확인
firebase functions:log

# 함수 테스트
firebase emulators:start --only functions
```

---

**최종 목표**: P0, P1, P2에 이어 P3 장기 개선사항 완료로 완벽한 엔터프라이즈급 AI Toolbox 구축 🎉
