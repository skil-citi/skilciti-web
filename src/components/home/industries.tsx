"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { industries } from "@/lib/content";
import { cn } from "@/lib/utils";

const rowA = "E-commerce — Healthcare — Education — ";
const rowB = "Finance — Logistics — Government — Startups — ";

export function Industries() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], ["8%", "-34%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-38%", "4%"]);

  return (
    <section ref={ref} className="relative overflow-clip py-28 sm:py-36">
      {/* scroll-driven parallax type */}
      <div aria-hidden className="pointer-events-none mb-20 space-y-2 select-none sm:space-y-4">
        <motion.p
          style={reduce ? undefined : { x: xA }}
          className="text-outline font-display text-[clamp(3.5rem,11vw,10rem)] leading-none font-extrabold tracking-tighter whitespace-nowrap uppercase"
        >
          {rowA.repeat(3)}
        </motion.p>
        <motion.p
          style={reduce ? undefined : { x: xB }}
          className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-none font-extrabold tracking-tighter whitespace-nowrap text-brand/20 uppercase"
        >
          {rowB.repeat(3)}
        </motion.p>
      </div>

      <div className="container-x">
        <SectionHeading
          eyebrow="Industries"
          title="Domain know-how across the sectors that move business"
          accent={["domain", "know-how"]}
          description="Every industry has its own rhythm, regulations and users. We bring the context to build software that fits — not software you have to bend your business around."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {industries.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 4) * 0.08} className={cn("h-full", i < 4 ? "lg:col-span-3" : "lg:col-span-4")}>
              <SpotlightCard className="group h-full rounded-3xl p-7">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright transition-all duration-500 group-hover:bg-brand group-hover:text-on-brand">
                    <item.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">{item.name}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">{item.blurb}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
