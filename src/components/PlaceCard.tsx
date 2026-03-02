// 장소 카드 컴포넌트
// 디자인 변경 포인트: className="place-card" 스타일만 수정하면 됨

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
  return Array.from({ length: 5 }, (_, i) => (i < score ? '🔌' : '⚪')).join('');
};

const getCostEmojis = (price: number) => {
  if (price === 0) return '☕☕☕ (무료)';
  if (price < 3000) return '☕';
  if (price < 5000) return '☕☕';
  return '☕☕☕';
};

export const PlaceCard = ({ place }: PlaceCardProps) => {
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
        <h3 className="place-card-name">{place.name}</h3>
        {feedback !== 0 && (
          <span className="place-card-feedback">
            {feedback > 0 ? '👍 내 선호도 +1' : '👎 내 선호도 -1'}
          </span>
        )}
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
          <div className="place-card-metric">
            <span className="metric-label">콘센트:</span>
            <span className="metric-value">{getOutletEmojis(place.outlet_score)}</span>
          </div>
          <div className="place-card-metric">
            <span className="metric-label">가격:</span>
            <span className="metric-value">
              {getCostEmojis(place.ice_americano_price)} {place.ice_americano_price > 0 && `₩${place.ice_americano_price.toLocaleString()}`}
            </span>
          </div>
        </div>
        {place.description && <p className="place-card-description">{place.description}</p>}
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
  );
};
