import React, { useState, useEffect, FC } from 'react';
import { X } from 'lucide-react';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [keyInput, setKeyInput] = useState('');
  const { t } = useAppTranslation();
  const GEMINI_API_KEY_STORAGE_KEY = 'gemini_api_key';

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const sessionKey = sessionStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
    const legacyLocalKey = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY);
    const activeKey = sessionKey || legacyLocalKey || '';

    if (!sessionKey && legacyLocalKey) {
      sessionStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, legacyLocalKey);
      localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    }

    setKeyInput(activeKey);
  }, [isOpen]);

  const handleSave = () => {
    const trimmedKey = keyInput.trim();
    if (trimmedKey) {
      sessionStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, trimmedKey);
    } else {
      sessionStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    }
    localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={onClose} role="presentation">
      <div 
        className="modal-box" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            ⚙️ {t('settings.title') || 'AI 설정 (BYOK)'}
          </h3>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label={t('common.closeModal') || "모달 닫기"}
          >
            <X />
          </button>
        </div>
        <div id="modal-description" style={{ marginBottom: '24px', color: 'var(--text-sub)', fontSize: '0.95rem' }}>
          {t('settings.description') || 'Google의 Gemini API Key를 입력하면, 시뮬레이터가 아닌 실제 AI가 동작합니다.'}
          <br />
          {t('settings.privacy') || '키는 현재 브라우저 세션에 저장되며, Gemini API 호출 시 Google로 전송됩니다.'}
          <br /><br />
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noreferrer" 
            style={{ color: 'var(--primary-color)' }}
          >
            🔑 {t('settings.getKey') || 'API Key 발급받기 (무료)'}
          </a>
        </div>
        <div className="api-input-group">
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            {t('settings.apiKey') || 'Gemini API Key'}
          </label>
          <input
            type="password"
            className="api-input"
            placeholder="AIzaSy..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            aria-label={t('settings.apiKey') || 'Gemini API Key'}
          />
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            {t('common.close') || '닫기'}
          </button>
          <button className="btn-primary" onClick={handleSave}>
            {t('common.save') || '저장하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
