'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-32 px-6 bg-white flex flex-col items-center text-center">
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8">
        
        <h2 className="text-4xl md:text-6xl font-black text-[#4B4B4B] leading-tight tracking-tight">
          Ready to start speaking like a local?
        </h2>
        
        <p className="text-xl font-bold text-[#AFAFAF] max-w-[500px]">
          Join thousands of learners building real conversational confidence every day.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <Link
            href="/en/register"
            className="w-full sm:w-auto h-16 px-12 bg-[var(--gle-primary)] text-white text-lg font-black uppercase tracking-widest rounded-2xl shadow-[0_6px_0_var(--gle-primary-hover)] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center hover:bg-[var(--gle-primary-hover)]"
          >
            Create free account
          </Link>
        </div>

        <p className="text-[14px] font-bold text-[#AFAFAF] mt-4 uppercase tracking-widest">
          No credit card required. Free forever.
        </p>

      </div>
    </section>
  );
}
