"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/content";

function Step({
  index,
  title,
  body,
  progress,
}: {
  index: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
}) {
  const total = processSteps.length;
  const t = (index + 0.4) / total;
  const fill = useTransform(progress, [t - 0.08, t], [0, 1]);

  return (
    <Reveal x={30} y={0} className="relative pl-14 sm:pl-20">
      <span className="absolute top-1 left-0 grid size-10 place-items-center sm:size-12">
        <span className="absolute inset-0 rounded-full border border-line-strong bg-canvas" />
        <motion.span
          style={{ opacity: fill, scale: fill }}
          className="absolute inset-0 rounded-full bg-brand shadow-[0_0_28px_rgb(var(--glow)/0.7)]"
        />
        <span className="relative font-mono text-xs font-semibold text-ink mix-blend-normal">0{index + 1}</span>
      </span>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{body}</p>
      </div>
    </Reveal>
  );
}

export function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.65", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const rotate = useTransform(sectionProgress, [0, 1], [0, 220]);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36">
      <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* sticky intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from idea to impact"
              accent={["idea", "impact"]}
              description="No black boxes. A transparent, collaborative process that keeps you in the loop and keeps quality high at every stage."
            />
            <Reveal delay={0.2} className="mt-14 hidden lg:block">
              <div className="relative size-56">
                <motion.div
                  aria-hidden
                  style={reduce ? undefined : { rotate }}
                  className="absolute inset-0 rounded-full border border-dashed border-brand/40"
                >
                  <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-brand-bright shadow-[0_0_18px_rgb(var(--glow))]" />
                </motion.div>
                <div className="absolute inset-6 rounded-full border border-line" />
                <div className="absolute inset-0 grid place-items-center">
                  <Logo variant="mark" className="size-24 drop-shadow-[0_0_30px_rgb(var(--glow)/0.45)]" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* timeline */}
          <div ref={listRef} className="relative">
            <div aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-line-strong sm:left-6" />
            <motion.div
              aria-hidden
              style={{ scaleY: reduce ? 1 : line }}
              className="absolute top-2 bottom-2 left-5 w-px origin-top bg-gradient-to-b from-brand-bright to-brand shadow-[0_0_12px_rgb(var(--glow))] sm:left-6"
            />
            <div className="space-y-8 sm:space-y-10">
              {processSteps.map((s, i) => (
                <Step key={s.title} index={i} title={s.title} body={s.body} progress={line} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
