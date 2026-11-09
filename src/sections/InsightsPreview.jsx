import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { insights } from '../data/insights.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../animations/Reveal.jsx';
import Button from '../components/Button.jsx';
import { formatMonth } from '../utils/date.js';

export function InsightCard({ article }) {
  const { t, l, to, lang } = useI18n();
  return (
    <article className="group border-t border-line pt-6">
      <Link to={to(`/insights/${article.slug}`)} className="block">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted">
          <time dateTime={article.date}>{formatMonth(article.date, lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{t('common.minRead', { n: article.readMinutes })}</span>
        </p>
        <h3 className="mt-5 font-display text-3xl leading-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
          {l(article.title)}
        </h3>
        <p className="mt-4 max-w-xl text-muted">{l(article.excerpt)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          {t('common.readArticle')}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}

export default function InsightsPreview() {
  const { t, to } = useI18n();
  return (
    <section id="insights" className="theme-light section-y bg-bg text-ink" aria-labelledby="insights-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading id="insights-title" eyebrow={t('insights.eyebrow')} title={t('insights.title')} />
          <Button to={to('/insights')} variant="outline">
            {t('insights.all')}
          </Button>
        </div>
        <Reveal className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16" stagger={0.12}>
          {insights.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
