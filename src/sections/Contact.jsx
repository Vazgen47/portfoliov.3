import { Instagram, Linkedin, Mail, Send, Youtube, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../animations/Reveal.jsx';

export default function Contact() {
  const { t } = useI18n();

  const channels = [
    { href: `mailto:${SITE.email}`, label: t('contact.email'), value: SITE.email, Icon: Mail, external: false },
    { href: SITE.social.telegram, label: t('contact.telegram'), value: '@MkheyanAgencySupport', Icon: Send, external: true },
    { href: SITE.social.instagram, label: t('contact.instagram'), value: '@mkheyan.agency', Icon: Instagram, external: true },
    { href: SITE.founder.instagram, label: t('contact.founderInstagram'), value: '@themkheyan', Icon: Instagram, external: true },
    { href: SITE.founder.linkedin, label: t('contact.linkedin'), value: 'Vazgen Mkheyan', Icon: Linkedin, external: true },
    { href: SITE.social.youtube, label: t('contact.youtube'), value: '@MkheyanAgency', Icon: Youtube, external: true },
  ];

  return (
    <section id="contact" className="section-y bg-bg text-ink" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeading id="contact-title" eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} />

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="eyebrow">{t('contact.channels')}</h3>
            <ul className="mt-6 border-t border-line">
              {channels.map(({ href, label, value, Icon, external }) => (
                <li key={label} className="border-b border-line">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 py-5"
                    aria-label={`${label}: ${value}${external ? ` ${t('common.newTab')}` : ''}`}
                  >
                    <Icon className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block text-xs uppercase tracking-[0.16em] text-muted">{label}</span>
                      <span className="mt-1 block text-lg">{value}</span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
