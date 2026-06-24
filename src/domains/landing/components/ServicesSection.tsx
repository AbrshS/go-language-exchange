'use client';

// Summary Card showcase — replaces Services
export function ServicesSection() {
  return (
    <section className="py-24 px-12 max-md:px-5 bg-[#F7F7F7] border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          Summary card
        </p>

        {/* Heading */}
        <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[520px] mb-16">
          After every call, a card arrives in your inbox.
        </h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 items-start">

          {/* Mock summary card */}
          <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 flex flex-col gap-5">
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-normal text-[#1A1A1A] tracking-[0.02em]">Session with Kenji · Tokyo</p>
                <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mt-0.5">English ↔ Japanese · 20 min</p>
              </div>
              <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] px-3 py-1 border border-[#E8E8E8] rounded-[999px] bg-[#F7F7F7]">
                Done
              </span>
            </div>

            <div className="h-px bg-[#E8E8E8]" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Words spoken', value: '312' },
                { label: 'Unique verbs', value: '28' },
                { label: 'Fluency score', value: '74' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[22px] font-normal text-[#1A1A1A] leading-[1.3] tracking-[-0.01em]">
                    {s.value}
                  </span>
                  <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-[#E8E8E8]" />

            {/* Fluency trend */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-normal text-[#9B9B9B] tracking-[0.02em]">Fluency trend</span>
              <span className="text-[13px] font-normal text-[#1A1A1A] tracking-[0.02em]">↑ +6 from last session</span>
            </div>

            {/* Key phrases */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">Key phrases used</p>
              <div className="flex flex-wrap gap-2">
                {['actually, I think…', 'what do you mean by…', 'to be honest'].map((phrase) => (
                  <span
                    key={phrase}
                    className="text-[11px] font-normal text-[#1A1A1A] tracking-[0.02em] px-3 py-1 border border-[#E8E8E8] rounded-[999px] bg-[#F7F7F7]"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#E8E8E8]" />

            {/* AI insight */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">AI insight</p>
              <p className="text-[13px] font-light text-[#1A1A1A] leading-[1.7]">
                You defaulted to the present tense 87% of the time. Try using past progressive forms next session to describe what was happening when something else occurred.
              </p>
            </div>
          </div>

          {/* What it tells you */}
          <div className="flex flex-col gap-8">
            {[
              {
                heading: 'Based only on what you said',
                body: 'The AI insight is generated from your transcript alone — not from a generic rubric. It reads your actual words and responds to them.',
              },
              {
                heading: 'Trend over time',
                body: 'Fluency score is compared to your previous session so you can see concrete progress — or spot where you need to push.',
              },
              {
                heading: 'Arrives within 5 minutes',
                body: 'The card is emailed to you and available in-app before you\'ve had time to forget the conversation.',
              },
            ].map((item) => (
              <div key={item.heading} className="flex flex-col gap-2">
                <h3 className="text-[16px] font-medium text-[#1A1A1A] leading-[1.4]">
                  {item.heading}
                </h3>
                <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

