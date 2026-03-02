// 필터 옵션 상수
// 디자인 변경 포인트: 이 파일의 label만 수정하면 UI 텍스트가 변경됨

export const AREA_FILTERS = [
  { id: 'school', label: '🏫 학교' },
  { id: 'town', label: '🏙️ 동네' },
] as const;

export const TYPE_FILTERS = [
  { id: 'cafe', label: '☕ 카페' },
  { id: 'school_space', label: '🏫 학교 공간' },
  { id: 'library', label: '📚 도서관' },
  { id: 'study_space', label: '📖 스터디 공간' },
] as const;

export const COST_FILTERS = [
  { id: '1', label: '💰 저렴함' },
  { id: '2', label: '💰💰 보통' },
  { id: '3', label: '💰💰💰 비쌈' },
] as const;
