import { SITE, absoluteUrl, localePath } from '../config/site.js';
import { services } from '../data/services.js';

const CONTEXT = 'https://schema.org';
export const ORG_ID = `${SITE.url}/#organization`;
export const PERSON_ID = `${SITE.url}/#founder`;
export const WEBSITE_ID = `${SITE.url}/#website`;

const pick = (obj, lang) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.en : obj);

/**
 * Organization + ProfessionalService.
 * IMPORTANT: no aggregateRating / review markup — none of it can be verified, so none is published.
 */
export function organizationSchema(lang, description) {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description,
    logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logoImage), width: 512, height: 512 },
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    founder: { '@id': PERSON_ID },
    areaServed: { '@type': 'Country', name: 'Armenia' },
    address: { '@type': 'PostalAddress', addressCountry: 'AM' },
    knowsLanguage: ['hy', 'en'],
    sameAs: [SITE.social.instagram, SITE.social.youtube, SITE.social.telegram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'hy' ? 'Ծառայություններ' : 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: pick(service.title, lang), description: pick(service.description, lang) },
      })),
    },
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
    url: SITE.url,
    address: { '@type': 'PostalAddress', addressCountry: 'AM' },
    sameAs: [SITE.founder.linkedin, SITE.founder.instagram],
    worksFor: { '@id': ORG_ID },
  };
}

export function websiteSchema(lang, description) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description,
    inLanguage: ['hy', 'en'],
    publisher: { '@id': ORG_ID },
  };
}

/** items: [{ name, path }] where path is locale-less ('/work/iclone'). */
export function breadcrumbSchema(lang, items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(lang, item.path)),
    })),
  };
}

export function articleSchema(lang, { title, description, path, date }) {
  const url = absoluteUrl(localePath(lang, path));
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    datePublished: date,
    inLanguage: lang,
    mainEntityOfPage: url,
    image: absoluteUrl(SITE.ogImage),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function projectSchema(lang, { name, description, path, url }) {
  const pageUrl = absoluteUrl(localePath(lang, path));
  return {
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#project`,
    name,
    description,
    url: pageUrl,
    inLanguage: lang,
    creator: { '@id': PERSON_ID },
    ...(url ? { sameAs: url } : {}),
  };
}

/** Wraps nodes into a single @graph document. */
export function graph(...nodes) {
  return { '@context': CONTEXT, '@graph': nodes.flat().filter(Boolean) };
}

export function homeGraph(lang, description) {
  return graph(organizationSchema(lang, description), personSchema(), websiteSchema(lang, description));
}

/** Base graph for inner pages (org + person so @id references resolve) plus extra nodes. */
export function pageGraph(lang, description, ...extra) {
  return graph(organizationSchema(lang, description), personSchema(), extra);
}
