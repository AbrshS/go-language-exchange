"use client";

import { useEffect, useState, useRef } from "react";
import { Mic, MicOff, PhoneOff, Globe } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { SolarSessionTimer } from "@/packages/solar/solar-timer";
import { useShell } from "@/shared/context/shell-context";

const PARTNER = {
  name: "Yuki H.",
  language: "Japanese",
  proficiency: "Native",
  avatar: "/avatars/yuki.png"
};

const ME = {
  name: "Alex",
  language: "English",
  proficiency: "Native",
  avatar: "A"
};

const PER_SPEAKER_SEC = 900; 

export function CallScreen() {
  const router = useRouter();
  const { setFullBleed } = useShell();
  
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [showMidpoint, setShowMidpoint] = useState(false);
  const [isNightSwitch, setIsNightSwitch] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(PER_SPEAKER_SEC);
  
  const timerRef = useRef<SolarSessionTimer | null>(null);

  useEffect(() => {
    setFullBleed(true);
    
    const timer = new SolarSessionTimer(
      PER_SPEAKER_SEC,
      (s) => setStage(s),
      () => {
        setShowMidpoint(true);
        setTimeout(() => setShowMidpoint(false), 8000); 
      },
      () => {
        setIsNightSwitch(true);
        setTimeout(() => {
          setIsNightSwitch(false);
          setStage(1);
          setTimeRemaining(PER_SPEAKER_SEC);
          timer.start(); 
        }, 3000);
      }
    );

    timerRef.current = timer;
    timer.start();

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      timer.stop();
      clearInterval(interval);
      setFullBleed(false);
    };
  }, [setFullBleed]);

  const handleEndCall = () => {
    if (timerRef.current) timerRef.current.stop();
    // Flag for when WorldMapScreen remounts fresh (page navigation)
    sessionStorage.setItem("pendingAnalysis", "true");
    router.push("/dashboard");
  };

  const getStageClass = () => {
    if (isNightSwitch) return "solar-night";
    switch (stage) {
      case 1: return "solar-dawn";
      case 2: return "solar-noon";
      case 3: return "solar-dusk";
      case 4: return "solar-sunset";
      default: return "solar-dawn";
    }
  };

  const getStageName = () => {
    switch (stage) {
      case 1: return "Dawn";
      case 2: return "Noon";
      case 3: return "Dusk";
      case 4: return "Sunset";
      default: return "Dawn";
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${getStageClass()}`}>
      
      {/* ── Top Left: Stage Label + Timer ── */}
      {!isNightSwitch && (
        <div className="absolute top-8 left-8 flex items-center gap-4 animate-fade-in">
          <div className="flex flex-col">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">{getStageName()}</span>
            <span className="text-white text-xl font-mono tracking-tight">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      )}

      {/* ── Center: Dual Avatars & Sound Wave ── */}
      {!isNightSwitch && (
        <div className="flex flex-col items-center gap-12 animate-zoom-out w-full max-w-lg">
          
          <div className="flex items-center justify-between w-full px-8">
            {/* Me Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full bg-white/10 blur-xl ${!isMuted ? "animate-pulse" : ""}`} />
                <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center relative z-10 shadow-2xl">
                  <span className="text-4xl font-bold text-white tracking-tighter">{ME.avatar}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white tracking-tight">{ME.name}</p>
                <p className="text-xs text-white/60 mt-0.5">{ME.language}</p>
              </div>
            </div>

            {/* Partner Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#AAFF00]/10 blur-xl animate-pulse" />
                <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center relative z-10 shadow-2xl overflow-hidden">
                  <img src={PARTNER.avatar} alt={PARTNER.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white tracking-tight">{PARTNER.name}</p>
                <p className="text-xs text-white/60 mt-0.5">{PARTNER.language}</p>
              </div>
            </div>
          </div>

          {/* Sound Wave Visualizer */}
          <div className="flex items-center justify-center gap-[3px] h-12 w-full mt-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-white/50 rounded-full"
                style={{ 
                  height: !isMuted ? "100%" : "20%",
                  animation: !isMuted ? `wave 1.${i % 3 + 1}s ease-in-out infinite alternate` : "none",
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>

        </div>
      )}

      {/* ── CSS for Sound Wave ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: scaleY(0.2); opacity: 0.3; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}} />

      {/* ── Midpoint Prompt Overlay ── */}
      {showMidpoint && !isNightSwitch && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-lg border border-white/10 px-8 py-4 rounded-2xl shadow-2xl animate-lift-up">
          <h2 className="text-white text-lg font-bold text-center">Language Switch Approaching!</h2>
          <p className="text-white/70 text-sm text-center mt-1">Start wrapping up your thoughts.</p>
        </div>
      )}

      {/* ── Night Switch Overlay ── */}
      {isNightSwitch && (
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in bg-black z-50">
          <h1 className="text-4xl font-bold text-white tracking-tighter animate-pulse">Language Switch!</h1>
        </div>
      )}

      {/* ── Bottom Controls ── */}
      {!isNightSwitch && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-3xl animate-slide-up shadow-2xl">
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button 
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-[#E53935] text-white hover:bg-[#D32F2F] transition-transform hover:scale-105 shadow-lg shadow-red-500/20"
            aria-label="End call"
          >
            <PhoneOff className="w-7 h-7" />
          </button>

          <button 
            className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Language Toggle"
          >
            <Globe className="w-6 h-6" />
          </button>
          
        </div>
      )}
    </div>
  );
}
