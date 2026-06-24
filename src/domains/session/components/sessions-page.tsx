"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Bell,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  TrendingUp,
  Zap
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { MOCK_SESSIONS, type Session } from "../data/mock-sessions";

/* ── Top Nav Header (simulating the top right of the Maglo design) ── */
function TopHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--gle-text-primary)", margin: 0 }}>
        My Sessions
      </h1>
      
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <button style={{ background: "none", border: "none", color: "var(--gle-text-muted)", cursor: "pointer" }}>
          <Search size={20} strokeWidth={2} />
        </button>
        <button style={{ background: "none", border: "none", color: "var(--gle-text-muted)", cursor: "pointer", position: "relative" }}>
          <Bell size={20} strokeWidth={2} />
          {/* Notification dot */}
          <span style={{ position: "absolute", top: "0", right: "2px", width: "8px", height: "8px", background: "var(--gle-primary)", borderRadius: "50%", border: "2px solid var(--gle-bg-subtle)" }} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--gle-bg)", padding: "6px 12px", borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--gle-border-strong)", overflow: "hidden" }}>
             <img src="/avatars/yuki.png" alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)" }}>
            Abrsh Nabil
          </span>
          <ChevronDown size={16} color="var(--gle-text-muted)" />
        </div>
      </div>
    </div>
  );
}

