"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Logo } from "@/components/brand/logo";
import { Parallax } from "@/components/ui/parallax";
import { Eyebrow } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const text =
  "Great software isn't just code. It's clear thinking, considered design and systems built to grow with you — turning ambitious ideas into digital products people love to use.";
const accent = new Set(["software", "systems", "grow", "products", "ideas"]);
const words = text.split(" ");

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const isAccent = accent.has(word.toLowerCase().replace(/[^a-z]/g, ""));
  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span style={{ opacity }} className={cn("inline-block", isAccent ? "text-brand-bright" : "text-ink")}>
        {word}
      </motion.span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });

  return (
    <section ref={ref} className="relative overflow-clip py-32 sm:py-44">
      {/* parallax shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Parallax distance={140} rotate={30} className="absolute top-[8%] left-[5%] hidden sm:block">
          <div className="size-24 rounded-3xl border border-brand/40 bg-brand/10 backdrop-blur-sm sm:size-32" />
        </Parallax>
        <Parallax distance={90} className="absolute top-[58%] left-[10%] hidden sm:block">
          <div className="grid size-16 place-items-center rounded-full border border-line-strong">
            <span className="size-2 rounded-full bg-brand-bright" />
          </div>
        </Parallax>
        <Parallax distance={170} rotate={-20} className="absolute top-[12%] right-[7%] hidden sm:block">
          <Logo variant="mark" className="size-20 opacity-90 drop-shadow-[0_0_30px_rgb(var(--glow)/0.5)] sm:size-28" />
        </Parallax>
        <Parallax distance={110} rotate={45} className="absolute right-[12%] bottom-[10%] hidden sm:block">
          <div className="size-20 rotate-12 rounded-2xl border border-line-strong sm:size-28" />
        </Parallax>
        <div
          className="absolute top-1/2 left-1/2 h-[26rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(closest-side, rgb(var(--glow) / 0.16), transparent)" }}
        />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Our approach</Eyebrow>
          <p className="mt-8 font-display text-[clamp(1.9rem,4.6vw,3.7rem)] leading-[1.18] font-semibold tracking-tight">
            {reduce
              ? words.map((w, i) => (
                  <span key={i} className="mr-[0.26em] inline-block text-ink">
                    {w}
                  </span>
                ))
              : words.map((w, i) => {
                  const start = (i / words.length) * 0.85;
                  const end = start + 0.18;
                  return <Word key={i} word={w} range={[start, end]} progress={scrollYProgress} />;
                })}
          </p>
        </div>
      </div>
    </section>
  );
}
