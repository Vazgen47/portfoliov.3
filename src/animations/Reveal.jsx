import { useLayoutEffect, useRef } from 'react';
import { gsap } from './registerGsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Fades + lifts its content when it enters the viewport (once).
 * `stagger` animates the direct children one after another instead of the wrapper.
 */
export default function Reveal({ as: Tag = 'div', children, className = '', delay = 0, y = 36, stagger = 0, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay,
          stagger,
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, y, stagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
