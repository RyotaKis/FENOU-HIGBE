import type { Metadata } from "next";
import Image from "next/image";
import { getPartners, getKeyStats } from "@/lib/content";
import { PartnershipRequestForm } from "@/components/forms/PartnershipRequestForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";

export const metadata: Metadata = { title: "Partenaires" };

const SUPPORT_NEEDS = [
  "Garantir l'accessibilité du marché aux jeunes entrepreneurs",
  "Appuyer la logistique (tentes, signalétique, mobilier)",
  "Offrir des bourses mensuelles aux meilleurs entrepreneurs",
  "Renforcer le programme de formation et de coaching",
  "Étendre le modèle à d'autres villes : Porto-Novo, Natitingou, Ouidah, Lokossa...",
];

export default async function PartenairesPage() {
  const [partners, stats] = await Promise.all([getPartners(), getKeyStats()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Sponsors & partenaires"
        title="Partenaires"
        intro="Le Fenou Higbé, c'est une preuve d'impact concrète : des éditions multi-villes, une médiatisation croissante, et une communauté engagée."
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
          {SUPPORT_NEEDS.map((need) => (
            <li
              key={need}
              className="bg-white p-4 text-neutral-600 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm"
            >
              {need}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.2} className="mt-16 bg-brand-cream p-8">
        <h2 className="text-xl font-bold">
          Recevoir notre dossier de partenariat
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Les grilles de partenariat et tarifs sont réservées aux échanges
          commerciaux directs — laisse tes coordonnées, on te les envoie par
          email.
        </p>
        <div className="mt-6">
          <PartnershipRequestForm />
        </div>
      </Reveal>
    </div>
  );
}
