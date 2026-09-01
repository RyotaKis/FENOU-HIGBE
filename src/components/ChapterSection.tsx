import type { ReactNode } from "react";

type ChapterSectionProps = {
  children: ReactNode;
  tone?: "light" | "dark" | "cream" | "gold";
  className?: string;
  id?: string;
};

const TONE_CLASSES: Record<NonNullable<ChapterSectionProps["tone"]>, string> = {
  light: "bg-background text-neutral-900",
  dark: "bg-ink text-white",
  cream: "bg-brand-cream text-neutral-900",
  gold: "bg-brand-yellow text-neutral-950",
};

const TONE_GRADIENTS: Record<NonNullable<ChapterSectionProps["tone"]>, string> = {
  light:
    "radial-gradient(90rem 40rem at 15% -10%, color-mix(in oklab, var(--color-brand-yellow) 10%, transparent), transparent)",
  dark: "radial-gradient(80rem 40rem at 85% 0%, color-mix(in oklab, var(--color-brand-yellow) 16%, transparent), transparent)",
  cream:
    "radial-gradient(80rem 35rem at 90% 0%, color-mix(in oklab, var(--color-brand-yellow) 16%, transparent), transparent)",
  gold: "none",
};

export function ChapterSection({
  children,
  tone = "light",
  className,
  id,
}: ChapterSectionProps) {
  return (
    <section
      id={id}
      className={`grain relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 ${TONE_CLASSES[tone]} ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: TONE_GRADIENTS[tone] }}
      />
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
