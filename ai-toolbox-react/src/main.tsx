import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './i18n/config'; // Initialize i18n before App
import App from './App'
import './index.css'

// 🔒 Production Protection (Anti-Copy Measures)
if (import.meta.env.PROD) {
  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable common dev tools shortcuts
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault();
      return false;
    }
  });

  // Console warning message
  const warningStyle = 'color: #ef4444; font-size: 24px; font-weight: bold;';
  const infoStyle = 'color: #64748b; font-size: 14px;';

  // eslint-disable-next-line no-console
  console.log('%c⚠️ 경고!', warningStyle);
  // eslint-disable-next-line no-console
  console.log('%c이 브라우저 기능은 개발자를 위한 것입니다.', infoStyle);
  // eslint-disable-next-line no-console
  console.log('%c누군가 여기에 무언가를 붙여넣으라고 했다면, 사기일 가능성이 있습니다.', infoStyle);
  // eslint-disable-next-line no-console
  console.log('%c© 2026 AI Toolbox - All rights reserved.', infoStyle);

  // Detect DevTools open (basic detection)
  const detectDevTools = () => {
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      // eslint-disable-next-line no-console
      console.clear();
      // eslint-disable-next-line no-console
      console.log('%c🛑 Developer Tools Detected', warningStyle);
    }
  };

  window.addEventListener('resize', detectDevTools);
  setInterval(detectDevTools, 1000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
