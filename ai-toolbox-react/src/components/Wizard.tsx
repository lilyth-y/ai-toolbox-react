import React, { useState, FC } from 'react';
import { GraduationCap, Briefcase, RotateCcw, ArrowRight } from 'lucide-react';
import { goals, recommendations, Tool } from '@data/tools';
import { useAppTranslation } from '@hooks/useAppTranslation';

type RoleType = 'student' | 'educator' | null;

const Wizard: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<RoleType>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const { t } = useAppTranslation();

  const handleRoleSelect = (selectedRole: RoleType) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleGoalSelect = (selectedGoalId: string) => {
    setGoal(selectedGoalId);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setRole(null);
    setGoal(null);
  };

  const getRecommendation = (): Tool | undefined => {
    if (!goal) return undefined;
    let rec = recommendations[goal];

    // Custom logic
    if (role === 'educator' && goal === 'design') {
      return {
        id: 'canva_edu',
        name: 'Canva for Education',
        desc: '교사를 위한 강력한 무료 디자인 도구 및 수업 자료 템플릿.',
        logo: '🎨' as any,
        url: 'https://www.canva.com/education/',
        category: ['design', 'edu'],
        price: 'free_edu',
        tags: ['교사할인', '디자인'],
        featured: true
      };
    }
    if (role === 'student' && goal === 'code') {
      return {
        id: 'github_edu',
        name: 'GitHub Student Pack',
        desc: '학생 인증 시 Copilot, JetBrains 등 유료 소프트웨어 무료 사용.',
        logo: '💻' as any,
        url: 'https://education.github.com/pack',
        category: ['code', 'edu'],
        price: 'free_edu',
        tags: ['학생할인', '개발'],
        featured: true
      };
    }

    return rec;
  };

  const recommendation = getRecommendation();

  return (
    <div className="wizard">
      {step === 1 && (
        <div className="wizard-step">
          <h3>{t('home.hero') || '당신의 역할을 선택해주세요'}</h3>
          <div className="options">
            <button className="option-card" onClick={() => handleRoleSelect('student')}>
              <GraduationCap size={40} />
              <h4>학생</h4>
              <p>배우고 공부하고 싶어요</p>
            </button>
            <button className="option-card" onClick={() => handleRoleSelect('educator')}>
              <Briefcase size={40} />
              <h4>전문가</h4>
              <p>업무를 더 효율적으로 하고 싶어요</p>
            </button>
          </div>
        </div>
      )}

      {step === 2 && role && (
        <div className="wizard-step">
          <h3>{t('home.tagline') || '무엇을 하고 싶으신가요?'}</h3>
          <div className="options">
            {goals.map(g => {
              const Icon = g.icon;
              return (
                <button key={g.id} className="option-card" onClick={() => handleGoalSelect(g.id)}>
                  <Icon size={40} />
                  <h4>{g.label}</h4>
                </button>
              );
            })}
          </div>
          <button className="back-btn" onClick={() => setStep(1)}>
            {t('nav.back') || '뒤로가기'}
          </button>
        </div>
      )}

      {step === 3 && recommendation && (
        <div className="wizard-step">
          <h3>✨ 딱 맞는 도구 추천</h3>
          <div className="recommendation">
            <div className="tool-card featured">
              <div className="tool-icon">{typeof recommendation.logo === 'string' ? recommendation.logo : '🔧'}</div>
              <h4>{recommendation.name}</h4>
              <p>{recommendation.desc}</p>
              <a href={recommendation.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                방문하기 <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={16} />
            처음부터 다시
          </button>
        </div>
      )}
    </div>
  );
};

export default Wizard;
