// 추천 플로우 상태 관리 Store
// 추천 단계 진행 상태를 전역으로 관리
// URL만으로 상태 재현 가능하도록 설계

import { create } from 'zustand';

interface RecommendState {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  reset: () => void;
}

export const useRecommendStore = create<RecommendState>((set) => ({
  currentStep: 1,
  setStep: (step: number) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  reset: () => set({ currentStep: 1 }),
}));
