import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import useSeo from '../hooks/useSeo.js';
import { projects, getProject } from '../data/projects.js';
import { breadcrumbSchema, pageGraph, projectSchema } from '../utils/schema.js';
import SplitReveal from '../animations/SplitReveal.jsx';
import Reveal from '../animations/Reveal.jsx';
import ImageReveal from '../animations/ImageReveal.jsx';
import ProjectCover from '../components/ProjectCover.jsx';
import Button from '../components/Button.jsx';
import NotFound from './NotFound.jsx';

function Meta({ label, children }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="text-xs uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="mt-2 text-lg">{children}</dd>
    </div>
  );
}

export default function WorkDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  return <ProjectView project={project} />;
}

function ProjectView({ project }) {
  const { t, l, to, lang } = useI18n();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const path = `/work/${project.slug}`;
  const summary = l(project.summary);
  const description = t('seo.projectDescription', { name: project.name, summary });

  useSeo({
    lang,
    path,
    title: t('seo.projectTitle', { name: project.name }),
    description,
    jsonLd: pageGraph(
      lang,
      t('seo.home.description'),
      projectSchema(lang, { name: project.name, description, path, url: project.url }),
      breadcrumbSchema(lang, [
        { name: t('common.home'), path: '/' },
        { name: project.name, path },
      ]),
    ),
  });

  return (
    <article className="bg-bg text-ink">
      <header className="container-x pb-16 pt-36 sm:pt-44">
        <nav aria-label={t('common.breadcrumb')} className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to={to('/')} className="link-underline">
                {t('common.home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={to('/#works')} className="link-underline">
                {t('works.eyebrow')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {project.name}
            </li>
          </ol>
        </nav>

        <SplitReveal as="h1" text={project.name} className="display-xl mt-10" immediate delay={0.5} />
        <Reveal as="p" className="lead mt-8 max-w-2xl" delay={0.3}>
          {summary}
        </Reveal>
      </header>

      <div className="container-x">
        <ImageReveal className="aspect-[16/9] w-full rounded-[1.5rem]" parallax>
          <ProjectCover project={project} index={index} eager className="h-full w-full" />
        </ImageReveal>
      </div>

      <div className="container-x grid gap-16 py-20 lg:grid-cols-12 lg:py-28">
        <Reveal as="dl" className="grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1" stagger={0.08}>
          <Meta label={t('project.year')}>{project.year}</Meta>
          <Meta label={t('project.role')}>{l(project.role)}</Meta>
          <Meta label={t('project.category')}>{t(`works.categories.${project.category}`)}</Meta>
          <Meta label={t('project.stack')}>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="chip text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </Meta>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <h2 className="eyebrow">{t('project.overview')}</h2>
            <p className="display-md mt-6">{summary}</p>
          </Reveal>
          <Reveal className="mt-14" delay={0.1}>
            <h2 className="eyebrow">{t('project.scope')}</h2>
            <ul className="mt-6 border-t border-line">
              {l(project.scope).map((item) => (
                <li key={item} className="flex items-start gap-4 border-b border-line py-5 text-lg">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href={project.url} variant="accent" className="mt-10" aria-label={`${t('project.visit')} — ${project.domain} ${t('common.newTab')}`}>
              {t('project.visit')} · {project.domain}
            </Button>
          </Reveal>
        </div>
      </div>

      <nav className="border-t border-line" aria-label={t('project.next')}>
        <div className="container-x grid gap-px sm:grid-cols-2">
          <Link to={to(`/work/${prev.slug}`)} className="group flex items-center gap-4 py-10 sm:pr-10">
            <ArrowLeft className="h-6 w-6 shrink-0 transition-transform duration-500 ease-expo group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-muted">{t('project.previous')}</span>
              <span className="mt-2 block font-display text-3xl transition-colors group-hover:text-accent">{prev.name}</span>
            </span>
          </Link>
          <Link to={to(`/work/${next.slug}`)} className="group flex items-center justify-end gap-4 py-10 text-right sm:border-l sm:border-line sm:pl-10">
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-muted">{t('project.next')}</span>
              <span className="mt-2 block font-display text-3xl transition-colors group-hover:text-accent">{next.name}</span>
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <div className="container-x pb-24 pt-4">
        <Link to={to('/#works')} className="link-underline inline-flex items-center gap-2 text-sm">
          <ArrowUpRight className="h-4 w-4 -rotate-90" aria-hidden="true" />
          {t('project.back')}
        </Link>
      </div>
    </article>
  );
}
