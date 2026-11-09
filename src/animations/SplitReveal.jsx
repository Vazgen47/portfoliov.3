import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from './registerGsap.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * Splits a string into words. Text between *asterisks* is rendered as an accented <em>.
 * Punctuation glued to an accented word stays attached to it (important for Armenian "՝", "։").
 */
export function tokenize(text) {
  const tokens = [];
  let current = null;
  text.split('*').forEach((segment, index) => {
    const em = index % 2 === 1;
    segment.split(/(\s+)/).forEach((piece) => {
      if (!piece) return;
      if (/^\s+$/.test(piece)) {
        current = null;
        return;
      }
      if (!current) {
        current = { parts: [] };
        tokens.push(current);
      }
      current.parts.push({ text: piece, em });
    });
  });
  return tokens;
}

export const plainText = (text) => text.replace(/\*/g, '');

/**
 * Headline with a masked word-by-word rise.
 *  - Default: plays when scrolled into view.
 *  - `immediate`: plays on mount after `delay` seconds (used for the hero).
 */
export default function SplitReveal({ text, as: Tag = 'h2', id, className = '', immediate = false, delay = 0, stagger = 0.06 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const tokens = useMemo(() => tokenize(text), [text]);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('[data-word]');
      const config = {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        delay,
      };
      if (!immediate) {
        config.scrollTrigger = { trigger: el, start: 'top 88%', once: true };
      }
      gsap.fromTo(words, { yPercent: 115 }, config);
    }, el);

    return () => ctx.revert();
  }, [reduced, immediate, delay, stagger, text]);

  return (
    <Tag ref={ref} id={id} className={className} aria-label={plainText(text)}>
      {tokens.map((token, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden align-bottom pt-[0.12em] pb-[0.16em] -mt-[0.12em] -mb-[0.16em]">
            <span data-word className="inline-block will-change-transform">
              {token.parts.map((part, j) =>
                part.em ? (
                  <em key={j} className="em-accent">
                    {part.text}
                  </em>
                ) : (
                  <span key={j}>{part.text}</span>
                ),
              )}
            </span>
          </span>
          {i < tokens.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
