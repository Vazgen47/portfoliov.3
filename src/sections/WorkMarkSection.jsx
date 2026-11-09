import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import Reveal from '../animations/Reveal.jsx';
import Button from '../components/Button.jsx';

/** Deliberately compact: WorkMark is a founder initiative, not the focus of the agency site. */
export default function WorkMarkSection() {
  const { t, to } = useI18n();
  return (
    <section id="workmark" className="relative overflow-hidden bg-bg py-24 text-ink sm:py-28" aria-labelledby="workmark-title">
      <div className="container-x grid items-center gap-12 border-y border-line py-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{t('workmark.eyebrow')}</p>
          <h2 id="workmark-title" className="outline-text mt-6 font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-tight">
            {SITE.workmark.name}
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <p className="lead">{t('workmark.text')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={to('/#contact')} variant="outline">
              {t('workmark.cta')}
            </Button>
            {SITE.workmark.url ? (
              <Button href={SITE.workmark.url} variant="ghost" aria-label={`${t('workmark.visit')} ${t('common.newTab')}`}>
                {t('workmark.visit')}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
