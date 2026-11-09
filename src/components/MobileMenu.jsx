import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Send, Mail } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

export const NAV_ITEMS = [
  ['works', 'nav.works'],
  ['studio', 'nav.studio'],
  ['services', 'nav.services'],
  ['process', 'nav.process'],
  ['insights', 'nav.insights'],
  ['contact', 'nav.contact'],
];

const ease = [0.76, 0, 0.24, 1];

export default function MobileMenu({ id, onClose }) {
  const { t, to } = useI18n();
  const reduced = useReducedMotion();
  const firstLink = useRef(null);

  useEffect(() => {
    if (firstLink.current) firstLink.current.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const social = [
    { href: SITE.social.instagram, label: 'Instagram', Icon: Instagram },
    { href: SITE.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: SITE.social.telegram, label: 'Telegram', Icon: Send },
    { href: SITE.social.youtube, label: 'YouTube', Icon: Youtube },
  ];

  return (
    <motion.div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={t('common.menu')}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#0a0a0a] px-6 pb-8 pt-24 text-[#f2f2ee]"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: reduced ? 0 : 0.7, ease }}
      data-lenis-prevent
    >
      <nav aria-label={t('common.primaryNav')}>
        <ul>
          {NAV_ITEMS.map(([sectionId, key], i) => (
            <motion.li
              key={sectionId}
              initial={reduced ? false : { y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: reduced ? 0 : 0.25 + i * 0.06, duration: reduced ? 0 : 0.7, ease } }}
            >
              <Link
                ref={i === 0 ? firstLink : undefined}
                to={to(`/#${sectionId}`)}
                onClick={onClose}
                className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl sm:text-5xl"
              >
                <span className="font-sans text-xs text-white/40">0{i + 1}</span>
                {t(key)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-6 pt-10">
        <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 text-lg text-white/90">
          <Mail className="h-5 w-5 text-[rgb(53,224,138)]" aria-hidden="true" />
          {SITE.email}
        </a>
        <ul className="flex gap-3">
          {social.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} ${t('common.newTab')}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[rgb(53,224,138)] hover:text-[rgb(53,224,138)]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
