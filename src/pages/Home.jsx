import { useI18n } from '../i18n/index.jsx';
import useSeo from '../hooks/useSeo.js';
import { homeGraph } from '../utils/schema.js';
import { services } from '../data/services.js';
import Hero from '../sections/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import SelectedWorks from '../sections/SelectedWorks.jsx';
import About from '../sections/About.jsx';
import Services from '../sections/Services.jsx';
import Process from '../sections/Process.jsx';
import WorkMarkSection from '../sections/WorkMarkSection.jsx';
import InsightsPreview from '../sections/InsightsPreview.jsx';
import Contact from '../sections/Contact.jsx';

export default function Home() {
  const { t, l, lang } = useI18n();
  const description = t('seo.home.description');

  useSeo({
    lang,
    path: '/',
    title: t('seo.home.title'),
    description,
    keywords: t('seo.home.keywords'),
    jsonLd: homeGraph(lang, description),
  });

  return (
    <>
      <Hero />
      <Marquee items={services.map((s) => l(s.short))} />
      <SelectedWorks />
      <About />
      <Services />
      <Process />
      <WorkMarkSection />
      <InsightsPreview />
      <Contact />
    </>
  );
}
