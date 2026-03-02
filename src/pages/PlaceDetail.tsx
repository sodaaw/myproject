// PlaceDetail 페이지 (장소 상세 정보)
// UI만 담당: 데이터는 placesService에서 가져옴
// 디자인 변경 포인트: className="place-detail-page" 스타일만 수정하면 됨

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { getPlaceById } from '../services/placesService';
import type { Place } from '../mock/places';

const getNoiseEmoji = (level: number) => {
  if (level === 1) return '🎧🙂';
  if (level === 2) return '🎧😐';
  return '🎧😖';
};

const getSeatEmoji = (level: number) => {
  if (level === 1) return '🪑🙂';
  if (level === 2) return '🪑😐';
  return '🪑😖';
};

export const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getPlaceById(id)
      .then((data) => {
        setPlace(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('장소 정보 로드 실패:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <AppShell title="로딩 중..." showBottomTabs={true}>
        <div className="place-detail-page">
          <p>로딩 중...</p>
        </div>
      </AppShell>
    );
  }

  if (!place) {
    return (
      <AppShell title="장소를 찾을 수 없습니다" showBottomTabs={true}>
        <div className="place-detail-page">
          <p>장소를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={place.name} showBottomTabs={true}>
      <div className="place-detail-page">
        <button
          className="place-detail-back-button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ← 뒤로가기
        </button>
        <div className="place-detail-header">
          <h2 className="place-detail-name">{place.name}</h2>
          <div className="place-detail-badges">
            <span className="place-detail-badge">
              {place.area === 'school' ? '🏫 학교' : '🏙️ 동네'}
            </span>
            <span className="place-detail-badge">{place.type}</span>
          </div>
        </div>
        <div className="place-detail-body">
          <div className="place-detail-metrics">
            <div className="place-detail-metric">
              <span className="metric-label">소음 수준:</span>
              <span className="metric-value">{getNoiseEmoji(place.noise_level)}</span>
            </div>
            <div className="place-detail-metric">
              <span className="metric-label">자리 안정성:</span>
              <span className="metric-value">{getSeatEmoji(place.seat_reliability)}</span>
            </div>
            <div className="place-detail-metric">
              <span className="metric-label">콘센트 점수:</span>
              <span className="metric-value">
                {Array.from({ length: place.outlet_score }, () => '🔌').join('')} ({place.outlet_score}/5)
              </span>
            </div>
            <div className="place-detail-metric">
              <span className="metric-label">아이스 아메리카노 가격:</span>
              <span className="metric-value">
                {place.ice_americano_price === 0 ? '무료' : `₩${place.ice_americano_price.toLocaleString()}`}
              </span>
            </div>
            <div className="place-detail-metric">
              <span className="metric-label">와이파이 속도:</span>
              <span className="metric-value">{place.wifi_speed} Mbps</span>
            </div>
            <div className="place-detail-metric">
              <span className="metric-label">비용 수준:</span>
              <span className="metric-value">
                {place.cost_level === 1 ? '저렴함' : place.cost_level === 2 ? '보통' : '비쌈'}
              </span>
            </div>
          </div>
          {place.description && (
            <div className="place-detail-description">
              <h3>설명</h3>
              <p>{place.description}</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
