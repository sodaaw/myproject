// 통계 계산 서비스
// 나중에 실제 통계 로직으로 교체 가능

import type { Place } from '../mock/places';
import { getAllPlaces } from '../services/placesService';

export interface NoiseDistribution {
  name: string;
  value: number;
}

export interface CostDistribution {
  name: string;
  value: number;
}

/**
 * 소음 수준 분포 계산
 */
export const getNoiseDistribution = async (): Promise<NoiseDistribution[]> => {
  const places = await getAllPlaces();
  const distribution = { 1: 0, 2: 0, 3: 0 };
  
  places.forEach((place) => {
    distribution[place.noise_level as keyof typeof distribution]++;
  });
  
  return [
    { name: '조용함', value: distribution[1] },
    { name: '보통', value: distribution[2] },
    { name: '시끄러움', value: distribution[3] },
  ];
};

/**
 * 비용 수준 분포 계산
 */
export const getCostDistribution = async (): Promise<CostDistribution[]> => {
  const places = await getAllPlaces();
  const distribution = { 1: 0, 2: 0, 3: 0 };
  
  places.forEach((place) => {
    distribution[place.cost_level as keyof typeof distribution]++;
  });
  
  return [
    { name: '저렴함', value: distribution[1] },
    { name: '보통', value: distribution[2] },
    { name: '비쌈', value: distribution[3] },
  ];
};
