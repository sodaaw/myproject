import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { PlaceCard } from '../components/PlaceCard';
import { getRecommendedPlaces } from '../lib/recommendationService';
import type { Preferences } from '../features/recommend/types';
import type { Place } from '../mock/places';

type ResultsLocationState = {
  preferences?: Preferences;
};

export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state ?? {}) as ResultsLocationState;
  const preferences = state.preferences ?? null;

  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getRecommendedPlaces(preferences)
      .then((list) => setPlaces(list))
      .catch((err) => {
        console.error('[Results] 추천 로딩 실패:', err);
        setError('추천 서버(Supabase)에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.');
        setPlaces([]);
      })
      .finally(() => setLoading(false));
  }, [preferences]);

  return (
    <AppShell title="추천 결과" showBottomTabs={true}>
      <div className="results-page">
        <h2 className="results-title">선택한 선호도</h2>

        <pre
          style={{
            background: '#111',
            color: '#eee',
            padding: 12,
            borderRadius: 8,
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(preferences, null, 2)}
        </pre>

        <div style={{ marginTop: 16 }}>
          <h3 style={{ marginBottom: 8 }}>추천 장소</h3>
          {loading ? (
            <p>추천 생성 중...</p>
          ) : error ? (
            <p style={{ color: '#c00' }}>{error}</p>
          ) : places.length === 0 ? (
            <p>조건에 맞는 장소를 찾지 못했어요.</p>
          ) : (
            <div className="results-list">
              {places.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button type="button" onClick={() => navigate('/recommend')}>
            다시 추천받기
          </button>
          <button type="button" onClick={() => navigate('/')}>
            홈으로
          </button>
        </div>
      </div>
    </AppShell>
  );
};
