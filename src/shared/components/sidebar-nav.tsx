"use client";

import { useState } from "react";
import { usePathname, Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/domains/auth";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { cn } from "@/shared/utils/cn";
import {
  Settings,
  HelpCircle,
  LogOut,
  Globe,
  History,
  LayoutGrid,
  BookOpen,
  TrendingUp,
  Zap,
  MoreVertical,
  ChevronRight
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Nav items
───────────────────────────────────────────────────────── */
const mainNav = [
  { icon: Globe,       href: "/dashboard",               label: "World Map",     badge: null },
  { icon: History,     href: "/dashboard/sessions",      label: "My Sessions",   badge: "New" },
  { icon: LayoutGrid,  href: "/dashboard/cards",         label: "Summary Cards", badge: null },
  { icon: BookOpen,    href: "/dashboard/decks",         label: "Decks & Stacks",badge: "4 due" },
  { icon: Settings,    href: "/dashboard/settings",      label: "Settings",      badge: null },
];

/* ─────────────────────────────────────────────────────────
   Sidebar inner content
───────────────────────────────────────────────────────── */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();
  const [expandedLang, setExpandedLang] = useState<string | null>(null);

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <div
      style={{
        width: "280px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--gle-bg)",
        borderRight: "1px solid var(--gle-border)",
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          padding: "32px 24px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "var(--gle-base)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--gle-primary)",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "18px",
          }}
        >
          g
        </div>
        <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--gle-text-primary)", letterSpacing: "-0.03em" }}>
          Gle
        </span>
      </div>

      {/* ── User Profile Widget ── */}
      <div style={{ padding: "0 20px", marginBottom: "24px" }}>
        <div style={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--gle-border)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
        }}>
          {/* Background Image with Blur */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.1)",
            zIndex: 0
          }} />
          
          {/* Dark Overlay for readability */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(3, 36, 37, 0.6), rgba(3, 36, 37, 0.85))",
            zIndex: 1
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* Header: User Info */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)" }}>
                  <img src="/avatars/yuki.png" alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: 0, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>Abrsh N.</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gle-primary)", boxShadow: "0 0 8px var(--gle-primary)" }}></span>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 500 }}>Pro Polyglot</p>
                  </div>
                </div>
              </div>
              <button style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "4px", color: "#FFFFFF", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"} onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Weekly Goal Progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "6px" }}>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Weekly Goal</p>
                <p style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 700, margin: 0 }}>4 / 5 <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>sessions</span></p>
              </div>
              <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "80%", height: "100%", background: "var(--gle-primary)", borderRadius: "4px", boxShadow: "0 0 10px rgba(170, 255, 0, 0.4)" }} />
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", gap: "8px" }}>
               <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(4px)" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 600, marginBottom: "4px" }}>
                   <TrendingUp size={12} color="var(--gle-primary)" /> Fluency
                 </div>
                 <span style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF" }}>84</span>
               </div>
               <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(4px)" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 600, marginBottom: "4px" }}>
                   <Zap size={12} color="#FF9800" /> Streak
                 </div>
                 <span style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF" }}>12<span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 500, marginLeft: "4px" }}>days</span></span>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <div style={{ padding: "0 24px 12px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--gle-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 8px" }}>Menu</p>
      </div>
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
        className="custom-scrollbar"
      >
        {mainNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: active ? 600 : 500,
                textDecoration: "none",
                transition: "all 0.2s ease",
                color: active ? "var(--gle-text-on-primary)" : "var(--gle-text-muted)",
                background: active ? "var(--gle-primary)" : "transparent",
              }}
              className={active ? "" : "maglo-nav-item"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <item.icon
                  style={{ width: "18px", height: "18px" }}
                  strokeWidth={active ? 2.5 : 2}
                />
                {item.label}
              </div>
              
              {item.badge && (
                <span style={{ 
                  background: active ? "var(--gle-base)" : "var(--gle-border)", 
                  color: active ? "var(--gle-bg)" : "var(--gle-text-muted)", 
                  fontSize: "11px", 
                  fontWeight: 700, 
                  padding: "2px 8px", 
                  borderRadius: "20px" 
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* ── Active Languages ── */}
        <div style={{ marginTop: "24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--gle-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px 8px" }}>My Languages</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 8px" }}>
            
            {/* Japanese */}
            <div 
              style={{ 
                background: expandedLang === 'jp' ? "linear-gradient(135deg, rgba(255,0,0,0.08), rgba(255,255,255,0.03))" : "transparent",
                borderRadius: "12px",
                padding: expandedLang === 'jp' ? "12px" : "8px",
                transition: "all 0.2s ease"
              }}
            >
              <div 
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} 
                className="lang-item"
                onClick={() => setExpandedLang(expandedLang === 'jp' ? null : 'jp')}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--gle-border)" }}>
                    <img src="https://flagcdn.com/w40/jp.png" alt="Japanese Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gle-text-primary)", margin: 0 }}>Japanese</p>
                    <p style={{ fontSize: "11px", color: "var(--gle-text-muted)", margin: "2px 0 0" }}>Level B1</p>
                  </div>
                </div>
                <ChevronRight 
                  size={14} 
                  color="var(--gle-text-muted)" 
                  style={{ transform: expandedLang === 'jp' ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} 
                />
              </div>
              
              {expandedLang === 'jp' && (
                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--gle-border)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11px", color: "var(--gle-text-secondary)", fontWeight: 600 }}>Vocab Learned</span>
                      <span style={{ fontSize: "11px", color: "var(--gle-text-primary)", fontWeight: 700 }}>142 / 200</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", background: "var(--gle-border)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: "71%", height: "100%", background: "var(--gle-primary)" }} />
                    </div>
                  </div>
                  <button style={{ background: "var(--gle-primary)", color: "var(--gle-text-on-primary)", border: "none", borderRadius: "8px", padding: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <Zap size={12} /> Practice Now
                  </button>
                </div>
              )}
            </div>

            {/* Spanish */}
            <div 
              style={{ 
                background: expandedLang === 'es' ? "linear-gradient(135deg, rgba(255,0,0,0.06), rgba(255,196,0,0.06))" : "transparent",
                borderRadius: "12px",
                padding: expandedLang === 'es' ? "12px" : "8px",
                transition: "all 0.2s ease"
              }}
            >
              <div 
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} 
                className="lang-item"
                onClick={() => setExpandedLang(expandedLang === 'es' ? null : 'es')}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", border: "1px solid var(--gle-border)" }}>
                    <img src="https://flagcdn.com/w40/es.png" alt="Spanish Flag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--gle-text-primary)", margin: 0 }}>Spanish</p>
                    <p style={{ fontSize: "11px", color: "var(--gle-text-muted)", margin: "2px 0 0" }}>Level C2</p>
                  </div>
                </div>
                <ChevronRight 
                  size={14} 
                  color="var(--gle-text-muted)" 
                  style={{ transform: expandedLang === 'es' ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} 
                />
              </div>
              
              {expandedLang === 'es' && (
                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--gle-border)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11px", color: "var(--gle-text-secondary)", fontWeight: 600 }}>Vocab Learned</span>
                      <span style={{ fontSize: "11px", color: "var(--gle-text-primary)", fontWeight: 700 }}>2850 / 3000</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", background: "var(--gle-border)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: "95%", height: "100%", background: "var(--gle-primary)" }} />
                    </div>
                  </div>
                  <button style={{ background: "var(--gle-bg)", color: "var(--gle-text-primary)", border: "1px solid var(--gle-border-strong)", borderRadius: "8px", padding: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                     Review Deck
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </nav>

      {/* ── Bottom actions ── */}
      <div
        style={{
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          borderTop: "1px solid var(--gle-border)",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--gle-text-muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
          className="maglo-nav-item"
        >
          <HelpCircle style={{ width: "18px", height: "18px" }} strokeWidth={2.5} />
          Help & Support
        </button>

        <button
          onClick={handleSignOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--gle-text-muted)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
          className="maglo-nav-item"
        >
          <LogOut style={{ width: "18px", height: "18px" }} strokeWidth={2.5} />
          Sign Out
        </button>
      </div>

      <style>{`
        .maglo-nav-item:hover {
          color: var(--gle-text-primary) !important;
          background: var(--gle-bg-elevated) !important;
        }
        .lang-item:hover p:first-child {
          color: var(--gle-primary);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--gle-border-strong);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Mobile drawer & Wrapper
───────────────────────────────────────────────────────── */
export function SidebarNav() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isDesktop) {
    return (
      <aside className="h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-gray-100"
      >
        <div className="w-5 h-5 flex flex-col justify-center gap-1">
           <span className="w-full h-0.5 bg-[#1A1B25] rounded-full" />
           <span className="w-4 h-0.5 bg-[#1A1B25] rounded-full" />
           <span className="w-full h-0.5 bg-[#1A1B25] rounded-full" />
        </div>
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent onClose={() => setIsOpen(false)} />
      </aside>
    </>
  );
}
