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
    title: '오늘은 분위기 어때?',
    helperText: '소음/활기 정도를 골라줘.',
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
    title: '자리 여유는 어느 정도면 돼?',
    helperText: '자리 없으면 마음이 급해지더라구…',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['seat_reliability'],
    options: [
      { label: '널널한 자리에서 하고 싶어', value: 0 },
      { label: '피크만 피하면 괜찮아', value: 1 },
      { label: '자리 없으면 다른 데 가면 돼', value: 2 },
    ],
  },
  {
    id: 'seat_comfort',
    title: '의자 편안함, 얼마나 중요해?',
    helperText: '오래 앉을 거면 편한 게 최고지.',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['seat_comfort'],
    options: [
      { label: '편한 의자가 중요해', value: 2 },
      { label: '적당하면 돼', value: 1 },
      { label: '딱딱해도 괜찮아', value: 0 },
    ],
  },
  {
    id: 'window_view',
    title: '창/뷰는 있으면 좋아?',
    helperText: '한 번에 고르면 통창/뷰 점수로 반영할게.',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['whole_window', 'view_score'],
    options: [
      { label: '통창/뷰 있으면 기분이 좋아', value: 3 },
      { label: '창은 있으면 좋고 없어도 괜찮아', value: 2 },
      { label: '뷰는 크게 안 중요해', value: 1 },
      { label: '창/뷰 없어도 돼', value: 0 },
    ],
    mapValueToPatch: (value) => ({ whole_window: value, view_score: value }),
  },
  {
    id: 'cost_level',
    title: '오늘 예산은 어느 정도야?',
    helperText: '가격 부담 정도를 골라줘.',
    optional: false,
    hasNoPreferenceOption: true,
    fieldKeys: ['cost_level'],
    options: [
      { label: '가능하면 무료/저렴이 최고', value: 0 },
      { label: '보통이면 충분해', value: 2 },
      { label: '조금 비싸도 괜찮아', value: 3 },
      { label: '그냥 적당히 저렴하면 좋겠어', value: 1 },
    ],
  },
  {
    id: 'ceiling_height',
    title: '답답한 느낌은 싫어?',
    helperText: '선택 사항이야. 층고가 높으면 더 쾌적하게 느껴져.',
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
    title: '간식/먹을 것도 중요해?',
    helperText: '선택 사항이야. 다양함/가격을 한 번에 반영할게.',
    optional: true,
    hasNoPreferenceOption: true,
    fieldKeys: ['snack_score', 'snack_price'],
    options: [
      { label: '간식은 있으면 좋고, 가격은 보통이면 돼', value: 21 },
      { label: '간식은 있으면 좋고, 가격이 좀 비싸도 괜찮아', value: 22 },
      { label: '간식은 없어도 되고, 가격은 보통이면 돼', value: 11 },
      { label: '간식은 없어도 되고, 가격이 좀 비싸도 괜찮아', value: 12 },
    ],
    mapValueToPatch: (value) => {
      // value: (snack_score)(snack_price) encoded as two digits
      const snack_score = Math.floor(value / 10) as 1 | 2;
      const snack_price = (value % 10) as 1 | 2;
      return { snack_score, snack_price };
    },
  },
];

