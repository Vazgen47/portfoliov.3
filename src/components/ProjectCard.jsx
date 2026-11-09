import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import ImageReveal from '../animations/ImageReveal.jsx';
import ProjectCover from './ProjectCover.jsx';

export default function ProjectCard({ project, index = 0, className = '' }) {
  const { t, l, to } = useI18n();

  return (
    <article className={`group animate-fade-up ${className}`}>
      <Link to={to(`/work/${project.slug}`)} className="block">
        <ImageReveal className="aspect-[4/3] w-full rounded-[1.25rem]">
          <ProjectCover
            project={project}
            index={index}
            className="h-full w-full transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]"
          />
        </ImageReveal>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">{project.name}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{l(project.summary)}</p>
          </div>
          <span
            className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip">{t(`works.categories.${project.category}`)}</span>
          <span className="chip">{project.year}</span>
          <span className="sr-only">{t('common.viewProject')}</span>
        </div>
      </Link>
    </article>
  );
}
