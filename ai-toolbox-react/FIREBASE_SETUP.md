# Firebase Cloud Functions 배포 가이드

## 개요

Firebase Cloud Functions를 통해 Gemini API 키를 서버에서 안전하게 관리합니다.

## 설정 단계

### 1. Firebase 프로젝트 초기화

```bash
cd firebase-functions
firebase init functions
```

### 2. 필수 패키지 설치

```bash
cd functions
npm install
npm run build
```

### 3. Gemini API 키 설정

Firebase Secret Manager에 Gemini API 키를 추가합니다:

```bash
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
```

또는 Secret Manager 사용 (권장):

```bash
# Create secret
gcloud secrets create GEMINI_API_KEY --data-file=- <<< "YOUR_API_KEY"

# Grant access to Cloud Functions
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member=serviceAccount:YOUR_PROJECT_ID@appspot.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor
```

### 4. 로컬 테스트

```bash
# 에뮬레이터 시작
firebase emulators:start --only functions

# 함수 테스트
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/geminiProxy \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, world!"}'
```

### 5. 배포

```bash
# 단일 함수 배포
firebase deploy --only functions:geminiProxy

# 모든 함수 배포
firebase deploy --only functions
```

## 환경 변수 설정

### .env.example 업데이트

```
VITE_GEMINI_PROXY_URL=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/geminiProxy
```

### 클라이언트에서 사용

```typescript
const functionUrl = import.meta.env.VITE_GEMINI_PROXY_URL;

const response = await fetch(functionUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Your prompt' })
});
```

## API 엔드포인트

### POST /geminiProxy
Gemini API 프록시 함수

**Request:**
```json
{
  "prompt": "Your prompt here",
  "model": "gemini-pro" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": "Generated response"
}
```

### GET /apiHealth
API 헬스 체크

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-03T12:00:00Z",
  "version": "1.0.0"
}
```

## 보안 베스트 프랙티스

✅ **구현된 사항:**
- API 키는 Secret Manager에 저장
- CORS 설정으로 승인된 도메인만 접근 가능
- 클라이언트에서 API 키 노출 없음
- POST 요청만 허용

⚠️ **추가 권장 사항:**
1. **Rate Limiting** - 사용자당 요청 수 제한
2. **Authentication** - Firebase Auth와 연계
3. **Request Validation** - prompt 길이 제한
4. **Logging & Monitoring** - Cloud Logging으로 모니터링

## 문제 해결

### CORS 오류
```javascript
// functions/src/index.ts에서 허용 도메인 설정
const corsHandler = cors({
  origin: [
    'https://yourdomain.com',
    'http://localhost:5173'
  ]
});
```

### 401 Unauthorized
- Secret Manager 접근 권한 확인
- Service Account 권한 확인

### 함수 실행 오류
```bash
firebase functions:log
```

## 비용 최적화

- **프리 티어**: 월 200만 요청 무료
- **과금 기준**: 호출당 $0.40, 컴퓨팅 시간 $0.0000025/100ms
- **모니터링**: Firebase Console에서 사용량 추적

## 참고 자료

- [Firebase Functions 문서](https://firebase.google.com/docs/functions)
- [Secret Manager](https://cloud.google.com/secret-manager/docs)
- [Gemini API 문서](https://ai.google.dev/tutorials/python_quickstart)
