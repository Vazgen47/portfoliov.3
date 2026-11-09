import { useI18n } from '../i18n/index.jsx';
import useSeo from '../hooks/useSeo.js';
import { pageGraph } from '../utils/schema.js';
import Button from '../components/Button.jsx';

export default function NotFound() {
  const { t, to, lang } = useI18n();
  useSeo({
    lang,
    path: '/',
    title: t('seo.notFound.title'),
    description: t('seo.notFound.description'),
    noindex: true,
    jsonLd: pageGraph(lang, t('seo.home.description')),
  });

  return (
    <section className="flex min-h-[100svh] items-center bg-bg text-ink">
      <div className="container-x py-40">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-6 max-w-3xl">{t('notFound.title')}</h1>
        <p className="lead mt-6 max-w-xl">{t('notFound.text')}</p>
        <Button to={to('/')} className="mt-10">
          {t('notFound.cta')}
        </Button>
      </div>
    </section>
  );
}
