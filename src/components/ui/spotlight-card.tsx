"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

/** Card whose glow and border highlight follow the cursor (styles live in globals.css `.spotlight`). */
export function SpotlightCard({ children, className, as: Tag = "div" }: Props) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onPointerMove={onMove} className={cn("spotlight", className)}>
      {children}
    </Tag>
  );
}
