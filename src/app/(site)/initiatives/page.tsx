import type { Metadata } from "next";
import Image from "next/image";
import { FaSeedling, FaStore } from "react-icons/fa";
import type { IconType } from "react-icons";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getPageContent, pick, pickList } from "@/lib/pageContent";
import { SOCIALS_BY_VENTURE } from "@/lib/socialLinks";

export const metadata: Metadata = { title: "Initiatives & Filiales" };

type Venture = Record<string, string> & {
  name: string;
  year: string;
  description: string;
  category: "marque" | "concours" | "autre";
  image?: string;
  darkImage?: string;
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
  },
  {
    name: "Fenou Moments",
    year: "",
    category: "marque",
    description:
      "La marque médias du Fenou Higbé : captation photo et vidéo des temps forts de chaque édition, partagée avec toute la communauté.",
    image: "/images/initiatives/initiative-fenou-moments.png",
  },
  {
    name: "Le Gala des Fenouloves",
    year: "édition 3",
    category: "marque",
    description:
      "La grande soirée de gala qui célèbre les couples et les belles histoires nées au sein de la communauté entrepreneuriale Fenou.",
    image: "/images/initiatives/gala-fenouloves-v2.png",
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
    applyHref: "https://forms.gle/MrbUT4UezGFQQhQS7",
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


function VentureCard({ venture, delay }: { venture: Venture; delay: number }) {
  const socials = SOCIALS_BY_VENTURE[venture.name];
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
            {socials && <SocialLinks links={socials} className="mt-4" />}
            {venture.applyHref && (
              <a
                href={venture.applyHref}
                target={venture.applyHref.startsWith("http") ? "_blank" : undefined}
                rel={venture.applyHref.startsWith("http") ? "noopener noreferrer" : undefined}
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
          "Le FENOU HIGBÉ n'est qu'une des initiatives portées par notre équipe engagée au service d'une Afrique qui entreprend.",
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

    </div>
  );
}
