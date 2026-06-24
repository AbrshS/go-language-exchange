"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "@/i18n/routing";
import { useShell } from "@/shared/context/shell-context";
import { X, Lock, ArrowRight, Loader2 } from "lucide-react";
import { COUNTRY_DATA, type CountryData } from "../data/country-data";
import { SessionSummaryScreen } from "../../session/components/session-summary-screen";

const ComposableMap = dynamic(
  () => import("react-simple-maps").then((m) => m.ComposableMap),
  { ssr: false }
);
const ZoomableGroup = dynamic(
  () => import("react-simple-maps").then((m) => m.ZoomableGroup),
  { ssr: false }
);
const Geographies = dynamic(
  () => import("react-simple-maps").then((m) => m.Geographies),
  { ssr: false }
);
const Geography = dynamic(
  () => import("react-simple-maps").then((m) => m.Geography),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-simple-maps").then((m) => m.Marker),
  { ssr: false }
);

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── dummy auth ── */
const DUMMY_USER = {
  studyLanguage: "ja",
  tier: "MONTHLY" as "MONTHLY" | "YEARLY" | "SUPERGO",
};

function isLocked(langCode: string) {
  if (DUMMY_USER.tier !== "MONTHLY") return false;
  return langCode !== DUMMY_USER.studyLanguage;
}

type MatchState = "idle" | "searching" | "list";
interface SheetData { cd: CountryData; locked: boolean }

const STUDY_LABEL: Record<string, string> = {
  en: "English", es: "Spanish", ja: "Japanese",
  ar: "Arabic",  hi: "Hindi",   ko: "Korean",
  fr: "French",  pt: "Portuguese", zh: "Mandarin",
};

const MOCK_USERS = [
  { name: "Yuki H.", avatar: "/avatars/yuki.png", proficiency: "High Intermediate" },
  { name: "Takashi M.", avatar: "/avatars/takashi.png", proficiency: "Advanced" },
  { name: "Kenji S.", avatar: "/avatars/kenji.png", proficiency: "Native" },
  { name: "Aoi K.", avatar: "/avatars/aoi.png", proficiency: "Low Intermediate" },
  { name: "Sakura T.", avatar: "/avatars/yuki.png", proficiency: "Advanced" },
  { name: "Ren O.", avatar: "/avatars/takashi.png", proficiency: "Native" },
  { name: "Hiroshi A.", avatar: "/avatars/kenji.png", proficiency: "High Intermediate" },
  { name: "Mei L.", avatar: "/avatars/aoi.png", proficiency: "Native" }
];

