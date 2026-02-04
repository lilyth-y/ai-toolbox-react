# AI Toolbox Icon Placeholder

이 디렉토리에는 다음 아이콘 파일들이 필요합니다:

## 필수 아이콘 파일

### Favicon
- **favicon.ico** (32x32 또는 16x16)
  - 브라우저 탭에 표시되는 아이콘

### PWA 아이콘
- **icon-192.png** (192x192)
  - Android Chrome 홈 화면 아이콘
  
- **icon-512.png** (512x512)
  - Android Chrome 스플래시 화면
  - Maskable icon으로도 사용

- **apple-touch-icon.png** (180x180)
  - iOS Safari 홈 화면 아이콘

### OG (Open Graph) 이미지
- **og-image.png** (1200x630)
  - 소셜 미디어 공유 시 미리보기 이미지
  - Facebook, Twitter, LinkedIn 등

## 아이콘 생성 방법

### 1. 온라인 도구 사용
- [Favicon Generator](https://favicon.io/)
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)

### 2. 디자인 소프트웨어
- Figma, Sketch, Adobe Illustrator 등에서 디자인
- 각 크기별로 export

### 3. 커맨드라인 도구
```bash
# ImageMagick으로 리사이즈
convert original.png -resize 192x192 icon-192.png
convert original.png -resize 512x512 icon-512.png
```

## 디자인 가이드라인

### 색상
- Primary: `#6366f1` (Indigo)
- Background: `#0f172a` (Dark Blue)
- Accent: `#8b5cf6` (Purple)

### 컨셉
- AI/Tech 관련 아이콘
- 간결하고 모던한 디자인
- 다크/라이트 모드 모두 고려

### 예시 아이디어
- 🤖 로봇 아이콘
- 🧠 뇌/AI 네트워크
- ⚡ 번개/에너지 심볼
- 🎯 타겟/정확도 표현

## 배치 후 확인사항

모든 아이콘을 `public/` 폴더에 배치한 후:

```bash
# 빌드 테스트
npm run build

# manifest.json 확인
# dist/manifest.webmanifest 파일이 생성되었는지 확인
```

## 임시 플레이스홀더

아이콘이 준비되기 전까지는 다음과 같이 텍스트 기반 임시 파일을 사용할 수 있습니다:

```bash
# SVG를 PNG로 변환하는 스크립트 (Node.js 필요)
# 또는 온라인 SVG to PNG 변환기 사용
```

---

**참고**: PWA 기능이 제대로 작동하려면 최소한 192x192와 512x512 아이콘이 필요합니다.
