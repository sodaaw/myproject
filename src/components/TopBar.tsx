// 상단 앱바 컴포넌트
// 디자인 변경 포인트: className="top-bar" 스타일만 수정하면 됨

interface TopBarProps {
  title: string;
}

export const TopBar = ({ title }: TopBarProps) => {
  return (
    <header className="top-bar">
      <h1 className="top-bar-title">{title}</h1>
    </header>
  );
};
