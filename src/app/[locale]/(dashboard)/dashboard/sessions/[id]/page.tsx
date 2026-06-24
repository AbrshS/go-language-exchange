import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SessionSummaryScreen } from "@/domains/session/components/session-summary-screen";
import { ArrowLeft } from "lucide-react";

export default function SessionDetailPage({ params: { locale, id } }: { params: { locale: string, id: string } }) {
  setRequestLocale(locale);

  return (
    <div style={{ flex: 1, background: "var(--gle-bg-subtle)", overflowY: "auto", minHeight: "100vh" }}>
      <div style={{ width: "100%", margin: "0 auto", height: "100%", display: "flex", flexDirection: "column" }}>
        
        {/* Top Header / Back Button */}
        <div style={{ padding: "20px 40px", display: "flex", alignItems: "center" }}>
          <Link
            href="/dashboard/sessions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              color: "var(--gle-text-muted)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={18} />
            Back to Sessions
          </Link>
        </div>

        {/* The Detail View */}
        <div style={{ flex: 1 }}>
          <SessionSummaryScreen />
        </div>
      </div>
    </div>
  );
}
