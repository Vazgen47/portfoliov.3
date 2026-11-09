import { useEffect } from 'react';
import { SITE, LOCALES, LANGUAGES, localePath, absoluteUrl } from '../config/site.js';

function setMeta(attr, key, content) {
  if (content === undefined || content === null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href, hreflang) {
  const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page SEO: title, description, canonical, hreflang, Open Graph, Twitter Card,
 * robots and JSON-LD. `path` is the locale-less path (e.g. '/work/iclone').
 */
export default function useSeo({ lang, path = '/', title, description, keywords, type = 'website', image, noindex = false, jsonLd }) {
  const jsonKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const pageUrl = absoluteUrl(localePath(lang, path));
    const imageUrl = absoluteUrl(image || SITE.ogImage);

    document.title = title;
    setMeta('name', 'title', title);
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    setLink('canonical', pageUrl);
    LANGUAGES.forEach((code) => setLink('alternate', absoluteUrl(localePath(code, path)), code));
    setLink('alternate', absoluteUrl(localePath('hy', path)), 'x-default');

    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:secure_url', imageUrl);
    setMeta('property', 'og:image:alt', `${SITE.name} — ${title}`);
    setMeta('property', 'og:locale', LOCALES[lang].og);
    const other = LANGUAGES.find((code) => code !== lang);
    setMeta('property', 'og:locale:alternate', LOCALES[other].og);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    let script = document.getElementById('page-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      document.head.appendChild(script);
    }
    script.textContent = jsonKey || '{}';
  }, [lang, path, title, description, keywords, type, image, noindex, jsonKey]);
}
