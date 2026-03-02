import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import styles from './RecommendTypePage.module.css';

export type PlaceTypeGroup = 'inside' | 'outside' | 'any';

export const RecommendTypePage = () => {
  const navigate = useNavigate();

  const goNext = (group: PlaceTypeGroup) => {
    navigate('/recommend/flow', { state: { placeTypeGroup: group } });
  };

  return (
    <AppShell title="추천받기" showBottomTabs={false} showTopBar={false}>
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.headerRibbon}>추천받기</div>
          <div className={styles.body}>
            <div className={styles.title}>오늘은 어디서 시작해 볼까?</div>
            <div className={styles.helper}>
              학교 안에서 아늑하게 할지, 잠깐 바람 쐬며 카페로 나갈지 골라줘.
            </div>

            <div className={styles.options}>
              <button
                type="button"
                className={styles.optionButton}
                onClick={() => goNext('inside')}
              >
                🎓 오늘은 캠퍼스 안에서 편하게 할래
              </button>
              <button
                type="button"
                className={`${styles.optionButton} ${styles.optionButtonSecondary}`}
                onClick={() => goNext('outside')}
              >
                🌈 살짝 나가서 카페나 스터디카페에서 하고 싶어
              </button>
            </div>

            <div className={styles.footer}>
              <button type="button" className={styles.skip} onClick={() => goNext('any')}>
                그냥 다 보여줘도 괜찮아
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

