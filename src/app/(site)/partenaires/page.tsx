import type { Metadata } from "next";
import Image from "next/image";
import { getPartners, getKeyStats } from "@/lib/content";
import { PartnershipRequestForm } from "@/components/forms/PartnershipRequestForm";

export const metadata: Metadata = { title: "Partenaires" };

export default async function PartenairesPage() {
  const [partners, stats] = await Promise.all([getPartners(), getKeyStats()]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Sponsors &amp; partenaires
      </p>
      <h1 className="mt-2 text-4xl font-black">Partenaires</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Le Fenou Higbé, c&apos;est une preuve d&apos;impact concrète : des
        éditions multi-villes, une médiatisation croissante, et une
        communauté engagée.
      </p>

      {stats.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-3xl font-black text-brand-green">
                {stat.valeur}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {partners.length > 0 && (
        <div className="mt-14">
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
        </div>
      )}

      <div className="mt-16 rounded-2xl bg-neutral-50 p-8">
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
      </div>
    </div>
  );
}
