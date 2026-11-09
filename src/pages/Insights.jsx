import { useI18n } from '../i18n/index.jsx';
import useSeo from '../hooks/useSeo.js';
import { insights } from '../data/insights.js';
import { breadcrumbSchema, pageGraph } from '../utils/schema.js';
import SplitReveal from '../animations/SplitReveal.jsx';
import Reveal from '../animations/Reveal.jsx';
import { InsightCard } from '../sections/InsightsPreview.jsx';

export default function Insights() {
  const { t, lang } = useI18n();
  useSeo({
    lang,
    path: '/insights',
    title: t('seo.insights.title'),
    description: t('seo.insights.description'),
    jsonLd: pageGraph(
      lang,
      t('seo.home.description'),
      breadcrumbSchema(lang, [
        { name: t('common.home'), path: '/' },
        { name: t('insights.back'), path: '/insights' },
      ]),
    ),
  });

  return (
    <section className="theme-light min-h-screen bg-bg text-ink">
      <div className="container-x pb-32 pt-40 sm:pt-48">
        <Reveal as="p" className="eyebrow" y={16}>
          {t('insights.eyebrow')}
        </Reveal>
        <SplitReveal as="h1" text={t('insights.title')} className="display-lg mt-6 max-w-4xl" immediate delay={0.4} />
        <Reveal as="p" className="lead mt-8 max-w-2xl" delay={0.3}>
          {t('insights.intro')}
        </Reveal>
        <Reveal className="mt-20 grid gap-14 md:grid-cols-2 md:gap-16" stagger={0.12}>
          {insights.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
