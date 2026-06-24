"use client";

import { useAuth } from "@/domains/auth";
import { usePathname } from "@/i18n/routing";
import { SidebarNav } from "./sidebar-nav";

/* Map hrefs to readable page titles */
const pageTitles: Record<string, string> = {
  "/dashboard":              "World map",
  "/dashboard/sessions":     "My sessions",
  "/dashboard/cards":        "Summary cards",
  "/dashboard/decks":        "Decks & stacks",
  "/dashboard/profile":      "Profile",
  "/dashboard/subscription": "Subscription",
  "/dashboard/settings":     "Settings",
  "/dashboard/admin":        "Admin",
};

export function TopBar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Find the best matching title
  const title = Object.entries(pageTitles)
    .filter(([href]) => pathname === href || pathname.startsWith(href + "/"))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? "Dashboard";

  return (
    <header
      className="flex h-14 items-center justify-between px-5 border-b border-[#DEDBD6] bg-white flex-shrink-0"
      role="banner"
    >
      {/* Left — mobile hamburger + page title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger — SidebarNav renders the trigger when isMobile */}
        <div className="md:hidden">
          <SidebarNav />
        </div>
        <span className="text-[15px] font-semibold text-[#0D1F3C] tracking-[-0.01em]">
          {title}
        </span>
      </div>

      {/* Right — user name (desktop) */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-[13px] font-medium text-[#6B6760]">
          {user?.name ?? ""}
        </span>
        <div className="w-7 h-7 rounded-full bg-[#0D1F3C] flex items-center justify-center">
          <span className="text-white text-[11px] font-semibold">
            {user?.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
          </span>
        </div>
      </div>
    </header>
  );
}
