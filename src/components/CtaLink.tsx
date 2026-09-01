"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline-dark" | "ghost" | "ghost-dark" | "solid-dark";
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  primary:
    "bg-brand-yellow text-neutral-950 shadow-warm-sm hover:brightness-105 hover:shadow-warm",
  "outline-dark": "border border-neutral-950/40 text-neutral-950 hover:bg-neutral-950/5",
  ghost: "border border-neutral-900/15 text-neutral-900 hover:bg-neutral-900/5",
  "ghost-dark": "border border-white/30 text-white hover:bg-white/10",
  "solid-dark": "bg-ink text-white hover:brightness-125",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: CtaLinkProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-caps transition-[background-color,box-shadow,color] duration-200 ${VARIANT_CLASSES[variant]} ${className ?? ""}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
