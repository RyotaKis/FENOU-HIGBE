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
      <p className="text-sm font-medium text-white/90">
        Prochaine édition — {ville}
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3 text-white">
      <span className="text-sm font-medium text-white/90">
        Prochaine édition — {ville}
      </span>
      <div className="flex items-center gap-2 font-mono text-sm" aria-live="polite">
        <span>{timeLeft.jours}j</span>
        <span>{String(timeLeft.heures).padStart(2, "0")}h</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span>{String(timeLeft.secondes).padStart(2, "0")}s</span>
      </div>
    </div>
  );
}
