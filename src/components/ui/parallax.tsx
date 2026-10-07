"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Pixels of travel in each direction across the element's pass through the viewport. */
  distance?: number;
  /** Optional rotation (deg) across the same range. */
  rotate?: number;
  className?: string;
};

/** Scroll-linked vertical parallax for any element. */
export function Parallax({ children, distance = 60, rotate = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, rotate: r }}>
      {children}
    </motion.div>
  );
}
