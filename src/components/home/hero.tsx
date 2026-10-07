"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { HeroVisual } from "./hero-visual";
import { NetworkCanvas } from "./network-canvas";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const blobA = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const blobB = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const fx = <T,>(v: T) => (reduce ? undefined : v);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-clip pt-28 pb-28 sm:pt-32"
    >
      {/* ---------- parallax background layers ---------- */}
      <motion.div aria-hidden style={fx({ y: gridY })} className="absolute inset-0 -z-10">
        <div className="bg-grid fade-mask-radial absolute inset-0" />
        <div className="grid-floor" />
      </motion.div>
      <motion.div
        aria-hidden
        style={fx({ y: blobA })}
        className="absolute -top-40 -left-48 -z-10 size-[44rem] rounded-full bg-brand/30 blur-[140px]"
      />
      <motion.div
        aria-hidden
        style={fx({ y: blobB })}
        className="absolute top-1/4 -right-56 -z-10 size-[40rem] rounded-full bg-brand-bright/20 blur-[150px]"
      />
      <NetworkCanvas className="fade-mask-radial absolute inset-0 -z-10 size-full opacity-80" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-canvas" />

      {/* ------------------------- content ------------------------ */}
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div style={fx({ y: contentY, opacity: contentOpacity })}>
            <Reveal y={14} delay={0.05}>
              <div className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-3 text-xs text-ink-soft sm:text-sm">
                <span className="relative flex size-2">
                  <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-brand-bright opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-bright" />
                </span>
                Software · Systems · Consulting — Nairobi, Kenya
              </div>
            </Reveal>

            <SplitText
              as="h1"
              trigger="mount"
              delay={0.2}
              stagger={0.07}
              accent={["software", "systems"]}
              text="We build the software & systems your business runs on."
              className="mt-7 font-display text-[clamp(2.6rem,6.6vw,5rem)] leading-[1.04] font-bold tracking-tight text-balance text-ink"
            />

            <Reveal delay={0.65} y={18}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                Skilciti turns your vision into reality with cutting-edge mobile apps, web apps and stunning
                websites — and helps you architect the systems behind them. From first sketch to scaled product.
              </p>
            </Reveal>

            <Reveal delay={0.8} y={18}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button href="/contact" size="lg" arrow>
                    Start a project
                  </Button>
                </Magnetic>
                <Button href="/services" variant="secondary" size="lg">
                  Explore services
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.95} y={12}>
              <p className="mt-10 font-mono text-xs tracking-wide text-ink-faint">
                Built for startups, growing teams &amp; established enterprises — across Kenya and beyond.
              </p>
            </Reveal>
          </motion.div>

          <motion.div style={fx({ y: visualY })}>
            <Reveal delay={0.5} y={40} scale={0.96} duration={1.1}>
              <HeroVisual />
            </Reveal>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faint uppercase">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-line-strong">
          <span className="animate-scroll-dot absolute top-2 left-1/2 h-1.5 w-1 -translate-x-1/2 rounded-full bg-brand-bright" />
        </span>
      </div>
    </section>
  );
}