/* ── Session Card ── */
function SessionCard({ session }: { session: Session }) {
  const isPositive = session.stats.fluencyDelta >= 0;

  return (
    <div
      style={{
        background: "var(--gle-bg)",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--gle-border)" }}>
             <img src={session.partnerAvatar} alt={session.partnerName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--gle-text-primary)", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              {session.partnerName}
              {session.isNew && (
                <CheckCircle2 size={16} color="var(--gle-primary)" fill="color-mix(in srgb, var(--gle-primary) 20%, transparent)" />
              )}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--gle-text-muted)", margin: "4px 0 0" }}>
              {session.city}, {session.countryCode}
            </p>
          </div>
        </div>
        <button style={{ background: "none", border: "none", color: "var(--gle-text-muted)", cursor: "pointer" }}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Language Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--gle-bg-elevated)", padding: "8px 16px", borderRadius: "8px", width: "fit-content" }}>
         <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)" }}>{session.languagePair.from}</span>
         <span style={{ margin: "0 12px", color: "var(--gle-text-muted)" }}>→</span>
         <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)" }}>{session.languagePair.to}</span>
      </div>

      {/* Details Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <p style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--gle-text-muted)", margin: "0 0 6px" }}>
            <Calendar size={14} /> Date
          </p>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)", margin: 0 }}>{session.date}</p>
        </div>
        <div>
          <p style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--gle-text-muted)", margin: "0 0 6px" }}>
            <Clock size={14} /> Duration
          </p>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)", margin: 0 }}>{session.duration}</p>
        </div>
      </div>

      {/* Stats Table */}
      <div style={{ borderTop: "1px solid var(--gle-border)", paddingTop: "20px" }}>
         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--gle-text-muted)", fontWeight: 500 }}>ITEM</span>
            <div style={{ display: "flex", gap: "40px" }}>
               <span style={{ fontSize: "13px", color: "var(--gle-text-muted)", fontWeight: 500, width: "60px", textAlign: "right" }}>SCORE</span>
               <span style={{ fontSize: "13px", color: "var(--gle-text-muted)", fontWeight: 500, width: "60px", textAlign: "right" }}>DELTA</span>
            </div>
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", border: "1px solid var(--gle-border)", borderRadius: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--gle-text-primary)" }}>Fluency</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--gle-text-primary)" }}>{session.stats.fluencyScore}</span>
            <span style={{ 
              fontSize: "12px", 
              fontWeight: 600, 
              color: isPositive ? "var(--gle-success)" : "var(--gle-error)", 
              background: isPositive ? "color-mix(in srgb, var(--gle-success) 10%, transparent)" : "color-mix(in srgb, var(--gle-error) 10%, transparent)", 
              padding: "2px 6px", 
              borderRadius: "4px" 
            }}>
                {isPositive ? "+" : ""}{session.stats.fluencyDelta}
            </span>
            </div>
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", border: "1px solid var(--gle-border)", borderRadius: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--gle-text-primary)" }}>Words / Verbs</span>
            <div style={{ display: "flex", gap: "40px" }}>
               <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)", width: "60px", textAlign: "right" }}>{session.stats.wordsSpoken}</span>
               <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--gle-text-primary)", width: "60px", textAlign: "right" }}>{session.stats.uniqueVerbs}</span>
            </div>
         </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "auto", paddingTop: "12px" }}>
        <Link
          href={`/dashboard/sessions/${session.id}`}
          style={{
            flex: 1,
            background: "var(--gle-primary)",
            color: "var(--gle-text-on-primary)",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.2s",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          View Summary
        </Link>
        <button
          style={{
            background: "var(--gle-bg-elevated)",
            color: "var(--gle-text-primary)",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "var(--gle-border)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "var(--gle-bg-elevated)")}
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function SessionsPage() {
  // Split sessions to mimic the asymmetrical layout in the image
  const mainSession = MOCK_SESSIONS[0];
  const sideSessions = MOCK_SESSIONS.slice(1);

  return (
    <div style={{ flex: 1, background: "var(--gle-bg-subtle)", padding: "30px 40px", overflowY: "auto", minHeight: "100vh" }}>
      <div style={{ maxWidth: "full", margin: "0 auto" }}>
        <TopHeader />

        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "30px" }}>
          
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Top Banner (Dark Card) */}
            <div
              style={{
                background: "var(--gle-base)",
                borderRadius: "16px",
                padding: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "var(--gle-primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", fontStyle: "italic", color: "var(--gle-text-on-primary)" }}>
                  m
                </div>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--gle-bg)", margin: "0 0 4px" }}>Go Language Exchange</h2>
                  <p style={{ fontSize: "14px", color: "var(--gle-text-muted)", margin: 0 }}>support@gle.com</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "14px", color: "var(--gle-bg)", margin: "0 0 4px" }}>Recent Activity Overview</p>
                <p style={{ fontSize: "13px", color: "var(--gle-text-muted)", margin: 0 }}>
                  Total Sessions: {MOCK_SESSIONS.length} <br/>
                  Total Time: 70m
                </p>
              </div>
            </div>

            {/* Main Session Card */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gle-text-primary)", marginBottom: "16px" }}>Most Recent Session</h3>
              <SessionCard session={mainSession} />
            </div>

            {/* Sub Sessions Row */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--gle-text-primary)", marginBottom: "16px" }}>Previous Sessions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {sideSessions.slice(0, 2).map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar widgets) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
             
             {/* Overall Stats Widget */}
             <div style={{ background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "24px" }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                 <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1B25", margin: 0 }}>Basic Info</h3>
               </div>
               
               <div style={{ marginBottom: "16px" }}>
                 <p style={{ fontSize: "12px", color: "#8A8D9A", marginBottom: "8px" }}>Total Progress Score</p>
                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #F0F0F0", padding: "12px 16px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1B25" }}>84 / 100</span>
                    <TrendingUp size={18} color="#8A8D9A" />
                 </div>
               </div>

               <div style={{ marginBottom: "24px" }}>
                 <p style={{ fontSize: "12px", color: "#8A8D9A", marginBottom: "8px" }}>Next Scheduled Goal</p>
                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #F0F0F0", padding: "12px 16px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1B25" }}>Reach C1 Level</span>
                    <Calendar size={18} color="#8A8D9A" />
                 </div>
               </div>

               <button
                  style={{
                    width: "100%",
                    background: "var(--gle-primary)",
                    color: "#1A1B25",
                    border: "none",
                    borderRadius: "8px",
                    padding: "14px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Start New Session
                </button>
             </div>

             {/* Quick Actions / Other Info */}
             <div style={{ background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1A1B25", margin: "0 0 16px" }}>Language Journey</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gle-primary)" }} />
                      <span style={{ fontSize: "14px", color: "#1A1B25", fontWeight: 500 }}>Completed 10 sessions</span>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E0E0E0" }} />
                      <span style={{ fontSize: "14px", color: "#8A8D9A" }}>Master 500 unique verbs</span>
                   </div>
                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E0E0E0" }} />
                      <span style={{ fontSize: "14px", color: "#8A8D9A" }}>Achieve 90+ fluency score</span>
                   </div>
                </div>
                
                <button
                  style={{
                    width: "100%",
                    background: "#F8F9FA",
                    color: "#228B22",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: "20px",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#EAECEF")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#F8F9FA")}
                >
                  View Full Roadmap
                </button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
