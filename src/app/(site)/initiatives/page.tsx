import type { Metadata } from "next";
import Image from "next/image";
import { FaSeedling, FaStore } from "react-icons/fa";
import type { IconType } from "react-icons";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getPageContent, pick, pickList } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Initiatives & Filiales" };

type Venture = Record<string, string> & {
  name: string;
  year: string;
  description: string;
  category: "marque" | "concours" | "autre";
  image?: string;
  darkImage?: string;
  socials?: string;
  applyHref?: string;
};

const DEFAULT_VENTURES: Venture[] = [
  {
    name: "Fenou Foods & Packaging",
    year: "2016",
    category: "marque",
    description:
      "La première startup de Sonita Tossou : réinventer la consommation de l'igname avec le couscous d'igname à cuisson express, « Wassa Wassa Tchigan ». Aujourd'hui, un acteur majeur de l'agroalimentaire béninois — produits locaux naturels et emballages biodégradables au service de l'environnement et des agriculteurs.",
    image: "/images/initiatives/initiative-foods-packaging.jpg",
    socials: "true",
  },
  {
    name: "Fenou Moments",
    year: "",
    category: "marque",
    description:
      "La marque médias du Fenou Higbé : captation photo et vidéo des temps forts de chaque édition, partagée avec toute la communauté.",
    image: "/images/initiatives/initiative-fenou-moments.png",
    socials: "true",
  },
  {
    name: "Le Gala des Fenouloves",
    year: "édition 3",
    category: "marque",
    description:
      "La grande soirée de gala qui célèbre les couples et les belles histoires nées au sein de la communauté entrepreneuriale Fenou.",
    image: "/images/initiatives/initiative-gala-fenouloves.jpg",
    socials: "true",
  },
  {
    name: "Fenou Startup Challenge",
    year: "",
    category: "concours",
    description:
      "Le concours qui repère et récompense les startups les plus prometteuses du marché Fenou Higbé.",
    image: "/images/initiatives/initiative-startup-challenge.png",
    darkImage: "true",
    applyHref: "/contact",
  },
  {
    name: "Africa Food Challenge",
    year: "",
    category: "concours",
    description:
      "Le concours culinaire qui met à l'honneur la gastronomie africaine et ses jeunes chefs.",
    image: "/images/initiatives/initiative-africa-food-challenge.jpg",
    applyHref: "/contact",
  },
  {
    name: "Fenou Xwé",
    year: "",
    category: "concours",
    description:
      "La grande fête de clôture du marché Fenou — concerts, animations et ambiance festive pour clore chaque édition en beauté.",
    image: "/images/initiatives/initiative-fenou-xwe.png",
    darkImage: "true",
  },
  {
    name: "agripack.store",
    year: "2019",
    category: "autre",
    description:
      "Une plateforme e-commerce dédiée aux produits locaux, présentée au salon VivaTech à Paris.",
  },
  {
    name: "Afripreneur",
    year: "",
    category: "autre",
    description:
      "Un programme d'accompagnement et de mise en réseau qui outille les jeunes entrepreneurs africains — formation, mentorat et visibilité au service de leurs projets.",
  },
];

const AUTRE_ICONS: Record<string, IconType> = {
  "agripack.store": FaStore,
  Afripreneur: FaSeedling,
};

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

function VentureCard({ venture, delay }: { venture: Venture; delay: number }) {
  return (
    <Reveal delay={delay}>
      <TiltCard max={6}>
        <div className="flex h-full flex-col bg-white shadow-warm-sm transition-shadow duration-300 hover:shadow-warm">
          <div
            className={`flex h-40 items-center justify-center p-6 ${
              venture.darkImage === "true" ? "bg-ink" : "bg-brand-cream"
            }`}
          >
            <Image
              src={venture.image!}
              alt={venture.name}
              width={400}
              height={280}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-semibold">
              {venture.name}
              {venture.year && (
                <span className="ml-2 font-sans text-sm font-normal text-neutral-400">
                  {venture.year}
                </span>
              )}
            </h3>
            <p className="mt-2 flex-1 text-sm text-neutral-600">{venture.description}</p>
            {venture.socials === "true" && <SocialLinks className="mt-4" />}
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
  );
}

function AutreCard({ venture, delay }: { venture: Venture; delay: number }) {
  const Icon = AUTRE_ICONS[venture.name] ?? FaSeedling;
  return (
    <Reveal delay={delay}>
      <TiltCard max={6}>
        <div className="flex h-full flex-col bg-white p-6 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm">
          <div className="flex h-12 w-12 items-center justify-center bg-brand-cream text-xl text-brand-orange">
            <Icon />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold">
            {venture.name}
            {venture.year && (
              <span className="ml-2 font-sans text-sm font-normal text-neutral-400">
                {venture.year}
              </span>
            )}
          </h3>
          <p className="mt-2 text-sm text-neutral-600">{venture.description}</p>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default async function InitiativesPage() {
  const content = await getPageContent("initiatives");
  const hero = content.hero;
  const bio = content.bio;
  const ventures = pickList(content, "ventures", DEFAULT_VENTURES);
  const milestones = pickList(content, "milestones", DEFAULT_MILESTONES);

  const marques = ventures.filter((v) => v.category === "marque");
  const concours = ventures.filter((v) => v.category === "concours");
  const autres = ventures.filter((v) => v.category === "autre");

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

      {marques.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-caps text-neutral-400">
            Nos marques
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {marques.map((venture, index) => (
              <VentureCard key={venture.name} venture={venture} delay={index * 0.1} />
            ))}
          </div>
        </section>
      )}

      {concours.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-caps text-neutral-400">
            Concours &amp; temps forts
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {concours.map((venture, index) => (
              <VentureCard key={venture.name} venture={venture} delay={index * 0.1} />
            ))}
          </div>
        </section>
      )}

      {autres.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-sm font-semibold uppercase tracking-caps text-neutral-400">
            Autres initiatives
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {autres.map((venture, index) => (
              <AutreCard key={venture.name} venture={venture} delay={index * 0.1} />
            ))}
          </div>
        </section>
      )}

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
