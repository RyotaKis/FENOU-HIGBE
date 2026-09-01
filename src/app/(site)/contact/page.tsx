import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Contact" };

const CONTACT_INFO = [
  { label: "Téléphone", value: "+229 01 9735 1639 · 01 9627 1395" },
  { label: "Email", value: "packaging.fenou@gmail.com" },
  { label: "Réseaux", value: "TikTok · Instagram · Facebook — fenouhigbe" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Une question ?"
        title="Contact"
        intro="Écris-nous, on te répond au plus vite."
      />

      <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-3">
        {CONTACT_INFO.map((info) => (
          <div key={info.label} className="bg-white p-4 shadow-warm-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {info.label}
            </p>
            <p className="mt-1 text-sm text-neutral-700">{info.value}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <ContactForm />
      </Reveal>
    </div>
  );
}
