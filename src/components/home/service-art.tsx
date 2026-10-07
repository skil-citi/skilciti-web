import type { ServiceId } from "@/lib/content";
import { cn } from "@/lib/utils";

const line = "fill-none stroke-brand-bright/70";
const panel = "fill-brand/10 stroke-brand-bright/60";
const solid = "fill-brand-bright/80";

/** Small decorative SVG illustration per service — pure SVG/CSS, no assets. */
export function ServiceArt({ id, className }: { id: ServiceId; className?: string }) {
  const cls = cn("h-full w-auto max-w-full overflow-visible", className);

  switch (id) {
    case "custom-software":
      return (
        <svg viewBox="0 0 340 150" className={cls} aria-hidden>
          <g strokeWidth="1.5">
            {[
              [20, 14],
              [135, 14],
              [250, 14],
              [78, 92],
              [193, 92],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect x={x} y={y} width="72" height="44" rx="10" className={panel} />
                <rect x={x + 10} y={y + 11} width="30" height="5" rx="2.5" className={solid} />
                <rect x={x + 10} y={y + 23} width="48" height="5" rx="2.5" className="fill-ink-faint/40" />
              </g>
            ))}
            {["M56,58 V75 H114 V92", "M171,58 V92", "M286,58 V75 H229 V92", "M150,114 H193"].map((d, i) => (
              <path key={i} d={d} className={line} strokeDasharray="4 5">
                <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.8s" repeatCount="indefinite" />
              </path>
            ))}
          </g>
        </svg>
      );

    case "mobile-apps":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5">
            <rect x="46" y="22" width="68" height="124" rx="14" className={panel} transform="rotate(-8 80 84)" />
            <g transform="translate(112 0)">
              <rect x="10" y="4" width="76" height="136" rx="16" className="fill-canvas-soft stroke-brand-bright" />
              <rect x="38" y="10" width="20" height="4" rx="2" className="fill-ink-faint/50" />
              <rect x="20" y="28" width="56" height="30" rx="8" className="fill-brand/25" />
              <rect x="20" y="66" width="56" height="8" rx="4" className="fill-ink-faint/40" />
              <rect x="20" y="80" width="38" height="8" rx="4" className="fill-ink-faint/30" />
              <circle cx="48" cy="112" r="10" className={solid} />
            </g>
          </g>
        </svg>
      );

    case "web-apps":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5">
            <rect x="12" y="14" width="196" height="122" rx="12" className="fill-canvas-soft stroke-brand-bright/70" />
            <path d="M12 38 H208" className={line} />
            {[26, 38, 50].map((x) => (
              <circle key={x} cx={x} cy="26" r="3" className="fill-ink-faint/50" />
            ))}
            {[
              [30, 98, 22],
              [60, 78, 42],
              [90, 88, 32],
              [120, 62, 58],
              [150, 72, 48],
              [180, 54, 66],
            ].map(([x, y, h], i) => (
              <rect key={i} x={x - 8} y={y + 26} width="16" height={h} rx="4" className={i === 5 ? solid : "fill-brand/30"}>
                <animate attributeName="height" values={`${h};${h + 10};${h}`} dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
              </rect>
            ))}
          </g>
        </svg>
      );

    case "websites":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5">
            <rect x="12" y="12" width="196" height="126" rx="12" className="fill-canvas-soft stroke-brand-bright/70" />
            <rect x="26" y="26" width="168" height="44" rx="8" className="fill-brand/20" />
            <rect x="38" y="38" width="64" height="7" rx="3.5" className={solid} />
            <rect x="38" y="52" width="92" height="5" rx="2.5" className="fill-ink-faint/50" />
            {[26, 84, 142].map((x) => (
              <rect key={x} x={x} y="82" width="52" height="42" rx="8" className={panel} />
            ))}
          </g>
        </svg>
      );

    case "ui-ux":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5">
            <path d="M24 112 C 60 20, 120 140, 196 40" className={line} strokeWidth="2" />
            <path d="M24 112 L60 36 M196 40 L150 118" className="stroke-ink-faint/40" strokeDasharray="3 4" fill="none" />
            {[
              [24, 112],
              [196, 40],
            ].map(([x, y]) => (
              <rect key={x} x={x - 6} y={y - 6} width="12" height="12" rx="3" className="fill-canvas-soft stroke-brand-bright" />
            ))}
            {[
              [60, 36],
              [150, 118],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4.5" className={solid} />
            ))}
            <path d="M110 70 L110 102 L119 94 L126 108 L132 105 L125 92 L137 91 Z" className="fill-ink stroke-canvas" strokeWidth="1" />
          </g>
        </svg>
      );

    case "consulting":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5" strokeLinejoin="round">
            {[92, 60, 28].map((y, i) => (
              <path
                key={y}
                d={`M110 ${y} L180 ${y + 20} L110 ${y + 40} L40 ${y + 20} Z`}
                className={i === 2 ? "fill-brand/30 stroke-brand-bright" : panel}
              >
                <animate attributeName="opacity" values="0.65;1;0.65" dur={`${3 + i * 0.6}s`} repeatCount="indefinite" />
              </path>
            ))}
            <path d="M110 12 V28" className={line} strokeDasharray="3 4" />
            <circle cx="110" cy="10" r="4" className={solid} />
          </g>
        </svg>
      );

    case "support":
      return (
        <svg viewBox="0 0 220 150" className={cls} aria-hidden>
          <g strokeWidth="1.5" className="origin-center">
            <circle cx="110" cy="75" r="52" className="fill-none stroke-ink-faint/30" strokeDasharray="2 6" />
            <g className="animate-spin-slow [animation-duration:14s] [transform-box:fill-box] [transform-origin:center]">
              <circle cx="110" cy="75" r="52" className="fill-none stroke-brand-bright" strokeWidth="3" strokeDasharray="60 270" strokeLinecap="round" />
            </g>
            <path d="M110 40 L146 52 V80 C146 100 130 112 110 120 C90 112 74 100 74 80 V52 Z" className="fill-brand/15 stroke-brand-bright" />
            <path d="M94 78 L106 90 L128 66" className="fill-none stroke-brand-bright" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );
  }
}
