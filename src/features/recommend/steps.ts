import type { Preferences } from './types';

export type StepOption = {
  label: string;
  value: number;
};

export type StepConfig = {
  id: string;
  title: string;
  helperText?: string;
  optional: boolean;
  hasNoPreferenceOption: true;
  /** Which preference keys this step controls (for skip/selection checks) */
  fieldKeys: (keyof Preferences)[];
  options: StepOption[];
  /** For multi-field steps: convert value -> patch */
  mapValueToPatch?: (value: number) => Partial<Preferences>;
};

export const RECOMMEND_STEPS: StepConfig[] = [
  {
    id: 'noise_level',
    title: '소음 정도',
    helperText: '얼마나 조용하면 돼?',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['noise_level'],
    options: [
      { label: '오늘은 집중이 필요해! (조용한 곳)', value: 0 },
      { label: '적당히 생활소음 있는 곳이 좋아', value: 1 },
      { label: '소음 속에 섞여서 할래 (활기찬 곳)', value: 2 },
    ],
  },
  {
    id: 'seat_reliability',
    title: '피크타임',
    helperText: '지금 피크타임이거나 시험기간이야?',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['seat_reliability'],
    options: [
      { label: '응...널널한 곳부터 가보자', value: 0 },
      { label: '그럴 수도 아닐 수도', value: 1 },
      { label: '어디든 괜찮을 시간대야!', value: 2 },
    ],
  },
  {
    id: 'seat_comfort',
    title: '의자 편안함',
    helperText: '딱딱한 의자 얼마나 신경 쓰여?',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['seat_comfort'],
    options: [
      { label: '오늘은 편한 의자가 필요해', value: 2 },
      { label: '적당하면 돼', value: 1 },
      { label: '딱딱해도 상관 없어', value: 0 },
    ]
  },
  {
    id: 'window_view',
    title: '뷰',
    helperText: '힐링되는 뷰가 필요한 날이야?',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['whole_window', 'view_score'],
    options: [
      { label: '무조건 있어야 돼... 힐링이 필요해...', value: 3 },
      { label: '창은 있으면 좋고 없어도 괜찮아', value: 2 },
      { label: '크게 중요하진 않아', value: 1 },
      { label: '아예 없어도 돼. 집중/빠른 마감이 우선!', value: 0 },
    ],
    mapValueToPatch: (value) => ({ whole_window: value, view_score: value }),
  },
  {
    id: 'cost_level',
    title: '예산',
    helperText: '오늘 예산은 어느 정도야?',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['cost_level'],
    options: [
      { label: '가능하면 무료/저렴이 최고', value: 0 },
      { label: '보통이면 충분해', value: 2 },
      { label: '조금 비싸도 ㄱㅊㄱㅊ', value: 3 },
      { label: '그냥 적당히 가성비면 좋겠어', value: 1 },
    ],
  },
  {
    id: 'ceiling_height',
    title: '층고',
    helperText: '뻥 뚫린 쾌감이 필요한 날인가?',
    optional: true,
    hasNoPreferenceOption: true,
    fieldKeys: ['ceiling_height'],
    options: [
      { label: '보통이면 돼', value: 1 },
      { label: '쾌적했으면 좋겠어', value: 2 },
      { label: '매우 탁 트였으면 해', value: 3 },
    ],
  },
  {
    id: 'snack',
    title: '간식',
    helperText: '지금 출출해?',
    optional: true,
    hasNoPreferenceOption: true,
    fieldKeys: ['snack_score', 'snack_price'],
    options: [
      { label: '다양한 선택지가 필요해! 가격은 보통이면 돼', value: 21 },
      { label: '다양한 선택지가 필요해! 가격 좀 비싸도 괜찮아', value: 22 },
      { label: '간식 별로 없어도 돼. 가격은 보통이면 돼', value: 11 },
      { label: '간식 별로 없어도 돼. 가격이 좀 비싸도 괜찮아', value: 12 },
    ],
    mapValueToPatch: (value) => {
      // value: (snack_score)(snack_price) encoded as two digits
      const snack_score = Math.floor(value / 10) as 1 | 2;
      const snack_price = (value % 10) as 1 | 2;
      return { snack_score, snack_price };
    },
  },
  {
    id: 'distance',
    title: '이동 거리',
    helperText: '얼마나 멀리까지 나가볼까?',
    optional: true,
    hasNoPreferenceOption: true,
    fieldKeys: ['walk_time_min', 'transport_time_min'],
    options: [
      { label: '학교 바로 앞까지만 (도보 5분 이내)', value: 5 },
      { label: '10분 정도까지는 괜찮아', value: 10 },
      { label: '조금 멀어도 돼 (20분 내)', value: 20 },
    ],
    mapValueToPatch: (value) => ({
      walk_time_min: value,
      transport_time_min: value,
    }),
  },
];

