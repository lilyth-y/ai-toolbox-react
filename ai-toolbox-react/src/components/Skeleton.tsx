import React, { FC, CSSProperties } from 'react';

/**
 * Skeleton Loading Component
 * 콘텐츠 로딩 중 표시되는 플레이스홀더
 */

export const ToolCardSkeleton: FC = () => {
  return (
    <div className="tool-card skeleton">
      <div className="card-top">
        <div className="skeleton-icon"></div>
        <div className="skeleton-bookmark"></div>
      </div>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-tags">
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
      </div>
      <div className="skeleton-button"></div>
    </div>
  );
};

interface ToolGridSkeletonProps {
  count?: number;
}

export const ToolGridSkeleton: FC<ToolGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="tools-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ToolCardSkeleton key={i} />
      ))}
    </div>
  );
};

interface TextSkeletonProps {
  width?: string | number;
  height?: string | number;
}

export const TextSkeleton: FC<TextSkeletonProps> = ({ width = '100%', height = '1em' }) => {
  const style: CSSProperties = { width, height };
  
  return (
    <div 
      className="skeleton-text" 
      style={style}
      aria-hidden="true"
    />
  );
};

interface CircleSkeletonProps {
  size?: string;
}

export const CircleSkeleton: FC<CircleSkeletonProps> = ({ size = '40px' }) => {
  const style: CSSProperties = { width: size, height: size };
  
  return (
    <div 
      className="skeleton-circle" 
      style={style}
      aria-hidden="true"
    />
  );
};

// CSS는 index.css에 추가 필요
/*
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: var(--skeleton-color);
}

.skeleton-title {
  width: 70%;
  height: 1.5em;
  margin: 1rem 0 0.5rem;
  background-color: var(--skeleton-color);
  border-radius: 4px;
}

.skeleton-text {
  width: 100%;
  height: 1em;
  margin: 0.5rem 0;
  background-color: var(--skeleton-color);
  border-radius: 4px;
}

.skeleton-tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.skeleton-tag {
  width: 60px;
  height: 24px;
  background-color: var(--skeleton-color);
  border-radius: 12px;
}

.skeleton-button {
  width: 100%;
  height: 40px;
  background-color: var(--skeleton-color);
  border-radius: 8px;
  margin-top: auto;
}

.skeleton-circle {
  border-radius: 50%;
  background-color: var(--skeleton-color);
}

:root {
  --skeleton-color: hsl(200, 20%, 90%);
}

[data-theme="dark"] {
  --skeleton-color: hsl(200, 10%, 25%);
}
*/
