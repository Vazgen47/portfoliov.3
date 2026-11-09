import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { LANGUAGES, LOCALES, LANG_STORAGE_KEY, localePath, stripLocale } from '../config/site.js';

/** Armenian ("/") / English ("/en") switcher. The explicit choice is persisted in localStorage. */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, t } = useI18n();
  const { pathname, search, hash } = useLocation();
  const base = stripLocale(pathname);

  return (
    <div role="group" aria-label={t('common.language')} className={`flex items-center gap-1 text-xs font-medium ${className}`}>
      {LANGUAGES.map((code) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            to={`${localePath(code, base)}${search}${hash}`}
            lang={code}
            hrefLang={code}
            aria-current={active ? 'true' : undefined}
            title={LOCALES[code].name}
            onClick={() => {
              try {
                localStorage.setItem(LANG_STORAGE_KEY, code);
              } catch {
                /* storage unavailable (private mode) — switching still works */
              }
            }}
            className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${
              active ? 'bg-white text-black' : 'text-white/70 hover:text-white'
            }`}
          >
            {LOCALES[code].label}
          </Link>
        );
      })}
    </div>
  );
}
