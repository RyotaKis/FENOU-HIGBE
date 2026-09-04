# Carte du code — Fenou Higbé

Repère rapide pour naviguer dans le projet à la main. Organisé par zone : d'abord "où modifier quoi" pour le site public et l'admin, puis le détail technique par dossier.

---

## 1. Où toucher pour changer quoi (raccourcis les plus utiles)

| Je veux changer... | Fichier / dossier |
|---|---|
| Le texte du hero, du manifeste, des chapitres de la home | `/admin/contenu/home` (pas le code — voir §4) |
| L'ordre ou la visibilité des chapitres de la home | `/admin/mise-en-page` (pas le code) |
| Les photos de la galerie | `/admin/galerie` (pas le code) |
| Les dates/villes du Tour 2026 | `/admin/editions` (pas le code) |
| Le logo du site | `/admin/contenu/site` (pas le code) |
| La structure/le layout visuel d'un chapitre de la home | `src/app/(site)/page.tsx` |
| Le style d'un composant (couleurs, espacement, police) | le composant lui-même dans `src/components/` |
| Les couleurs de marque, tokens CSS globaux | `src/app/globals.css` |
| Le menu de navigation (liens du header/footer) | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Les champs éditables dans l'admin (ajouter une section CMS) | `src/lib/pageContentSchema.ts` |
| Le schéma de base de données Supabase | `supabase/schema.sql` |

---

## 2. Pages publiques (`src/app/(site)/`)

Route group qui partage le `Header` + `Footer` (défini dans `layout.tsx` de ce dossier).

- **`page.tsx`** — Accueil (`/`). La plus grosse page : hero (toujours en tête, plein écran) + 10 chapitres réordonnables stockés dans un objet `chapters` et rendus selon `getHomeLayout()`. Pour changer le **contenu texte/image** d'un chapitre → admin, pas ce fichier. Pour changer la **mise en page/structure JSX** d'un chapitre → ici.

  **Repère précis de chaque chapitre dans `page.tsx`** (numéros de ligne à titre indicatif, ils bougent un peu à chaque édition — cherche plutôt le texte cité) :

  | Chapitre | Clé (`chapters`) | ~Ligne | Texte de repère à chercher |
  |---|---|---|---|
  | Hero (plein écran) | — (à part, pas dans `chapters`) | 390-446 | `"Fenou"` / `"HIGBÉ"` |
  | Manifeste | `manifeste` | 92-111 | le petit label `"Manifeste"` juste au-dessus de la citation |
  | Chiffres clés | `chiffres` | 113-131 | `FALLBACK_STATS` tout en haut du fichier (ligne 19) |
  | Pourquoi ce projet | `pourquoi_projet` | 133-180 | `"Pourquoi ce projet ?"` |
  | Le concept | `concept` | 182-206 | `"Un tremplin. Un lieu de rencontres."` |
  | Un choix fort | `choix_fort` | 208-255 | `"Le marché le plus accessible du pays"` |
  | Ce que ça change (citation + liste) | `impact` | 257-316 | `"Ce que ça change"` |
  | Programme du Grand Fenou Higbé | `programme` | 318-336 | `"27 octobre – 1er novembre 2026"` — cartes dans `src/components/home/ProgramGrid.tsx` |
  | Teaser fondatrice | `fondatrice` | 338-346 | rendu par `src/components/home/FounderTeaser.tsx` |
  | Teaser Tour 2026 | `tour_teaser` | 348-361 | `"Toute l'année"` |
  | CTA finale | `cta_finale` | 363-385 | `"Envie d'en faire partie ?"` |

  **Astuce générale** pour retrouver n'importe quel texte visible sur le site : fais une recherche globale (Ctrl+Maj+F dans VS Code) sur un bout exact du texte affiché — presque tout le texte de la home est soit un texte de repli en dur dans `page.tsx`, soit un libellé statique (titres de section type `"Le concept"`, `"Un choix fort"` ne sont *pas* éditables depuis l'admin, seuls `eyebrow`/`title`/`intro` passés à `pick(...)` le sont).
