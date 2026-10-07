import { cn } from "@/lib/utils";
import {
  FULL_VIEWBOX,
  LOGO_TEAL,
  MARK_CIRCLE,
  MARK_S_PATH,
  MARK_VIEWBOX,
  WORDMARK_PATH,
} from "./logo-paths";

type LogoProps = {
  /** "full" = mark + wordmark, "mark" = circle mark only */
  variant?: "full" | "mark";
  className?: string;
  title?: string;
};

/**
 * Vector Skilciti logo. The wordmark uses `currentColor` so it flips with the
 * theme (set a text colour on the element or a parent); the teal mark stays on-brand.
 */
export function Logo({ variant = "full", className, title = "Skilciti" }: LogoProps) {
  const full = variant === "full";
  return (
    <svg
      viewBox={full ? FULL_VIEWBOX : MARK_VIEWBOX}
      role="img"
      aria-label={title}
      className={cn("block shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <circle cx={MARK_CIRCLE.cx} cy={MARK_CIRCLE.cy} r={MARK_CIRCLE.r} fill={LOGO_TEAL} />
      <path d={MARK_S_PATH} fill="#fff" />
      {full && <path d={WORDMARK_PATH} fill="currentColor" />}
    </svg>
  );
}
