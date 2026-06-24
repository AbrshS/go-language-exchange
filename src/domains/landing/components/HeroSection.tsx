'use client';

import Link from 'next/link';
import { ArrowRight, Globe2, Mic, Users, HeartPulse } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 flex flex-col items-center justify-center bg-white overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 text-[var(--gle-primary-muted)] opacity-50 rotate-12 animate-pulse hidden lg:block">
        <Globe2 size={120} strokeWidth={1} />
      </div>
      <div className="absolute bottom-20 right-10 text-[#F8F9FA] opacity-80 -rotate-12 hidden lg:block">
        <Mic size={160} strokeWidth={1} />
      </div>

      <div className="max-w-[1000px] mx-auto w-full flex flex-col items-center text-center gap-10 relative z-10">
        
        {/* Status pill */}
        <div className="inline-flex items-center gap-3 px-6 py-2 border-2 border-[#E5E5E5] rounded-full bg-white shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gle-primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--gle-primary)]"></span>
          </span>
          <span className="text-[13px] font-bold text-[#AFAFAF] uppercase tracking-widest">
            Now live in 40+ cities worldwide
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-[#4B4B4B] leading-[1.1] tracking-tight max-w-[800px]">
          The free, fun, and <span className="text-[var(--gle-primary)]">effective</span> way to learn a language!
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl font-bold text-[#AFAFAF] leading-relaxed max-w-[600px]">
          Connect by audio with native speakers anywhere on earth. Build real conversational confidence. Not a class. Not an app. A live exchange.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto mt-4">
          <Link
            href="/en/register"
            className="w-full sm:w-auto h-16 px-10 bg-[var(--gle-primary)] text-white text-lg font-black uppercase tracking-widest rounded-2xl shadow-[0_6px_0_var(--gle-primary-hover)] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 hover:bg-[var(--gle-primary-hover)]"
          >
            Start speaking
            <ArrowRight size={24} strokeWidth={3} />
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto h-16 px-10 bg-white border-2 border-[#E5E5E5] text-[#AFAFAF] hover:text-[#4B4B4B] hover:border-[#AFAFAF] text-lg font-bold uppercase tracking-widest rounded-2xl shadow-[0_4px_0_#E5E5E5] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
          >
            How it works
          </Link>
        </div>

        {/* Social proof icons */}
        <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center pt-12 border-t-2 border-[#F3F4F4] mt-8 w-full max-w-[800px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#E5F5D9] text-[var(--gle-primary)] flex items-center justify-center mb-2">
              <Users size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-black text-[#4B4B4B]">12k+</span>
            <span className="text-[12px] font-bold text-[#AFAFAF] uppercase tracking-widest">Speakers</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#FFF0E5] text-[#FF9600] flex items-center justify-center mb-2">
              <Globe2 size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-black text-[#4B4B4B]">40+</span>
            <span className="text-[12px] font-bold text-[#AFAFAF] uppercase tracking-widest">Cities</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#FFE5E5] text-[#FF4B4B] flex items-center justify-center mb-2">
              <HeartPulse size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-black text-[#4B4B4B]">6</span>
            <span className="text-[12px] font-bold text-[#AFAFAF] uppercase tracking-widest">Languages</span>
          </div>
        </div>

      </div>
    </section>
  );
}
