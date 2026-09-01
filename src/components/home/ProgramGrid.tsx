import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

const ICONS = [
  // diamond
  <path key="diamond" d="M12 2 L22 12 L12 22 L2 12 Z" />,
  // ring
  <circle key="ring" cx="12" cy="12" r="8" />,
  // pitch mark
  <path key="pitch" d="M4 18 L12 6 L20 18" />,
  // dashes
  <g key="dashes">
    <line x1="6" y1="6" x2="6" y2="18" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="18" y1="6" x2="18" y2="18" />
  </g>,
  // star burst
  <path key="burst" d="M12 2 V22 M2 12 H22 M5 5 L19 19 M19 5 L5 19" />,
  // flame
  <path key="flame" d="M12 2 C8 8 6 11 6 14 a6 6 0 0 0 12 0 C18 11 16 8 12 2 Z" />,
];

const ACTIVITIES = [
  {
    title: "Marché Fenou",
    description:
      "+150 entrepreneurs africains, +2 000 produits uniques, dégustations gratuites — les saveurs authentiques du Bénin et d'ailleurs.",
    caption: "Tous les jours · Place de l'Amazone",
    span: "sm:col-span-3 sm:row-span-2",
    big: true,
  },
  {
    title: "Caravane des Entrepreneurs",
    description:
      "Le coup d'envoi festif : une caravane parcourt la ville, entrepreneurs et produits en tête.",
    caption: "27 Oct · Cotonou",
    span: "sm:col-span-2",
  },
  {
    title: "Fenou Startup Challenge",
    description:
      "Pitch, mentorat, opportunités de financement — 3 projets primés à l'issue du concours.",
    caption: "29 Oct · Grande scène",
    span: "sm:col-span-2",
  },
  {
    title: "African Food Challenge",
    description:
      "Un concours culinaire qui valorise la gastronomie africaine et les produits locaux, jugé par des experts.",
    caption: "30 Oct · Espace dégustation",
    span: "sm:col-span-2",
  },
  {
    title: "Prestations d'artistes",
    description:
      "Musique, danse et performances — artistes béninois de renom et talents internationaux.",
    caption: "Chaque soir · Grand podium",
    span: "sm:col-span-3",
  },
  {
    title: "Fenou Xwé",
    description:
      "La grande soirée de clôture, festive et immersive, célébrant l'identité béninoise à travers traditions, gastronomie et culture.",
    caption: "1er Nov · Soirée de clôture",
    span: "sm:col-span-2",
  },
];

export function ProgramGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-5">
      {ACTIVITIES.map((activity, index) => (
        <Reveal key={activity.title} delay={index * 0.07} className={activity.span}>
          <TiltCard max={5} className="h-full">
            <div
              className={`group h-full border border-white/10 bg-white/4 p-6 transition-colors duration-300 group-hover:border-brand-yellow/40 hover:bg-white/7 sm:p-8 ${
                activity.big ? "flex min-h-64 flex-col justify-end" : ""
              }`}
            >
              {!activity.big && (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-brand-yellow"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  {ICONS[index % ICONS.length]}
                </svg>
              )}
              <h3
                className={`font-display font-semibold text-white ${activity.big ? "mt-0 text-3xl" : "mt-4 text-xl"}`}
              >
                {activity.title}
              </h3>
              <p
                className={`mt-3 text-white/75 transition-colors group-hover:text-white/90 ${activity.big ? "max-w-md text-base" : "text-sm"}`}
              >
                {activity.description}
              </p>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-caps text-brand-orange">
                {activity.caption}
              </p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