/* ── Minimal Bottom Sheet ── */
function MatchSheet({ data, onClose }: { data: SheetData; onClose: () => void }) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [state, setState] = useState<MatchState>("idle");
  const { cd, locked } = data;

  const handleStart = () => {
    setState("searching");
    setTimeout(() => { 
      setState("list"); 
    }, 1500);
  };

  return (
    <>
      <div className="absolute inset-0 z-20 bg-black/10 backdrop-blur-[2px] transition-opacity" onClick={onClose} aria-hidden="true" />
      <div 
        className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D6DFD0] px-6 pt-5 pb-10 sm:max-w-md sm:mx-auto sm:rounded-t-2xl sm:border-x shadow-2xl transition-transform"
        role="dialog" aria-modal="true" aria-label={`Match in ${cd.city}`}
      >
        <div className="w-12 h-1.5 rounded-full bg-[#E4E4E0] mx-auto mb-6" aria-hidden="true" />
        
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[#0C0C0C] text-xl font-semibold tracking-tight">{cd.city}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[#525250] text-sm font-medium">{STUDY_LABEL[DUMMY_USER.studyLanguage]}</span>
              <span className="text-[#9A9A96] text-sm">↔</span>
              <span className="text-[#525250] text-sm font-medium">{cd.language}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F2F2F0] text-[#525250] hover:text-[#0C0C0C] transition-colors" aria-label="Close">
            <X className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {locked ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F8F6] border border-[#E4E4E0]">
              <Lock className="w-4 h-4 text-[#525250] mt-0.5 shrink-0" strokeWidth={2} aria-hidden="true" />
              <div>
                <p className="text-[#0C0C0C] text-sm font-medium">Monthly plan matches {STUDY_LABEL[DUMMY_USER.studyLanguage]} only</p>
                <p className="text-[#525250] text-sm mt-1">Upgrade to SuperGO!!! to match in {cd.language} and any other language.</p>
              </div>
            </div>
            <button 
              onClick={() => router.push("/dashboard/subscription")}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-[14px] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#AAFF00", color: "#0F1A0A" }}
            >
              Upgrade to SuperGO!!! <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {state === "idle" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="topic-note" className="text-sm font-medium text-[#525250]">Topic note <span className="text-[#9A9A96] font-normal">(optional)</span></label>
                <input 
                  id="topic-note" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} 
                  placeholder="What do you want to talk about?" maxLength={120}
                  className="w-full h-12 px-4 rounded-xl border border-[#E4E4E0] bg-[#FFFFFF] text-[#0C0C0C] text-sm placeholder:text-[#9A9A96] focus:outline-none focus:border-[#AAFF00] transition-colors" 
                />
              </div>
            )}
            
            {state === "searching" && (
              <div className="flex items-center justify-center gap-3 h-12 rounded-xl bg-[#F8F8F6] border border-[#E4E4E0]">
                <Loader2 className="w-4 h-4 text-[#0C0C0C] animate-spin shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="text-sm text-[#0C0C0C] font-medium">Looking for a partner...</span>
              </div>
            )}
            
            {state === "list" && (
              <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1">
                <h3 className="text-sm font-semibold text-[#0C0C0C] mb-1">Available Partners</h3>
                {Array.from({ length: Math.min(cd.partners, 8) }).map((_, i) => {
                  const user = MOCK_USERS[i % MOCK_USERS.length];
                  return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F8F6] border border-[#E4E4E0] hover:border-[#AAFF00] transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#E4E4E0]" />
                      <div>
                        <p className="text-sm font-semibold text-[#0C0C0C]">{user.name}</p>
                        <p className="text-xs text-[#525250]">{user.proficiency}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push("/dashboard/call")}
                      className="h-8 px-4 rounded-lg font-bold text-xs hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#AAFF00", color: "#0F1A0A" }}
                    >
                      Call
                    </button>
                  </div>
                )})}
              </div>
            )}
            
            {state === "idle" && (
              <button 
                onClick={handleStart}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-[14px] hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: "#AAFF00", color: "#0F1A0A" }}
              >
                Start matching
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ── Main Map Screen ── */
export function WorldMapScreen() {
  const { setFullBleed } = useShell();
  const [sheet, setSheet] = useState<SheetData | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CountryData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const router = useRouter();

  useEffect(() => { 
    setFullBleed(true); 
    return () => setFullBleed(false); 
  }, [setFullBleed]);

  // Triggered when navigating back from the call screen
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("pendingAnalysis") === "true") {
      const t = setTimeout(() => {
        setShowAnalysisModal(true);
        sessionStorage.removeItem("pendingAnalysis");
      }, 800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowAnalysisModal(true);
    window.addEventListener("gle:analysisReady", handler);
    return () => window.removeEventListener("gle:analysisReady", handler);
  }, []);

  const handleCityClick = useCallback((cd: CountryData) => {
    if (cd.partners === 0) return;
    setSheet({ cd, locked: isLocked(cd.langCode) });
    setHoveredCity(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div 
      className="relative w-full h-full bg-[#FFFFFF] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Dashboard Header ── */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        
      </div>

      {/* ── Immersive Map Canvas ── */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [0, 30] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={[0, 20]}
          zoom={1}
          minZoom={1}
          maxZoom={8}
          translateExtent={[
            [-400, -200],
            [1200, 800]
          ]}
        >
          {/* Base Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EFEFEF"
                  stroke="#FFFFFF"
                  strokeWidth={0.75}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* City Dots */}
          {COUNTRY_DATA.map((cd) => {
            const hasPartners = cd.partners > 0;
            const locked = isLocked(cd.langCode);
            
            // Visual state computation
            const radius = hasPartners ? 4 : 2;
            let fill = hasPartners ? "#FFB800" : "#D1D1D1"; 
            let opacity = 1;
            
            if (hasPartners && locked) {
              fill = "#A0A0A0"; 
              opacity = 0.8;
            }

            const isHovered = hoveredCity?.iso === cd.iso;

            return (
              <Marker
                key={cd.iso}
                coordinates={cd.coordinates}
                onMouseEnter={() => setHoveredCity(cd)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => handleCityClick(cd)}
                style={{
                  outline: "none",
                  cursor: hasPartners ? "pointer" : "default",
                }}
              >
                {/* Glow effect for available partners */}
                {hasPartners && !locked && (
                  <circle r={10} fill="#FFB800" opacity={0.2} className="animate-pulse" />
                )}
                
                {/* Flag Image */}
                <image
                  href={`https://flagcdn.com/w20/${cd.iso.toLowerCase()}.png`}
                  width={hasPartners ? "16" : "10"}
                  height={hasPartners ? "12" : "7.5"}
                  x={hasPartners ? "-8" : "-5"}
                  y={hasPartners ? "-6" : "-3.75"}
                  style={{
                    pointerEvents: "none",
                    filter: (!hasPartners || locked) 
                      ? "grayscale(80%) opacity(60%)" 
                      : (isHovered ? "brightness(1.1) drop-shadow(0 0 4px rgba(255,184,0,0.8))" : "none"),
                    transition: "all 0.3s ease"
                  }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* ── Custom Floating Tooltip ── */}
      {hoveredCity && (
        <div 
          className="fixed z-40 pointer-events-none px-3 py-2 rounded-lg bg-white/95 backdrop-blur-md border border-[#E4E4E0] shadow-lg flex items-center gap-2.5 transition-opacity"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y - 15,
            transform: "translate(-50%, -100%)"
          }}
        >
          <span className="text-[#0C0C0C] text-sm font-semibold whitespace-nowrap">{hoveredCity.city}</span>
          
          {hoveredCity.partners > 0 ? (
            isLocked(hoveredCity.langCode) ? (
              <span className="text-[#9A9A96] text-xs font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </span>
            ) : (
              <span className="text-[#FFB800] text-xs font-bold whitespace-nowrap">
                {hoveredCity.partners} online
              </span>
            )
          ) : (
            <span className="text-[#9A9A96] text-xs font-medium whitespace-nowrap">offline</span>
          )}
        </div>
      )}

      {/* ── Bottom sheet ── */}
      {sheet && <MatchSheet data={sheet} onClose={() => setSheet(null)} />}

      {/* ── Analysis Complete Modal ── */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl max-h-[85vh] bg-[#F8F8F6] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <SessionSummaryScreen onClose={() => setShowAnalysisModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
