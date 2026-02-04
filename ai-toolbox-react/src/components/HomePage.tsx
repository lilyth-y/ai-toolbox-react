import React, { useState } from 'react';
import Wizard from './Wizard';
import TrendingSection from './TrendingSection';
import { allTools, Tool } from '@data/tools';
import { ExternalLink, Heart, Sparkles, Star } from 'lucide-react';
import { useAppTranslation } from '@hooks/useAppTranslation';
import EvaluationModal from './EvaluationModal';

interface HomePageProps {
  gemini?: unknown;
}

const HomePage: React.FC<HomePageProps> = () => {
  const { t } = useAppTranslation();
  const [selectedEvalTool, setSelectedEvalTool] = useState<Tool | null>(null);

  // Get featured tools - limit to 14 for a richer look
  const featuredTools = allTools.filter(tool => tool.featured).slice(0, 14);

  return (
    <>
      {/* Evaluation Modal */}
      {selectedEvalTool && (
        <EvaluationModal
          tool={selectedEvalTool}
          onClose={() => setSelectedEvalTool(null)}
        />
      )}

      {/* Wizard Section */}
      <Wizard />

      {/* Trending Categories Section */}
      <TrendingSection />

      {/* Featured Tools Grid */}
      <section className="featured-section">
        <h2>{t('tools.trending') || 'Featured'} AI Tools</h2>
        <div className="tools-grid">
          {featuredTools.map((tool) => {
            return (
              <div key={tool.id} className="tool-card">
                <div className="social-proof-column">
                  <button className="social-btn upvote-btn" title={t('tools.upvote') || 'Upvote'}>
                    <span className="social-icon">▲</span>
                    <span className="social-count">
                      {tool.upvotes ? (tool.upvotes >= 1000 ? `${(tool.upvotes / 1000).toFixed(1)}k` : tool.upvotes) : '0'}
                    </span>
                  </button>
                  <button className="social-btn save-btn" title={t('tools.toggleBookmark') || 'Save'}>
                    <Heart size={16} />
                    <span className="social-count">
                      {tool.saves ? (tool.saves >= 1000 ? `${(tool.saves / 1000).toFixed(1)}k` : tool.saves) : '0'}
                    </span>
                  </button>
                </div>
                <div className="tool-main-content">
                  <div className="card-top">
                    <div className="tool-icon">
                      {typeof tool.logo === 'function'
                        ? React.createElement(tool.logo as any, { size: 36 })
                        : React.isValidElement(tool.logo)
                          ? tool.logo
                          : typeof tool.logo === 'string'
                            ? tool.logo
                            : '🔧'}
                    </div>
                    <div className="tool-badges">
                      {tool.price === 'free_edu' && <span className="badge edu">{t('tools.eduFree')}</span>}
                      {tool.price === 'paid' && <span className="badge paid">{t('tools.paid')}</span>}
                    </div>
                  </div>
                  <h3>
                    {tool.name}
                    {tool.verified && <span className="verified-badge" title={t('tools.verified') || 'Verified'}>✓</span>}
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="external-link-icon">
                      <ExternalLink size={14} />
                    </a>
                  </h3>
                  <div className="card-mid-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {tool.rating && (
                      <div className="tool-rating">
                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                        <span>{tool.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {tool.evaluation && (
                      <button className="eval-btn" onClick={() => setSelectedEvalTool(tool)}>
                        <Sparkles size={12} />
                        {t('tools.viewEval') || 'AI 평가'}
                      </button>
                    )}
                  </div>

                  <p className="tool-desc">{tool.desc}</p>
                </div>
                <div className="card-footer">
                  <div className="footer-top">
                    <div className="tags-row">
                      {tool.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag-text">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={tool.affiliateUrl || tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visit-btn"
                  >
                    {t('common.open') || 'Open'} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HomePage;
