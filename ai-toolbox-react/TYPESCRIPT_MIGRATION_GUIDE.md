# 마이그레이션 로드맵 - TypeScript 컴포넌트 변환

이 가이드를 따라 JSX/JS 파일을 TSX/TS로 점진적으로 변환합니다.

## 📊 변환 우선순위

### 🔴 High Priority (P1) - 즉시 변환
```
src/
├── hooks/
│   ├── useGemini.jsx → useGemini.ts ✅ (완료)
│   └── useTheme.jsx → useTheme.ts
├── context/
│   └── ToastContext.jsx → ToastContext.ts
├── data/
│   └── tools.js → tools.ts
└── constants.js → constants.ts
```

**작업량**: ~2시간  
**영향도**: 높음 (다른 컴포넌트에서 자주 사용)

### 🟡 Medium Priority (P2) - 1주일 내
```
src/components/
├── Layout.jsx → Layout.tsx
├── Wizard.jsx → Wizard.tsx
├── PromptLab.jsx → PromptLab.tsx
├── LearningHub.jsx → LearningHub.tsx
├── ToolExplorer.jsx → ToolExplorer.tsx
└── SettingsModal.jsx → SettingsModal.tsx
```

**작업량**: ~1일  
**영향도**: 중간 (UI 컴포넌트)

### 🟢 Low Priority (P3) - 2주일 내
```
src/components/
├── AdBanner.jsx → AdBanner.tsx
├── CookieConsent.jsx → CookieConsent.tsx
├── ErrorBoundary.jsx → ErrorBoundary.tsx ✅ (완료)
├── PrivacyPolicy.jsx → PrivacyPolicy.tsx
├── Skeleton.jsx → Skeleton.tsx
├── SEO.jsx → SEO.tsx
├── ShareButton.jsx → ShareButton.tsx
└── ToolCompare.jsx → ToolCompare.tsx
```

**작업량**: ~1일  
**영향도**: 낮음 (독립적 컴포넌트)

---

## 🔄 변환 프로세스

### Step 1: 파일 확장자 변경
```bash
# 예: useTheme.jsx → useTheme.ts
mv src/hooks/useTheme.jsx src/hooks/useTheme.ts
```

### Step 2: 기본 타입 추가
```typescript
// Before
export const useTheme = () => {
  const [theme, setTheme] = useState('light');
  return { theme, setTheme };
};

// After
import { useState, FC } from 'react';

interface UseThemeReturn {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return { theme, setTheme };
};
```

### Step 3: 컴포넌트 Props 타입 정의
```typescript
// Before
export default function Layout({ children, onSettingsClick }) {
  return <div>{children}</div>;
}

// After
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  onSettingsClick: () => void;
}

const Layout: FC<LayoutProps> = ({ children, onSettingsClick }) => {
  return <div>{children}</div>;
};

export default Layout;
```

### Step 4: 데이터 타입 정의
```typescript
// src/types/Tool.ts
export interface Tool {
  id: string;
  name: string;
  desc: string;
  logo: string;
  url: string;
  affiliateUrl?: string;
  category: string;
  price: string;
  tags: string[];
  proBenefits?: string[];
}

// 사용
import { Tool } from '@/types/Tool';

const tools: Tool[] = [...];
```

### Step 5: Import 경로 업데이트
```typescript
// Before
import Layout from './components/Layout';
import { useGemini } from './hooks/useGemini';

// After (경로 별칭 사용)
import Layout from '@components/Layout';
import { useGemini } from '@hooks/useGemini';
```

---

## 📝 변환 체크리스트 - High Priority

### [ ] useTheme.ts
```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useTheme = (): UseThemeReturn => {
  // ...
};
```

### [ ] constants.ts
```typescript
export interface Config {
  GA4_ID: string;
  ADSENSE_CLIENT: string;
  AD_SLOTS: Record<string, string>;
  CONTACT_EMAIL: string;
  SITE_URL: string;
}

export const CONFIG: Config = {
  // ...
};
```

### [ ] ToastContext.ts
```typescript
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
```

### [ ] tools.ts
```typescript
import { Tool } from '@/types/Tool';

export const allTools: Tool[] = [
  // ...
];
```

---

## 🧪 테스트 및 검증

각 파일 변환 후:

```bash
# 1. 타입 체크
npx tsc --noEmit

# 2. 린트 검사
npm run lint

# 3. 빌드 테스트
npm run build

# 4. 실제 앱 테스트
npm run dev
```

---

## 💡 타입 정의 템플릿

### React Component with Props
```typescript
import React, { FC, ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
  onClick?: (id: string) => void;
  count: number;
}

const MyComponent: FC<MyComponentProps> = ({
  title,
  children,
  onClick,
  count,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      {children}
    </div>
  );
};

export default MyComponent;
```

### Custom Hook
```typescript
interface UseMyHookReturn {
  data: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMyHook = (): UseMyHookReturn => {
  const [data, setData] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const refetch = async () => {
    // ...
  };

  return { data, loading, error, refetch };
};
```

### Context Provider
```typescript
import { createContext, useContext, FC, ReactNode } from 'react';

interface MyContextType {
  value: string;
  setValue: (value: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = React.useState('');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

---

## 🚀 자동화 도구

### Convert JSX to TSX (반자동)
```bash
# 1. 확장자 변경
for file in src/**/*.jsx; do mv "$file" "${file%.jsx}.tsx"; done

# 2. ESLint로 타입 오류 감지
npm run lint -- --fix

# 3. TypeScript 컴파일 오류 확인
npx tsc --noEmit
```

---

## 📈 진행 상황 추적

| 파일 | 상태 | 우선순위 | 예상 시간 |
|------|------|---------|---------|
| useGemini.ts | ✅ 완료 | P1 | 30분 |
| ErrorBoundary.tsx | ✅ 완료 | P1 | 30분 |
| useTheme.ts | ⏳ 예정 | P1 | 30분 |
| ToastContext.ts | ⏳ 예정 | P1 | 45분 |
| constants.ts | ⏳ 예정 | P1 | 30분 |
| tools.ts | ⏳ 예정 | P1 | 30분 |
| Layout.tsx | ⏳ 예정 | P2 | 1시간 |
| Wizard.tsx | ⏳ 예정 | P2 | 1시간 |
| 기타 컴포넌트 | ⏳ 예정 | P2/P3 | 4시간 |

**총 예상 시간**: 10-12시간  
**추천 일정**: 2-3일 (하루 4-5시간)

---

**다음 단계**: useTheme.ts 변환부터 시작하세요!
