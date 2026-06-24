"use client";

import { useState } from "react";
import { Sparkles, Clock, MessageCircle, ArrowUpRight, ShieldCheck, Download, Play, CalendarDays, Mic2 } from "lucide-react";

const SUMMARY_DATA = {
  sessionId: "ses_1a2b8f3a",
  partnerName: "Yuki H.",
  language: "Japanese",
  duration: "15:00",
  stats: {
    wordsSpoken: 412,
    uniqueVerbs: 34,
    fluencyScore: 85,
    fluencyDelta: "+2"
  },
  aiInsight: "You used the conditional form correctly 3 times when discussing hypothetical travel plans! Next time, try to incorporate more transition words like 'therefore' (だから) to connect your sentences more smoothly.",
  verbs: [
    { lemma: "食べる", translation: "to eat", count: 5 },
    { lemma: "行く", translation: "to go", count: 4 },
    { lemma: "思う", translation: "to think", count: 3 }
  ],
  nouns: [
    { lemma: "友達", translation: "friend", count: 6 },
    { lemma: "日本", translation: "Japan", count: 4 },
    { lemma: "旅行", translation: "travel", count: 3 }
  ],
  phrases: [
    { phrase: "どう思いますか？", translation: "What do you think?" },
    { phrase: "それは面白いですね", translation: "That is interesting" }
  ],
  // Signed S3 link, time-limited, access-controlled
  transcriptUrl: "https://gle-transcripts.s3.amazonaws.com/ses_1a2b/transcript.txt?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Signature=vjbyPxybdZaNmGa%2ByT272YEAiv4%3D&Expires=1782222599"
};

