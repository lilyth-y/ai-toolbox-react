import React, { useState, useMemo, useEffect, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from './SEO';
import { Search, ExternalLink, Heart, Scale, Star, Bot, Sparkles } from 'lucide-react';
import { allTools, Tool } from '@data/tools';
import { useToast } from '@context/ToastContext';
import ToolCompare from './ToolCompare';
import { AdBannerInFeed } from './AdBanner';
import { CONFIG } from '@/constants';
import { debounce } from '@utils/helpers';
import { useAppTranslation } from '@hooks/useAppTranslation';
import EvaluationModal from './EvaluationModal';

interface ToolCardProps {
  tool: Tool;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ToolExplorer: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useAppTranslation();

  const searchTerm = searchParams.get('q') || '';
  const activeFilter = searchParams.get('filter') || 'all';

  const setSearchTerm = useMemo(
    () => debounce((term: string) => {
      const newParams = new URLSearchParams(searchParams);
      if (term) newParams.set('q', term);
      else newParams.delete('q');
      setSearchParams(newParams);
    }, 300),
    [searchParams, setSearchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const setActiveFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (filter === 'all') newParams.delete('filter');
    else newParams.set('filter', filter);
    setSearchParams(newParams);
  };

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('tool_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedEvalTool, setSelectedEvalTool] = useState<Tool | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('tool_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bid => bid !== id));
      addToast(t('tools.removedFromBookmarks') || "즐겨찾기에서 제거되었습니다.", "info");
    } else {
      setBookmarks([...bookmarks, id]);
      addToast(t('tools.addedToBookmarks') || "즐겨찾기에 추가되었습니다! ❤️", "success");
    }
  };

  const filters = [
    { id: 'all', label: t('filter.all') || '전체' },
    { id: 'favorites', label: t('filter.favorites') || '❤️ 즐겨찾기' },
    { id: 'freemium', label: t('filter.freemium') || '무료/부분유료' },
    { id: 'paid', label: t('filter.paid') || '유료' },
    { id: 'free_edu', label: t('filter.edu') || '학생/교사 무료' }
  ];

  const filteredTools = useMemo(() => {
    // Debug: Check if all tools are loaded
    console.log('[ToolExplorer] allTools length:', allTools.length);

    const filtered = allTools.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesFilter = true;
      if (activeFilter === 'favorites') {
        matchesFilter = bookmarks.includes(tool.id);
      } else if (activeFilter !== 'all') {
        matchesFilter = tool.price === activeFilter;
      }

      return matchesSearch && matchesFilter;
    });

    console.log('[ToolExplorer] Filtered tools length:', filtered.length);
    return filtered;
  }, [searchTerm, activeFilter, bookmarks]);

  return (
    <div className="tool-explorer fade-in">
      <div className="explorer-header">
        <SEO
          title={t('tools.title') || "도구 탐색"}
          description={t('tools.description') || "다양한 AI 도구를 검색하고 필터링하여 나에게 맞는 최적의 도구를 찾아보세요."}
          url={window.location.href}
        />
        <h2>🚀 {t('tools.title') || 'AI 도구 탐색'}</h2>
        <p>{t('tools.subtitle') || '나에게 딱 맞는 AI 도구를 찾아보세요.'}</p>

        <div className="search-bar-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder={t('tools.searchPlaceholder') || "도구 이름, 기능, 키워드 검색..."}
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label={t('tools.searchLabel') || "AI 도구 검색"}
            aria-describedby="search-description"
            role="searchbox"
          />
          <span id="search-description" className="sr-only">
            {t('tools.searchHint') || "도구 이름, 기능, 키워드로 AI 도구를 검색할 수 있습니다"}
          </span>
        </div>

        <div className="filter-chips">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
          <button
            className="compare-trigger-btn"
            onClick={() => setIsCompareOpen(true)}
            aria-label={t('tools.compare') || "도구 비교하기"}
          >
            <Scale size={18} />
            {t('tools.compare') || '비교'}
          </button>
        </div>
      </div>

      {isCompareOpen && <ToolCompare onClose={() => setIsCompareOpen(false)} />}
      {selectedEvalTool && (
        <EvaluationModal
          tool={selectedEvalTool}
          onClose={() => setSelectedEvalTool(null)}
        />
      )}

      <div className="tools-grid">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <React.Fragment key={tool.id}>
              <ToolCard
                tool={tool}
                isBookmarked={bookmarks.includes(tool.id)}
                onToggleBookmark={() => toggleBookmark(tool.id)}
                onShowEvaluation={() => setSelectedEvalTool(tool)}
              />
              {/* Inject Ad after 6th item */}
              {index === 5 && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <AdBannerInFeed
                    slot={CONFIG.AD_SLOTS.TOOL_INFEED}
                    layoutKey={CONFIG.AD_SLOTS.TOOL_INFEED_LAYOUT_KEY}
                    role="student"
                  />
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="no-results">
            <p>{t('tools.noResults') || '조건에 맞는 도구가 없습니다. 🤔'}</p>
            <button
              className="reset-search"
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
            >
              {t('tools.resetFilter') || '필터 초기화'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ToolCardProps {
  tool: Tool;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShowEvaluation: () => void;
}

const ToolCard: FC<ToolCardProps> = ({ tool, isBookmarked, onToggleBookmark, onShowEvaluation }) => {
  const { t } = useAppTranslation();

  const handleAffiliateClick = () => {
    // Basic tracking (can be connected to GA4 later)
    // eslint-disable-next-line no-console
    console.log(`[Affiliate Click] Tool: ${tool.name}, Link: ${tool.affiliateUrl || tool.url}`);
  };

  const formatCount = (count: number | undefined): string => {
    if (!count) return '0';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className="tool-card">
      {/* Social Proof Column */}
      <div className="social-proof-column">
        <button className="social-btn upvote-btn" title={t('tools.upvote') || 'Upvote'}>
          <span className="social-icon">▲</span>
          <span className="social-count">{formatCount(tool.upvotes)}</span>
        </button>
        <button
          onClick={onToggleBookmark}
          className={`social-btn save-btn ${isBookmarked ? 'active' : ''}`}
          title={t('tools.toggleBookmark') || 'Save'}
        >
          <Heart size={16} fill={isBookmarked ? "#db2777" : "none"} />
          <span className="social-count">{formatCount(tool.saves)}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="tool-main-content">
        <div className="card-top">
          <div className="tool-icon">
            {typeof tool.logo === 'function'
              ? React.createElement(tool.logo as React.ComponentType<{ size: number }>, { size: 36 })
              : <Bot size={36} />}
          </div>
          <div className="tool-badges">
            {tool.price === 'free_edu' && <span className="badge edu">{t('tools.eduFree') || '교육용 무료'}</span>}
            {tool.price === 'paid' && <span className="badge paid">{t('tools.paid') || '유료'}</span>}
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
            <button className="eval-btn" onClick={onShowEvaluation}>
              <Sparkles size={12} />
              {t('tools.viewEval') || 'AI 평가'}
            </button>
          )}
        </div>
        {tool.evaluation?.bestFor && (
          <div className="eval-best-for" style={{ fontSize: '0.75rem', padding: '2px 8px', marginBottom: '12px' }}>
            {tool.evaluation.bestFor}
          </div>
        )}
        <p className="tool-desc">{tool.desc}</p>

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
            onClick={handleAffiliateClick}
          >
            {t('common.open') || 'Open'} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};


export default ToolExplorer;
