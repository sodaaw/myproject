import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  elevated?: boolean;
  className?: string;
}

/**
 * Pastel card: Milk White background, 20px padding, soft shadow.
 * Use elevated for stronger shadow.
 */
export function Card({ children, elevated = false, className = '' }: CardProps) {
  return (
    <div
      className={`ds-card ${elevated ? 'ds-card--elevated' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
