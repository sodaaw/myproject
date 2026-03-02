// Place 타입 정의 및 Mock 데이터
// 나중에 디자인 변경 시 이 파일의 데이터 구조만 유지하면 됨

export type Area = 'school' | 'town';
export type PlaceType = 'cafe' | 'school_space' | 'library' | 'study_space';
export type CostLevel = 1 | 2 | 3;
export type NoiseLevel = 1 | 2 | 3; // 1: 조용함, 2: 보통, 3: 시끄러움
export type SeatReliability = 1 | 2 | 3; // 1: 항상 자리 있음, 2: 보통, 3: 자리 없을 때 많음
export type SeatComfort = 0 | 1 | 2; // 0: 딱딱, 1: 보통, 2: 편함
export type ViewScore = 0 | 1 | 2 | 3; // 0~3
export type WholeWindow = 0 | 1 | 2 | 3; // 0~3
export type CeilingHeight = 1 | 2 | 3; // 1~3
export type SnackPrice = 1 | 2; // 1~2
export type SnackScore = 1 | 2; // 1~2

export interface Place {
  id: string;
  name: string;
  area: Area;
  type: PlaceType;
  cost_level: CostLevel;
  ice_americano_price: number;
  noise_level: NoiseLevel;
  seat_reliability: SeatReliability;
  outlet_score: number; // 0-5 점수
  wifi_speed: number; // Mbps
  description?: string;

  /**
   * Recommend metadata (Supabase places table numeric fields)
   * Optional for now to avoid breaking older pages.
   */
  seat_comfort?: SeatComfort;
  whole_window?: WholeWindow;
  view_score?: ViewScore;
  ceiling_height?: CeilingHeight;
  snack_price?: SnackPrice;
  snack_score?: SnackScore;
}

