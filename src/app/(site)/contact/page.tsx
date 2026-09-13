import type { Metadata } from "next";
import { FaEnvelope, FaHandshake, FaPhone, FaStore, FaUsers } from "react-icons/fa";
import type { IconType } from "react-icons";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { SocialLinks } from "@/components/SocialLinks";
import { FENOU_HIGBE_SOCIALS } from "@/lib/socialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { getPageContent, pick } from "@/lib/pageContent";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact" };

type WhatsAppCta = {
  icon: IconType;
  title: string;
  description: string;
  message: string;
};

const WHATSAPP_CTAS: WhatsAppCta[] = [
  {
    icon: FaStore,
    title: "Devenir exposant",
    description:
      "Réserve ton stand et présente tes produits ou services au prochain marché Fenou Higbé.",
    message: "Bonjour, je souhaite devenir exposant au Fenou Higbé.",
  },
  {
    icon: FaHandshake,
    title: "Devenir partenaire",
    description:
      "Accompagne le mouvement Fenou Higbé et gagne en visibilité auprès de sa communauté.",
    message: "Bonjour, je souhaite devenir partenaire du Fenou Higbé.",
  },
  {
    icon: FaUsers,
    title: "Rejoindre la communauté",
    description:
      "Reste connecté aux actualités, aux prochaines éditions et aux temps forts du Fenou Higbé.",
    message: "Bonjour, je souhaite rejoindre la communauté Fenou Higbé.",
  },
];

export default async function ContactPage() {
  const content = await getPageContent("contact");
  const hero = content.hero;
  const coordonnees = content.coordonnees;

  const telephone = pick(coordonnees, "telephone", "+229 01 9735 1639 · +229 01 9627 1395");
  const email = pick(coordonnees, "email", "packaging.fenou@gmail.com");
  const numeros = telephone.split("·").map((n) => n.trim());

  return (
    <PageBackdrop tone="orange">
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow={pick(hero, "eyebrow", "Une question ?")}
        title={pick(hero, "title", "Contact")}
        intro={pick(
          hero,
          "intro",
          "Écris-nous, on te répond au plus vite.",
        )}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {WHATSAPP_CTAS.map((cta, index) => (
          <Reveal key={cta.title} delay={index * 0.1}>
            <TiltCard max={6}>
              <a
                href={getWhatsAppLink(cta.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col bg-white p-6 shadow-warm-sm transition-shadow duration-300 hover:shadow-warm"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-brand-green/10 text-xl text-brand-green">
                  <cta.icon />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{cta.title}</h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">{cta.description}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-caps text-brand-green">
                  Discuter sur WhatsApp →
                </span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={0.2}
        className="mt-10 flex flex-col gap-6 bg-brand-cream p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {numeros.map((numero) => (
            <a
              key={numero}
              href={`tel:${numero.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-2 text-neutral-700 transition-colors hover:text-brand-orange"
            >
              <FaPhone className="text-brand-orange" /> {numero}
            </a>
          ))}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-neutral-700 transition-colors hover:text-brand-orange"
          >
            <FaEnvelope className="text-brand-orange" /> {email}
          </a>
        </div>
        <SocialLinks links={FENOU_HIGBE_SOCIALS} />
      </Reveal>

      <Reveal
        delay={0.25}
        id="formulaire"
        className="mt-10 scroll-mt-24 bg-white p-6 shadow-warm-sm sm:p-8"
      >
        <h2 className="font-display text-xl font-semibold">Envoyer un message</h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </Reveal>
    </div>
    </PageBackdrop>
  );
}
