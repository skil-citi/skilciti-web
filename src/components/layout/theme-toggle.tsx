"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_KEY = "skilciti-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const apply = () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* storage unavailable — theme simply won't persist */
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Cross-fade the whole page where the View Transitions API is available.
    if (!reduce && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cn(
        "glass grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      <Sun className="theme-sun size-[18px]" aria-hidden />
      <Moon className="theme-moon size-[18px]" aria-hidden />
    </button>
  );
}