export const mockPlaces: Place[] = [
  {
    id: '1',
    name: '스타벅스 대학로점',
    area: 'town',
    type: 'cafe',
    cost_level: 3,
    ice_americano_price: 5500,
    noise_level: 2,
    seat_reliability: 2,
    seat_comfort: 1,
    whole_window: 3,
    view_score: 3,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 2,
    outlet_score: 4,
    wifi_speed: 50,
    description: '대학로 중심가에 위치한 스타벅스. 콘센트 많고 와이파이 빠름.',
  },
  {
    id: '2',
    name: '투썸플레이스 홍대입구역점',
    area: 'town',
    type: 'cafe',
    cost_level: 3,
    ice_americano_price: 5000,
    noise_level: 3,
    seat_reliability: 3,
    seat_comfort: 1,
    whole_window: 2,
    view_score: 2,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 2,
    outlet_score: 3,
    wifi_speed: 45,
    description: '홍대입구역 근처. 주말에는 매우 시끄럽고 자리 구하기 어려움.',
  },
  {
    id: '3',
    name: '학교 중앙도서관 3층',
    area: 'school',
    type: 'library',
    cost_level: 1,
    ice_americano_price: 0,
    noise_level: 1,
    seat_reliability: 1,
    seat_comfort: 1,
    whole_window: 1,
    view_score: 1,
    ceiling_height: 3,
    snack_score: 1,
    snack_price: 1,
    outlet_score: 5,
    wifi_speed: 100,
    description: '조용하고 자리 항상 있음. 콘센트 완벽. 무료.',
  },
  {
    id: '4',
    name: '이디야커피 대학본부점',
    area: 'school',
    type: 'cafe',
    cost_level: 2,
    ice_americano_price: 3500,
    noise_level: 2,
    seat_reliability: 2,
    seat_comfort: 1,
    whole_window: 2,
    view_score: 1,
    ceiling_height: 2,
    snack_score: 1,
    snack_price: 1,
    outlet_score: 4,
    wifi_speed: 40,
    description: '학교 내 카페. 가격 합리적이고 분위기 좋음.',
  },
  {
    id: '5',
    name: '스터디카페 공간',
    area: 'town',
    type: 'study_space',
    cost_level: 2,
    ice_americano_price: 0,
    noise_level: 1,
    seat_reliability: 1,
    seat_comfort: 2,
    whole_window: 1,
    view_score: 1,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 1,
    outlet_score: 5,
    wifi_speed: 80,
    description: '시간제 요금. 매우 조용하고 집중하기 좋음.',
  },
  {
    id: '6',
    name: '할리스커피 신촌점',
    area: 'town',
    type: 'cafe',
    cost_level: 3,
    ice_americano_price: 4800,
    noise_level: 2,
    seat_reliability: 2,
    seat_comfort: 1,
    whole_window: 2,
    view_score: 2,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 2,
    outlet_score: 3,
    wifi_speed: 35,
    description: '신촌 중심가. 평일 오후 자리 있음.',
  },
  {
    id: '7',
    name: '학교 스터디룸 A동',
    area: 'school',
    type: 'school_space',
    cost_level: 1,
    ice_americano_price: 0,
    noise_level: 1,
    seat_reliability: 2,
    seat_comfort: 1,
    whole_window: 0,
    view_score: 0,
    ceiling_height: 2,
    snack_score: 1,
    snack_price: 1,
    outlet_score: 5,
    wifi_speed: 90,
    description: '예약제 스터디룸. 무료, 조용함.',
  },
  {
    id: '8',
    name: '컴포즈커피 연세대점',
    area: 'school',
    type: 'cafe',
    cost_level: 2,
    ice_americano_price: 3000,
    noise_level: 2,
    seat_reliability: 3,
    seat_comfort: 0,
    whole_window: 1,
    view_score: 1,
    ceiling_height: 1,
    snack_score: 1,
    snack_price: 1,
    outlet_score: 2,
    wifi_speed: 30,
    description: '학교 내 저렴한 카페. 자리 구하기 어려울 때 많음.',
  },
  {
    id: '9',
    name: '메가커피 홍대점',
    area: 'town',
    type: 'cafe',
    cost_level: 2,
    ice_americano_price: 2500,
    noise_level: 3,
    seat_reliability: 3,
    seat_comfort: 0,
    whole_window: 1,
    view_score: 0,
    ceiling_height: 1,
    snack_score: 1,
    snack_price: 1,
    outlet_score: 2,
    wifi_speed: 25,
    description: '저렴하지만 시끄럽고 자리 없을 때 많음.',
  },
  {
    id: '10',
    name: '학교 중앙도서관 1층 카페테리아',
    area: 'school',
    type: 'school_space',
    cost_level: 1,
    ice_americano_price: 2000,
    noise_level: 2,
    seat_reliability: 1,
    seat_comfort: 1,
    whole_window: 1,
    view_score: 1,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 1,
    outlet_score: 3,
    wifi_speed: 60,
    description: '도서관 내부 카페테리아. 저렴하고 자리 많음.',
  },
  {
    id: '11',
    name: '카페베네 대학로점',
    area: 'town',
    type: 'cafe',
    cost_level: 2,
    ice_americano_price: 4000,
    noise_level: 2,
    seat_reliability: 2,
    seat_comfort: 1,
    whole_window: 2,
    view_score: 2,
    ceiling_height: 2,
    snack_score: 2,
    snack_price: 2,
    outlet_score: 4,
    wifi_speed: 40,
    description: '대학로 카페. 분위기 좋고 콘센트 충분.',
  },
  {
    id: '12',
    name: '학교 공학관 스터디카페',
    area: 'school',
    type: 'study_space',
    cost_level: 1,
    ice_americano_price: 0,
    noise_level: 1,
    seat_reliability: 1,
    seat_comfort: 2,
    whole_window: 0,
    view_score: 0,
    ceiling_height: 3,
    snack_score: 2,
    snack_price: 1,
    outlet_score: 5,
    wifi_speed: 95,
    description: '공대 건물 내부. 매우 조용하고 시설 좋음.',
  },
];
