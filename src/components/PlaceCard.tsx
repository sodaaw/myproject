// 장소 카드 컴포넌트 – cute pastel redesign
// Info as small chips in a 2-column grid; compact spacing

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Place } from '../mock/places';
import { useAppStore } from '../store/useAppStore';

interface PlaceCardProps {
  place: Place;
}

const getNoiseText = (level: number) => {
  if (level === 1) return '조용함';
  if (level === 2) return '보통';
  return '시끄러움';
};

const getSeatText = (level: number) => {
  if (level === 1) return '넉넉';
  if (level === 2) return '보통';
  return '붐빔';
};

const getOutletText = (score: number) => {
  const safeScore = Math.max(0, Math.min(5, score ?? 0));
  if (!safeScore) return '없음';
  return `${safeScore}개`;
};

const getCostShort = (price: number) => {
  if (price === 0) return '무료';
  if (price < 3000) return '저렴';
  if (price < 5000) return '보통';
  return '비쌈';
};

const formatMinutes = (value?: number) => {
  if (value == null) return '—';
  if (value === 0) return '바로 앞';
  return `${value}분`;
};

const formatCeiling = (v?: number) => {
  if (v == null) return '—';
  if (v === 1) return '보통';
  if (v === 2) return '쾌적';
  return '매우 높음';
};

const formatWindowView = (whole?: number, view?: number) => {
  if (whole == null && view == null) return '—';
  if ((whole ?? 0) >= 3 || (view ?? 0) >= 3) return '뷰 좋음';
  if ((whole ?? 0) >= 2 || (view ?? 0) >= 2) return '창 있음';
  if ((whole ?? 0) === 0 && (view ?? 0) === 0) return '창 없음';
  return '보통';
};

const formatSnackShort = (score?: number, price?: number) => {
  if (score == null && price == null) return '—';
  const a = score === 2 ? '많음' : '적음';
  const b = price === 2 ? '비쌈' : '보통';
  return `${a} · ${b}`;
};

interface InfoChipProps {
  icon: string;
  label: string;
  value: string;
}

const InfoChip = ({ icon, label, value }: InfoChipProps) => (
  <div className="place-card-chip">
    <span className="place-card-chip-head">
      <span className="place-card-chip-icon" aria-hidden>{icon}</span>
      {label}
    </span>
    <span className="place-card-chip-value">{value}</span>
  </div>
);

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
    <article
      className="place-card"
      onClick={() => navigate(`/place/${place.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/place/${place.id}`);
        }
      }}
      aria-label={`${place.name} 장소 카드`}
    >
      <header className="place-card-header">
        <div className="place-card-title-wrap">
          <h3 className="place-card-name">{place.name}</h3>
          {feedback !== 0 && (
            <span className="place-card-feedback">
              {feedback > 0 ? '👍 선호' : '👎 비선호'}
            </span>
          )}
        </div>
        <div className="place-card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`place-card-button ${feedback === 1 ? 'active' : ''}`}
            onClick={handleLike}
            aria-label="맘에 듦"
          >
            👍
          </button>
          <button
            type="button"
            className={`place-card-button ${feedback === -1 ? 'active' : ''}`}
            onClick={handleDislike}
            aria-label="맘에 안듦"
          >
            👎
          </button>
        </div>
      </header>

      <div className="place-card-grid">
        <InfoChip icon="🎧" label="소음" value={getNoiseText(place.noise_level)} />
        <InfoChip icon="🪑" label="자리" value={getSeatText(place.seat_reliability)} />
        {expanded && (
          <>
            <InfoChip
              icon="🚶"
              label="도보"
              value={formatMinutes(place.walk_time_min)}
            />
            <InfoChip
              icon="🚌"
              label="대중교통"
              value={formatMinutes(place.transport_time_min)}
            />
            <InfoChip
              icon="🔌"
              label="콘센트"
              value={getOutletText(place.outlet_score)}
            />
            <InfoChip
              icon="☕"
              label="가격"
              value={
                place.ice_americano_price > 0
                  ? `${getCostShort(place.ice_americano_price)} · ₩${place.ice_americano_price.toLocaleString()}`
                  : getCostShort(0)
              }
            />
            <InfoChip
              icon="📍"
              label="층/위치"
              value={place.floor_info ?? '—'}
            />
            <InfoChip
              icon="🏢"
              label="천장"
              value={formatCeiling(place.ceiling_height)}
            />
            <InfoChip
              icon="🪟"
              label="창/뷰"
              value={formatWindowView(place.whole_window, place.view_score)}
            />
            <InfoChip
              icon="🍪"
              label="간식"
              value={formatSnackShort(place.snack_score, place.snack_price)}
            />
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

      {place.description && (
        <p className="place-card-description">{place.description}</p>
      )}
    </article>
  );
};
