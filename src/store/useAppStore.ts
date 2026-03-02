// 전역 상태 관리 (Zustand)
// 사용자 피드백(like/dislike) 상태를 페이지 간 유지
// 나중에 디자인 변경 시 이 store의 구조만 유지하면 됨

import { create } from 'zustand';

interface PlaceFeedback {
  placeId: string;
  weight: number; // +1 (like), -1 (dislike), 0 (없음)
}

interface AppState {
  feedbacks: Record<string, number>; // placeId -> weight
  updateFeedback: (placeId: string, weight: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  feedbacks: {},
  updateFeedback: (placeId: string, weight: number) =>
    set((state) => ({
      feedbacks: {
        ...state.feedbacks,
        [placeId]: weight,
      },
    })),
}));
