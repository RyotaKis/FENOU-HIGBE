import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  id?: string;
};

/**
 * Apparition douce au défilement, en CSS pur (voir `.reveal` dans
 * globals.css). Le contenu est VISIBLE dès l'arrivée du HTML : l'animation
 * n'est qu'un bonus sur les navigateurs qui gèrent les animations liées au
 * défilement. Avant, le contenu restait invisible tant que le JavaScript
 * n'était pas chargé — plusieurs secondes sur un mobile en 3G.
 */
export function Reveal({ children, className, delay = 0, y = 24, scale, id }: RevealProps) {
  const style = {
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale ?? 1,
    "--reveal-delay": `${Math.round(delay * 100)}%`,
  } as CSSProperties;

  return (
    <div id={id} className={`reveal ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
