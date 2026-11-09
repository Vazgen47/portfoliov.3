import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

const ease = [0.76, 0, 0.24, 1];

/**
 * Route transition. Only `opacity` is animated on the page wrapper (a CSS transform on an ancestor
 * would break ScrollTrigger pinning). A wipe curtain with a green edge reveals the new page.
 */
export function PageWrapper({ children }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.25 } }}
      exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.35 } }}
      className="outline-none"
    >
      {children}
    </motion.main>
  );
}

export function Curtain({ routeKey }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      key={routeKey}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] origin-top bg-[#0a0a0a]"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0, transition: { duration: 0.9, ease, delay: 0.1 } }}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-[rgb(53,224,138)]" />
    </motion.div>
  );
}
