# GitHub Pages 배포 체크리스트 (AI Toolbox)

이 문서는 현재 저장소를 GitHub Pages로 배포할 때 필요한 최소 점검 항목을 정리합니다.

---

## 1) 공개 범위 이해 (중요)

- GitHub Pages는 정적 파일(HTML/CSS/JS)을 사용자 브라우저에 그대로 전달합니다.
- 따라서 프런트엔드 코드에 포함된 내용은 누구나 브라우저 개발자 도구로 확인할 수 있습니다.
- **비밀값(API Key, 토큰, 서비스 계정)은 절대 프런트 코드에 하드코딩하면 안 됩니다.**

---

## 2) 현재 프로젝트 기준 보안 체크

### 확인 결과
- `onboarding.html` + `js/onboarding.js`는 사용자 입력 API 키를 `localStorage`에 저장해 직접 Gemini API를 호출하는 BYOK 구조입니다.
- 이 방식은 "사용자 본인 키를 브라우저에서 사용"하는 용도로는 가능하지만, 사이트 운영자 비밀키를 넣는 구조로 쓰면 안 됩니다.

### 권장 방침
- 운영자 키/비밀값: 서버(Cloud Functions 등)에서만 사용
- 프런트: 사용자 입력값 또는 공개 데이터만 사용
- 문서/웹교재 페이지는 정적 배포에 적합

---

## 3) 배포 전 체크리스트

- [ ] 프런트 코드에 운영자 API 키/토큰이 하드코딩되어 있지 않다.
- [ ] `README.md` 또는 안내 문서에 "프런트 코드는 공개됨"을 명시했다.
- [ ] 진입 페이지(`index.html`)가 존재한다.
- [ ] 상대경로 링크(`ai_resources.html`, `onboarding.html`, `ai_textbook.html`)가 모두 동작한다.
- [ ] 모바일에서 레이아웃이 깨지지 않는지 확인했다.

---

## 4) GitHub Pages 설정 방법 (수동)

1. GitHub 저장소 -> **Settings** -> **Pages**
2. **Build and deployment**:
   - Source: `GitHub Actions` 또는 `Deploy from a branch`
3. 브랜치 배포를 쓸 경우:
   - Branch: `master` (또는 기본 브랜치)
   - Folder: `/ (root)`

---

## 5) GitHub Actions 배포 방식 (권장)

- `.github/workflows/deploy-pages.yml` 워크플로우로 정적 파일을 배포합니다.
- 이 저장소는 루트에 정적 페이지가 있어 별도 빌드 없이도 배포 가능합니다.
- 배포 후 URL 예시:
  - `https://<github-username>.github.io/<repository-name>/`

### 브랜치 기반 배포 분리 정책 (혼선 방지)
- **master 브랜치**: GitHub Pages 배포 전용
- **develop 브랜치**: Firebase Hosting 배포 전용
- CI(린트/테스트/빌드)는 master/develop 모두에서 실행
- 따라서 같은 커밋이 Pages와 Firebase에 동시에 배포되지 않도록 분리됩니다.

---

## 6) 배포 후 확인 항목

- [ ] 루트 URL에서 `index.html`이 열리는가
- [ ] `AI 리소스`, `온보딩`, `웹교재` 링크 이동이 정상인가
- [ ] 다크모드 토글 및 체크리스트 localStorage 동작이 정상인가
- [ ] 브라우저 콘솔에 치명적 오류가 없는가

---

## 7) 운영 팁

- 문서/웹교재 업데이트 시 정적 파일만 수정하면 재배포가 단순합니다.
- 민감 로직(자동채점 고도화, 서버 로그 처리, 내부 정책 판단)은 GitHub Pages가 아닌 서버 사이드로 분리하세요.
