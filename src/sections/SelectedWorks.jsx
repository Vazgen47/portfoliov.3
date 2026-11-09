import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { projects, projectCategories } from '../data/projects.js';
import { ScrollTrigger } from '../animations/registerGsap.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

export default function SelectedWorks() {
  const { t } = useI18n();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  // Page height changes when filtering; re-measure every ScrollTrigger below this section (e.g. pinned process).
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [filter]);

  const counts = useMemo(() => {
    const map = { all: projects.length };
    projects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <section id="works" className="section-y bg-bg text-ink" aria-labelledby="works-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading id="works-title" eyebrow={t('works.eyebrow')} title={t('works.title')} intro={t('works.intro')} />
          <div role="group" aria-label={t('works.filterLabel')} className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {projectCategories.map((key) => {
              if (key !== 'all' && !counts[key]) return null;
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(key)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    active ? 'border-accent bg-accent text-on-accent' : 'border-line text-muted hover:border-ink/40 hover:text-ink'
                  }`}
                >
                  {t(`works.categories.${key}`)}
                  <span className="ml-2 text-xs opacity-70">{counts[key]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-sm text-muted" aria-live="polite">
          {t('works.count', { n: visible.length })}
        </p>

        {visible.length ? (
          <div className="mt-6 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={projects.indexOf(project)}
                className={i % 2 === 1 ? 'md:mt-24' : ''}
              />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-muted">{t('works.empty')}</p>
        )}
      </div>
    </section>
  );
}
