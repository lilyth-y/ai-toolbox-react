import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { CONFIG } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: FC<SEOProps> = ({ title, description, keywords, image, url }) => {
  const siteTitle = CONFIG.SITE_TITLE;
  const siteUrl = CONFIG.SITE_URL;
  const defaultDescription = "학생과 교육자를 위한 최고의 AI 도구 모음. 프롬프트 엔지니어링부터 AI 도구 발견까지, 무료 학습 허브.";
  const defaultKeywords = "AI tools, education, students, prompt engineering, ChatGPT, Gemini, AI learning, 프롬프트";
  const defaultImage = `${siteUrl}/og-image.png`;

  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - AI 도구 & 학습 허브`;
  const pageDescription = description || defaultDescription;
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const pageImage = image || defaultImage;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:site" content="@aitoolbox" />
      <meta name="twitter:creator" content="@aitoolbox" />

      {/* 추가 메타 태그 */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={siteTitle} />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      
      {/* Microsoft */}
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Helmet>
  );
};

export default SEO;
