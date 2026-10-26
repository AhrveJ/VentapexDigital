import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline';

interface ButtonProps {
  children: ReactNode;
  /** Internal route */
  to?: string;
  /** External or mailto/tel link */
  href?: string;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary: 'bg-brass-light text-ink hover:bg-white',
  outline: 'border border-ink/30 text-ink hover:bg-mist',
};

export function Button({ children, to, href, variant = 'primary', className = '' }: ButtonProps) {
  const cls = `inline-flex items-center rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href} className={cls}>{children}</a>;
}
