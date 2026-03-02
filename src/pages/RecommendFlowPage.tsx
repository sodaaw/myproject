import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { ProgressBar } from '../components/ProgressBar';
import { StepCard } from '../components/StepCard';
import { RECOMMEND_STEPS } from '../features/recommend/steps';
import { initialPreferences, type Preferences } from '../features/recommend/types';

export function RecommendFlowPage() {
  const navigate = useNavigate();
  const steps = useMemo(() => RECOMMEND_STEPS, []);

  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);

  const step = steps[stepIndex];
  const total = steps.length;
  const current = stepIndex + 1;

  const canGoPrev = stepIndex > 0;
  const isLast = stepIndex === total - 1;

  const hasSelectionForStep = step.fieldKeys.some((k) => preferences[k] !== null);

  const getPatchForValue = (value: number) => {
    if (step.mapValueToPatch) return step.mapValueToPatch(value);
    const key = step.fieldKeys[0];
    return { [key]: value } as Partial<Preferences>;
  };

  const goPrev = () => {
    if (!canGoPrev) return;
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    if (isLast) {
      navigate('/results', { state: { preferences } });
      return;
    }
    setStepIndex((i) => Math.min(total - 1, i + 1));
  };

  const skipStep = () => {
    setPreferences((prev) => {
      const next: Preferences = { ...prev };
      for (const k of step.fieldKeys) next[k] = null;
      return next;
    });
    goNext();
  };

  const recommendNow = () => {
    navigate('/results', { state: { preferences } });
  };

  return (
    <AppShell title="추천받기" showBottomTabs={false}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        <ProgressBar currentStep={current} totalSteps={total} />

        <div style={{ marginTop: 16 }}>
          <StepCard
            step={step}
            preferences={preferences}
            getPatchForValue={getPatchForValue}
            onSelectValue={(value) =>
              setPreferences((prev) => ({ ...prev, ...getPatchForValue(value) }))
            }
            onNoPreference={skipStep}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <button type="button" onClick={goPrev} disabled={!canGoPrev}>
            이전
          </button>
          <button type="button" onClick={skipStep}>
            건너뛰기
          </button>
          <button type="button" onClick={goNext} disabled={!hasSelectionForStep && !isLast}>
            다음
          </button>
          <button type="button" onClick={recommendNow} style={{ marginLeft: 'auto' }}>
            여기까지로 추천받기
          </button>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
          {step.optional ? '선택 단계' : '핵심 단계'} · {step.id}
        </div>
      </div>
    </AppShell>
  );
}

