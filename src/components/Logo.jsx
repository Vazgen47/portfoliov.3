import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { scrollToTop } from '../animations/lenisStore.js';

export default function Logo({ className = '' }) {
  const { to } = useI18n();
  const { pathname, hash } = useLocation();
  const home = to('/');

  return (
    <Link
      to={home}
      aria-label="Mkheyan Agency"
      className={`inline-flex items-center ${className}`}
      onClick={() => {
        if (pathname === home) scrollToTop(false);
      }}
      data-hash={hash ? 'true' : undefined}
    >
      <img src="/assets/logos/mkheyan-wordmark.png" width="82" height="20" alt="Mkheyan Agency" className="h-5 w-auto" />
    </Link>
  );
}
