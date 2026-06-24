"use client";

import { Suspense } from "react";
import { WorldMapScreen } from "@/domains/world-map/components/world-map-screen";

export default function DashboardPage() {
  return (
    <Suspense>
      <WorldMapScreen />
    </Suspense>
  );
}
