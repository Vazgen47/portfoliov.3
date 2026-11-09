import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import useSeo from '../hooks/useSeo.js';
import { getInsight, insights } from '../data/insights.js';
import { articleSchema, breadcrumbSchema, pageGraph } from '../utils/schema.js';
import { SITE } from '../config/site.js';
import { formatMonth } from '../utils/date.js';
import SplitReveal from '../animations/SplitReveal.jsx';
import Reveal from '../animations/Reveal.jsx';
import { InsightCard } from '../sections/InsightsPreview.jsx';
import NotFound from './NotFound.jsx';

export default function InsightArticle() {
  const { slug } = useParams();
  const article = getInsight(slug);
  if (!article) return <NotFound />;
  return <ArticleView article={article} />;
}

function ArticleView({ article }) {
  const { t, l, to, lang } = useI18n();
  const path = `/insights/${article.slug}`;
  const title = l(article.title);
  const description = l(article.excerpt);
  const others = insights.filter((a) => a.slug !== article.slug);

  useSeo({
    lang,
    path,
    type: 'article',
    title: `${title} | ${SITE.name}`,
    description,
    jsonLd: pageGraph(
      lang,
      t('seo.home.description'),
      articleSchema(lang, { title, description, path, date: article.date }),
      breadcrumbSchema(lang, [
        { name: t('common.home'), path: '/' },
        { name: t('insights.back'), path: '/insights' },
        { name: title, path },
      ]),
    ),
  });

  return (
    <article className="theme-light bg-bg text-ink">
      <header className="container-x pb-14 pt-36 sm:pt-44">
        <nav aria-label={t('common.breadcrumb')} className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to={to('/')} className="link-underline">
                {t('common.home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={to('/insights')} className="link-underline">
                {t('insights.back')}
              </Link>
            </li>
          </ol>
        </nav>
        <p className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted">
          <time dateTime={article.date}>{formatMonth(article.date, lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{t('common.minRead', { n: article.readMinutes })}</span>
        </p>
        <SplitReveal as="h1" text={title} className="display-lg mt-6 max-w-5xl" immediate delay={0.4} />
        <Reveal as="p" className="lead mt-8 max-w-3xl" delay={0.3}>
          {description}
        </Reveal>
      </header>

      <div className="container-x pb-24">
        <div className="max-w-3xl border-t border-line pt-12">
          {article.body.map((block, i) =>
            block.type === 'h2' ? (
              <Reveal as="h2" key={i} className="mb-5 mt-14 font-display text-3xl leading-tight sm:text-4xl">
                {l(block.text)}
              </Reveal>
            ) : (
              <Reveal as="p" key={i} className="mb-6 text-lg leading-[1.8]">
                {l(block.text)}
              </Reveal>
            ),
          )}
          <p className="mt-14 border-t border-line pt-6 text-sm text-muted">
            {t('insights.by')} {SITE.founder.name}
          </p>
        </div>
      </div>

      {others.length ? (
        <div className="border-t border-line">
          <div className="container-x py-20">
            <h2 className="eyebrow">{t('insights.more')}</h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {others.map((a) => (
                <InsightCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
