/**
 * Central brand configuration. Edit values here — they are used by the UI,
 * the SEO layer (meta tags + JSON-LD) and the sitemap generator.
 */
export const SITE = {
  name: 'Mkheyan Agency',
  url: 'https://mkheyan.agency',
  email: 'mkheyanagency@gmail.com',
  ogImage: '/og-image.png',
  logoImage: '/icon-512.png',

  founder: {
    name: 'Vazgen Mkheyan',
    jobTitle: 'Full-Stack AI Developer',
    linkedin: 'https://www.linkedin.com/in/vazgenmkheyan/',
    instagram: 'https://www.instagram.com/themkheyan/',
    // Put a portrait in /public/assets/images/ and set the path here, e.g.
    // '/assets/images/vazgen-mkheyan.jpg'. While null a typographic monogram is shown.
    photo: null,
  },

  social: {
    instagram: 'https://www.instagram.com/mkheyan.agency/',
    telegram: 'https://t.me/MkheyanAgencySupport',
    youtube: 'https://www.youtube.com/@MkheyanAgency',
    linkedin: 'https://www.linkedin.com/in/vazgenmkheyan/',
  },

  // Optional cinematic hero video. Put the file in /public/assets/videos/ and set
  // the path, e.g. '/assets/videos/hero.mp4'. While null the generative canvas is used.
  heroVideo: null,
  heroPoster: null,

  // WorkMark: a product initiative of the founder (kept deliberately small on the site).
  // Set `url` once the public address is confirmed; while null no link is rendered.
  workmark: { name: 'WorkMark', url: null },

  timezone: 'Asia/Yerevan',
};

export const LANGUAGES = ['hy', 'en'];
export const DEFAULT_LANGUAGE = 'hy';

export const LOCALES = {
  hy: { og: 'hy_AM', label: 'HY', name: 'Հայերեն', prefix: '' },
  en: { og: 'en_US', label: 'EN', name: 'English', prefix: '/en' },
};

/** Armenian is served from "/", English from "/en". */
export function localePath(lang, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = LOCALES[lang]?.prefix ?? '';
  if (!prefix) return clean;
  return clean === '/' ? prefix : `${prefix}${clean}`;
}

/** Removes the "/en" prefix from a pathname. */
export function stripLocale(pathname) {
  if (pathname === '/en' || pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function absoluteUrl(path = '/') {
  return `${SITE.url}${path === '/' ? '/' : path}`;
}

export const LANG_STORAGE_KEY = 'mkheyan:lang';
