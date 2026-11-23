import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEditionPhotos } from "@/lib/content";
import { getEdition } from "@/lib/editions";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { BentoGrid } from "@/components/gallery/BentoGrid";

/** Page mise en cache par Vercel et régénérée au plus toutes les 5 minutes. */
export const revalidate = 300;

// Pages générées à la première visite puis mises en cache (ISR).
export async function generateStaticParams() {
  return [];
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const edition = await getEdition(id);
  return { title: edition ? `Galerie — ${edition.ville}` : "Galerie" };
}

export default async function EditionGaleriePage({ params }: PageProps) {
  const { id } = await params;
  const [edition, photos] = await Promise.all([getEdition(id), getEditionPhotos(id)]);

  if (!edition || photos.length === 0) notFound();

  return (
    <PageBackdrop tone="green">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Link
          href="/galerie"
          className="text-xs font-semibold uppercase tracking-caps text-neutral-500 underline underline-offset-4 hover:text-brand-orange"
        >
          ← Toutes les éditions
        </Link>
        <SectionHeading
          as="h1"
          className="mt-6"
          eyebrow={new Date(edition.date_debut).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          title={edition.ville}
          intro={edition.description ?? undefined}
        />
        <BentoGrid photos={photos} />
      </div>
    </PageBackdrop>
  );
}
