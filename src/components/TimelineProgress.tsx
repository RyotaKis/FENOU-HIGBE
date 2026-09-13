"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

export function TimelineProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-neutral-200" />
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px origin-top bg-brand-orange"
          style={{ scaleY }}
        />
      )}
      {children}
    </div>
  );
}
