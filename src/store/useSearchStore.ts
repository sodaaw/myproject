// 검색 및 필터 상태 관리 Store
// 검색 쿼리와 필터 상태를 전역으로 관리
// URL 파라미터와 동기화 가능하도록 설계

import { create } from 'zustand';
import type { Area, PlaceType, CostLevel } from '../mock/places';

interface SearchState {
  query: string;
  selectedAreas: Area[];
  selectedTypes: PlaceType[];
  selectedCosts: CostLevel[];
  
  setQuery: (query: string) => void;
  toggleArea: (area: Area) => void;
  toggleType: (type: PlaceType) => void;
  toggleCost: (cost: CostLevel) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  selectedAreas: [],
  selectedTypes: [],
  selectedCosts: [],
  
  setQuery: (query: string) => set({ query }),
  
  toggleArea: (area: Area) =>
    set((state) => ({
      selectedAreas: state.selectedAreas.includes(area)
        ? state.selectedAreas.filter((a) => a !== area)
        : [...state.selectedAreas, area],
    })),
  
  toggleType: (type: PlaceType) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),
  
  toggleCost: (cost: CostLevel) =>
    set((state) => ({
      selectedCosts: state.selectedCosts.includes(cost)
        ? state.selectedCosts.filter((c) => c !== cost)
        : [...state.selectedCosts, cost],
    })),
  
  reset: () =>
    set({
      query: '',
      selectedAreas: [],
      selectedTypes: [],
      selectedCosts: [],
    }),
}));
