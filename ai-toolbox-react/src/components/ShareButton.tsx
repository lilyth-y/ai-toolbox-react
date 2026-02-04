import React, { FC } from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon
} from 'react-share';
import { Copy } from 'lucide-react';
import { useToast } from '@context/ToastContext';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface ShareButtonProps {
  url?: string;
  title?: string;
}

const ShareButton: FC<ShareButtonProps> = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = "AI Toolbox - 최고의 AI 도구 모음" 
}) => {
  const { addToast } = useToast();
  const { t } = useAppTranslation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast(t('share.copied') || "링크가 복사되었습니다! 📋", "success");
    } catch (err) {
      console.error('Failed to copy:', err);
      addToast(t('share.error') || "복사에 실패했습니다.", "error");
    }
  };

  return (
    <div className="share-buttons" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LineShareButton url={url} title={title}>
        <LineIcon size={32} round />
      </LineShareButton>

      <button
        onClick={handleCopy}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--glass-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)'
        }}
        aria-label={t('share.copy') || "링크 복사"}
      >
        <Copy size={16} />
      </button>
    </div>
  );
};

export default ShareButton;
