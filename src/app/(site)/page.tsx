import Image from "next/image";
import { getNextEdition, getAllEditions } from "@/lib/editions";
import { getKeyStats } from "@/lib/content";
import { getPageContent, pick, pickList } from "@/lib/pageContent";
import { ChapterSection } from "@/components/ChapterSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaLink } from "@/components/CtaLink";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { HeroMedia } from "@/components/home/HeroMedia";
import { HeroIntro, HeroIntroItem } from "@/components/home/HeroIntro";
import { ProgramGrid, DEFAULT_ACTIVITIES } from "@/components/home/ProgramGrid";
import { TourTeaser } from "@/components/home/TourTeaser";
import { FounderTeaser } from "@/components/home/FounderTeaser";

const FALLBACK_STATS = [
  { id: "exposants", label: "jeunes exposants accompagnés", valeur: "+500" },
  { id: "femmes", label: "d'exposants féminins", valeur: "+80%" },
  { id: "visiteurs", label: "visiteurs cumulés", valeur: "+150 000" },
  { id: "formes", label: "entrepreneurs formés", valeur: "+200" },
  { id: "emplois", label: "emplois temporaires créés", valeur: "+5000" },
  { id: "produits", label: "produits locaux promus", valeur: "+3000" },
  { id: "villes", label: "villes parcourues", valeur: "4" },
];

const DEFAULT_CONCEPT_ITEMS = [
  {
    title: "20 à 30 exposants",
    text: "Art, agroalimentaire, cosmétique, textile, artisanat, tech...",
  },
  {
    title: "Ateliers pratiques",
    text: "Marketing digital, gestion financière, image de marque.",
  },
  {
    title: "Pitchs & réseau",
    text: "Mises en réseau avec partenaires publics et privés.",
  },
  {
    title: "Podium culturel",
    text: "Musique live, humour, artistes locaux.",
  },
  {
    title: "Femmes entrepreneures",
    text: "Une valorisation concrète, chaque mois.",
  },
  {
    title: "Diffusion live",
    text: "Sur les réseaux sociaux, +500 000 abonnés cumulés.",
  },
];

const DEFAULT_IMPACT_ITEMS = [
  { text: "Une opportunité réelle pour des jeunes souvent exclus des salons classiques" },
  { text: "Des centaines de produits locaux valorisés chaque mois" },
  { text: "Un encouragement concret à l'autonomisation des femmes" },
  { text: "Une communauté entrepreneuriale qui se construit et se soutient" },
  { text: "Une dynamique économique de proximité, accessible et durable" },
  { text: "Une jeunesse outillée et confiante" },
];

