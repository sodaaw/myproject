import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { StepCard } from '../components/StepCard';
import { RECOMMEND_STEPS } from '../features/recommend/steps';
import { initialPreferences, type Preferences } from '../features/recommend/types';
import type { PlaceTypeGroup } from './RecommendTypePage';
import styles from './RecommendFlowPage.module.css';
import recommendBg from '../assets/recommendbg.png';

export function RecommendFlowPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { placeTypeGroup } = (location.state ?? {}) as { placeTypeGroup?: PlaceTypeGroup };
  const steps = useMemo(() => RECOMMEND_STEPS, []);

  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);

  const step = steps[stepIndex];
  const total = steps.length;
  const current = stepIndex + 1;

  const isLast = stepIndex === total - 1;

  const hasSelectionForStep = step.fieldKeys.some((k) => preferences[k] !== null);

  const getPatchForValue = (value: number) => {
    if (step.mapValueToPatch) return step.mapValueToPatch(value);
    const key = step.fieldKeys[0];
    return { [key]: value } as Partial<Preferences>;
  };

  const goPrev = () => {
    // 첫 번째 질문에서 '이전'을 누르면 장소 범위 선택 페이지로 이동
    if (stepIndex === 0) {
      navigate('/recommend', { replace: true });
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    if (isLast) {
      navigate('/results', { state: { preferences, placeTypeGroup } });
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
    navigate('/results', { state: { preferences, placeTypeGroup } });
  };

  return (
    <AppShell title="추천받기" showBottomTabs={false} showTopBar={false} fullBleed={true}>
      <div
        className={styles.root}
        style={{ backgroundImage: `url(${recommendBg})` }}
        role="img"
        aria-label="추천 배경"
      >
        <div className={styles.card}>
          <div className={styles.headerRibbon}>추천받기</div>
          <div className={styles.progress}>
            <div
              className={styles.progressFill}
              style={{ width: `${(current / total) * 100}%` }}
            />
            <span className={styles.progressText}>
              {current} / {total}
            </span>
          </div>

          <div className={styles.body}>
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

          <div className={styles.footer}>
            <div className={styles.footerMain}>
              <button
                type="button"
                onClick={goPrev}
                className={`${styles.footerButton} ${styles.footerButtonPrev}`}
              >
                이전
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!hasSelectionForStep && !isLast}
                className={`${styles.footerButton} ${styles.footerButtonNext}`}
              >
                다음 &gt;
              </button>
            </div>
            <div className={styles.footerSecondary}>
              <button
                type="button"
                onClick={recommendNow}
                className={styles.footerLink}
              >
                여기까지로 해서 추천받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

