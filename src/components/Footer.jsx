import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Linkedin, Youtube, Send, Mail } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import { NAV_ITEMS } from './MobileMenu.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { scrollToTop } from '../animations/lenisStore.js';

export default function Footer() {
  const { t, to } = useI18n();
  const year = new Date().getFullYear();

  const social = [
    { href: SITE.social.instagram, label: t('contact.instagram'), Icon: Instagram },
    { href: SITE.founder.instagram, label: t('contact.founderInstagram'), Icon: Instagram },
    { href: SITE.social.linkedin, label: t('contact.linkedin'), Icon: Linkedin },
    { href: SITE.social.telegram, label: t('contact.telegram'), Icon: Send },
    { href: SITE.social.youtube, label: t('contact.youtube'), Icon: Youtube },
  ];

  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-line bg-bg text-ink">
      <div className="container-x pt-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-lg leading-relaxed text-muted">{t('footer.tagline')}</p>
            <a href={`mailto:${SITE.email}`} className="link-underline mt-8 inline-flex items-center gap-3 text-lg">
              <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          <nav aria-label={t('footer.navigate')} className="md:col-span-3">
            <h2 className="eyebrow">{t('footer.navigate')}</h2>
            <ul className="mt-6 space-y-3">
              {NAV_ITEMS.map(([id, key]) => (
                <li key={id}>
                  <Link to={to(`/#${id}`)} className="link-underline text-base">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow">{t('footer.follow')}</h2>
            <ul className="mt-6 space-y-3">
              {social.map(({ href, label, Icon }) => (
                <li key={href + label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-3 text-base">
                    <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
                    {label}
                    <span className="sr-only">{t('common.newTab')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="outline-text mt-20 select-none whitespace-nowrap text-center font-display text-[clamp(3.6rem,18.5vw,18rem)] leading-[0.82] tracking-[-0.03em]"
        >
          MKHEYAN
        </p>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-line py-7 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span>{t('footer.madeIn')}</span>
            <LanguageSwitcher className="[&_a]:text-ink/70 [&_a:hover]:text-ink [&_a[aria-current=true]]:bg-ink [&_a[aria-current=true]]:text-bg" />
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              {t('common.backToTop')}
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
