"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type StatCounterProps = {
  value: string;
  label: string;
  className?: string;
  duration?: number;
  tone?: "light" | "dark";
};

type ParsedStat = {
  prefix: string;
  suffix: string;
  target: number;
  grouped: boolean;
  padLength: number;
  hasLeadingZero: boolean;
};

function parseStat(raw: string): ParsedStat | null {
  const match = raw.match(/^([^\d]*)([\d\s]+)([\s\S]*)$/);
  if (!match) return null;
  const [, prefix, numberPart, suffix] = match;
  const digitsOnly = numberPart.replace(/\s/g, "");
  if (!digitsOnly) return null;
  const target = parseInt(digitsOnly, 10);
  return {
    prefix,
    suffix,
    target,
    grouped: numberPart.includes(" "),
    padLength: digitsOnly.length,
    hasLeadingZero: digitsOnly.length > 1 && digitsOnly.startsWith("0"),
  };
}

function formatNumber(n: number, parsed: ParsedStat): string {
  let s = String(Math.round(n));
  if (parsed.hasLeadingZero) s = s.padStart(parsed.padLength, "0");
  if (parsed.grouped) {
    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return s;
}

export function StatCounter({
  value,
  label,
  className,
  duration = 1.4,
  tone = "light",
}: StatCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  // Mémoïsé : sinon parseStat(value) recrée un nouvel objet à chaque rendu,
  // ce qui relance l'effet ci-dessous (donc l'animation) en boucle infinie
  // puisque `parsed` est dans ses dépendances.
  const parsed = useMemo(() => parseStat(value), [value]);
  // Rendu serveur = valeur finale : le chiffre réel est visible sans
  // JavaScript (et lisible par Google). L'animation de 0 à la valeur ne se
  // joue que si le compteur est encore hors de l'écran au chargement.
  const [display, setDisplay] = useState(
    parsed ? formatNumber(parsed.target, parsed) : value,
  );
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!parsed || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      setDisplay(formatNumber(0, parsed));
      setArmed(true);
    }
    // Volontairement exécuté une seule fois, au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!parsed || !armed || !isInView || shouldReduceMotion) return;

    let frame: number;
    const start = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatNumber(parsed.target * eased, parsed));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, isInView, parsed, shouldReduceMotion, duration]);

  const renderedDigits =
    parsed && shouldReduceMotion ? formatNumber(parsed.target, parsed) : display;

  const numberTone = tone === "dark" ? "text-brand-yellow" : "text-neutral-950";
  const labelTone = tone === "dark" ? "text-white/60" : "text-neutral-500";

  return (
    <div className={className}>
      <p
        ref={ref}
        className={`tabular-nums font-display text-4xl font-normal sm:text-5xl ${numberTone}`}
      >
        {parsed ? `${parsed.prefix}${renderedDigits}${parsed.suffix}` : value}
      </p>
      <p className={`mt-2 text-xs font-semibold uppercase tracking-caps ${labelTone}`}>
        {label}
      </p>
    </div>
  );
}
