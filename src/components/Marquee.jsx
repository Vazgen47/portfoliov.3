/** Infinite text band (pure CSS). The duplicated list is hidden from assistive tech. */
export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden ? 'true' : undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="font-display text-4xl sm:text-6xl">{item}</span>
          <span className="mx-8 inline-block h-2 w-2 rounded-full bg-accent sm:mx-12" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-line py-7 text-ink sm:py-9">
      <div className="marquee-track flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
