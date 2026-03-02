import type { Preferences } from '../features/recommend/types';
import type { StepConfig, StepOption } from '../features/recommend/steps';

type StepCardProps = {
  step: StepConfig;
  preferences: Preferences;
  getPatchForValue: (value: number) => Partial<Preferences>;
  onSelectValue: (value: number) => void;
  onNoPreference: () => void;
};

function isOptionSelected(
  step: StepConfig,
  preferences: Preferences,
  patch: Partial<Preferences>,
) {
  return step.fieldKeys.every((k) => {
    const expected = patch[k];
    if (typeof expected === 'undefined') return true;
    return preferences[k] === expected;
  });
}

export function StepCard({
  step,
  preferences,
  getPatchForValue,
  onSelectValue,
  onNoPreference,
}: StepCardProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
      <div style={{ marginBottom: 8, fontWeight: 700 }}>{step.title}</div>
      {step.helperText && <div style={{ marginBottom: 12, color: '#555' }}>{step.helperText}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step.options.map((opt) => {
          const patch = getPatchForValue(opt.value);
          const selected = isOptionSelected(step, preferences, patch);
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelectValue(opt.value)}
              style={{
                width: '100%',
                minHeight: 52,
                padding: '12px 14px',
                textAlign: 'left',
                borderRadius: 10,
                border: selected ? '2px solid #222' : '1px solid #bbb',
                background: selected ? '#f2f2f2' : 'white',
              }}
            >
              {opt.label}
            </button>
          );
        })}

        {step.hasNoPreferenceOption && (
          <button
            type="button"
            onClick={onNoPreference}
            style={{
              width: '100%',
              minHeight: 52,
              padding: '12px 14px',
              textAlign: 'left',
              borderRadius: 10,
              border: '1px dashed #bbb',
              background: '#fafafa',
              color: '#555',
            }}
          >
            상관없어
          </button>
        )}
      </div>
    </div>
  );
}

