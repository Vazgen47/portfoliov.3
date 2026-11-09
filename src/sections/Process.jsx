import { useLayoutEffect, useRef } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { processSteps } from '../data/process.js';
import { gsap } from '../animations/registerGsap.js';
import SectionHeading from '../components/SectionHeading.jsx';

/**
 * Seven-step workflow. On large screens (and when motion is allowed) the section pins and the steps
 * travel horizontally with scroll; otherwise it is a normal vertical list.
 */
export default function Process() {
  const { t, l } = useI18n();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => {
        if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-title"
      className="theme-light relative overflow-hidden bg-bg text-ink lg:flex lg:h-screen lg:flex-col lg:justify-center"
    >
      <div className="container-x pb-12 pt-24 lg:pb-14 lg:pt-20">
        <SectionHeading id="process-title" eyebrow={t('process.eyebrow')} title={t('process.title')} titleClass="display-md" />
      </div>

      <ol ref={trackRef} className="flex flex-col gap-4 px-5 pb-24 sm:px-8 lg:w-max lg:flex-row lg:gap-6 lg:px-[6vw] lg:pb-0">
        {processSteps.map((step, i) => (
          <li
            key={step.key}
            className="flex flex-col justify-between rounded-[1.5rem] border border-line bg-bg p-8 lg:h-[22rem] lg:w-[26rem] lg:shrink-0"
          >
            <div className="flex items-start justify-between">
              <span className="outline-text font-display text-7xl leading-none sm:text-8xl">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {t('process.step')} {i + 1}/{processSteps.length}
              </span>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-4xl leading-tight">{l(step.title)}</h3>
              <p className="mt-3 max-w-xs text-muted">{l(step.text)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="container-x hidden pb-10 pt-12 lg:block" aria-hidden="true">
        <div className="h-px w-full bg-line">
          <div ref={barRef} className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  );
}
