import type { Metadata } from "next";
import Image from "next/image";
import { getPartners, getKeyStats } from "@/lib/content";
import { getPageContent, pick, pickList } from "@/lib/pageContent";
import { PartnershipRequestForm } from "@/components/forms/PartnershipRequestForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";

export const metadata: Metadata = { title: "Partenaires" };

const DEFAULT_SUPPORT_NEEDS = [
  { text: "Garantir l'accessibilité du marché aux jeunes entrepreneurs" },
  { text: "Appuyer la logistique (tentes, signalétique, mobilier)" },
  { text: "Offrir des bourses mensuelles aux meilleurs entrepreneurs" },
  { text: "Renforcer le programme de formation et de coaching" },
  { text: "Étendre le modèle à d'autres villes : Porto-Novo, Natitingou, Ouidah, Lokossa..." },
];

export default async function PartenairesPage() {
  const [partners, stats, content] = await Promise.all([
    getPartners(),
    getKeyStats(),
    getPageContent("partenaires"),
  ]);
  const hero = content.hero;
  const dossier = content.dossier;
  const supportNeeds = pickList(content, "support_needs", DEFAULT_SUPPORT_NEEDS);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow={pick(hero, "eyebrow", "Sponsors & partenaires")}
        title={pick(hero, "title", "Partenaires")}
        intro={pick(
          hero,
          "intro",
          "Le Fenou Higbé, c'est une preuve d'impact concrète : des éditions multi-villes, une médiatisation croissante, et une communauté engagée.",
        )}
      />

      {stats.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter
              key={stat.id}
              value={stat.valeur}
              label={stat.label}
              className="text-center"
            />
          ))}
        </div>
      )}

      {partners.length > 0 && (
        <Reveal delay={0.1} className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Ils nous font confiance
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-8">
            {partners.map((partner) => (
              <Image
                key={partner.id}
                src={partner.logo_url}
                alt={partner.nom}
                width={140}
                height={60}
                className="h-12 w-auto grayscale transition hover:grayscale-0"
              />
            ))}
          </div>
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-16">
        <h2 className="text-xl font-bold">Ce que nous recherchons</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {supportNeeds.map((need, index) => (
            <li
              key={`${need.text}-${index}`}
              className="bg-white p-4 text-neutral-600 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm"
            >
              {need.text}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2} className="mt-16 bg-brand-cream p-8">
        <h2 className="text-xl font-bold">
          {pick(dossier, "title", "Recevoir notre dossier de partenariat")}
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          {pick(
            dossier,
            "note",
            "Les grilles de partenariat et tarifs sont réservées aux échanges commerciaux directs — laisse tes coordonnées, on te les envoie par email.",
          )}
        </p>
        <div className="mt-6">
          <PartnershipRequestForm />
        </div>
      </Reveal>
    </div>
  );
}
