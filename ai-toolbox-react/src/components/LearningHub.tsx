import React, { useState, FC } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppTranslation } from '@hooks/useAppTranslation';

const LearningHub: FC = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const { t } = useAppTranslation();

  const toggleModule = (id: number) => {
    setOpenModule(openModule === id ? null : id);
  };

  const modules = [
    {
      id: 1,
      title: 'Chapter 1: 프롬프트 엔지니어링 기초',
      items: ['명확한 지시사항 작성법', '컨텍스트 제공하기', '역할 정의하기']
    },
    {
      id: 2,
      title: 'Chapter 2: 고급 기법',
      items: ['Chain of Thought 프롬프팅', 'Few-shot 예제 활용', '프롬프트 최적화']
    },
    {
      id: 3,
      title: 'Chapter 3: 실전 사례',
      items: ['이메일 자동 작성', '코드 리뷰 받기', '아이디어 브레인스토밍']
    }
  ];

  return (
    <div className="learning-hub" id="learning">
      <div className="section-header">
        <h2 className="section-title">
          <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: '10px', color: '#6366f1' }}>
            <BookOpen size={40} />
          </span>
          {t('learning.title') || 'AI 러닝 허브'}
        </h2>
        <p className="subtitle">{t('learning.subtitle') || 'AI를 전문가처럼 다루는 기술을 배워보세요.'}</p>
      </div>

      {modules.map(module => (
        <div key={module.id} className={`module-card accordion-card ${openModule === module.id ? 'expanded' : ''}`}>
          <header 
            className="module-header" 
            onClick={() => toggleModule(module.id)} 
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="module-icon"><BookOpen /></div>
              <h3 className="module-title">{module.title}</h3>
            </div>
            {openModule === module.id ? <ChevronUp size={24} color="#94a3b8" /> : <ChevronDown size={24} color="#94a3b8" />}
          </header>

          {openModule === module.id && (
            <div className="module-content">
              <ul className="lesson-list">
                {module.items.map((item, idx) => (
                  <li key={idx} className="lesson-item">
                    <span className="lesson-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className="view-course-btn">
                {t('learning.viewCourse') || '강좌 보기'}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningHub;
