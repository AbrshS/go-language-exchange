'use client';

const quotes = [
  {
    text: 'I studied Spanish for two years in class and could barely hold a conversation. Three weeks on GLE and I stopped thinking in English before I spoke.',
    name: 'Amara D.',
    detail: 'Lagos → speaks Spanish',
  },
  {
    text: 'The summary card after each session is the best feedback I have ever received. It tells me exactly what I said and what I should work on — not a generic tip.',
    name: 'Haruto M.',
    detail: 'Tokyo → speaks English',
  },
  {
    text: 'I was nervous the first time. Within two minutes of the Dawn stage it just... disappeared. Something about the atmosphere makes you relax and talk.',
    name: 'Priya S.',
    detail: 'Mumbai → speaks Korean',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-12 max-md:px-5 bg-[#F7F7F7] border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          From speakers
        </p>

        {/* Heading */}
        <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[480px] mb-16">
          What it feels like to actually use it.
        </h2>

        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="bg-white border border-[#E8E8E8] rounded-xl p-6 flex flex-col gap-5"
            >
              <blockquote className="text-[15px] font-light text-[#1A1A1A] leading-[1.7] flex-1">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-[13px] font-normal text-[#1A1A1A] tracking-[0.02em]">
                  {q.name}
                </span>
                <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">
                  {q.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}

