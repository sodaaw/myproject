import type { Preferences } from '../features/recommend/types';
import type { StepConfig } from '../features/recommend/steps';
import styles from './StepCard.module.css';

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
    <div className={styles.card}>
      <div className={styles.title}>{step.title}</div>
      {step.helperText && <div className={styles.helper}>{step.helperText}</div>}

      <div className={styles.options}>
        {step.options.map((opt) => {
          const patch = getPatchForValue(opt.value);
          const selected = isOptionSelected(step, preferences, patch);
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => onSelectValue(opt.value)}
              className={`${styles.optionButton} ${selected ? styles.optionButtonSelected : ''}`}
            >
              <span>{opt.label}</span>
              {selected && <span className={styles.optionHeart}>♡</span>}
            </button>
          );
        })}

        {step.hasNoPreferenceOption && (
          <button
            type="button"
            onClick={onNoPreference}
            className={styles.noPrefButton}
          >
            상관없어
          </button>
        )}
      </div>
    </div>
  );
}

