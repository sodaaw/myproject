// 홈 화면 문구 선택 로직
// 나중에 사용자 맞춤 문구로 확장 가능

import { HOME_GREETINGS } from '../constants/greetings';

/**
 * 랜덤 문구 선택
 */
export const getRandomGreeting = (): string => {
  const randomIndex = Math.floor(Math.random() * HOME_GREETINGS.length);
  return HOME_GREETINGS[randomIndex];
};
