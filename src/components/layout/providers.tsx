"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Inertial smooth scrolling (Lenis). Skipped entirely for users who prefer reduced motion. */
export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -88 } }}>
      {children}
    </ReactLenis>
  );
}
