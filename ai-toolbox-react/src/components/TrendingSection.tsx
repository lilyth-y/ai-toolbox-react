import React from 'react';
import { Link } from 'react-router-dom';
import { useAppTranslation } from '@hooks/useAppTranslation';
import {
  Flame,
  MessageSquare,
  Image,
  Video,
  Code2,
  Search,
  PenTool,
  Presentation,
  Zap
} from 'lucide-react';

interface TrendingCategory {
  id: string;
  labelKey: string;
  icon: React.ElementType;
  filter: string;
}

const trendingCategories: TrendingCategory[] = [
  { id: 'chat', labelKey: 'filter.chat', icon: MessageSquare, filter: 'text' },
  { id: 'image', labelKey: 'filter.image', icon: Image, filter: 'image' },
  { id: 'video', labelKey: 'filter.video', icon: Video, filter: 'video' },
  { id: 'code', labelKey: 'filter.code', icon: Code2, filter: 'code' },
  { id: 'research', labelKey: 'filter.research', icon: Search, filter: 'research' },
  { id: 'writing', labelKey: 'filter.writing', icon: PenTool, filter: 'text' },
  { id: 'productivity', labelKey: 'filter.productivity', icon: Presentation, filter: 'productivity' },
  { id: 'automation', labelKey: 'tools.automation', icon: Zap, filter: 'automation' },
];

const TrendingSection: React.FC = () => {
  const { t } = useAppTranslation();

  return (
    <section className="trending-section">
      <div className="trending-header">
        <Flame className="trending-icon" size={24} />
        <h2>{t('tools.trending') || 'Trending'} Categories</h2>
      </div>
      <p className="trending-subtitle">
        {t('tools.description') || 'Explore our editorial favorites and popular AI tools'}
      </p>
      <div className="trending-pills">
        {trendingCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/explore?filter=${cat.filter}`}
            className="trending-pill"
          >
            <cat.icon size={16} />
            <span>{t(cat.labelKey) || cat.id}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
