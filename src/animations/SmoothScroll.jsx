import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './registerGsap.js';
import { setLenis } from './lenisStore.js';

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled entirely when the user prefers reduced motion (native scrolling is used).
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis = null;
    let tick = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      tick = null;
      setLenis(null);
    };

    const sync = () => (mq.matches ? stop() : start());
    sync();
    mq.addEventListener('change', sync);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('load', refresh);
      stop();
    };
  }, []);

  return children;
}
