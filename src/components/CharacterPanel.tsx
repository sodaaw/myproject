// 캐릭터 패널 컴포넌트 (Placeholder)
// 디자인 변경 포인트: className="character-panel" 스타일만 수정하면 됨

interface CharacterPanelProps {
  emoji?: string;
  message: string;
}

export const CharacterPanel = ({ emoji = '🤖', message }: CharacterPanelProps) => {
  return (
    <div className="character-panel">
      <div className="character-emoji">{emoji}</div>
      <p className="character-message">{message}</p>
    </div>
  );
};
