import type { CSSProperties, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Apparition au chargement, en CSS pur (aucune attente du JavaScript). */
export function FadeIn({ children, className, delay = 0, y = -12 }: FadeInProps) {
  const style = { "--fade-y": `${y}px`, animationDelay: `${delay}s` } as CSSProperties;
  return (
    <div className={`fade-in ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
