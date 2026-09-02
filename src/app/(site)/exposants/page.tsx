import type { Metadata } from "next";
import { ExposantForm } from "@/components/forms/ExposantForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getPageContent, pick, pickList } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Devenir exposant" };

const DEFAULT_BENEFITS = [
  { title: "Visibilité", text: "Ton stand devant des centaines de visiteurs à chaque édition." },
  { title: "Formation", text: "Accompagnement et mise en réseau avec d'autres jeunes entrepreneurs." },
  { title: "Communauté", text: "Un réseau de plusieurs centaines de milliers de personnes en ligne." },
];

export default async function ExposantsPage() {
  const content = await getPageContent("exposants");
  const hero = content.hero;
  const candidature = content.candidature;
  const benefits = pickList(content, "benefits", DEFAULT_BENEFITS);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow={pick(hero, "eyebrow", "Candidats exposants")}
        title={pick(hero, "title", "Devenir exposant")}
        intro={pick(
          hero,
          "intro",
          "Le Fenou Higbé recherche des jeunes entrepreneurs africains — artisanat, agroalimentaire, cosmétique, textile, tech — prêts à présenter leur savoir-faire.",
        )}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {benefits.map((b, index) => (
          <Reveal key={`${b.title}-${index}`} delay={index * 0.1}>
            <TiltCard max={6}>
              <div className="h-full bg-white p-5 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm">
                <p className="font-display text-lg font-semibold">{b.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{b.text}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14">
        <h2 className="text-xl font-bold">Candidature</h2>
        <p className="mt-2 text-sm text-neutral-500">
          {pick(
            candidature,
            "note",
            "Les conditions et modalités (hors tarifs) te seront communiquées après étude de ta candidature.",
          )}
        </p>
        <div className="mt-6">
          <ExposantForm />
        </div>
      </Reveal>
    </div>
  );
}
