'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Monthly',
    price: '$12',
    period: '/month',
    description: 'Unlimited conversations in one study language.',
    features: [
      'Unlimited calls',
      'One language pair',
      'Summary cards after every call',
      'Decks & stacks',
      'Email delivery of cards',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'SuperGO!!!',
    price: '$19',
    period: '/month',
    description: 'Every language. Unlimited. Plus the membership card.',
    features: [
      'Everything in Monthly',
      'All language pairs — no restriction',
      'SuperGO!!! membership card',
      'Priority matching queue',
      'Early access to new features',
    ],
    cta: 'Go SuperGO!!!',
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-12 max-md:px-5 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-[1080px] mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-normal text-[#9B9B9B] tracking-[0.03em] mb-4">
          Pricing
        </p>

        {/* Heading */}
        <h2 className="text-[32px] max-md:text-[22px] font-light text-[#1A1A1A] leading-[1.2] tracking-[-0.02em] max-w-[400px] mb-16">
          Simple. No trial limits. No feature gates.
        </h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-w-[720px]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col gap-5 ${
                plan.highlighted
                  ? 'bg-[#1A1A1A] border-[#1A1A1A]'
                  : 'bg-[#F7F7F7] border-[#E8E8E8]'
              }`}
            >
              {/* Plan header */}
              <div className="flex flex-col gap-1">
                <span className={`text-[13px] font-normal tracking-[0.02em] ${plan.highlighted ? 'text-[rgba(255,255,255,0.6)]' : 'text-[#9B9B9B]'}`}>
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-[32px] font-light leading-[1.2] tracking-[-0.02em] ${plan.highlighted ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-[13px] font-normal tracking-[0.02em] ${plan.highlighted ? 'text-[rgba(255,255,255,0.4)]' : 'text-[#9B9B9B]'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-[13px] font-light leading-[1.6] mt-1 ${plan.highlighted ? 'text-[rgba(255,255,255,0.6)]' : 'text-[#9B9B9B]'}`}>
                  {plan.description}
                </p>
              </div>

              <div className={`h-px ${plan.highlighted ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[#E8E8E8]'}`} />

              {/* Features */}
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-white' : 'text-[#1A1A1A]'}`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className={`text-[13px] font-light leading-[1.6] ${plan.highlighted ? 'text-[rgba(255,255,255,0.8)]' : 'text-[#9B9B9B]'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/en/register"
                className={`mt-auto h-10 flex items-center justify-center rounded-lg text-[13px] font-normal tracking-[0.02em] transition-opacity hover:opacity-65 ${
                  plan.highlighted
                    ? 'bg-white text-[#1A1A1A]'
                    : 'bg-[#1A1A1A] text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-light text-[#9B9B9B] leading-[1.6] mt-6">
          Yearly billing saves 2 months. Cancel any time.
        </p>

      </div>
    </section>
  );
}

