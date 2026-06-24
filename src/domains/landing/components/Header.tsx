'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E5E5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
            <div className="w-10 h-10 rounded-2xl bg-[var(--gle-primary)] flex items-center justify-center shadow-[0_4px_0_var(--gle-primary-hover)]">
              <span className="text-white font-black text-xl leading-none pt-1">g</span>
            </div>
            <span className="text-2xl font-black text-[#4B4B4B] tracking-tight group-hover:text-[var(--gle-primary)] transition-colors">
              Gle
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-bold text-[#AFAFAF] hover:text-[var(--gle-text-secondary)] uppercase tracking-widest transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/en/login"
              className="text-[15px] font-bold text-[#AFAFAF] hover:text-[var(--gle-text-primary)] uppercase tracking-widest transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/en/register"
              className="h-12 px-8 bg-[var(--gle-primary)] text-white text-[15px] font-black uppercase tracking-widest rounded-2xl shadow-[0_4px_0_var(--gle-primary-hover)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#AFAFAF] hover:text-[#4B4B4B] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 md:hidden">
          <nav className="px-6 py-8 flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-bold text-[#4B4B4B] py-4 border-b border-[#E5E5E5] active:bg-[#F8F9FA] rounded-xl px-4 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8 px-4">
              <Link
                href="/en/login"
                onClick={() => setMobileOpen(false)}
                className="h-14 flex items-center justify-center border-2 border-[#E5E5E5] text-[#AFAFAF] text-lg font-bold uppercase tracking-widest rounded-2xl shadow-[0_4px_0_#E5E5E5] active:translate-y-[4px] active:shadow-none transition-all"
              >
                Log in
              </Link>
              <Link
                href="/en/register"
                onClick={() => setMobileOpen(false)}
                className="h-14 flex items-center justify-center bg-[var(--gle-primary)] text-white text-lg font-black uppercase tracking-widest rounded-2xl shadow-[0_4px_0_var(--gle-primary-hover)] active:translate-y-[4px] active:shadow-none transition-all"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
