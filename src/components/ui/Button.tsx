import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  /** Internal route */
  to?: string;
  /** External or mailto/tel link */
  href?: string;
  /** Renders a <button> when there is no to/href */
  onClick?: () => void;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary: 'bg-brass-light text-ink hover:bg-white',
  // Hover fills with the navy + gold pairing from the logo
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-brass-light',
};

export function Button({ children, to, href, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const cls = `inline-flex items-center rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}
