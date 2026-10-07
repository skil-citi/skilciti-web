"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Check } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

/* ----------------------------- code window ---------------------------- */
const codeLines: ReactNode[] = [
  <span key="1" className="tok-c">{"// skilciti.config.ts"}</span>,
  <span key="2">
    <span className="tok-k">const</span> project = <span className="tok-f">defineSystem</span>({"{"}
  </span>,
  <span key="3">
    {"  "}discover: <span className="tok-s">&quot;your real problem&quot;</span>,
  </span>,
  <span key="4">
    {"  "}design: [<span className="tok-s">&quot;UX&quot;</span>, <span className="tok-s">&quot;architecture&quot;</span>],
  </span>,
  <span key="5">
    {"  "}build: [<span className="tok-s">&quot;web&quot;</span>, <span className="tok-s">&quot;mobile&quot;</span>,{" "}
    <span className="tok-s">&quot;cloud&quot;</span>],
  </span>,
  <span key="6">
    {"  "}ship: <span className="tok-s">&quot;reliably, then iterate&quot;</span>,
  </span>,
  <span key="7">{"}"});</span>,
  <span key="8">&nbsp;</span>,
  <span key="9">
    <span className="tok-k">await</span> project.<span className="tok-f">launch</span>();
    <span className="animate-blink tok-p ml-0.5">▍</span>
  </span>,
];

export function CodeWindow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-clip rounded-2xl border border-line-strong bg-canvas-soft/85 shadow-2xl shadow-black/30 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-ink-faint">skilciti.config.ts</span>
      </div>
      <pre className="overflow-clip px-4 py-4 font-mono text-[12.5px] leading-[1.85] text-ink sm:px-5 sm:text-[13px]">
        <code className="block">
          {codeLines.map((line, i) => (
            <span
              key={i}
              className="animate-line-in block whitespace-pre"
              style={{ animationDelay: `${0.9 + i * 0.16}s` }}
            >
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ----------------------------- pipeline card -------------------------- */
function PipelineCard() {
  const rows = [
    { label: "Build", done: true },
    { label: "Tests", done: true },
    { label: "Deploy", done: false },
  ];
  return (
    <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-wider text-ink-faint uppercase">Pipeline</span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-brand-bright">
          <span className="relative flex size-2">
            <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-brand-bright opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
          </span>
          Live
        </span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2.5 text-[13px] text-ink">
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full",
                r.done ? "bg-brand/25 text-brand-bright" : "border border-brand/50",
              )}
            >
              {r.done ? (
                <Check className="size-3" strokeWidth={3} />
              ) : (
                <span className="size-1.5 animate-pulse rounded-full bg-brand-bright" />
              )}
            </span>
            {r.label}
          </li>
        ))}
      </ul>
      <div className="mt-4 h-1.5 overflow-clip rounded-full bg-line">
        <div className="h-full animate-[bar_4.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-brand to-brand-bright" />
      </div>
    </div>
  );
}

/* --------------------------- architecture card ------------------------ */
const nodes = [
  { id: "App", x: 14, y: 62 },
  { id: "API", x: 116, y: 22 },
  { id: "Data", x: 116, y: 102 },
  { id: "Cloud", x: 216, y: 62 },
];
const edges = [
  "M62,75 C90,75 90,35 116,35",
  "M62,75 C90,75 90,115 116,115",
  "M164,35 C190,35 190,75 216,75",
  "M164,115 C190,115 190,75 216,75",
];

function ArchitectureCard() {
  return (
    <div className="glass rounded-2xl p-4 shadow-2xl shadow-black/25">
      <span className="font-mono text-[11px] tracking-wider text-ink-faint uppercase">Architecture</span>
      <svg viewBox="0 0 280 150" className="mt-2 w-full" role="img" aria-label="Simplified system architecture diagram">
        {edges.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" className="stroke-brand/40" strokeWidth="1.5" strokeDasharray="4 5">
              <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1.6s" repeatCount="indefinite" />
            </path>
            <circle r="3" className="fill-brand-bright">
              <animateMotion dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width="48" height="26" rx="8" className="fill-canvas-soft stroke-brand/60" strokeWidth="1.2" />
            <text
              x={n.x + 24}
              y={n.y + 16.5}
              textAnchor="middle"
              className="fill-ink font-mono"
              style={{ fontSize: 9.5 }}
            >
              {n.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ----------------------------- orbit rings ---------------------------- */
function Orbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-[4%]">
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 500 500" className="size-full">
          <circle cx="250" cy="250" r="240" fill="none" className="stroke-brand/25" strokeDasharray="2 10" strokeWidth="1.5" />
          <circle cx="250" cy="10" r="5" className="fill-brand-bright" />
          <circle cx="250" cy="250" r="176" fill="none" className="stroke-line-strong" strokeWidth="1" />
          <circle cx="426" cy="250" r="4" className="fill-brand" />
        </svg>
      </div>
      <div className="absolute inset-0 animate-spin-slow [animation-direction:reverse] [animation-duration:60s]">
        <svg viewBox="0 0 500 500" className="size-full">
          <circle cx="250" cy="250" r="118" fill="none" className="stroke-brand/30" strokeDasharray="1 7" strokeWidth="1.5" />
          <circle cx="132" cy="250" r="3.5" className="fill-brand-bright" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------- layers ------------------------------- */
function Depth({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(mx, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(my, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.7 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.7 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(my, [-0.5, 0.5], [7, -7]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <>
      {/* phones: just the code window, in flow */}
      <div className="sm:hidden">
        <CodeWindow />
      </div>

      {/* sm and up: full floating composition */}
      <motion.div
        aria-hidden
        className="relative mx-auto hidden aspect-[520/640] w-full max-w-[540px] sm:block"
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1300 }}
      >
        <Orbit />

        <Depth mx={mx} my={my} depth={10} className="absolute top-[15%] left-0 w-[90%]">
          <div className="animate-float-slow">
            <CodeWindow />
          </div>
        </Depth>

        <Depth mx={mx} my={my} depth={26} className="absolute top-[1%] right-[-3%] w-[44%]">
          <div className="animate-float [animation-delay:-2s]">
            <PipelineCard />
          </div>
        </Depth>

        <Depth mx={mx} my={my} depth={20} className="absolute right-[2%] bottom-[3%] w-[62%]">
          <div className="animate-float [animation-delay:-4s]">
            <ArchitectureCard />
          </div>
        </Depth>

        <Depth mx={mx} my={my} depth={34} className="absolute bottom-[10%] left-[1%]">
          <div className="animate-float-slow [animation-delay:-1s]">
            <div className="glass grid size-[74px] place-items-center rounded-3xl shadow-2xl shadow-black/25">
              <Logo variant="mark" className="size-11" />
            </div>
          </div>
        </Depth>
      </motion.div>
    </>
  );
}
