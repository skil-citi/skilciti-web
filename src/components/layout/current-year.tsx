"use client";

import { useEffect, useState } from "react";

/** Renders the current year without making the prerendered shell time-dependent. */
export function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must resolve after hydration to keep the static shell deterministic
    setYear(new Date().getFullYear());
  }, []);
  return <span suppressHydrationWarning>{year}</span>;
}
