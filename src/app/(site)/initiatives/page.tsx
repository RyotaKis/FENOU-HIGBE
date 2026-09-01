import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = { title: "Initiatives & Filiales" };

const VENTURES = [
  {
    name: "Fenou Foods",
    year: "2016",
    description:
      "La première startup de Sonita Tossou : réinventer la consommation de l'igname avec le couscous d'igname à cuisson express, « Wassa Wassa Tchigan ».",
  },
  {
    name: "Fenou Packaging",
    year: "",
    description:
      "Emballages agroalimentaires biodégradables et distribution de produits locaux 100% naturels — au service de l'environnement et des agriculteurs locaux.",
  },
  {
    name: "agripack.store",
    year: "2019",
    description:
      "Une plateforme e-commerce dédiée aux produits locaux, présentée au salon VivaTech à Paris.",
  },
];

const MILESTONES = [
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

export default function InitiativesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="L'écosystème Fenou"
        title="Initiatives & Filiales"
        intro="Le FENOU HIGBÉ n'est qu'une des initiatives portées par Sonita Tossou, entrepreneure béninoise engagée au service d'une Afrique qui entreprend."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {VENTURES.map((venture, index) => (
          <Reveal key={venture.name} delay={index * 0.1}>
            <TiltCard max={6}>
              <div className="h-full bg-white p-6 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm">
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
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 grid gap-10 sm:grid-cols-[minmax(0,280px)_1fr]">
        <Reveal>
          <PlaceholderImage
            description="Portrait de Sonita Tossou en tenue traditionnelle"
            aspectRatio="3/4"
          />
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Biographie"
            title="Sonita Tossou"
            intro="Une entrepreneure engagée au service de l'Afrique qui entreprend. Née à Cotonou dans un foyer imprégné du commerce, elle a rapidement embrassé l'esprit entrepreneurial qui caractérise sa famille."
          />
          <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6">
            {MILESTONES.map((milestone, index) => (
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
              Avec plus de 500 000 abonnés, Sonita Tossou est aujourd&apos;hui
              une voix influente sur l&apos;entrepreneuriat africain, qu&apos;elle
              partage au fil de ses conseils, ses idées et ses histoires
              inspirantes.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
