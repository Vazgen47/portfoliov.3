// Generates public/sitemap.xml (with hreflang alternates for Armenian "/" and English "/en").
// Runs automatically before `npm run build` and can be run manually: npm run generate:sitemap
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { projects } from '../src/data/projects.js';
import { insights } from '../src/data/insights.js';

const SITE_URL = 'https://mkheyan.agency';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/insights', priority: '0.7', changefreq: 'monthly' },
  ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...insights.map((a) => ({ path: `/insights/${a.slug}`, priority: '0.7', changefreq: 'monthly' })),
];

const hy = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;
const en = (path) => `${SITE_URL}/en${path === '/' ? '' : path}`;

const entry = (loc, route) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="hy" href="${hy(route.path)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en(route.path)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${hy(route.path)}" />
  </url>`;

const body = routes.flatMap((route) => [entry(hy(route.path), route), entry(en(route.path), route)]).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml written (${routes.length * 2} URLs)`);
