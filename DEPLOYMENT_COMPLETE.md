# 🌍 Deployment Status: AI Toolbox

## ✅ Current Deployment (Production - ai-toolbox-production)

### Live Sites
- **Frontend Hosting**: https://ai-toolbox-production.web.app
  - React TypeScript app with i18n support (English, Korean)
  - PWA-enabled with offline support
  - Build: 906KB (gzipped), 1934 modules

### Cloud Functions (Secure API Proxy)
- **geminiProxy**: https://geminiproxy-bets44rt4q-uc.a.run.app
  - Handles Gemini API requests securely server-side
  - API key stored in Cloud Secret Manager (not exposed to frontend)
  - Processes prompts and returns AI responses

- **apiHealth**: https://us-central1-ai-toolbox-production.cloudfunctions.net/apiHealth
  - Health check endpoint
  - Returns: `{"status":"ok","timestamp":"...","version":"1.0.0"}`

## Infrastructure

- **GCP Project**: ai-toolbox-production
- **Billing**: Blaze (pay-as-you-go)
- **Firebase Services**:
  - Hosting (v1)
  - Functions (v2, Node.js 20)
  - Cloud Build
  - Secret Manager
  
- **APIs Enabled**:
  - Cloud Functions
  - Cloud Build
  - Artifact Registry
  - Secret Manager
  - Generative Language (Gemini)
  - Cloud Run
  - Eventarc
  - Pub/Sub
  - Cloud Storage

## 🔒 Security Architecture

### API Key Management
- **GEMINI_API_KEY** stored in Google Cloud Secret Manager
- **Only accessible** to Cloud Functions service account
- **Never exposed** to frontend or client-side code
- Access logs available in GCP console

### Frontend Setup
- Environment variable: `VITE_GEMINI_PROXY_URL`
- Points to: `https://geminiproxy-bets44rt4q-uc.a.run.app`
- All Gemini requests proxied through Cloud Functions
- CORS-enabled for cross-origin requests

## 📝 Configuration Files

### .firebaserc (Project Mapping)
```json
{
  "projects": {
    "default": "ai-toolbox-production",
    "portfolio": "ai-toolbox-portfolio"
  }
}
```

### .env (Frontend Environment)
```
VITE_GEMINI_PROXY_URL=https://geminiproxy-bets44rt4q-uc.a.run.app
VITE_GA4_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
VITE_SITE_TITLE=AI Toolbox
VITE_SITE_URL=https://ai-toolbox-production.web.app
```

## 🚀 How to Deploy

### Deploy Everything
```bash
firebase deploy --project=ai-toolbox-production
```

### Deploy Only Frontend
```bash
npm run build
firebase deploy --only "hosting" --project=ai-toolbox-production
```

### Deploy Only Functions
```bash
cd firebase-functions/functions
npm run build
cd ../..
firebase deploy --only "functions" --project=ai-toolbox-production
```

## 🔧 Updating GEMINI_API_KEY Secret

To update the API key in Cloud Secret Manager:
```bash
echo -n "YOUR_NEW_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
```

## 📊 Monitoring

View deployment status and logs:
- **Firebase Console**: https://console.firebase.google.com/project/ai-toolbox-production/overview
- **GCP Console**: https://console.cloud.google.com/
- **Cloud Functions Logs**: Cloud Logging → Cloud Functions → geminiProxy

## 🔄 Portfolio Backup

Legacy hosting also maintained at:
- https://ai-toolbox-portfolio.web.app (Portfolio project)
- Useful as backup or staging environment
