import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Mobile-first layout wrapper.
 * Max-width: 480px (mobile), 768px (tablet), 1024px (desktop).
 * Centered horizontally with 16px padding.
 */
export function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <div className={`ds-layout ${className}`.trim()}>
      {children}
    </div>
  );
}
