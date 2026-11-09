import SplitReveal from '../animations/SplitReveal.jsx';
import Reveal from '../animations/Reveal.jsx';

/** Eyebrow + masked headline (+ optional intro paragraph). `title` supports *accent* markup. */
export default function SectionHeading({ eyebrow, title, intro, id, as = 'h2', className = '', titleClass = 'display-lg' }) {
  return (
    <div className={className}>
      <Reveal as="p" className="eyebrow" y={16}>
        {eyebrow}
      </Reveal>
      <SplitReveal as={as} id={id} text={title} className={`${titleClass} mt-6`} />
      {intro ? (
        <Reveal as="p" className="lead mt-8 max-w-2xl" delay={0.1}>
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
