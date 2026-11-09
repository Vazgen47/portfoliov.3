import { useLayoutEffect, useRef } from 'react';
import { gsap } from './registerGsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Masked reveal for media: the wrapper wipes open (clip-path) while the content eases from a slight zoom.
 * Optional `parallax` drifts the content while the block crosses the viewport.
 */
export default function ImageReveal({ children, className = '', parallax = false }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.3,
          ease: 'expo.out',
          clearProps: 'clipPath',
          scrollTrigger: { trigger: wrap, start: 'top 90%', once: true },
        },
      );
      gsap.fromTo(
        inner,
        { scale: 1.18 },
        { scale: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: wrap, start: 'top 90%', once: true } },
      );
      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, [reduced, parallax]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
