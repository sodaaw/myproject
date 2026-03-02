// 진행률 바 컴포넌트
// 디자인 변경 포인트: className="progress-bar" 스타일만 수정하면 됨

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }} />
      <span className="progress-text">
        {currentStep} / {totalSteps}
      </span>
    </div>
  );
};
