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

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', keyInput);
    onClose();
  };

  if (!isOpen) return null;

  // Modal이 열릴 때 현재 API 키로 input 초기화
  if (isOpen && keyInput === '') {
    setKeyInput(localStorage.getItem('gemini_api_key') || '');
  }

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
          {t('settings.privacy') || '키는 브라우저(로컬)에만 저장되며 외부로 전송되지 않습니다.'}
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
