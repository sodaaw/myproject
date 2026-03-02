// 장소 카드 컴포넌트
// 디자인 변경 포인트: className="place-card" 스타일만 수정하면 됨

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Place } from '../mock/places';
import { useAppStore } from '../store/useAppStore';

interface PlaceCardProps {
  place: Place;
}

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

const getOutletEmojis = (score: number) => {
  const max = 5;
  const safeScore = Math.max(0, Math.min(max, score));

  // 점수가 0이거나 값이 없으면 '없음'을 명시적으로 보여줌
  if (!safeScore) {
    return '🔌 없음';
  }

  const plugs = '🔌'.repeat(safeScore);
  const spaces = ' '.repeat(max - safeScore);
  return plugs + spaces;
};

const getCostEmojis = (price: number) => {
  if (price === 0) return '☕☕☕ (무료)';
  if (price < 3000) return '☕';
  if (price < 5000) return '☕☕';
  return '☕☕☕';
};

const formatMinutes = (value?: number) => {
  if (value == null) return '정보 없음';
  if (value === 0) return '바로 앞';
  return `${value}분`;
};

const formatCeiling = (v?: number) => {
  if (v == null) return '정보 없음';
  if (v === 1) return '보통';
  if (v === 2) return '쾌적';
  return '매우 높음';
};

const formatWindowView = (whole?: number, view?: number) => {
  if (whole == null && view == null) return '정보 없음';
  if ((whole ?? 0) >= 3 || (view ?? 0) >= 3) return '통창/뷰 좋음';
  if ((whole ?? 0) >= 2 || (view ?? 0) >= 2) return '창 있음';
  if ((whole ?? 0) === 0 && (view ?? 0) === 0) return '창/뷰 거의 없음';
  return '보통';
};

const formatSnack = (score?: number, price?: number) => {
  if (score == null && price == null) return '정보 없음';
  const scoreText = score === 2 ? '간식 많음' : '간식 적음';
  const priceText = price === 2 ? '비쌈' : '보통';
  return `${scoreText} · ${priceText}`;
};

export const PlaceCard = ({ place }: PlaceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { feedbacks, updateFeedback } = useAppStore();
  const feedback = feedbacks[place.id] || 0;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateFeedback(place.id, feedback === 1 ? 0 : 1);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateFeedback(place.id, feedback === -1 ? 0 : -1);
  };

  return (
    <div className="place-card" onClick={() => navigate(`/place/${place.id}`)}>
      <div className="place-card-header">
        <div>
          <h3 className="place-card-name">{place.name}</h3>
          {feedback !== 0 && (
            <span className="place-card-feedback">
              {feedback > 0 ? '👍 내 선호도 +1' : '👎 내 선호도 -1'}
            </span>
          )}
        </div>
        <div className="place-card-actions">
          <button
            className={`place-card-button ${feedback === 1 ? 'active' : ''}`}
            onClick={handleLike}
            aria-label="맘에 듦"
          >
            👍
          </button>
          <button
            className={`place-card-button ${feedback === -1 ? 'active' : ''}`}
            onClick={handleDislike}
            aria-label="맘에 안듦"
          >
            👎
          </button>
        </div>
      </div>
      <div className="place-card-body">
        <div className="place-card-metrics">
          <div className="place-card-metric">
            <span className="metric-label">소음:</span>
            <span className="metric-value">{getNoiseEmoji(place.noise_level)}</span>
          </div>
          <div className="place-card-metric">
            <span className="metric-label">자리:</span>
            <span className="metric-value">{getSeatEmoji(place.seat_reliability)}</span>
          </div>
          {expanded && (
            <>
              <div className="place-card-metric">
                <span className="metric-label">도보:</span>
                <span className="metric-value">{formatMinutes(place.walk_time_min)}</span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">대중교통:</span>
                <span className="metric-value">
                  {formatMinutes(place.transport_time_min)}
                </span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">콘센트:</span>
                <span className="metric-value">{getOutletEmojis(place.outlet_score)}</span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">가격:</span>
                <span className="metric-value">
                  {getCostEmojis(place.ice_americano_price)}{' '}
                  {place.ice_americano_price > 0 &&
                    `₩${place.ice_americano_price.toLocaleString()}`}
                </span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">층/위치:</span>
                <span className="metric-value">{place.floor_info ?? '정보 없음'}</span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">천장 높이:</span>
                <span className="metric-value">{formatCeiling(place.ceiling_height)}</span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">창/뷰:</span>
                <span className="metric-value">
                  {formatWindowView(place.whole_window, place.view_score)}
                </span>
              </div>
              <div className="place-card-metric">
                <span className="metric-label">간식:</span>
                <span className="metric-value">
                  {formatSnack(place.snack_score, place.snack_price)}
                </span>
              </div>
            </>
          )}
        </div>
        <button
          type="button"
          className="place-card-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
        >
          {expanded ? '접기' : '자세히 보기'}
        </button>
        {place.description && <p className="place-card-description">{place.description}</p>}
      </div>
    </div>
  );
};
