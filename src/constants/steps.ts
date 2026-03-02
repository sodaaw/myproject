// 추천 플로우 단계 상수
// 디자인 변경 포인트: 이 파일의 메시지만 수정하면 추천 플로우 텍스트가 변경됨

export const RECOMMEND_STEPS = [
  { emoji: '🤔', message: '오늘의 기분 반영 중…' },
  { emoji: '💰', message: '예산 메모 완료…' },
  { emoji: '🔍', message: '후보 추리는 중…' },
  { emoji: '✨', message: '거의 다 됐어!' },
] as const;

export const TOTAL_RECOMMEND_STEPS = 4;
