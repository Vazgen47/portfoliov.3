import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-500 ease-expo disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  solid: 'bg-ink text-bg hover:bg-accent hover:text-on-accent',
  accent: 'bg-accent text-on-accent hover:bg-ink hover:text-bg',
  outline: 'border border-ink/30 text-ink hover:border-accent hover:text-accent',
  ghost: 'px-0 text-ink hover:text-accent',
};

/**
 * Polymorphic button:
 *  - `to`   -> internal <Link>
 *  - `href` -> <a> (external http(s) links open in a new tab safely)
 *  - none   -> <button type="button"> (override with type="submit")
 */
export default function Button({ to, href, variant = 'solid', icon = true, external, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const arrow = icon ? (
    <ArrowUpRight
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  ) : null;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
        {arrow}
      </Link>
    );
  }

  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    const extra = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={cls} {...extra} {...rest}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
      {arrow}
    </button>
  );
}
