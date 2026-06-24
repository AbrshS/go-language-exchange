"use client";

import { useState } from "react";
import { Search, Sparkles, Calendar, LayoutGrid, List, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { MOCK_SESSIONS, type Session } from "../data/mock-sessions";

/* ── Top Header ── */
function TopHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gle-text-primary)] mb-2 tracking-tight">
          Session History
        </h1>
        <p className="text-[15px] text-[var(--gle-text-muted)] max-w-md leading-relaxed">
          Review your linguistic feedback, track fluency trends, and explore AI-generated insights from past conversations.
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AFAFAF] group-focus-within:text-[var(--gle-text-primary)] transition-colors" />
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full md:w-64 bg-white border border-[#E5E5E5] rounded-full py-2.5 pl-10 pr-4 text-[14px] text-[var(--gle-text-primary)] placeholder-[#AFAFAF] focus:outline-none focus:border-[var(--gle-text-secondary)] focus:ring-1 focus:ring-[var(--gle-text-secondary)] transition-all"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Summary Card Preview (Minimal Redesign) ── */
function SummaryCardPreview({ session }: { session: Session }) {
  const isPositive = session.stats.fluencyDelta >= 0;

  return (
    <Link
      href={`/dashboard/sessions/${session.id}`}
      className="group flex flex-col bg-white border border-[#E5E5E5] rounded-3xl p-8 hover:border-[var(--gle-text-secondary)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Top row: Avatar + Name + Date */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img 
            src={session.partnerAvatar} 
            alt={session.partnerName} 
            className="w-12 h-12 rounded-full object-cover border border-[#E5E5E5] grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div>
            <h3 className="text-[16px] font-bold text-[var(--gle-text-primary)]">
              {session.partnerName}
            </h3>
            <p className="text-[13px] text-[#AFAFAF] font-medium flex items-center gap-1.5 mt-0.5">
              <Calendar size={13} /> {session.date}
            </p>
          </div>
        </div>
      </div>

      {/* Elegant Metrics Row */}
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#F3F4F4]">
        
        {/* Fluency */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#AFAFAF] uppercase tracking-widest">Fluency</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--gle-text-primary)] tracking-tighter">
              {session.stats.fluencyScore}
            </span>
            <span className={`text-[12px] font-bold ${isPositive ? "text-[var(--gle-success)]" : "text-[var(--gle-error)]"}`}>
              {isPositive ? "+" : ""}{session.stats.fluencyDelta}
            </span>
          </div>
        </div>

        {/* Words */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#AFAFAF] uppercase tracking-widest">Words</span>
          <span className="text-xl font-bold text-[#4B4B4B] tracking-tight">
            {session.stats.wordsSpoken}
          </span>
        </div>

        {/* Verbs */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#AFAFAF] uppercase tracking-widest">Verbs</span>
          <span className="text-xl font-bold text-[#4B4B4B] tracking-tight">
            {session.stats.uniqueVerbs}
          </span>
        </div>
      </div>

      {/* AI Insight (Minimal Quote) */}
      <div className="flex flex-col mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-[#AFAFAF] group-hover:text-[var(--gle-primary)] transition-colors" />
          <span className="text-[11px] font-bold text-[#AFAFAF] uppercase tracking-widest">Key Insight</span>
        </div>
        <p className="text-[14px] text-[var(--gle-text-muted)] leading-relaxed line-clamp-2">
          "{session.keyPhrasesTeaser}"
        </p>
      </div>

      {/* Hover Arrow (Subtle affordance) */}
      <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center">
          <ArrowRight size={18} className="text-[var(--gle-text-primary)]" />
        </div>
      </div>
    </Link>
  );
}

/* ── Main Page ── */
export function SummaryCardsPage() {
  return (
    <div className="flex-1 bg-[#FAFAFA] px-6 py-12 md:p-16 overflow-y-auto min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <TopHeader />

        {/* Elegant Pill Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
           <div className="flex flex-wrap gap-3 p-1.5 bg-white border border-[#E5E5E5] rounded-full shadow-sm">
             <button className="bg-[var(--gle-text-primary)] text-white px-6 py-2 rounded-full text-[13px] font-bold transition-all">
               All
             </button>
             <button className="bg-transparent text-[var(--gle-text-muted)] hover:text-[var(--gle-text-primary)] px-5 py-2 rounded-full text-[13px] font-semibold transition-all">
               Japanese
             </button>
             <button className="bg-transparent text-[var(--gle-text-muted)] hover:text-[var(--gle-text-primary)] px-5 py-2 rounded-full text-[13px] font-semibold transition-all">
               Spanish
             </button>
           </div>
           
           <div className="flex gap-2 p-1 bg-white border border-[#E5E5E5] rounded-full shadow-sm">
              <button className="bg-[#F3F4F4] text-[var(--gle-text-primary)] p-2 rounded-full transition-all">
                 <LayoutGrid size={16} />
              </button>
              <button className="bg-transparent text-[#AFAFAF] hover:text-[var(--gle-text-primary)] p-2 rounded-full transition-all">
                 <List size={16} />
              </button>
           </div>
        </div>

        {/* Spacious Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {MOCK_SESSIONS.map((session) => (
            <SummaryCardPreview key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
}
