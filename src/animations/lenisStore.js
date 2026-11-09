import { gsap, ScrollTrigger } from './registerGsap.js';

let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};
export const getLenis = () => instance;

/** Locks / unlocks page scroll (used by the mobile menu). Works with or without Lenis. */
export function lockScroll(locked) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/** Scrolls to an element id (with a header offset). Retries briefly while the target mounts. */
export function scrollToHash(hash, { immediate = false } = {}) {
  const id = decodeURIComponent((hash || '').replace('#', ''));
  if (!id) return;
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      ScrollTrigger.refresh();
      if (instance) instance.scrollTo(el, { offset: -72, immediate });
      else el.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }
    if (tries++ < 40) requestAnimationFrame(attempt);
  };
  attempt();
}

export { gsap };
