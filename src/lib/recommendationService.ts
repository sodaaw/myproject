// 추천 로직 서비스 (Mock)
// 나중에 실제 추천 알고리즘으로 교체 가능
// 이 파일만 수정하면 추천 로직이 변경됨

import type { Place } from '../mock/places';
import { getAllPlaces } from '../services/placesService';
import type { Preferences } from '../features/recommend/types';

/**
 * 추천 결과 생성 (간단한 스코어링 기반)
 * - preferences가 null이면 랜덤 추천
 * - preferences가 있으면 각 필드의 차이를 최소화하도록 정렬
 */
export const getRecommendedPlaces = async (
  preferences?: Preferences | null,
): Promise<Place[]> => {
  const allPlaces = await getAllPlaces();

  // preferences 없으면 기존처럼 랜덤 3~5개
  if (!preferences) {
    const shuffled = [...allPlaces].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 3) + 3;
    return shuffled.slice(0, count);
  }

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const scorePlace = (p: Place) => {
    let score = 0;
    let used = 0;

    const add = (diff: number, weight = 1) => {
      score += diff * weight;
      used += 1;
    };

    // note: 기존 mock은 noise/seat_reliability가 1~3이라서 preferences(0~2)와 매핑
    if (preferences.noise_level !== null && typeof p.noise_level === 'number') {
      add(Math.abs(p.noise_level - (preferences.noise_level + 1)), 2);
    }
    if (preferences.seat_reliability !== null && typeof p.seat_reliability === 'number') {
      add(Math.abs(p.seat_reliability - (preferences.seat_reliability + 1)), 2);
    }

    // cost_level mock은 1~3 (preferences는 0~3) → 1~3로 클램프
    if (preferences.cost_level !== null && typeof p.cost_level === 'number') {
      const mapped = clamp(preferences.cost_level, 1, 3);
      add(Math.abs(p.cost_level - mapped), 1);
    }

    // Optional metadata fields (있는 경우만 사용)
    if (preferences.seat_comfort !== null && typeof p.seat_comfort === 'number') {
      add(Math.abs(p.seat_comfort - preferences.seat_comfort), 1);
    }
    if (preferences.whole_window !== null && typeof p.whole_window === 'number') {
      add(Math.abs(p.whole_window - preferences.whole_window), 1);
    }
    if (preferences.view_score !== null && typeof p.view_score === 'number') {
      add(Math.abs(p.view_score - preferences.view_score), 1);
    }
    if (preferences.ceiling_height !== null && typeof p.ceiling_height === 'number') {
      add(Math.abs(p.ceiling_height - preferences.ceiling_height), 0.5);
    }
    if (preferences.snack_score !== null && typeof p.snack_score === 'number') {
      add(Math.abs(p.snack_score - preferences.snack_score), 0.5);
    }
    if (preferences.snack_price !== null && typeof p.snack_price === 'number') {
      add(Math.abs(p.snack_price - preferences.snack_price), 0.5);
    }

    // 아무 것도 사용 못했으면 중립값
    if (used === 0) return 9999;
    return score;
  };

  const scored = allPlaces
    .map((p) => ({ p, s: scorePlace(p) }))
    .sort((a, b) => a.s - b.s);

  // 상위 8개만 반환 (MVP)
  return scored.slice(0, 8).map((x) => x.p);
};
