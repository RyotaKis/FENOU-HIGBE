import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const introTone = tone === "dark" ? "text-white/80" : "text-neutral-600";
  const eyebrowTone = tone === "dark" ? "text-brand-yellow" : "text-brand-orange";

  return (
    <Reveal className={`max-w-2xl ${alignClass} ${className ?? ""}`}>
      {eyebrow && (
        <p className={`font-display text-lg italic ${eyebrowTone}`}>{eyebrow}</p>
      )}
      <h2 className="mt-2 text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${introTone}`}>{intro}</p>}
    </Reveal>
  );
}
