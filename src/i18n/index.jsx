import { createContext, useContext, useEffect, useMemo } from 'react';
import en from './en.js';
import hy from './hy.js';
import { localePath } from '../config/site.js';

const dictionaries = { en, hy };
const I18nContext = createContext(null);

const lookup = (obj, key) =>
  key.split('.').reduce((node, part) => (node && node[part] !== undefined ? node[part] : undefined), obj);

/**
 * Provides:
 *  - lang        current language code ('hy' | 'en')
 *  - t(key, vars) UI dictionary lookup with {placeholder} interpolation (falls back to English)
 *  - l(obj)       picks the current language from a { en, hy } content object
 *  - to(path)     builds a locale-aware internal URL, e.g. to('/#works') -> '/en#works'
 */
export function I18nProvider({ lang, children }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let str = lookup(dictionaries[lang], key);
      if (str === undefined) str = lookup(en, key);
      if (str === undefined) return key;
      if (vars && typeof str === 'string') {
        Object.entries(vars).forEach(([k, v]) => {
          str = str.split(`{${k}}`).join(String(v));
        });
      }
      return str;
    };

    const l = (obj) => {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) return obj[lang] ?? obj.en;
      return obj;
    };

    const to = (path = '/') => {
      const [pathname, hash] = path.split('#');
      return localePath(lang, pathname || '/') + (hash ? `#${hash}` : '');
    };

    return { lang, t, l, to };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
