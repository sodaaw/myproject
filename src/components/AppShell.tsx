// 앱 껍데기: 상단 앱바 + 메인 영역 + 하단 탭 (기존 AppLayout 동작)
// 디자인 시스템의 AppLayout은 단순 레이아웃 래퍼만 담당.

import { type ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomTabs } from './BottomTabs';

interface AppShellProps {
  title: string;
  children: ReactNode;
  showBottomTabs?: boolean;
  showTopBar?: boolean;
  fullBleed?: boolean;
}

export function AppShell({
  title,
  children,
  showBottomTabs = true,
  showTopBar = true,
  fullBleed = false,
}: AppShellProps) {
  return (
    <div className={`app-layout ${fullBleed ? 'app-layout--fullbleed' : ''}`}>
      {showTopBar && <TopBar title={title} />}
      <main className={`app-main ${fullBleed ? 'app-main--fullbleed' : ''}`}>
        {children}
      </main>
      {showBottomTabs && <BottomTabs />}
    </div>
  );
}
