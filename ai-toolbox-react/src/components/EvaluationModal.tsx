import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Tool } from '../data/tools';
import { useAppTranslation } from '../hooks/useAppTranslation';

interface EvaluationModalProps {
  tool: Tool;
  onClose: () => void;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ tool, onClose }) => {
  const { t } = useAppTranslation();
  const evaluation = tool.evaluation;

  if (!evaluation) return null;

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div className="modal-content evaluation-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="eval-header">
          <div className="eval-tool-info">
            <div className="eval-icon">
              {typeof tool.logo === 'function'
                ? React.createElement(tool.logo as any, { size: 40 })
                : <span>🔧</span>}
            </div>
            <div>
              <h3>{tool.name} {t('tools.evaluation') || '상세 평가'}</h3>
              <div className="eval-best-for">
                <Sparkles size={14} />
                <span>{evaluation.bestFor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="eval-grid">
          {/* Pros Section */}
          <div className="eval-section pros">
            <h4><CheckCircle2 size={18} className="icon-green" /> {t('tools.pros') || '강점'}</h4>
            <ul>
              {evaluation.pros.map((pro, idx) => (
                <li key={idx}>{pro}</li>
              ))}
            </ul>
          </div>

          {/* Cons Section */}
          <div className="eval-section cons">
            <h4><AlertCircle size={18} className="icon-red" /> {t('tools.cons') || '약점'}</h4>
            <ul>
              {evaluation.cons.map((con, idx) => (
                <li key={idx}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="eval-summary">
          <h4>📝 {t('tools.summary') || '총평'}</h4>
          <p>{evaluation.summary}</p>
        </div>

        <div className="eval-footer">
          <a
            href={tool.affiliateUrl || tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-btn"
          >
            {t('common.open') || 'Open'} {tool.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
