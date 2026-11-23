import type { CSSProperties, ReactNode } from "react";

/**
 * Entrée du hero en CSS pur : le logo et les boutons s'affichent dès que le
 * HTML arrive, avec une courte animation, sans attendre le JavaScript.
 */
export function HeroIntro({ children }: { children: ReactNode }) {
  return <div className="hero-intro">{children}</div>;
}

export function HeroIntroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`fade-in ${className ?? ""}`} style={{ "--fade-y": "20px" } as CSSProperties}>{children}</div>;
}
