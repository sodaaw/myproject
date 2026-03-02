import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { PlaceCard } from '../components/PlaceCard';
import { getRecommendedPlaces } from '../lib/recommendationService';
import type { Preferences } from '../features/recommend/types';
import type { Place } from '../mock/places';
import styles from './Results.module.css';
import type { PlaceTypeGroup } from './RecommendTypePage';
import recommendBg from '../assets/recommendbg.png';

type ResultsLocationState = {
  preferences?: Preferences;
  placeTypeGroup?: PlaceTypeGroup;
};

export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? {}) as ResultsLocationState;
  const preferences = state.preferences ?? null;
  const placeTypeGroup = state.placeTypeGroup ?? 'any';

  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setVisibleCount(4);
    setLoading(true);
    setError(null);
    getRecommendedPlaces(preferences, placeTypeGroup)
      .then((list) => setPlaces(list))
      .catch((err) => {
        console.error('[Results] 추천 로딩 실패:', err);
        setError('추천 서버(Supabase)에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.');
        setPlaces([]);
      })
      .finally(() => setLoading(false));
  }, [preferences, placeTypeGroup]);

  const visiblePlaces = places.slice(0, visibleCount);

  return (
    <AppShell title="추천 결과" showBottomTabs={false} showTopBar={false} fullBleed={true}>
      <div
        className={styles.root}
        style={{ backgroundImage: `url(${recommendBg})` }}
        role="img"
        aria-label="추천 결과 배경"
      >
        <div className={styles.card}>
          <div className={styles.headerRibbon}>추천 결과</div>

          <div className={styles.body}>
            <div className={styles.placesWrapper}>
              <div className={styles.sectionTitle}>추천 장소</div>
              {loading ? (
                <p>추천 생성 중...</p>
              ) : error ? (
                <p className={styles.error}>{error}</p>
              ) : places.length === 0 ? (
                <p>조건에 맞는 장소를 찾지 못했어요.</p>
              ) : (
                <div className={styles.placesList}>
                  {visiblePlaces.map((p) => (
                    <PlaceCard key={p.id} place={p} />
                  ))}
                </div>
              )}
              {!loading && !error && visibleCount < places.length && (
                <button
                  type="button"
                  className={styles.loadMore}
                  onClick={() =>
                    setVisibleCount((prev) => Math.min(prev + 4, places.length))
                  }
                >
                  더 보기
                </button>
              )}
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                onClick={() => navigate('/recommend')}
                className={`${styles.footerButton} ${styles.footerButtonRetry}`}
              >
                다시 추천받기
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`${styles.footerButton} ${styles.footerButtonHome}`}
              >
                홈으로
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