- **`tour-2026/page.tsx`** — Timeline verticale des éditions. Données via `getAllEditions()` (`src/lib/editions.ts`), avec un tableau `FALLBACK_EDITIONS` codé en dur si Supabase est vide (à retirer une fois les vraies éditions saisies dans l'admin).
- **`galerie/page.tsx`** — Grille de photos (masonry) via `getEditionPhotos()` (`src/lib/content.ts`). Utilise `ImageMasonry` + `Lightbox` (`src/components/gallery/`).
- **`initiatives/page.tsx`** — Filiales (Fenou Foods, Packaging, agripack.store) + bio de Sonita Tossou. Listes `ventures` et `milestones` éditables via l'admin.
- **`exposants/page.tsx`** — Page candidature exposant. Liste `benefits` éditable via l'admin. Formulaire : `src/components/forms/ExposantForm.tsx`.
- **`partenaires/page.tsx`** — Page partenaires. Liste `support_needs` éditable. Formulaire : `PartnershipRequestForm.tsx`. Logos partenaires + chiffres via Supabase (`getPartners()`, `getKeyStats()`).
- **`contact/page.tsx`** — Formulaire de contact (`ContactForm.tsx`) + coordonnées éditables (téléphone/email/réseaux).
- **`not-found.tsx`** — Page 404 personnalisée (fond sombre, logo, CTA retour accueil).
- **`layout.tsx`** — Header + Footer + `PageTransition` (transition de fondu entre les pages) autour de `{children}`.

---

## 3. Panel admin (`src/app/admin/`)

- **`login/page.tsx`** — Page de connexion (server component qui charge le logo, délègue le formulaire à `src/components/admin/LoginForm.tsx`).
- **`actions.ts`** — **Toutes** les Server Actions du site (création/suppression d'éditions, partenaires, stats, sections de contenu, éléments de liste, réordonnancement des chapitres, upload de photos galerie, login/logout). C'est le fichier le plus important côté admin — chaque bouton "Enregistrer"/"Supprimer" de l'admin appelle une fonction d'ici.
- **`(dashboard)/layout.tsx`** — Sidebar admin (logo + nav groupée en 3 sections) + vérification de session.
- **`(dashboard)/page.tsx`** — Vue d'ensemble (compteurs : éditions, partenaires, candidatures, messages, abonnés).
- **`(dashboard)/contenu/page.tsx`** — Liste des pages ayant du contenu éditable (lit `PAGE_CONTENT_SCHEMA`).
- **`(dashboard)/contenu/[slug]/page.tsx`** — Formulaires par section pour une page donnée (texte, image, listes). C'est le moteur générique du CMS — il ne connaît rien du contenu lui-même, tout vient de `pageContentSchema.ts`.
- **`(dashboard)/mise-en-page/page.tsx`** — Réordonnancement/masquage des chapitres de la home (flèches ↑/↓).
- **`(dashboard)/editions/page.tsx`** — CRUD des éditions du Tour (table `editions`).
- **`(dashboard)/galerie/page.tsx`** — Upload en masse de photos (compression navigateur) + suppression. Utilise `src/components/admin/GalleryUploader.tsx`.
- **`(dashboard)/partenaires/page.tsx`** — CRUD des logos partenaires (table `partners`).
- **`(dashboard)/chiffres/page.tsx`** — CRUD des chiffres clés (table `stats`).
- **`(dashboard)/candidatures/page.tsx`**, **`messages/page.tsx`**, **`newsletter/page.tsx`** — Listes en lecture seule des soumissions de formulaires publics.

---

## 4. Le CMS : comment ça marche (`src/lib/pageContentSchema.ts` + `src/lib/pageContent.ts`)

C'est le cœur du système "texte/image éditable sans toucher au code" :

- **`pageContentSchema.ts`** — Déclare, pour chaque page publique, quelles "sections" existent et quels champs elles ont (texte, texte long, ou image). Deux types de section :
  - `kind: "single"` → un formulaire, un `Enregistrer` (ex. le hero).
  - `kind: "list"` → une liste d'éléments avec ajout/suppression (ex. les activités du programme).
  - **Pour ajouter un nouveau champ éditable** : c'est ici qu'il faut l'ajouter, puis lire sa valeur dans la page publique correspondante avec `pick()` ou `pickList()`.
- **`pageContent.ts`** — Fonctions de lecture côté pages publiques : `getPageContent(slug)`, `pick(section, clé, valeurParDéfaut)`, `pickList(...)`, `getSiteLogo()`, `getHomeLayout()`. Tout est conçu pour se replier automatiquement sur le contenu par défaut codé en dur si rien n'a encore été saisi dans l'admin.
- Stockage : une seule table Supabase `page_content` (`page_slug`, `section_key`, `contenu` en JSON).

## 5. Autres fichiers `src/lib/`

- **`editions.ts`** — `getNextEdition()`, `getAllEditions()` (table `editions`).
- **`content.ts`** — `getPartners()`, `getKeyStats()`, `getEditionPhotos()`.
- **`homeLayout.ts`** — Registre des 10 chapitres réordonnables de la home (clés + libellés + ordre par défaut).
- **`compressImage.ts`** — Redimensionnement/compression d'image côté navigateur (Canvas) avant upload.
- **`types.ts`** — Types TypeScript partagés (Edition, Partner, KeyStat, etc.).
- **`supabase/client.ts`** / **`supabase/server.ts`** — Deux clients Supabase distincts : `client.ts` pour le navigateur (upload direct d'images), `server.ts` pour les Server Components/Actions (cookies de session).

---

## 6. Composants (`src/components/`)

- **Racine** (`Header.tsx`, `Footer.tsx`, `ChapterSection.tsx`, `SectionHeading.tsx`, `CtaLink.tsx`, `MobileNav.tsx`, `Countdown.tsx`, `PlaceholderImage.tsx`, `PageTransition.tsx`) — briques réutilisées sur tout le site public.
  - `ChapterSection` = le conteneur visuel de chaque chapitre de la home (dégradé + grain + padding selon le `tone`: light/dark/cream/gold).
  - `PlaceholderImage` = dégradé de secours affiché tant qu'aucune vraie image n'est encore uploadée.
- **`motion/`** — Primitives d'animation (Framer Motion) : `Reveal` (apparition au scroll), `FadeIn` (apparition immédiate au chargement), `StatCounter` (chiffres animés), `TiltCard` (bascule 3D au survol), `Parallax`.
- **`home/`** — Composants spécifiques à la home : `HeroMedia` (fond du hero, photo/vidéo), `HeroIntro` (entrée en cascade du texte du hero), `ProgramGrid` (grille du programme), `TourTeaser`, `FounderTeaser`.
- **`gallery/`** — `ImageMasonry`, `Lightbox` (visionneuse plein écran).
- **`forms/`** — Les 4 formulaires publics (`ContactForm`, `ExposantForm`, `NewsletterForm`, `PartnershipRequestForm`) — soumettent vers les routes `src/app/api/*`.
- **`admin/`** — `GalleryUploader`, `ImageField` (upload d'image compressée pour le CMS), `LoginForm`.

---

## 7. API routes (`src/app/api/`)

`contact/route.ts`, `exposants/route.ts`, `newsletter/route.ts`, `partenariat/route.ts` — reçoivent les soumissions des 4 formulaires publics, écrivent dans Supabase (tables `contact_messages`, `applicants`, `newsletter_subscribers`, `partnership_requests`).

---

## 8. Config & style

- **`src/app/globals.css`** — Tokens de marque (couleurs `--color-brand-*`, `--color-ink`, `--color-brand-cream`), police d'affichage (`--font-display` = Playfair), classe `.grain` (texture bruit), `prefers-reduced-motion`.
- **`src/app/layout.tsx`** — Layout racine : polices (Geist + Playfair Display), métadonnées par défaut, lien d'accès rapide au contenu (a11y).
- **`src/proxy.ts`** — Middleware qui protège toutes les routes `/admin/*` (redirige vers `/admin/login` si pas connecté).
- **`next.config.ts`** — Autorise les images venant du bucket Supabase Storage.
- **`supabase/schema.sql`** — Schéma complet : tables, policies RLS, bucket Storage `site-content`. À exécuter manuellement dans l'éditeur SQL Supabase si de nouvelles tables/policies sont ajoutées.
- **`public/logo/`** — Les 4 PNG du logo (fond clair/sombre × Fenou Higbé/Fenou Xwé), servent de repli tant que rien n'est uploadé via `/admin/contenu/site`.
- **`public/images/hero.jpg`** — Photo par défaut du hero (repli si rien n'est uploadé via `/admin/contenu/home`).

---

## 9. Ajouter une image ou une vidéo directement dans le code

Deux façons de mettre un vrai média sur le site, selon si tu veux que ça reste modifiable depuis l'admin ou non.

### A. En dur dans le code (ce que tu demandes)

1. Dépose le fichier dans `public/images/` (crée des sous-dossiers si tu veux, ex. `public/images/programme/`). Tout ce qui est dans `public/` est servi tel quel à la racine du site : `public/images/x.jpg` devient l'URL `/images/x.jpg`.
2. Utilise-le avec le composant `Image` de Next.js (déjà importé dans la plupart des fichiers concernés) :
   ```tsx
   import Image from "next/image";

   <Image src="/images/programme/caravane.jpg" alt="" width={800} height={600} className="..." />
   ```
   Pour une vidéo, balise HTML classique :
   ```tsx
   <video src="/videos/teaser.mp4" autoPlay muted loop playsInline className="..." />
   ```
3. Endroits déjà prêts à recevoir une image en dur :
   - **Programme du Grand Fenou Higbé** → `src/components/home/ProgramGrid.tsx`, tableau `DEFAULT_ACTIVITIES` (lignes ~40-83) : ajoute `image: "/images/programme/xxx.jpg"` sur l'activité voulue (lignes commentées `// image: ...` déjà en place à titre d'exemple).
   - **Hero de la home** → `src/components/home/HeroMedia.tsx`, constante `DEFAULT_IMAGE` (ligne 10). Remplace le chemin, ou passe `mode="video"` + `videoSrc="/videos/xxx.mp4"` en prop depuis `page.tsx` (ligne 394, `<HeroMedia overrideImage={hero?.image} />`).
   - **N'importe quel autre endroit** avec un `<PlaceholderImage .../>` dans `page.tsx`, `initiatives/page.tsx`, `galerie/page.tsx` : remplace-le par un `<Image src="/images/..." .../>` avec les mêmes dimensions/`className`.

### B. Depuis l'admin (reste modifiable sans redéploiement)

Les champs image de `/admin/contenu/[page]` uploadent vers Supabase Storage et prennent toujours le dessus sur la valeur en dur dans le code (repli automatique). Utile si tu veux pouvoir changer l'image plus tard sans toucher au code — sinon l'option A est plus rapide pour un média définitif.

---

## 10. Ce qui reste codé en dur (pas encore dans l'admin)

- Les activités/labels par défaut restent dans le code comme **valeur de repli** (ex. `DEFAULT_ACTIVITIES` dans `ProgramGrid.tsx`, `DEFAULT_CONCEPT_ITEMS`/`DEFAULT_IMPACT_ITEMS` dans `page.tsx`) — normal, c'est le filet de sécurité tant que l'admin n'a rien saisi. Une fois qu'une liste est alimentée depuis l'admin, elle remplace entièrement ces valeurs par défaut.
- La mise en page visuelle (tailles, couleurs, disposition en grille) de chaque chapitre reste dans le JSX de `page.tsx` et des composants — seul le **texte/image** est piloté par l'admin, pas la structure.
