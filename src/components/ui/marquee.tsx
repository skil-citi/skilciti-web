import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  gapClass?: string;
};

/** Seamless infinite marquee driven by pure CSS (pauses on hover). */
export function Marquee({ children, reverse = false, className, gapClass = "gap-10 pr-10" }: Props) {
  return (
    <div className={cn("fade-mask-x flex overflow-clip", className)}>
      <div
        className={cn(
          "flex w-max hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        <div className={cn("flex shrink-0 items-center", gapClass)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0 items-center", gapClass)}>
          {children}
        </div>
      </div>
    </div>
  );
}
