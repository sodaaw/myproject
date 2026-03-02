// 장소 데이터 접근 서비스 레이어
// 나중에 Supabase나 다른 백엔드로 전환 시 이 파일만 수정하면 됨
// 컴포넌트는 이 서비스를 통해서만 데이터에 접근

import { supabase } from '../lib/supabaseClient';
import type { Place, Area, PlaceType, CostLevel } from '../mock/places';

/**
 * 모든 장소 목록 조회
 */
export const getAllPlaces = async (): Promise<Place[]> => {
  const { data, error } = await supabase.from('places').select('*');

  if (error) {
    // eslint-disable-next-line no-console
    console.error('[placesService] Supabase places 조회 실패:', error);
    throw error;
  }

  return (data ?? []) as Place[];
};

/**
 * ID로 장소 조회
 */
export const getPlaceById = async (id: string): Promise<Place | null> => {
  const places = await getAllPlaces();
  return places.find((p) => p.id === id) || null;
};

/**
 * 여러 ID로 장소 목록 조회
 */
export const getPlacesByIds = async (ids: string[]): Promise<Place[]> => {
  const places = await getAllPlaces();
  return places.filter((p) => ids.includes(p.id));
};

/**
 * 검색 및 필터링
 */
export interface SearchFilters {
  query?: string;
  areas?: Area[];
  types?: PlaceType[];
  costLevels?: CostLevel[];
}

export const searchPlaces = async (filters: SearchFilters): Promise<Place[]> => {
  const places = await getAllPlaces();
  
  return places.filter((place) => {
    // 검색어 필터
    if (filters.query) {
      const query = filters.query.toLowerCase();
      if (!place.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // 지역 필터
    if (filters.areas && filters.areas.length > 0) {
      if (!filters.areas.includes(place.area)) {
        return false;
      }
    }
    
    // 타입 필터
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(place.type)) {
        return false;
      }
    }
    
    // 비용 필터
    if (filters.costLevels && filters.costLevels.length > 0) {
      if (!filters.costLevels.includes(place.cost_level)) {
        return false;
      }
    }
    
    return true;
  });
};
