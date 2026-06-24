'use client';

// Decks & stacks section — repurposes TeamSection slot
const deckTypes = [
  {
    type: 'Brain games',
    description: 'Quick association exercises that force spontaneous word retrieval. No translation, no lookup.',
  },
  {
    type: 'Key phrases',
    description: 'The 40 phrases that keep a conversation alive. Openers, pivots, clarifiers, closers.',
  },
  {
    type: 'Conversation openers',
    description: 'Never start with "How are you?" again. Real entry points into real topics.',
  },
  {
    type: 'Your stacks',
    description: 'Build your own sentence sets from words you encounter. Assemble them, save them, use them.',
  },
];

export function TeamSection() {
  return (
    <section id="about" className="py-24 px-12 max-md:px-5 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          Decks &amp; stacks
        </p>

        {/* Heading + sub */}
        <div className="flex flex-col max-md:gap-4 md:flex-row md:items-end md:justify-between mb-16">
          <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[420px]">
            Study between calls, not instead of them.
          </h2>
          <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7] max-w-[280px]">
            Decks are always reachable in two taps — never competing with the world map.
          </p>
        </div>

        {/* Deck type list */}
        <div className="flex flex-col divide-y divide-[#E8E8E8]">
          {deckTypes.map((deck, i) => (
            <div key={deck.type} className="flex max-md:flex-col items-start max-md:gap-2 gap-16 py-6">
              <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] w-6 shrink-0 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[16px] font-medium text-[#1A1A1A] leading-[1.4] w-48 shrink-0">
                {deck.type}
              </span>
              <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7]">
                {deck.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

