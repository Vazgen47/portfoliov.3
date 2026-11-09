/** Tiny className joiner: cn('a', cond && 'b') -> 'a b' */
export const cn = (...parts) => parts.filter(Boolean).join(' ');
