'use client';

import { Globe, Users, Repeat } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    heading: 'Human-only calls',
    body: 'Every exchange is two real people. No AI, no bots, no scripts — just a live conversation between two humans who need each other.',
    color: '#FF9600',
    bg: '#FFF0E5'
  },
  {
    icon: Repeat,
    heading: 'Both sides win',
    body: 'You speak your study language for half the call, your partner speaks theirs for the other half. Teacher and student at the same time.',
    color: '#1CB0F6',
    bg: '#E5F6FF'
  },
  {
    icon: Globe,
    heading: 'The world is your classroom',
    body: 'A world map shows you exactly where speakers are online right now. Pick a city, start a conversation.',
    color: '#58CC02',
    bg: '#E5F5D9'
  },
];

export function WhyUsSection() {
  return (
    <section id="features" className="py-32 px-6 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">

        {/* Section label */}
        <div className="inline-block px-4 py-2 bg-white rounded-2xl border-2 border-[#E5E5E5] shadow-sm mb-6">
          <p className="text-[14px] font-bold text-[#AFAFAF] uppercase tracking-widest">
            Why Gle?
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-[#4B4B4B] text-center max-w-[800px] mb-16 tracking-tight">
          Confidence comes from <span className="text-[#FF9600]">doing</span>, not studying.
        </h2>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {pillars.map((p) => (
            <div
              key={p.heading}
              className="bg-white border-2 border-[#E5E5E5] rounded-3xl p-10 flex flex-col items-center text-center hover:border-[#AFAFAF] hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: p.bg, color: p.color }}
              >
                <p.icon size={40} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black text-[#4B4B4B] mb-4">
                {p.heading}
              </h3>
              <p className="text-[16px] font-bold text-[#AFAFAF] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
