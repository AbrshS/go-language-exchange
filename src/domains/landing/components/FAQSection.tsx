'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need to speak the language already?',
    answer: 'GLE is for people who have studied a language and want to practice speaking it, not for absolute beginners. You should be at Basic proficiency or above — enough to hold a simple conversation.',
  },
  {
    question: 'What if I get matched with someone much more advanced?',
    answer: 'The matching engine uses your self-reported proficiency level to pair you with someone at a similar stage. You can update your level any time from your profile.',
  },
  {
    question: 'Is the audio call recorded?',
    answer: 'Audio is captured for analysis purposes only — to generate your summary card. Recordings are stored in encrypted storage with a limited retention window and are never shared with your partner.',
  },
  {
    question: 'What is the Solar Session System?',
    answer: 'It is the ambient layer that wraps each call. The screen transitions through four gradient stages (Dawn, Noon, Dusk, Sunset) and plays tones outside the voice range — below 100 Hz or above 5 kHz — so they never interfere with the call audio.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'English, Spanish, Japanese, Arabic, Hindi, and Korean are fully supported. More languages are in progress.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, any time. Your access continues until the end of the billing period. No questions, no retention flows.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-12 max-md:px-5 bg-[#F7F7F7] border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          FAQ
        </p>

        {/* Heading */}
        <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[400px] mb-16">
          Questions we get asked a lot.
        </h2>

        {/* Accordion */}
        <div className="flex flex-col max-w-[720px]">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-[#E8E8E8] last:border-b">
              <button
                className="w-full flex items-start justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-[15px] font-normal text-[#1A1A1A] leading-[1.6]">
                  {faq.question}
                </span>
                {open === i
                  ? <Minus className="w-4 h-4 text-[#9B9B9B] shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                  : <Plus className="w-4 h-4 text-[#9B9B9B] shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
                }
              </button>
              {open === i && (
                <div className="pb-5">
                  <p className="text-[15px] font-light text-[#9B9B9B] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

