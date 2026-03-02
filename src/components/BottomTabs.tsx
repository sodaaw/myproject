// 하단 탭 네비게이션 컴포넌트
// 모바일: 하단 고정, 데스크탑: 상단 또는 사이드로 변형 가능
// 디자인 변경 포인트: className="bottom-tabs" 스타일만 수정하면 됨

import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/results', label: 'Results', icon: '📋' },
  { path: '/map', label: 'Map', icon: '🗺️' },
  { path: '/stats', label: 'Stats', icon: '📊' },
  { path: '/search', label: 'Search', icon: '🔍' },
];

export const BottomTabs = () => {
  const location = useLocation();

  return (
    <nav className="bottom-tabs" aria-label="메인 네비게이션">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`bottom-tab ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <span className="bottom-tab-icon">{tab.icon}</span>
            <span className="bottom-tab-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
