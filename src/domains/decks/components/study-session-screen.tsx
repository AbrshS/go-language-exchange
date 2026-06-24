"use client";

import { useState } from "react";
import { X, CheckCircle2, AlertCircle, MessageCircle, HelpCircle } from "lucide-react";
import type { Stack } from "../data/mock-decks";

interface StudySessionScreenProps {
  stack: Stack;
  onClose: () => void;
  onComplete: () => void;
}

export function StudySessionScreen({ stack, onClose, onComplete }: StudySessionScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--gle-bg-subtle)] flex flex-col animation-fade-in overflow-hidden">
      
      {/* ── Top Bar ── */}
      <div className="w-full flex items-center gap-6 px-6 py-5 bg-white border-b border-[var(--gle-border)]">
        <button 
          onClick={onClose}
          className="text-[#AFAFAF] hover:text-[#777777] transition-colors p-2 -ml-2 rounded-xl hover:bg-[#F3F4F4]"
        >
          <X size={28} strokeWidth={2.5} />
        </button>
        <div className="flex-1">
          <div className="w-full h-4 bg-[#E5E5E5] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--gle-primary)] rounded-full transition-all duration-500 ease-out"
              style={{ width: isRevealed ? "100%" : "50%" }} 
            />
          </div>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          
          <h2 className="text-xl font-bold text-[#AFAFAF] uppercase tracking-widest text-center mb-4">
            Translate this sentence
          </h2>

          {/* Flashcard Front */}
          <div className="bg-white border-2 border-[var(--gle-border)] rounded-3xl p-10 shadow-sm flex items-center justify-center min-h-[200px]">
            <p className="text-4xl font-black text-[#4B4B4B] text-center leading-relaxed">
              {stack.sentence}
            </p>
          </div>

          {/* Flashcard Back (Revealed State) */}
          <div className={`transition-all duration-500 ease-out origin-top flex flex-col gap-6 ${isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute"}`}>
            
            <div className="bg-[var(--gle-primary-muted)] border-2 border-[var(--gle-primary)] rounded-3xl p-8 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold text-[var(--gle-text-secondary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-[var(--gle-primary)]" />
                Correct Meaning
              </h3>
              <p className="text-3xl font-bold text-[#4B4B4B] text-center">
                {stack.translation}
              </p>
            </div>

            {stack.words && stack.words.length > 0 && (
              <div className="bg-white border-2 border-[var(--gle-border)] rounded-3xl p-8">
                <h3 className="text-sm font-bold text-[#AFAFAF] uppercase tracking-widest mb-6">
                  Word Breakdown
                </h3>
                <div className="flex flex-wrap gap-4">
                  {stack.words.map((word, idx) => (
                    <div key={idx} className="flex flex-col bg-[#F8F9FA] border border-[#E5E5E5] px-4 py-3 rounded-2xl">
                      <span className="text-xl font-black text-[#4B4B4B] mb-1">{word.token}</span>
                      <span className="text-xs font-bold text-[#AFAFAF] uppercase tracking-widest">{word.pos}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
          
        </div>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="w-full bg-white border-t-2 border-[var(--gle-border)] p-6 sm:px-12 sm:py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {!isRevealed ? (
            <button 
              onClick={() => setIsRevealed(true)}
              className="w-full bg-[var(--gle-primary)] text-white text-xl font-black uppercase tracking-widest py-5 rounded-2xl shadow-[0_6px_0_var(--gle-primary-hover)] active:translate-y-[6px] active:shadow-none transition-all"
            >
              Check Answer
            </button>
          ) : (
            <div className="flex gap-4">
              <button 
                onClick={onComplete}
                className="flex-1 bg-white border-2 border-[#E5E5E5] text-[#AFAFAF] hover:bg-[#F8F9FA] text-lg font-bold uppercase tracking-widest py-4 rounded-2xl shadow-[0_4px_0_#E5E5E5] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <AlertCircle size={24} /> Hard
              </button>
              <button 
                onClick={onComplete}
                className="flex-1 bg-[var(--gle-primary)] text-white text-lg font-black uppercase tracking-widest py-4 rounded-2xl shadow-[0_6px_0_var(--gle-primary-hover)] active:translate-y-[6px] active:shadow-none transition-all"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
