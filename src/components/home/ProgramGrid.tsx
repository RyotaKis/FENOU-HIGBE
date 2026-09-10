import Image from "next/image";
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

const SPAN_CYCLE = ["sm:col-span-2", "sm:col-span-2", "sm:col-span-3"];

export type ProgramActivity = {
  title: string;
  description: string;
  caption: string;
  /**
   * Chemin d'image optionnel (ex. "/images/caravane.jpg" — dépose le
   * fichier dans public/images/). Grande tuile → image de fond plein cadre
   * avec voile sombre ; tuile normale → vignette au-dessus du titre. Laisse
   * vide pour garder l'icône générique.
   */
  image?: string;
};

export const DEFAULT_ACTIVITIES: ProgramActivity[] = [
  {
    title: "Fenou HIGBE",
    description:
      "+150 entrepreneurs africains, +2 000 produits uniques, dégustations gratuites — les saveurs authentiques du Bénin et d'ailleurs.",
    caption: "Tous les jours · Place de l'Amazone",
    image: "/images/neon-fenou.jpg",
  },
  {
    title: "Caravane des Entrepreneurs",
    description:
      "Le coup d'envoi festif : une caravane parcourt la ville, entrepreneurs et produits en tête.",
    caption: "27 Oct · Cotonou",
    image: "/images/caravane.jpg",
  },
  {
    title: "Fenou Startup Challenge",
    description:
      "Pitch, mentorat, opportunités de financement — 3 projets primés à l'issue du concours.",
    caption: "29 Oct · Grande scène",
    image: "/images/startup-challenge.jpg",
  },
  {
    title: "African Food Challenge",
    description:
      "Un concours culinaire qui valorise la gastronomie africaine et les produits locaux, jugé par des experts.",
    caption: "30 Oct · Espace dégustation",
    image: "/images/food-challenge.jpg",
  },
  {
    title: "Prestations d'artistes",
    description:
      "Musique, danse et performances — artistes béninois de renom et talents internationaux.",
    caption: "Chaque soir · Grand podium",
    image: "/images/prestation-artiste.jpg",
  },
  {
    title: "Fenou Xwé",
    description:
      "La grande soirée de clôture, festive et immersive, célébrant l'identité béninoise à travers traditions, gastronomie et culture.",
    caption: "1er Nov · Soirée de clôture",
    image: "/images/fenou-xwe-photo.jpg",
  },
];

export function ProgramGrid({
  activities = DEFAULT_ACTIVITIES,
}: {
  activities?: ProgramActivity[];
}) {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-5">
      {activities.map((activity, index) => {
        const big = index === 0;
        const span = big
          ? "sm:col-span-3 sm:row-span-2"
          : SPAN_CYCLE[(index - 1) % SPAN_CYCLE.length];

        return (
          <Reveal key={`${activity.title}-${index}`} delay={index * 0.07} className={span}>
            <TiltCard max={5} className="h-full">
              <div
                className={`group relative h-full overflow-hidden border border-white/10 bg-white/4 p-6 transition-colors duration-300 group-hover:border-brand-yellow/40 hover:bg-white/7 sm:p-8 ${
                  big ? "flex min-h-64 flex-col justify-end" : ""
                }`}
              >
                {activity.image && big && (
                  <>
                    <Image
                      src={activity.image}
                      alt=""
                      fill
                      className="absolute inset-0 -z-10 object-cover"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
                  </>
                )}
                {activity.image && !big && (
                  <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden sm:-mx-8 sm:-mt-8">
                    <Image src={activity.image} alt="" fill className="object-cover" />
                  </div>
                )}
                {!activity.image && !big && activity.title !== "Fenou Xwé" && (
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
                {activity.title === "Fenou Xwé" ? (
                  <Image
                    src="/logo/fenou-xwe-white.png"
                    alt="Fenou Xwé"
                    width={1707}
                    height={1116}
                    className={`w-auto ${big ? "h-14" : "mt-4 h-10"}`}
                  />
                ) : (
                  <h3
                    className={`font-display font-semibold text-white ${
                      big
                        ? "mt-0 text-3xl"
                        : activity.image
                          ? "mt-0 text-xl"
                          : "mt-4 text-xl"
                    }`}
                  >
                    {activity.title}
                  </h3>
                )}
                <p
                  className={`mt-3 text-white/75 transition-colors group-hover:text-white/90 ${big ? "max-w-md text-base" : "text-sm"}`}
                >
                  {activity.description}
                </p>
                {activity.caption && (
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-caps text-brand-orange">
                    {activity.caption}
                  </p>
                )}
              </div>
            </TiltCard>
          </Reveal>
        );
      })}
    </div>
  );
}
