import { useRef } from 'react';
import { useI18n } from '../i18n/index.jsx';

/* ---- Generated typographic covers (used until a real screenshot is provided) ---- */
const Grid = () => (
  <g className="stroke-ink/15" strokeWidth="1" fill="none">
    {Array.from({ length: 9 }, (_, i) => (
      <line key={`v${i}`} x1={(i + 1) * 80} y1="0" x2={(i + 1) * 80} y2="600" />
    ))}
    {Array.from({ length: 7 }, (_, j) => (
      <line key={`h${j}`} x1="0" y1={(j + 1) * 75} x2="800" y2={(j + 1) * 75} />
    ))}
    <circle cx="560" cy="225" r="56" className="stroke-accent" strokeWidth="1.5" />
  </g>
);

const Rings = () => (
  <g className="stroke-ink/15" strokeWidth="1" fill="none">
    {Array.from({ length: 8 }, (_, i) => (
      <circle key={i} cx="620" cy="300" r={50 + i * 52} />
    ))}
    <circle cx="620" cy="300" r="154" className="stroke-accent" strokeWidth="1.5" />
  </g>
);

const Stripes = () => (
  <g className="stroke-ink/15" strokeWidth="1" fill="none">
    {Array.from({ length: 26 }, (_, i) => (
      <line key={i} x1={i * 48 - 200} y1="600" x2={i * 48 + 400} y2="0" />
    ))}
    <line x1="420" y1="600" x2="1020" y2="0" className="stroke-accent" strokeWidth="1.5" />
  </g>
);

const Dots = () => (
  <g className="fill-ink/25">
    {Array.from({ length: 15 }, (_, r) =>
      Array.from({ length: 20 }, (_, c) => <circle key={`${r}-${c}`} cx={c * 40 + 20} cy={r * 40 + 20} r="2.2" />),
    )}
    <circle cx="540" cy="220" r="9" className="fill-accent" />
  </g>
);

const Arcs = () => (
  <g className="stroke-ink/15" strokeWidth="1" fill="none">
    {[120, 220, 320, 420, 520, 620].map((r) => (
      <path key={r} d={`M ${800 - r} 600 A ${r} ${r} 0 0 1 800 ${600 - r}`} />
    ))}
    <path d="M 480 600 A 320 320 0 0 1 800 280" className="stroke-accent" strokeWidth="1.5" />
  </g>
);

const BAR_HEIGHTS = [220, 340, 160, 420, 280, 360, 200, 300, 240, 380];
const Bars = () => (
  <g>
    {BAR_HEIGHTS.map((height, i) => (
      <rect
        key={i}
        x={i * 76 + 36}
        y={600 - height}
        width="44"
        height={height}
        className={i === 3 ? 'fill-accent/80' : 'fill-ink/10'}
      />
    ))}
  </g>
);

const PATTERNS = [Grid, Rings, Stripes, Dots, Arcs, Bars];

/**
 * Cover media for a project. Priority: hover video > screenshot > generated cover.
 * Set `cover` / `video` in src/data/projects.js to switch from generated art to real media.
 */
export default function ProjectCover({ project, index = 0, className = '', eager = false }) {
  const { l } = useI18n();
  const videoRef = useRef(null);

  const play = () => videoRef.current?.play().catch(() => {});
  const pause = () => videoRef.current?.pause();

  if (project.cover) {
    return (
      <div className={`relative overflow-hidden bg-panel ${className}`} onMouseEnter={play} onMouseLeave={pause}>
        <img
          src={project.cover}
          alt={`${project.name} — ${l(project.summary)}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 hover:opacity-100"
          />
        ) : null}
      </div>
    );
  }

  const Pattern = PATTERNS[index % PATTERNS.length];
  return (
    <div className={`relative isolate overflow-hidden bg-panel ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <Pattern />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_15%,rgb(var(--c-accent)/0.16),transparent_70%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <span className="font-mono text-[0.7rem] tracking-wider text-muted">{project.domain}</span>
        <span className="font-display text-4xl leading-none text-ink sm:text-5xl lg:text-6xl">{project.name}</span>
      </div>
    </div>
  );
}