export default async function AccueilPage() {
  const [nextEdition, editions, stats, content] = await Promise.all([
    getNextEdition(),
    getAllEditions(),
    getKeyStats(),
    getPageContent("home"),
  ]);

  const displayedStats = stats.length > 0 ? stats : FALLBACK_STATS;

  const hero = content.hero;
  const manifeste = content.manifeste;
  const pourquoiProjet = content.pourquoi_projet;
  const choixFort = content.choix_fort;
  const impactQuote = content.impact_quote;
  const impact = content.impact;
  const programme = content.programme;
  const fondatrice = content.fondatrice;
  const tourTeaser = content.tour_teaser;
  const ctaFinale = content.cta_finale;

  const conceptItems = pickList(content, "concept_items", DEFAULT_CONCEPT_ITEMS);
  const impactItems = pickList(content, "impact_items", DEFAULT_IMPACT_ITEMS);
  const activities = pickList(content, "programme_items", DEFAULT_ACTIVITIES);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-dvh flex-col items-start justify-end overflow-hidden px-6 pb-20 pt-32 text-white sm:px-10">
        <HeroMedia overrideImage={hero?.image} />
        <HeroIntro>
          {nextEdition && (
            <HeroIntroItem className="absolute right-6 top-28 hidden sm:right-10 sm:block">
              <span className="flex items-center gap-2 border border-white/25 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-caps backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                En cours · {nextEdition.ville}
              </span>
            </HeroIntroItem>
          )}
          <div className="max-w-2xl">
            <HeroIntroItem>
              <p className="text-xs font-semibold uppercase tracking-caps text-white/60">
                {pick(
                  hero,
                  "eyebrow",
                  "Marché international des jeunes entrepreneurs africains",
                )}
              </p>
            </HeroIntroItem>
            <HeroIntroItem>
              <h1 className="mt-4 font-display text-6xl font-normal leading-[0.95] sm:text-8xl">
                Fenou
                <br />
                <span className="italic text-brand-yellow">HIGBÉ</span>
              </h1>
            </HeroIntroItem>
            <HeroIntroItem>
              <p className="mt-7 max-w-xl text-lg text-white/80">
                {pick(
                  hero,
                  "subtitle",
                  "Un mouvement vivant. Une seule ambition : faire du Bénin la capitale de l'entrepreneuriat africain.",
                )}
              </p>
            </HeroIntroItem>
            <HeroIntroItem className="mt-8 flex flex-wrap gap-4">
              <CtaLink href="/tour-2026" variant="primary">
                Voir le Tour 2026
              </CtaLink>
              <CtaLink href="/exposants" variant="ghost-dark">
                Devenir exposant
              </CtaLink>
            </HeroIntroItem>
          </div>
        </HeroIntro>
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-6 hidden h-10 w-6 items-start justify-center border border-white/40 p-1.5 sm:flex"
        >
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/80" />
        </div>
      </section>

      {/* 2. Manifeste */}
      <ChapterSection tone="dark" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-caps text-brand-yellow">
          Manifeste
        </p>
        <Reveal delay={0.1}>
          {manifeste?.quote ? (
            <blockquote className="mx-auto mt-6 max-w-4xl font-display text-3xl leading-tight sm:text-5xl">
              {manifeste.quote}
            </blockquote>
          ) : (
            <blockquote className="mx-auto mt-6 max-w-4xl font-display text-3xl leading-tight sm:text-5xl">
              &laquo; Ce n&apos;est pas un événement. C&apos;est un{" "}
              <span className="italic text-brand-yellow">mouvement</span>.
              Chaque ville est une scène. Chaque entrepreneur, un acte. &raquo;
            </blockquote>
          )}
        </Reveal>
      </ChapterSection>

      {/* 3. Chiffres clés */}
      <ChapterSection tone="cream">
        <SectionHeading
          eyebrow="Le mouvement en chiffres"
          title="Un marché devenu un mouvement"
          align="center"
        />
        <div className="mt-14 grid divide-y divide-neutral-900/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {displayedStats.slice(0, 4).map((stat) => (
            <StatCounter
              key={stat.id}
              value={stat.valeur}
              label={stat.label}
              className="px-6 py-6 text-center first:pl-0"
            />
          ))}
        </div>
      </ChapterSection>

      {/* 4. Pourquoi ce projet */}
      <ChapterSection tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            {pourquoiProjet?.image ? (
              <Image
                src={pourquoiProjet.image}
                alt=""
                width={640}
                height={800}
                className="h-auto w-full object-cover shadow-warm"
                style={{ aspectRatio: "4/5" }}
              />
            ) : (
              <PlaceholderImage
                description="Jeune entrepreneure installant son stand au marché"
                aspectRatio="4/5"
                className="shadow-warm"
              />
            )}
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={pick(pourquoiProjet, "eyebrow", "Pourquoi ce projet")}
              title={pick(
                pourquoiProjet,
                "title",
                "Un espace concret pour exister, vendre, apprendre — et rêver plus grand",
              )}
              intro={pick(
                pourquoiProjet,
                "intro",
                "Chaque jour au Bénin, des jeunes et des femmes talentueux se battent pour faire connaître leurs produits, vendre, vivre de leur passion. Mais beaucoup manquent de vitrine, de réseau, de soutien.",
              )}
            />
            <Reveal className="mt-6 max-w-xl" delay={0.1}>
              <p className="text-lg text-neutral-600">
                {pick(
                  pourquoiProjet,
                  "body",
                  "C'est de ce constat qu'est né le FENOU HIGBÉ, un marché mensuel, festif et inclusif. Chaque dernier week-end du mois, dans différentes villes du Bénin, des dizaines de jeunes entrepreneurs installent leur savoir-faire, leurs produits, leurs espoirs — et le public répond présent.",
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </ChapterSection>

      {/* 5. Qu'est-ce que le Fenou Higbé */}
      <ChapterSection tone="dark">
        <SectionHeading
          eyebrow="Le concept"
          title="Un tremplin. Un lieu de rencontres. Un laboratoire vivant."
          intro="Un marché itinérant qui met en lumière les jeunes entrepreneurs africains, mais pas seulement."
          tone="dark"
        />
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {conceptItems.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={index * 0.06}>
              <div className="flex gap-4">
                <span className="font-display text-2xl italic text-brand-yellow/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-white/70">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </ChapterSection>

      {/* 6. Pourquoi c'est un choix fort */}
      <ChapterSection tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow={pick(choixFort, "eyebrow", "Un choix fort")}
              title={pick(
                choixFort,
                "title",
                "Le marché le plus accessible du pays",
              )}
              intro={pick(
                choixFort,
                "intro",
                "Beaucoup de jeunes n'ont pas encore les moyens d'investir de grosses sommes dans des expositions, mais ils ont des produits de qualité, des idées innovantes et une envie immense de réussir.",
              )}
            />
            <Reveal className="mt-6 max-w-xl" delay={0.1}>
              <p className="text-lg text-neutral-600">
                {pick(
                  choixFort,
                  "body",
                  "Le FENOU HIGBÉ leur ouvre les portes du marché à un coût symbolique, pour leur donner ce premier tremplin vers la réussite. Chaque mois, plus de 30 jeunes entrepreneurs exposent, bénéficient d'un stand professionnel, de visibilité médiatique, et surtout d'un public prêt à consommer local.",
                )}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            {choixFort?.image ? (
              <Image
                src={choixFort.image}
                alt=""
                width={640}
                height={800}
                className="h-auto w-full object-cover shadow-warm"
                style={{ aspectRatio: "4/5" }}
              />
            ) : (
              <PlaceholderImage
                description="Stand d'exposant coloré, produits artisanaux béninois"
                aspectRatio="4/5"
                className="shadow-warm"
              />
            )}
          </Reveal>
        </div>
      </ChapterSection>

      {/* 7. Ce que ça change */}
      <ChapterSection tone="gold">
        <blockquote className="mx-auto max-w-3xl text-center font-display text-2xl italic leading-snug sm:text-4xl">
          {impactQuote?.quote || (
            <>
              &laquo; Ici, les jeunes entrepreneurs béninois ne rêvent pas —{" "}
              <span className="not-italic">ils vendent</span>. &raquo;
            </>
          )}
        </blockquote>
      </ChapterSection>

      <ChapterSection tone="cream">
        <SectionHeading
          eyebrow={pick(impact, "eyebrow", "L'impact")}
          title={pick(impact, "title", "Ce que ça change")}
          intro={pick(
            impact,
            "intro",
            "Des centaines de jeunes trouvent leur premier client, ou leur premier investisseur.",
          )}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <ul className="columns-1 gap-6 *:mb-6 *:break-inside-avoid sm:columns-2">
            {impactItems.map((item, index) => (
              <Reveal key={`${item.text}-${index}`} delay={index * 0.06}>
                <li className="flex gap-3 text-neutral-700">
                  <span className="mt-1 text-brand-green">✓</span>
                  <span>{item.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal
            delay={0.3}
            className="h-fit border border-neutral-900/10 bg-white p-6 shadow-warm-sm"
          >
            <p className="font-display text-2xl italic text-neutral-800">
              «{" "}
              {pick(
                impact,
                "testimonial_quote",
                "meilleure foire de l'année 🙌 j'ai juré",
              )}{" "}
              »
            </p>
            <p className="mt-3 text-sm text-neutral-400">
              — {pick(impact, "testimonial_author", "un visiteur, sur les réseaux sociaux")}
            </p>
          </Reveal>
        </div>
      </ChapterSection>

      {/* 8. Programme du Grand Fenou Higbé */}
      <ChapterSection tone="dark">
        <SectionHeading
          eyebrow={pick(
            programme,
            "eyebrow",
            "27 octobre – 1er novembre 2026 · Cotonou, Place de l'Amazone",
          )}
          title={pick(programme, "title", "Le Grand Fenou Higbé, 4ème édition")}
          intro={pick(
            programme,
            "intro",
            "Une semaine de programme, du coup d'envoi festif à la grande soirée de clôture.",
          )}
          tone="dark"
        />
        <ProgramGrid activities={activities} />
      </ChapterSection>

      {/* 9. Teaser fondatrice */}
      <ChapterSection tone="light">
        <FounderTeaser
          quote={fondatrice?.quote}
          bio={fondatrice?.bio}
          image={fondatrice?.image}
        />
      </ChapterSection>

      {/* 10. Teaser Tour 2026 */}
      <ChapterSection tone="cream">
        <SectionHeading
          eyebrow={pick(tourTeaser, "eyebrow", "Toute l'année")}
          title={pick(tourTeaser, "title", "Le Tour 2026")}
          intro={pick(
            tourTeaser,
            "intro",
            "Itinérant sur plusieurs villes du Bénin — chaque édition a sa date, sa ville, son ambiance.",
          )}
        />
        <TourTeaser editions={editions} />
      </ChapterSection>

      {/* 11. CTA finale */}
      <ChapterSection tone="gold" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-caps text-neutral-950/60">
          {pick(ctaFinale, "eyebrow", "Rejoignez le mouvement")}
        </p>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl">
            {pick(ctaFinale, "title", "Envie d'en faire partie ?")}
          </h2>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-4" delay={0.15}>
          <CtaLink href="/exposants" variant="solid-dark">
            Devenir exposant
          </CtaLink>
          <CtaLink href="/partenaires" variant="outline-dark">
            Devenir partenaire
          </CtaLink>
          <CtaLink href="/contact" variant="outline-dark">
            Nous contacter
          </CtaLink>
        </Reveal>
      </ChapterSection>
    </>
  );
}
