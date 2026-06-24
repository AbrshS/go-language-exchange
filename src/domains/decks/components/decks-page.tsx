"use client";

import { useState } from "react";
import { Search, Plus, Layers, Globe, Clock, ChevronRight, X, ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { MOCK_DECKS, type Deck, type Stack } from "../data/mock-decks";

/* ── Top Header ── */
function TopHeader() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1A1B25", margin: 0 }}>
          Decks & Stacks
        </h1>
        <p style={{ fontSize: "14px", color: "#8A8D9A", margin: "4px 0 0" }}>
          Your daily ritual between conversations.
        </p>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ position: "relative" }}>
          <Search size={18} color="#8A8D9A" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search decks..."
            style={{
              padding: "10px 16px 10px 38px",
              borderRadius: "8px",
              border: "1px solid #F0F0F0",
              background: "#FFFFFF",
              fontSize: "14px",
              color: "#1A1B25",
              outline: "none",
              width: "240px",
            }}
          />
        </div>
        <button
          style={{
            background: "var(--gle-primary)",
            color: "#1A1B25",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Plus size={18} />
          Create Deck
        </button>
      </div>
    </div>
  );
}

/* ── Deck Card ── */
function DeckCard({ deck, onClick }: { deck: Deck; onClick: () => void }) {
  const isOfficial = deck.ownerId === null;

  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        cursor: "pointer",
        border: "1px solid transparent",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "var(--gle-primary)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
      }}
    >
      {/* Header icon / badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: isOfficial ? "#1A1B25" : "#F8F9FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOfficial ? "var(--gle-primary)" : "#1A1B25",
          }}
        >
          {isOfficial ? <Globe size={24} /> : <Layers size={24} />}
        </div>
        
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F8F9FA", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, color: "#1A1B25" }}>
          {deck.language.toUpperCase()}
        </div>
      </div>

      {/* Title & Desc */}
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1A1B25", margin: "0 0 8px" }}>
          {deck.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#8A8D9A", margin: 0, lineHeight: 1.5 }}>
          {deck.description}
        </p>
      </div>

      {/* Footer stats */}
      <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8A8D9A", fontWeight: 500 }}>
          <Layers size={16} />
          {deck.cardCount} cards
        </div>
        <ChevronRight size={18} color="#1A1B25" />
      </div>
    </div>
  );
}

/* ── Deck Detail Panel (Modal) ── */
function DeckDetailPanel({ deck, onClose }: { deck: Deck; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={onClose} />
      
      {/* Sliding Panel */}
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "100%",
          background: "#FAFBFC",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Panel Header */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderBottom: "1px solid #F0F0F0", display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: deck.ownerId === null ? "#1A1B25" : "#F8F9FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: deck.ownerId === null ? "var(--gle-primary)" : "#1A1B25",
              }}
            >
              {deck.ownerId === null ? <Globe size={28} /> : <Layers size={28} />}
            </div>
            <button onClick={onClose} style={{ background: "#F8F9FA", border: "none", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8D9A", cursor: "pointer" }}>
              <X size={18} />
            </button>
          </div>
          
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#F8F9FA", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, color: "#8A8D9A", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {deck.type.replace("_", " ")}
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1A1B25", margin: "0 0 8px" }}>{deck.title}</h2>
            <p style={{ fontSize: "14px", color: "#8A8D9A", margin: 0, lineHeight: 1.5 }}>{deck.description}</p>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <Link
              href={`/dashboard/decks/${deck.id}`}
              style={{
                flex: 1,
                background: "var(--gle-primary)",
                color: "#1A1B25",
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
                textDecoration: "none"
              }}
            >
              <PlayCircle size={18} />
              Study Now
            </Link>
          </div>
        </div>

        {/* Panel Content (Stacks list) */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#1A1B25", margin: "0 0 8px", display: "flex", justifyContent: "space-between" }}>
            Stacks in this deck
            <span style={{ color: "#8A8D9A", fontWeight: 500 }}>{deck.stacks.length} items</span>
          </h4>

          {deck.stacks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#8A8D9A" }}>
              <Layers size={32} style={{ opacity: 0.5, margin: "0 auto 12px" }} />
              <p style={{ margin: 0, fontSize: "14px" }}>This deck is empty.</p>
            </div>
          ) : (
            deck.stacks.map((stack, idx) => (
              <div key={stack.id} style={{ background: "#FFFFFF", borderRadius: "12px", padding: "16px", border: "1px solid #F0F0F0", display: "flex", gap: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#A0A4B8" }}>
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#1A1B25", margin: "0 0 6px" }}>{stack.sentence}</p>
                  <p style={{ fontSize: "14px", color: "#8A8D9A", margin: 0 }}>{stack.translation}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function DecksPage() {
  const [activeTab, setActiveTab] = useState<"official" | "user">("official");
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const officialDecks = MOCK_DECKS.filter(d => d.ownerId === null);
  const userDecks = MOCK_DECKS.filter(d => d.ownerId !== null);

  const displayDecks = activeTab === "official" ? officialDecks : userDecks;

  return (
    <div style={{ flex: 1, background: "#FAFBFC", padding: "30px 40px", overflowY: "auto", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <TopHeader />

        {/* Custom Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", borderBottom: "1px solid #F0F0F0", paddingBottom: "16px" }}>
          <button
            onClick={() => setActiveTab("official")}
            style={{
              background: activeTab === "official" ? "#1A1B25" : "transparent",
              color: activeTab === "official" ? "#FFFFFF" : "#8A8D9A",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Official GLE Decks
          </button>
          <button
            onClick={() => setActiveTab("user")}
            style={{
              background: activeTab === "user" ? "#1A1B25" : "transparent",
              color: activeTab === "user" ? "#FFFFFF" : "#8A8D9A",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            My Personal Stacks
          </button>
        </div>

        {/* Decks Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {displayDecks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} onClick={() => setSelectedDeck(deck)} />
          ))}
          
          {/* Add New Deck Placeholder for 'User' tab */}
          {activeTab === "user" && (
            <div
              style={{
                background: "transparent",
                borderRadius: "16px",
                border: "2px dashed #E0E0E0",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                cursor: "pointer",
                minHeight: "220px",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#F8F9FA", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8D9A" }}>
                <Plus size={24} />
              </div>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#8A8D9A" }}>Create New Deck</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal/Panel */}
      {selectedDeck && (
        <DeckDetailPanel deck={selectedDeck} onClose={() => setSelectedDeck(null)} />
      )}
    </div>
  );
}
