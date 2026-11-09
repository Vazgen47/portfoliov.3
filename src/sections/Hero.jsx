import { useLayoutEffect, useRef } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import { gsap } from '../animations/registerGsap.js';
import SplitReveal from '../animations/SplitReveal.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useClock from '../hooks/useClock.js';
import HeroCanvas from '../components/HeroCanvas.jsx';
import Button from '../components/Button.jsx';

export default function Hero() {
  const { t, to } = useI18n();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const time = useClock(SITE.timezone);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-fade]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 1.1 },
      );
      gsap.fromTo('[data-hero-bg]', { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.4 });
      gsap.to(innerRef.current, {
        yPercent: -10,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-bg text-ink">
      <div data-hero-bg className="absolute inset-0 -z-10">
        {SITE.heroVideo ? (
          <video
            className="h-full w-full object-cover opacity-40"
            src={SITE.heroVideo}
            poster={SITE.heroPoster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
        <HeroCanvas className={SITE.heroVideo ? 'absolute inset-0 mix-blend-screen' : ''} />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_45%,transparent,rgb(10_10_10/0.75))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div ref={innerRef} className="container-x flex min-h-[100svh] flex-col justify-between pb-10 pt-28 sm:pb-14">
        <div data-hero-fade className="flex items-center justify-between gap-6 opacity-0">
          <p className="eyebrow">
            <span className="mr-1 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>
          <p className="glass hidden rounded-full px-4 py-1.5 text-xs text-muted sm:block">
            {t('hero.location')} · {time} GMT+4
          </p>
        </div>

        <div className="py-16">
          <SplitReveal as="h1" text={t('hero.title')} className="display-xl max-w-[16ch] sm:max-w-[18ch]" immediate delay={0.35} stagger={0.07} />
        </div>

        <div className="grid items-end gap-10 md:grid-cols-12">
          <div data-hero-fade className="opacity-0 md:col-span-6 lg:col-span-5">
            <p className="lead">{t('hero.sub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={to('/#works')} variant="accent">
                {t('hero.ctaWorks')}
              </Button>
              <Button to={to('/#contact')} variant="outline">
                {t('hero.ctaContact')}
              </Button>
            </div>
          </div>

          <div data-hero-fade className="hidden items-center justify-end gap-4 text-xs uppercase tracking-[0.2em] text-muted opacity-0 md:col-span-6 md:flex lg:col-span-7">
            <span>{t('hero.scroll')}</span>
            <span className="relative block h-14 w-px overflow-hidden bg-line" aria-hidden="true">
              <span className="absolute inset-0 animate-scroll-cue bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
