import { type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'soft';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

/**
 * Touch-friendly button. Primary: Accent Pink, full width, 56px height.
 * Soft: Soft Pink background, Accent Pink text.
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`ds-btn ds-btn--${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
