'use client';

// How-it-works section — replaces Mission
const steps = [
  {
    number: '01',
    heading: 'Open the world map',
    body: 'See every city where a complementary speaker is online right now. Cities light up when someone is waiting.',
  },
  {
    number: '02',
    heading: 'Enter the queue',
    body: 'Choose a city, add an optional topic note, and tap "Start". The matching engine pairs you with a speaker whose native language is your study language — and vice versa.',
  },
  {
    number: '03',
    heading: 'Talk for real',
    body: 'A live audio call starts. Each speaker gets equal time. At the midpoint, you switch languages. Simple, balanced, fair.',
  },
  {
    number: '04',
    heading: 'Get your summary card',
    body: 'After the call, AI analyses the transcript and sends you a personalised card: words spoken, fluency score, key phrases, and one specific insight.',
  },
];

export function MissionSection() {
  return (
    <section id="how-it-works" className="py-24 px-12 max-md:px-5 bg-[#F7F7F7] border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          How it works
        </p>

        {/* Heading */}
        <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[480px] mb-16">
          Four steps from signup to fluency.
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-16 gap-y-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">
                {step.number}
              </span>
              <div className="w-full h-px bg-[#E8E8E8]" />
              <h3 className="text-[16px] font-medium text-[#1A1A1A] leading-[1.4] mt-2">
                {step.heading}
              </h3>
              <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

