'use client';

// Language pairs ticker — replaces the logo marquee
const pairs = [
  'English ↔ Spanish',
  'English ↔ Japanese',
  'English ↔ Arabic',
  'English ↔ Hindi',
  'English ↔ Korean',
  'Spanish ↔ Japanese',
  'Arabic ↔ French',
  'Hindi ↔ English',
];

export function LogoTicker() {
  const doubled = [...pairs, ...pairs];

  return (
    <section className="border-t border-b border-[#E8E8E8] py-5 overflow-hidden bg-[#F7F7F7]">
      <div
        className="flex gap-12 animate-marquee-smooth whitespace-nowrap"
        aria-hidden="true"
      >
        {doubled.map((pair, i) => (
          <span
            key={i}
            className="text-[13px] font-normal text-[#9B9B9B] tracking-[0.02em] shrink-0"
          >
            {pair}
          </span>
        ))}
      </div>
      <p className="sr-only">Supported language pairs: {pairs.join(', ')}</p>
    </section>
  );
}

