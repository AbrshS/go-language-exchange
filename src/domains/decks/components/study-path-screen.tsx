"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft, Star, Lock, Flame, Diamond, Heart, Zap, Trophy, Crown } from "lucide-react";
import type { Deck, Stack } from "../data/mock-decks";
import { StudySessionScreen } from "./study-session-screen";
import { useState } from "react";

export function StudyPathScreen({ deck }: { deck: Deck }) {
  const [activeStack, setActiveStack] = useState<Stack | null>(null);

  // Let's generate a path of 10 nodes for demonstration, even if the deck has fewer actual stacks.
  const pathNodes = Array.from({ length: 10 }).map((_, idx) => {
    const isCompleted = idx < 2;
    const isActive = idx === 2;
    const isLocked = idx > 2;
    const isChest = idx === 5 || idx === 9;
    const stackData = deck.stacks[idx] || null;

    return { id: idx, isCompleted, isActive, isLocked, isChest, stackData };
  });

  // Winding offset pattern for nodes
  const getOffsetX = (index: number) => {
    const offsets = [0, 30, 50, 30, 0, -30, -50, -30];
    return offsets[index % offsets.length];
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      
      {/* ── Main Path Area ── */}
      <div className="flex-1 flex flex-col border-r border-[#E5E5E5] pb-32">
        
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/decks" className="text-[#AFAFAF] hover:text-[#777777] transition-colors">
            <ArrowLeft size={24} strokeWidth={2.5} />
          </Link>
          <h2 className="text-[#AFAFAF] font-bold text-lg tracking-wide uppercase">
            Section 1: {deck.title}
          </h2>
          <div className="w-6" /> {/* spacer */}
        </div>

        {/* Active Unit Banner */}
        <div className="max-w-2xl mx-auto w-full px-6 mt-8 mb-12">
          <div className="bg-[#58CC02] rounded-2xl p-6 text-white shadow-[0_4px_0_#46A302]">
            <h3 className="text-2xl font-black mb-2">Unit 1</h3>
            <p className="text-lg font-medium opacity-90">{deck.description}</p>
          </div>
        </div>

        {/* Winding Path */}
        <div className="relative max-w-md mx-auto w-full flex flex-col items-center gap-6 py-10">
          
          {/* Background Winding SVG Line (Optional enhancement) */}
          {/* We'll rely on the buttons for the main visual, similar to simpler implementations. */}

          {pathNodes.map((node, index) => {
            const offsetX = getOffsetX(index);
            const isChest = node.isChest;

            return (
              <div 
                key={node.id} 
                className="relative flex flex-col items-center"
                style={{ transform: `translateX(${offsetX}px)` }}
              >
                {/* Active Tooltip "START" */}
                {node.isActive && (
                  <div className="absolute -top-12 z-20 animate-bounce">
                    <div className="bg-[#58CC02] text-white font-black px-4 py-2 rounded-xl text-sm tracking-wide shadow-sm">
                      START
                    </div>
                    <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#58CC02] mx-auto" />
                  </div>
                )}

                {/* The Node Button */}
                <button 
                  className={`
                    relative w-20 h-20 rounded-full flex items-center justify-center
                    transition-transform hover:scale-105 active:scale-95
                    ${node.isCompleted ? "bg-[#58CC02] shadow-[0_6px_0_#46A302]" : ""}
                    ${node.isActive ? "bg-[#58CC02] shadow-[0_6px_0_#46A302] border-4 border-white ring-4 ring-[#E5E5E5]" : ""}
                    ${node.isLocked && !isChest ? "bg-[#E5E5E5] shadow-[0_6px_0_#CECECE]" : ""}
                    ${isChest && node.isLocked ? "bg-[#E5E5E5] shadow-[0_6px_0_#CECECE]" : ""}
                    ${isChest && !node.isLocked ? "bg-[#FFC800] shadow-[0_6px_0_#D9A200]" : ""}
                  `}
                  disabled={node.isLocked}
                  onClick={() => {
                    if (!node.isLocked && node.stackData) {
                      setActiveStack(node.stackData);
                    } else if (!node.isLocked && !node.stackData) {
                      // Fallback if no real stack data but node is unlocked (e.g. mock nodes)
                      // We'll create a dummy stack to show the UI
                      setActiveStack({
                        id: `dummy_${node.id}`,
                        sentence: `Placeholder for Unit 1, Lesson ${node.id + 1}`,
                        translation: "You've selected a placeholder node.",
                        words: []
                      });
                    }
                  }}
                >
                  {node.isCompleted && !isChest && <Star size={36} color="white" fill="white" />}
                  {node.isActive && !isChest && <Star size={40} color="white" fill="white" />}
                  {node.isLocked && !isChest && <Lock size={32} color="#AFAFAF" fill="#AFAFAF" />}
                  
                  {isChest && (
                    <Trophy size={36} color={node.isLocked ? "#AFAFAF" : "white"} fill={node.isLocked ? "#AFAFAF" : "white"} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Sidebar ── */}
      <div className="hidden lg:flex flex-col w-[380px] p-6 gap-6 sticky top-0 h-screen overflow-y-auto">
        
        {/* User Stats Bar */}
        <div className="flex items-center justify-between px-2 text-[#777777] font-bold">
          <div className="flex items-center gap-2">
            <img src={`https://flagcdn.com/w20/${deck.language.toLowerCase()}.png`} alt="Flag" className="rounded-sm shadow-sm" />
          </div>
          <div className="flex items-center gap-2 text-[#FF9600]">
            <Flame size={20} fill="#FF9600" /> 1
          </div>
          <div className="flex items-center gap-2 text-[#1CB0F6]">
            <Diamond size={20} fill="#1CB0F6" /> 505
          </div>
          <div className="flex items-center gap-2 text-[#FF4B4B]">
            <Heart size={20} fill="#FF4B4B" /> 4
          </div>
        </div>

        {/* Promo Card */}
        <div className="border-2 border-[#E5E5E5] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-[#4B4B4B]">Try Pro for free</h3>
            <Crown size={24} className="text-[#CE82FF]" fill="#CE82FF" />
          </div>
          <p className="text-[#777777] font-medium text-sm">
            No ads, personalized practice, and unlimited attempts!
          </p>
          <button className="bg-[#CE82FF] text-white font-bold tracking-wide uppercase py-3 rounded-xl shadow-[0_4px_0_#A568CC] active:translate-y-1 active:shadow-none transition-all">
            Try 2 Weeks Free
          </button>
        </div>

        {/* Leaderboards */}
        <div className="border-2 border-[#E5E5E5] rounded-2xl p-6">
          <h3 className="font-bold text-lg text-[#4B4B4B] mb-4">Unlock Leaderboards!</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E5E5E5] flex items-center justify-center shrink-0">
              <Lock size={20} color="#AFAFAF" fill="#AFAFAF" />
            </div>
            <p className="text-[#777777] font-medium text-sm leading-relaxed">
              Complete 9 more lessons to start competing
            </p>
          </div>
        </div>

        {/* Daily Quests */}
        <div className="border-2 border-[#E5E5E5] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#4B4B4B]">Daily Quests</h3>
            <span className="text-[#1CB0F6] font-bold text-sm tracking-wide uppercase cursor-pointer">View All</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Zap size={32} className="text-[#FFC800]" fill="#FFC800" />
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-[#4B4B4B] font-bold text-sm">Earn 10 XP</p>
              <div className="w-full bg-[#E5E5E5] h-4 rounded-full overflow-hidden flex relative">
                <div className="bg-[#FFC800] w-[100%] h-full rounded-full" />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">10 / 10</span>
              </div>
            </div>
            <Trophy size={24} className="text-[#D9A200]" fill="#D9A200" />
          </div>
        </div>

      </div>

      {/* Full-Screen Overlay for Study Session */}
      {activeStack && (
        <StudySessionScreen 
          stack={activeStack} 
          onClose={() => setActiveStack(null)} 
          onComplete={() => setActiveStack(null)} 
        />
      )}
    </div>
  );
}
