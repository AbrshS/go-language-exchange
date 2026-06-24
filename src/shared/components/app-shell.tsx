"use client";

import { SidebarNav } from "./sidebar-nav";
import { TopBar } from "./top-bar";
import { ShellProvider, useShell } from "@/shared/context/shell-context";
import { cn } from "@/shared/utils/cn";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { fullBleed } = useShell();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7F0]">
      {/* Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <SidebarNav />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar — hidden on full-bleed screens (map owns its own chrome) */}
        {!fullBleed && <TopBar />}

        <main
          className={cn(
            "flex-1 overflow-hidden",
            fullBleed
              ? "relative"                        /* map fills this */
              : "overflow-y-auto  bg-[#F4F7F0]"  /* regular pages */
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ShellProvider>
      <ShellInner>{children}</ShellInner>
    </ShellProvider>
  );
}
