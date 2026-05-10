# Firebase 배포 체크리스트 (develop 브랜치 전용)

이 문서는 현재 저장소의 GitHub Actions 워크플로(`.github/workflows/ci-cd.yml`) 기준으로,
`develop` 브랜치에서 Firebase Hosting 배포를 안정적으로 성공시키기 위한 1페이지 실행 체크리스트입니다.

---

## 빠른 시작 (처음 사용자용 30초 버전)

아래 3가지만 하면 됩니다.

1. GitHub Actions Secrets에 `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT` 등록
2. `develop` 브랜치에 작은 변경 1건 push
3. Actions에서 `Deploy to Firebase Hosting`가 success인지 확인

성공하면 끝입니다. 아래 상세 섹션은 **실패했을 때만** 확인하세요.

---

## 0) 배포 조건 요약

- Firebase 배포는 **push to `develop`**일 때만 실행됩니다.
- 배포 전 `test-and-build` 잡이 먼저 성공해야 합니다.
- 핵심 실패 원인은 대부분 **GitHub Secrets 누락/오타**입니다.

---

## 1) 필수 Secrets (없으면 배포 실패)

아래 2개는 반드시 필요합니다.

| Secret 이름 | 용도 | 형식/예시 |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | `FirebaseExtended/action-hosting-deploy@v0` 인증 | Firebase 서비스 계정 JSON 전체 문자열 |
| `FIREBASE_PROJECT_ID` | 배포 대상 Firebase 프로젝트 지정 | 예: `my-project-prod` |

### 1-1) `FIREBASE_SERVICE_ACCOUNT` 발급 방법
1. Firebase Console -> 프로젝트 선택
2. Project settings -> Service accounts
3. **Generate new private key** 클릭
4. 내려받은 JSON 파일 내용을 통째로 GitHub Secret에 저장

> 주의: JSON 일부만 넣거나 줄바꿈/따옴표를 임의 수정하면 인증 오류가 납니다.

---

## 2) 선택 Secrets (누락 시 빌드는 되지만 값이 비어 있을 수 있음)

워크플로에서 build env로 주입되는 항목:

- `VITE_GA4_ID`
- `VITE_ADSENSE_CLIENT_ID`
- `VITE_SITE_URL`
- `VITE_CONTACT_EMAIL`

위 값들은 서비스 기능/메타데이터 품질에 영향을 줄 수 있으므로, 운영 시점에는 설정을 권장합니다.

---

## 3) GitHub 설정 체크 (재현성 핵심)

- [ ] Repository -> Settings -> Secrets and variables -> Actions에 1) 필수 Secrets 2개 등록
- [ ] Secret 이름이 대소문자까지 정확히 일치
- [ ] `develop` 브랜치로 실제 push 발생
- [ ] Actions 권한이 기본값(read/write tokens)으로 차단되지 않음

---

## 4) (선택) 실패 시 확인용 3단계 검증

### Tier 1: 실행 가능성 검증 (로컬)
- [ ] `cd ai-toolbox-react`
- [ ] `npm ci --legacy-peer-deps`
- [ ] `npm run test -- --run`
- [ ] `npm run build`

### Tier 2: 소규모 파이프라인 검증 (CI)
- [ ] 작은 변경 1건만 커밋 후 `develop`에 push
- [ ] `React App CI/CD` 실행 확인
- [ ] `Lint, test, and build` 성공 확인

### Tier 3: 실제 배포 검증 (Hosting)
- [ ] 같은 run에서 `Deploy to Firebase Hosting` 성공 확인
- [ ] Firebase Hosting URL에서 최신 반영 확인
- [ ] 핵심 페이지(리소스/온보딩/웹교재) 진입 확인

---

## 5) (선택) 자주 실패하는 케이스와 즉시 조치

1. **`Input required and not supplied: firebaseServiceAccount`**
   - 원인: `FIREBASE_SERVICE_ACCOUNT` 누락 또는 이름 오타
   - 조치: Secret 이름/값 재등록 후 재실행

2. **`Failed to authenticate`**
   - 원인: 서비스 계정 JSON 손상 또는 권한 부족
   - 조치: 키 재발급 후 JSON 원문 전체 재등록

3. **`projectId` 관련 오류**
   - 원인: `FIREBASE_PROJECT_ID` 불일치
   - 조치: Firebase Console의 실제 프로젝트 ID로 교체

---

## 6) 운영 원칙 (혼선 방지)

- 배포 타깃 분리 유지:
  - `master` -> GitHub Pages
  - `develop` -> Firebase Hosting
- 실험 시 한 번에 한 변수만 변경:
  - 예: 먼저 Secret 이름만 수정 -> 재실행
  - 다음 실험에서만 권한/값 변경

---

## 7) (선택) Secrets 입력값 예시 + JSON 처리 주의점

아래 예시는 **형식 참고용 더미 값**입니다. 실제 키/토큰은 절대 문서나 코드에 남기지 마세요.

### 7-1) `FIREBASE_PROJECT_ID` 예시

```text
my-company-web-prod
```

### 7-2) `FIREBASE_SERVICE_ACCOUNT` 예시 (구조)

```json
{
  "type": "service_account",
  "project_id": "my-company-web-prod",
  "private_key_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...snip...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxx@my-company-web-prod.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### 7-3) 붙여넣기 실수 방지 체크리스트

- [ ] JSON 전체를 처음 `{`부터 마지막 `}`까지 통째로 복사했는가
- [ ] `private_key` 내부의 `\\n`을 임의로 지우거나 실제 개행으로 바꾸지 않았는가
- [ ] JSON 키 이름(`project_id`, `client_email` 등)을 수정하지 않았는가
- [ ] GitHub Secret 이름(`FIREBASE_SERVICE_ACCOUNT`)을 정확히 입력했는가
- [ ] Secret 값 앞뒤 공백이 들어가지 않았는가

> 특히 `private_key` 형식이 깨지면 `Failed to authenticate`가 거의 확정적으로 발생합니다.

---

## 8) (선택) 10분 운영 매뉴얼 (복붙용 순서)

### Step A. Secrets 등록
1. GitHub 저장소 -> Settings -> Secrets and variables -> Actions
2. `New repository secret` 클릭
3. 아래 2개를 정확한 이름으로 저장
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_SERVICE_ACCOUNT`

### Step B. 최소 변경 커밋 후 `develop` push
- 문서 한 줄 변경 등 작은 수정 1건으로 테스트 트리거
- 한 번에 여러 설정을 바꾸지 않음(원인 분리 목적)

### Step C. Actions 결과 확인
- `React App CI/CD` 실행 열기
- `Lint, test, and build` -> success
- `Deploy to Firebase Hosting` -> success

### Step D. 실제 서비스 검증
- Firebase Hosting URL 접속
- 최신 변경 반영 여부 + 핵심 페이지 진입 확인

### Step E. 실패 시 즉시 되돌아가기
- 에러 메시지에서 누락 키/인증 에러 확인
- 해당 Secret만 수정 후 재실행 (다른 변수는 건드리지 않음)

