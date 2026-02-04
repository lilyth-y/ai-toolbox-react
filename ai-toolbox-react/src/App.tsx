import { Suspense, useState, useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { ToolGridSkeleton } from './components/Skeleton';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import SettingsModal from './components/SettingsModal';
import CookieConsent from './components/CookieConsent';
import { useGemini } from './hooks/useGemini';
import { CONFIG } from './constants';

// Lazy loaded components
const ToolExplorer = lazy(() => import('./components/ToolExplorer'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const HomePage = lazy(() => import('./components/HomePage'));

export default function App() {
  const gemini = useGemini();
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Initialize GA4
    ReactGA.initialize(CONFIG.GA4_MEASUREMENT_ID);
  }, []);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <div className="ambient-glow" />
          <Suspense fallback={<AppSkeleton />}>
            <Routes>
              <Route path="/" element={
                <div className="container">
                  <Layout onOpenSettings={() => setSettingsOpen(true)}>
                    <HomePage gemini={gemini} />
                  </Layout>
                </div>
              } />
              <Route path="/tools" element={
                <div className="container">
                  <Layout onOpenSettings={() => setSettingsOpen(true)}>
                    <ToolExplorer />
                  </Layout>
                </div>
              } />
              <Route path="/explore" element={
                <div className="container">
                  <Layout onOpenSettings={() => setSettingsOpen(true)}>
                    <ToolExplorer />
                  </Layout>
                </div>
              } />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
          <CookieConsent />
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

function AppSkeleton() {
  return (
    <div className="container">
      <div className="nav-bar" style={{ marginBottom: '16px' }}>
        <div className="brand-logo" style={{ width: '120px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }} />
      </div>
      <div className="wizard-container" style={{ height: '300px', marginBottom: '40px', background: 'rgba(255,255,255,0.05)' }} />
      <ToolGridSkeleton count={6} />
    </div>
  );
}
