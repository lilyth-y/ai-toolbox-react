import React, { useEffect, useRef, FC, CSSProperties } from 'react';
import { CONFIG } from '@/constants';

/**
 * Google AdSense Banner Component
 * 
 * Usage:
 * <AdBanner slot="1234567890" format="auto" />
 * 
 * Before using:
 * 1. Replace AD_CLIENT_ID with your AdSense publisher ID (ca-pub-XXXXXXXXXX)
 * 2. Add the AdSense script to index.html <head>
 * 3. Get ad slot IDs from your AdSense dashboard
 */

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'fluid';
  responsive?: boolean;
  style?: CSSProperties;
  className?: string;
  targetRole?: 'student' | 'educator' | 'researcher' | 'all';
  layoutKey?: string;
}

// Your AdSense Publisher ID
const AD_CLIENT_ID = CONFIG.ADSENSE_CLIENT_ID;

const AdBanner: FC<AdBannerProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
  targetRole = 'all',
  layoutKey,
  ...props
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // Only load ad once
    if (isLoaded.current) return;

    try {
      // Check if AdSense script is loaded
      if ((window as any).adsbygoogle && adRef.current) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.warn('AdSense not loaded:', error);
    }
  }, []);

  // Development mode placeholder
  const isDev = import.meta.env.DEV;

  if (isDev) {
    const placeholderText =
      targetRole === 'student' ? '대학생을 위한 특별 혜택' :
        targetRole === 'educator' ? '교육자를 위한 AI 솔루션' :
          'AI 도구 추천 광고';

    return (
      <div
        className={`ad-placeholder glass-panel ${className}`}
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 46, 0.8) 0%, rgba(45, 45, 68, 0.8) 100%)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: format === 'fluid' ? '100%' : 'auto',
          ...style
        }}
      >
        <div style={{ marginBottom: '8px', fontSize: '1.2rem' }}>✨ Sponsored</div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {placeholderText}
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
          AdSense Slot: {slot || 'auto'} ({format})
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ overflow: 'hidden', minHeight: '100px', background: 'rgba(255,255,255,0.02)', ...style }}>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: '4px' }}>
        Sponsored
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px' }}
        data-ad-client={AD_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
};

// Preset banner sizes
export const AdBannerHorizontal: FC<{ slot?: string; role?: 'student' | 'educator' | 'researcher' | 'all' }> = ({ slot, role }) => {
  return (
    <AdBanner
      slot={slot}
      targetRole={role}
      format="horizontal"
      style={{ minHeight: '90px', marginTop: '32px', marginBottom: '32px' }}
      className="ad-horizontal"
    />
  );
};

export const AdBannerInFeed: FC<{ slot?: string; role?: 'student' | 'educator' | 'researcher' | 'all'; layoutKey?: string }> = ({ slot, role, layoutKey }) => {
  return (
    <AdBanner
      slot={slot}
      targetRole={role}
      layoutKey={layoutKey}
      format="fluid"
      style={{
        height: '100%',
        minHeight: '280px',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
      className="ad-infeed"
    />
  );
};

export default AdBanner;
