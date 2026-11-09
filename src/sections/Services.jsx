import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { services } from '../data/services.js';
import { ScrollTrigger } from '../animations/registerGsap.js';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../animations/Reveal.jsx';

export default function Services() {
  const { t, l, to } = useI18n();
  const [open, setOpen] = useState(services[0].slug);

  const toggle = (slug) => {
    setOpen((current) => (current === slug ? null : slug));
    // accordion changes page height -> keep pinned/scroll sections below accurate
    window.setTimeout(() => ScrollTrigger.refresh(), 700);
  };

  return (
    <section id="services" className="section-y bg-bg text-ink" aria-labelledby="services-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="services-title" eyebrow={t('services.eyebrow')} title={t('services.title')} intro={t('services.intro')} titleClass="display-md" />
          </div>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {services.map((service, i) => {
            const isOpen = open === service.slug;
            const panelId = `service-panel-${service.slug}`;
            const buttonId = `service-btn-${service.slug}`;
            const benefits = l(service.benefits);
            return (
              <Reveal as="li" key={service.slug} className="border-b border-line" y={24}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(service.slug)}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                  >
                    <span className="w-8 shrink-0 text-sm text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-display text-3xl leading-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                      {l(service.title)}
                    </span>
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-500 ease-expo ${
                        isOpen ? 'rotate-45 border-accent text-accent' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                </h3>

                <div id={panelId} role="region" aria-labelledby={buttonId} className="grid-collapse" data-open={isOpen} {...(!isOpen ? { inert: '' } : {})}>
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 pl-0 sm:pl-16 md:grid-cols-[1fr_auto]">
                      <div>
                        <p className="max-w-xl text-lg leading-relaxed text-muted">{l(service.description)}</p>
                        <p className="eyebrow mt-8">{t('services.benefits')}</p>
                        <ul className="mt-4 space-y-2">
                          {benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-3">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        <Link to={to('/#contact')} className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-medium">
                          {t('services.discuss')}
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                      {service.image ? (
                        <img
                          src={service.image}
                          alt=""
                          width="500"
                          height="500"
                          loading="lazy"
                          decoding="async"
                          className="h-44 w-44 object-contain opacity-90 sm:h-56 sm:w-56"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
