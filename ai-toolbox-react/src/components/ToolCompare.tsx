import React, { useState, FC } from 'react';
import { X, Plus, Scale, ExternalLink } from 'lucide-react';
import { allTools as tools, Tool } from '@data/tools';
import { useAppTranslation } from '@hooks/useAppTranslation';

interface ToolCompareProps {
  onClose: () => void;
}

const ToolCompare: FC<ToolCompareProps> = ({ onClose }) => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { t } = useAppTranslation();

  const addTool = (tool: Tool) => {
    if (selectedTools.length < 3 && !selectedTools.find(t => t.name === tool.name)) {
      setSelectedTools([...selectedTools, tool]);
    }
    setIsSelectOpen(false);
  };

  const removeTool = (toolName: string) => {
    setSelectedTools(selectedTools.filter(t => t.name !== toolName));
  };

  const availableTools = tools.filter(t => !selectedTools.find(s => s.name === t.name));

  const getPriceLabel = (price: string): string => {
    if (price === 'free_edu') return t('tools.eduFree') || '교육용 무료';
    if (price === 'paid') return t('tools.paid') || '유료';
    return t('tools.free') || '무료';
  };

  return (
    <div className="compare-modal-overlay" onClick={onClose}>
      <div className="compare-modal" onClick={e => e.stopPropagation()}>
        <div className="compare-header">
          <div className="compare-title">
            <Scale size={24} />
            <h2>{t('tools.compare') || '도구 비교'}</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label={t('common.close') || "닫기"}>
            <X size={20} />
          </button>
        </div>

        <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${Math.max(selectedTools.length, 1)}, 1fr)` }}>
          {selectedTools.map(tool => (
            <div key={tool.name} className="compare-card">
              <button
                className="remove-tool-btn"
                onClick={() => removeTool(tool.name)}
                aria-label={t('tools.removeTool') || `${tool.name} 제거`}
              >
                <X size={16} />
              </button>
              <div className="compare-card-header">
                <div className="tool-icon">
                  <tool.logo size={24} />
                </div>
                <h3>{tool.name}</h3>
              </div>
              <p className="tool-desc">{tool.desc}</p>

              <div className="compare-details">
                <div className="detail-row">
                  <span className="detail-label">{t('tools.price') || '가격'}</span>
                  <span className={`badge ${tool.price === 'free_edu' ? 'edu' : tool.price === 'paid' ? 'paid' : ''}`}>
                    {getPriceLabel(tool.price)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{t('tools.tags') || '태그'}</span>
                  <div className="tags-row">
                    {tool.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag-text">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                {t('tools.visit') || '방문하기'} <ExternalLink size={14} />
              </a>
            </div>
          ))}

          {selectedTools.length < 3 && (
            <div className="compare-card add-card">
              {isSelectOpen ? (
                <div className="tool-select-dropdown">
                  {availableTools.slice(0, 6).map(tool => (
                    <button
                      key={tool.name}
                      className="tool-select-item"
                      onClick={() => addTool(tool)}
                    >
                      <tool.logo size={20} />
                      {tool.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  className="add-tool-btn"
                  onClick={() => setIsSelectOpen(true)}
                  aria-label={t('tools.addTool') || "도구 추가"}
                >
                  <Plus size={32} />
                  <span>{t('tools.addTool') || '도구 추가'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {selectedTools.length === 0 && (
          <p className="compare-hint">
            {t('tools.compareHint') || '비교할 도구를 최대 3개까지 선택하세요.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ToolCompare;
