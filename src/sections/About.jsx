import { Instagram, Linkedin } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../animations/Reveal.jsx';
import ImageReveal from '../animations/ImageReveal.jsx';
import Button from '../components/Button.jsx';

const STACK = ['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript ES6+', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs', 'Git / GitHub'];

export default function About() {
  const { t } = useI18n();
  const principles = t('about.principles');

  return (
    <section id="studio" className="theme-light section-y bg-bg text-ink" aria-labelledby="studio-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="studio-title" eyebrow={t('about.eyebrow')} title={t('about.title')} />
            <Reveal className="mt-12 space-y-5" delay={0.1}>
              <p className="text-lg leading-relaxed">{t('about.p1')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('about.p2')}</p>
              <p className="text-lg leading-relaxed text-muted">{t('about.p3')}</p>
            </Reveal>
          </div>
        </div>

        <div className="space-y-16 lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-line">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.title} className="grid gap-4 border-b border-line py-8 sm:grid-cols-[4rem_1fr]">
                <span className="font-display text-3xl text-accent">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="grid gap-8 sm:grid-cols-[minmax(0,15rem)_1fr]">
            <ImageReveal className="aspect-[4/5] rounded-[1.25rem] bg-panel">
              {SITE.founder.photo ? (
                <img src={SITE.founder.photo} alt={SITE.founder.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              ) : (
                <div
                  role="img"
                  aria-label={t('about.monogramLabel')}
                  className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(70%_60%_at_70%_20%,rgb(var(--c-accent)/0.22),transparent_70%)]"
                >
                  <span className="font-display text-8xl tracking-tight">VM</span>
                  <span className="absolute inset-5 rounded-[0.9rem] border border-line" aria-hidden="true" />
                </div>
              )}
            </ImageReveal>

            <Reveal>
              <p className="eyebrow">{t('about.founderLabel')}</p>
              <h3 className="mt-4 font-display text-4xl leading-tight">{SITE.founder.name}</h3>
              <p className="mt-1 text-sm text-muted">{SITE.founder.jobTitle}</p>
              <p className="mt-5 leading-relaxed text-muted">{t('about.founderBio')}</p>

              <p className="eyebrow mt-8">{t('about.stackLabel')}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {STACK.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={SITE.founder.linkedin} variant="solid" aria-label={`${t('about.linkedin')} ${t('common.newTab')}`}>
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  {t('about.linkedin')}
                </Button>
                <Button href={SITE.founder.instagram} variant="outline" aria-label={`${t('about.instagram')} ${t('common.newTab')}`}>
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  {t('about.instagram')}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
