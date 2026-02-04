# 🚀 배포 전 체크리스트

배포하기 전에 아래 항목들을 반드시 확인하세요!

## ✅ 필수 설정 항목 (P0)

### 1. 환경변수 설정
`.env` 파일을 생성하고 실제 값으로 교체하세요:

```bash
# .env.example 파일을 복사
cp .env.example .env

# 또는 Windows에서
copy .env.example .env
```

다음 값들을 실제로 발급받아 입력:
- [ ] `VITE_GA4_ID`: [Google Analytics](https://analytics.google.com/)에서 발급
- [ ] `VITE_ADSENSE_CLIENT_ID`: [Google AdSense](https://adsense.google.com/)에서 발급
- [ ] `VITE_AD_SLOT_*`: AdSense 광고 단위 생성 후 슬롯 ID 입력
- [ ] `VITE_SITE_URL`: 실제 배포할 도메인 주소
- [ ] `VITE_CONTACT_EMAIL`: 실제 연락 가능한 이메일

### 2. constants.js 확인
`src/constants.js` 파일에서 기본값들이 더미 값이 아닌지 확인:
- [ ] `GA4_MEASUREMENT_ID`가 `G-XXXXXXXXXX`가 아닌 실제 값인지
- [ ] `ADSENSE_CLIENT_ID`가 본인 것인지 확인
- [ ] `SITE_URL`이 실제 도메인인지

### 3. 빌드 테스트
```bash
npm run build
npm run preview
```
- [ ] 빌드 에러 없이 완료
- [ ] 프리뷰에서 모든 기능 정상 작동

## 🔒 보안 체크

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있음
- [ ] Git에 API 키나 민감한 정보가 커밋되지 않았음
- [ ] `package-lock.json` 의존성 보안 취약점 확인:
  ```bash
  npm audit
  npm audit fix
  ```

## 📊 SEO & 메타데이터

- [ ] `public/sitemap.xml` 업데이트
- [ ] `public/robots.txt` 확인
- [ ] OG 이미지 준비 (1200x630px) → `public/og-image.png`
- [ ] Favicon 추가 → `public/favicon.ico`

## 🎨 콘텐츠 최종 확인

- [ ] 모든 외부 링크가 작동하는지
- [ ] 이미지와 아이콘이 올바르게 표시되는지
- [ ] 다크/라이트 모드 전환이 정상 작동하는지
- [ ] 모바일에서 레이아웃이 깨지지 않는지

## 🚀 배포 방법

### Firebase Hosting

```bash
# Firebase CLI 설치 (최초 1회)
npm install -g firebase-tools

# 로그인
firebase login

# 프로젝트 초기화 (최초 1회)
firebase init hosting

# 빌드
npm run build

# 배포
firebase deploy
```

**firebase.json 확인**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"
    }]
  }
}
```

### Netlify

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# 빌드 & 배포
npm run build
netlify deploy --prod --dir=dist
```

또는 **Netlify 웹사이트에서 드래그 앤 드롭**:
1. [Netlify Drop](https://app.netlify.com/drop)에 접속
2. `dist` 폴더를 드래그 앤 드롭

### Vercel

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포 (로그인 포함)
vercel
```

## 📈 배포 후 확인사항

- [ ] Google Analytics가 데이터를 수집하는지 확인 (실시간 보고서)
- [ ] Google AdSense 광고가 표시되는지 확인
- [ ] 모든 페이지가 정상적으로 로드되는지
- [ ] HTTPS 인증서가 적용되었는지
- [ ] 성능 점수 확인: [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] SEO 점수 확인: [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

## 🐛 문제 해결

### 빌드 에러
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 환경변수가 적용되지 않음
- Vite는 빌드 시점에 환경변수를 주입합니다
- `.env` 파일 수정 후 반드시 재빌드 필요
- 환경변수는 `VITE_` 접두사가 필수!

### AdSense 광고가 안 보임
- AdSense 승인 대기 중일 수 있음 (최대 2주 소요)
- 광고 차단 확장 프로그램 비활성화 후 확인
- 개발자 도구 콘솔에서 에러 메시지 확인

## 📞 지원

문제가 발생하면:
1. [GitHub Issues](repository-url)에 보고
2. 프로젝트 문서 참고
3. [개선방안.md](../../개선방안.md) 확인

---

**모든 체크리스트를 완료한 후 배포하세요! 🎉**
