"use client";

import { createContext, useContext, useState } from "react";

interface ShellContextValue {
  fullBleed: boolean;
  setFullBleed: (v: boolean) => void;
}

const ShellContext = createContext<ShellContextValue>({
  fullBleed: false,
  setFullBleed: () => {},
});

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [fullBleed, setFullBleed] = useState(false);
  return (
    <ShellContext.Provider value={{ fullBleed, setFullBleed }}>
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  return useContext(ShellContext);
}
