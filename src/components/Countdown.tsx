"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetIso: string) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    jours: Math.floor(diff / 86_400_000),
    heures: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    secondes: Math.floor((diff / 1_000) % 60),
  };
}

const UNITS: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: "jours", label: "Jours" },
  { key: "heures", label: "Heures" },
  { key: "minutes", label: "Min" },
  { key: "secondes", label: "Sec" },
];

export function Countdown({
  targetIso,
  ville,
}: {
  targetIso: string;
  ville: string;
}) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof getTimeLeft
  > | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetIso));
    const firstTick = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(firstTick);
      clearInterval(id);
    };
  }, [targetIso]);

  // Rendu neutre côté serveur / avant hydratation pour éviter tout écart.
  if (!timeLeft) {
    return (
      <p className="text-xs font-medium uppercase tracking-caps text-white/70">
        Prochaine édition — {ville}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <span className="hidden text-xs font-medium uppercase tracking-caps text-white/60 sm:inline">
        Prochaine édition — {ville}
      </span>
      <div className="flex items-center gap-4" aria-live="polite">
        {UNITS.map((unit) => (
          <div key={unit.key} className="text-center">
            <span className="tabular-nums font-display text-lg font-semibold text-brand-yellow">
              {String(timeLeft[unit.key]).padStart(2, "0")}
            </span>
            <span className="ml-1 text-[10px] uppercase tracking-caps text-white/50">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