export function SessionSummaryScreen() {
  const [vocabTab, setVocabTab] = useState<"verbs" | "nouns">("verbs");

  return (
    <div className="flex flex-col w-full min-h-screen bg-[var(--gle-bg-subtle)] pb-20">
      
      {/* ── Header Hero Section ── */}
      <div className="w-full bg-[var(--gle-base)] relative overflow-hidden pt-12 pb-16 px-10 rounded-b-3xl shadow-xl">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gle-primary)] opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-2xl rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 bg-[var(--gle-border-strong)] flex items-center justify-center shrink-0 shadow-2xl relative">
              <img src="/avatars/yuki.png" alt="Yuki" className="w-full h-full object-cover" />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-[var(--gle-success)] border-2 border-[var(--gle-base)] rounded-full" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-white/10 uppercase">
                  Session {SUMMARY_DATA.sessionId.split('_')[1]}
                </span>
                <span className="flex items-center gap-1.5 text-white/70 text-sm font-medium">
                  <CalendarDays className="w-4 h-4" /> Oct 24, 2023
                </span>
              </div>
              <h1 className="text-4xl font-black text-white leading-tight mb-2">{SUMMARY_DATA.partnerName}</h1>
              <div className="flex items-center gap-4 text-[var(--gle-text-muted)] font-medium">
                <span className="flex items-center gap-1.5"><GlobeIcon /> {SUMMARY_DATA.language}</span>
                <span className="opacity-50">•</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {SUMMARY_DATA.duration}</span>
                <span className="opacity-50">•</span>
                <span className="flex items-center gap-1.5"><Mic2 className="w-4 h-4" /> Audio & Video</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-6 text-right">
              <div>
                <p className="text-[var(--gle-text-muted)] text-xs font-bold uppercase tracking-widest mb-1">Fluency Score</p>
                <div className="flex items-baseline gap-3 justify-end">
                  <span className="text-6xl font-black text-white tracking-tighter">{SUMMARY_DATA.stats.fluencyScore}</span>
                  <span className="flex items-center gap-1 text-[var(--gle-success)] bg-[color-mix(in_srgb,var(--gle-success)_15%,transparent)] font-bold px-2.5 py-1 rounded-lg text-sm border border-[var(--gle-success)]/20 shadow-sm">
                    <ArrowUpRight className="w-4 h-4" /> {SUMMARY_DATA.stats.fluencyDelta}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> Export
              </button>
              <a 
                href={SUMMARY_DATA.transcriptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--gle-primary)] hover:bg-[var(--gle-primary-hover)] text-[var(--gle-text-on-primary)] px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-[var(--gle-primary)]/20"
              >
                <Play className="w-4 h-4 fill-current" /> View Full Transcript
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto w-full px-10 -mt-8 relative z-20 flex flex-col gap-8">
        {/* Core Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[var(--gle-bg)] border border-[var(--gle-border)] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <p className="text-3xl font-black text-[var(--gle-text-primary)] mb-1">{SUMMARY_DATA.stats.wordsSpoken}</p>
            <p className="text-sm text-[var(--gle-text-muted)] font-semibold uppercase tracking-wide">Words Spoken</p>
          </div>
          <div className="bg-[var(--gle-bg)] border border-[var(--gle-border)] rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <p className="text-3xl font-black text-[var(--gle-text-primary)] mb-1">{SUMMARY_DATA.stats.uniqueVerbs}</p>
            <p className="text-sm text-[var(--gle-text-muted)] font-semibold uppercase tracking-wide">Unique Verbs</p>
          </div>
          <div className="bg-[var(--gle-bg)] border border-[var(--gle-border)] rounded-2xl p-6 shadow-sm flex flex-col justify-center bg-gradient-to-br from-[var(--gle-bg)] to-[var(--gle-bg-elevated)]">
            <div className="flex items-center gap-2 text-[var(--gle-text-muted)] text-xs font-bold tracking-wide uppercase mb-3">
              <ShieldCheck className="w-4 h-4" /> Security
            </div>
            <p className="text-sm text-[var(--gle-text-primary)] font-medium leading-relaxed">
              Transcript is stored via a time-limited, access-controlled S3 link for your privacy.
            </p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-[var(--gle-bg)] rounded-3xl p-8 border-2 border-[var(--gle-primary)]/20 shadow-lg shadow-[var(--gle-primary)]/5 flex gap-6 items-start relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[var(--gle-primary)]" />
          <div className="w-14 h-14 rounded-full bg-[var(--gle-primary)]/20 flex items-center justify-center shrink-0 border border-[var(--gle-primary)]/30">
            <Sparkles className="w-7 h-7 text-[var(--gle-primary-hover)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-[var(--gle-text-primary)] font-black mb-2 flex items-center gap-2">
              Claude's Insight
            </h3>
            <p className="text-base text-[var(--gle-text-secondary)] leading-relaxed font-medium">
              {SUMMARY_DATA.aiInsight}
            </p>
          </div>
        </div>

        {/* Two Column Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vocabulary */}
          <div className="bg-[var(--gle-bg)] rounded-3xl p-8 border border-[var(--gle-border)] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[var(--gle-text-primary)] font-black text-xl flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[var(--gle-text-muted)]" /> Vocabulary Profile
              </h3>
              <div className="flex gap-1 bg-[var(--gle-border)] p-1 rounded-xl">
                <button
                  onClick={() => setVocabTab("verbs")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    vocabTab === "verbs" ? "bg-[var(--gle-bg)] text-[var(--gle-text-primary)] shadow-sm" : "text-[var(--gle-text-secondary)] hover:text-[var(--gle-text-primary)]"
                  }`}
                >
                  Verbs
                </button>
                <button
                  onClick={() => setVocabTab("nouns")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    vocabTab === "nouns" ? "bg-[var(--gle-bg)] text-[var(--gle-text-primary)] shadow-sm" : "text-[var(--gle-text-secondary)] hover:text-[var(--gle-text-primary)]"
                  }`}
                >
                  Nouns
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {vocabTab === "verbs" ? (
                SUMMARY_DATA.verbs.map((v, i) => (
                  <div key={i} className="flex items-center justify-between bg-[var(--gle-bg-subtle)] px-5 py-4 rounded-2xl border border-[var(--gle-border)] hover:border-[var(--gle-border-strong)] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[var(--gle-text-primary)] font-bold text-base">{v.lemma}</span>
                      <span className="text-sm text-[var(--gle-text-secondary)] mt-0.5">{v.translation}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-[var(--gle-border)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--gle-primary)] rounded-full" style={{ width: `${(v.count / 5) * 100}%` }} />
                      </div>
                      <span className="text-sm text-[var(--gle-text-muted)] font-black w-8 text-right">{v.count}x</span>
                    </div>
                  </div>
                ))
              ) : (
                SUMMARY_DATA.nouns.map((n, i) => (
                  <div key={i} className="flex items-center justify-between bg-[var(--gle-bg-subtle)] px-5 py-4 rounded-2xl border border-[var(--gle-border)] hover:border-[var(--gle-border-strong)] transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[var(--gle-text-primary)] font-bold text-base">{n.lemma}</span>
                      <span className="text-sm text-[var(--gle-text-secondary)] mt-0.5">{n.translation}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-[var(--gle-border)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--gle-primary)] rounded-full" style={{ width: `${(n.count / 6) * 100}%` }} />
                      </div>
                      <span className="text-sm text-[var(--gle-text-muted)] font-black w-8 text-right">{n.count}x</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Key Phrases */}
          <div className="bg-[var(--gle-bg)] rounded-3xl p-8 border border-[var(--gle-border)] shadow-sm">
            <h3 className="text-[var(--gle-text-primary)] font-black text-xl mb-6">Key Phrases Captured</h3>
            <div className="flex flex-col gap-4">
              {SUMMARY_DATA.phrases.map((p, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--gle-bg-subtle)] border border-[var(--gle-border)] border-l-4 border-l-[var(--gle-primary)]">
                  <p className="text-[var(--gle-text-primary)] font-bold text-lg mb-1">{p.phrase}</p>
                  <p className="text-sm text-[var(--gle-text-secondary)] font-medium">{p.translation}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}
