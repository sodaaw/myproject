// 이모지 기반 메트릭 표시 컴포넌트
// 디자인 변경 포인트: className="emoji-metric" 스타일만 수정하면 됨

interface EmojiMetricProps {
  label: string;
  value: number | string;
  emoji: string;
  max?: number;
}

export const EmojiMetric = ({ label, value, emoji, max }: EmojiMetricProps) => {
  const renderValue = () => {
    if (typeof value === 'number' && max) {
      // 숫자 값인 경우 이모지 반복 표시
      return Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'emoji-active' : 'emoji-inactive'}>
          {emoji}
        </span>
      ));
    }
    return <span>{emoji}</span>;
  };

  return (
    <div className="emoji-metric">
      <span className="emoji-metric-label">{label}</span>
      <div className="emoji-metric-value">
        {renderValue()}
        {typeof value === 'number' && !max && <span className="emoji-metric-number">{value}</span>}
      </div>
    </div>
  );
};
