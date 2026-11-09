import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import Logo from './Logo.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import MobileMenu, { NAV_ITEMS } from './MobileMenu.jsx';
import { lockScroll } from '../animations/lenisStore.js';

const INERT_TARGETS = ['main', 'site-footer'];

/**
 * Fixed header. `mix-blend-difference` keeps white text legible over both the dark and the light
 * ("paper") sections without any scroll-position logic.
 */
export default function Header() {
  const { t, to } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const wasOpen = useRef(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    lockScroll(open);
    INERT_TARGETS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    if (!open && wasOpen.current && buttonRef.current) buttonRef.current.focus();
    wasOpen.current = open;
    return () => {
      lockScroll(false);
      INERT_TARGETS.forEach((id) => document.getElementById(id)?.removeAttribute('inert'));
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />

          <nav aria-label={t('common.primaryNav')} className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map(([id, key]) => (
              <Link key={id} to={to(`/#${id}`)} className="link-underline text-sm">
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex items-center gap-2 text-sm lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              <span>{open ? t('common.close') : t('common.menu')}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open ? <MobileMenu id="mobile-menu" onClose={close} /> : null}</AnimatePresence>
    </>
  );
}
