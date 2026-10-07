"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "./reveal";

type SplitTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  /** Words (case-insensitive, punctuation ignored) rendered with the animated teal gradient. */
  accent?: string[];
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately (hero), "inView" waits until scrolled into view. */
  trigger?: "mount" | "inView";
};

const strip = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}&-]/gu, "");

/** Masked word-by-word headline reveal. */
export function SplitText({
  text,
  as = "h2",
  className,
  accent = [],
  delay = 0,
  stagger = 0.06,
  trigger = "inView",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.h2;
  const accentSet = new Set(accent.map(strip));
  const words = text.split(" ");

  const motionProps =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      {...motionProps}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline">
          <span className="inline-block -mb-[0.16em] overflow-clip pb-[0.16em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", accentSet.has(strip(word)) && "text-gradient")}
              variants={{
                hidden: { y: "115%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 0.9, ease: easeOutExpo, delay: delay + i * stagger },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
