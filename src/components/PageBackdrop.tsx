import type { ReactNode } from "react";

type PageBackdropProps = {
  children: ReactNode;
  tone?: "yellow" | "green" | "orange";
};

const GRADIENTS: Record<NonNullable<PageBackdropProps["tone"]>, string> = {
  yellow:
    "radial-gradient(70rem 34rem at 88% -12%, color-mix(in oklab, var(--color-brand-yellow) 20%, transparent), transparent 70%)",
  green:
    "radial-gradient(70rem 34rem at -10% -5%, color-mix(in oklab, var(--color-brand-green) 16%, transparent), transparent 70%)",
  orange:
    "radial-gradient(70rem 34rem at 100% 100%, color-mix(in oklab, var(--color-brand-orange) 18%, transparent), transparent 70%)",
};

export function PageBackdrop({ children, tone = "yellow" }: PageBackdropProps) {
  return (
    <div className="grain relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRADIENTS[tone] }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
