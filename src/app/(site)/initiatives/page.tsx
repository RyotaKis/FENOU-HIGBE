import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getPageContent, pick, pickList } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Initiatives & Filiales" };

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
];

type Venture = Record<string, string> & {
  name: string;
  year: string;
  description: string;
  image?: string;
  darkImage?: string;
  socials?: string;
  applyHref?: string;
};

const DEFAULT_VENTURES: Venture[] = [
  {
    name: "Fenou Foods & Packaging",
    year: "2016",
    description:
      "La première startup de Sonita Tossou : réinventer la consommation de l'igname avec le couscous d'igname à cuisson express, « Wassa Wassa Tchigan ». Aujourd'hui, un acteur majeur de l'agroalimentaire béninois — produits locaux naturels et emballages biodégradables au service de l'environnement et des agriculteurs.",
    image: "/images/initiatives/initiative-foods-packaging.jpg",
    socials: "true",
  },
  {
    name: "agripack.store",
    year: "2019",
    description:
      "Une plateforme e-commerce dédiée aux produits locaux, présentée au salon VivaTech à Paris.",
  },
  {
    name: "Afripreneur",
    year: "",
    description:
      "Un programme d'accompagnement et de mise en réseau qui outille les jeunes entrepreneurs africains — formation, mentorat et visibilité au service de leurs projets.",
  },
  {
    name: "Fenou Moments",
    year: "",
    description:
      "La marque médias du Fenou Higbé : captation photo et vidéo des temps forts de chaque édition, partagée avec toute la communauté.",
    image: "/images/initiatives/initiative-fenou-moments.png",
    socials: "true",
  },
  {
    name: "Le Gala des Fenouloves",
    year: "édition 3",
    description:
      "La grande soirée de gala qui célèbre les couples et les belles histoires nées au sein de la communauté entrepreneuriale Fenou.",
    image: "/images/initiatives/initiative-gala-fenouloves.jpg",
    socials: "true",
  },
  {
    name: "Fenou Startup Challenge",
    year: "",
    description:
      "Le concours qui repère et récompense les startups les plus prometteuses du marché Fenou Higbé.",
    image: "/images/initiatives/initiative-startup-challenge.png",
    darkImage: "true",
    applyHref: "/contact",
  },
  {
    name: "Africa Food Challenge",
    year: "",
    description:
      "Le concours culinaire qui met à l'honneur la gastronomie africaine et ses jeunes chefs.",
    image: "/images/initiatives/initiative-africa-food-challenge.jpg",
    applyHref: "/contact",
  },
  {
    name: "Fenou Xwé",
    year: "",
    description:
      "La grande fête de clôture du marché Fenou — concerts, animations et ambiance festive pour clore chaque édition en beauté.",
    image: "/images/initiatives/initiative-fenou-xwe.png",
    darkImage: "true",
  },
];

const DEFAULT_MILESTONES = [
  { year: "2016", text: "Diplômée en pharmacologie, fonde Fenou Foods à Cotonou." },
  {
    year: "2018",
    text: "Prix du PitchAgrihack (Banque Africaine de Développement, Rwanda) et Prix de la Meilleure Startup Francophone dirigée par une femme (SUGUBA AFRICA, Kigali).",
  },
  {
    year: "2018",
    text: "Prix AgriStartupSummit (Paris) et 1er prix du concours GET IN THE RING.",
  },
  {
    year: "2019",
    text: "1er Prix d'Innovation de la GIZ SNRD à Abidjan. Participation au salon VivaTech à Paris.",
  },
  {
    year: "2021",
    text: "Grand Prix BJKD, organisé par la fondation Bénédicte Janine Kacou Diagou. Invitée au Sommet Afrique-France pour partager son expertise.",
  },
  {
    year: "2022",
    text: "Fonde le FENOU HIGBÉ, le marché international des jeunes entrepreneurs africains.",
  },
];

export default async function InitiativesPage() {
  const content = await getPageContent("initiatives");
  const hero = content.hero;
  const bio = content.bio;
  const ventures = pickList(content, "ventures", DEFAULT_VENTURES);
  const milestones = pickList(content, "milestones", DEFAULT_MILESTONES);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow={pick(hero, "eyebrow", "L'écosystème Fenou")}
        title={pick(hero, "title", "Initiatives & Filiales")}
        intro={pick(
          hero,
          "intro",
          "Le FENOU HIGBÉ n'est qu'une des initiatives portées par Sonita Tossou, entrepreneure béninoise engagée au service d'une Afrique qui entreprend.",
        )}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ventures.map((venture, index) => (
          <Reveal key={`${venture.name}-${index}`} delay={index * 0.1}>
            <TiltCard max={6}>
              <div className="flex h-full flex-col bg-white shadow-warm-sm transition-shadow duration-300 hover:shadow-warm">
                {venture.image && (
                  <div
                    className={`flex h-40 items-center justify-center p-6 ${
                      venture.darkImage === "true" ? "bg-ink" : "bg-brand-cream"
                    }`}
                  >
                    <Image
                      src={venture.image}
                      alt={venture.name}
                      width={400}
                      height={280}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold">
                    {venture.name}
                    {venture.year && (
                      <span className="ml-2 font-sans text-sm font-normal text-neutral-400">
                        {venture.year}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {venture.description}
                  </p>
                  {venture.socials === "true" && (
                    <ul className="mt-4 flex gap-3 text-xs">
                      {SOCIALS.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            className="flex h-8 w-8 items-center justify-center border border-neutral-200 text-[10px] font-semibold text-neutral-500 transition-colors hover:border-brand-orange hover:text-brand-orange"
                            aria-label={s.label}
                          >
                            {s.label.slice(0, 2)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {venture.applyHref && (
                    <a
                      href={venture.applyHref}
                      className="mt-4 inline-block w-fit border border-brand-orange px-4 py-2 text-xs font-semibold uppercase tracking-caps text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                    >
                      Postuler
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 grid gap-10 sm:grid-cols-[minmax(0,280px)_1fr]">
        <Reveal>
          {bio?.image ? (
            <Image
              src={bio.image}
              alt="Portrait de Sonita Tossou"
              width={280}
              height={373}
              className="h-auto w-full object-cover"
              style={{ aspectRatio: "3/4" }}
            />
          ) : (
            <PlaceholderImage
              description="Portrait de Sonita Tossou en tenue traditionnelle"
              aspectRatio="3/4"
            />
          )}
        </Reveal>
        <div>
          <SectionHeading
            eyebrow={pick(bio, "eyebrow", "Biographie")}
            title={pick(bio, "title", "Sonita Tossou")}
            intro={pick(
              bio,
              "intro",
              "Une entrepreneure engagée au service de l'Afrique qui entreprend. Née à Cotonou dans un foyer imprégné du commerce, elle a rapidement embrassé l'esprit entrepreneurial qui caractérise sa famille.",
            )}
          />
          <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6">
            {milestones.map((milestone, index) => (
              <Reveal key={`${milestone.year}-${index}`} delay={index * 0.08}>
                <li>
                  <p className="text-sm font-semibold text-brand-orange">
                    {milestone.year}
                  </p>
                  <p className="mt-1 text-neutral-600">{milestone.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2} className="mt-8">
            <p className="text-sm text-neutral-500">
              {pick(
                bio,
                "footer_text",
                "Avec plus de 500 000 abonnés, Sonita Tossou est aujourd'hui une voix influente sur l'entrepreneuriat africain, qu'elle partage au fil de ses conseils, ses idées et ses histoires inspirantes.",
              )}
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
