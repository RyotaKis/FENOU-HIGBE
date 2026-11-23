import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** "h1" pour le titre principal d'une page (un seul par page). */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const introTone = tone === "dark" ? "text-white/80" : "text-neutral-600";
  const eyebrowTone = tone === "dark" ? "text-brand-yellow" : "text-brand-orange";

  return (
    <Reveal className={`max-w-2xl ${alignClass} ${className ?? ""}`}>
      {eyebrow && (
        <p className={`font-display text-lg italic ${eyebrowTone}`}>{eyebrow}</p>
      )}
      <Heading className="mt-2 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
        {title}
      </Heading>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${introTone}`}>{intro}</p>}
    </Reveal>
  );
}
