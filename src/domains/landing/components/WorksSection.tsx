'use client';

// Solar Session showcase — replaces the Works section
const stages = [
  {
    name: 'Dawn',
    time: '0 – 25%',
    color: '#2D3561',
    textColor: '#fff',
    description: 'Sub-bass tones ease you in. Deep blue gradients expand from the centre. Anxiety drops before you say a word.',
  },
  {
    name: 'Noon',
    time: '25 – 50%',
    color: '#F2C46D',
    textColor: '#1A1A1A',
    description: 'Absolute silence. Warm amber light. Peak cognitive energy — your mind is clear and the conversation flows.',
  },
  {
    name: 'Dusk',
    time: '50% – T−2m',
    color: '#C0622F',
    textColor: '#fff',
    description: 'A single 3-second midpoint tone signals the language switch. Burnt orange steers you toward resolution.',
  },
  {
    name: 'Sunset',
    time: 'Final 2 min',
    color: '#3B1F5E',
    textColor: '#fff',
    description: 'High-frequency tones above the voice band act as a peripheral hourglass. Rich violet dims to near-black.',
  },
];

export function WorksSection() {
  return (
    <section className="py-24 px-12 max-md:px-5 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          Solar Session
        </p>

        {/* Heading + sub */}
        <div className="flex flex-col max-md:gap-4 md:flex-row md:items-end md:justify-between mb-16">
          <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[480px]">
            Every call has its own ambient arc.
          </h2>
          <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7] max-w-[300px]">
            Four stages of gradient and sound wrap every exchange — from calm entry to natural close.
          </p>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="rounded-xl overflow-hidden border border-[#E8E8E8]"
            >
              {/* Colour block */}
              <div
                className="h-24"
                style={{ backgroundColor: stage.color }}
                aria-hidden="true"
              />
              {/* Content */}
              <div className="p-5 bg-[#F7F7F7] flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-medium text-[#1A1A1A] leading-[1.4]">
                    {stage.name}
                  </span>
                  <span className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em]">
                    {stage.time}
                  </span>
                </div>
                <p className="text-[13px] font-light text-[#9B9B9B] leading-[1.6]">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

