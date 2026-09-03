# Suivi de progression — Fenou Higbé

Journal de bord du projet, tenu à jour au fil des sessions. Chaque entrée est datée et décrit ce qui a été fait, ce qui reste en attente, et les décisions prises.

## 2026-08-25 — Refonte immersive : plan et fondations

**Contexte.** Le site scaffoldé initial était visuellement plat. Décision de le refondre en site scrollytelling immersif (inspiration weloveyafestival.com, lafoireadjafi.com, vodundays.bj), à partir du contenu réel extrait de deux PDF client (`DOCUMENT_FENOU_HIGBe_2026.pdf`, `DOCUMENT_GRAND_FENOU_HIGBÉ_ÉDI4-Moov_A4.pdf`). Plan détaillé validé avec le client, sans aucune section prix.

**Fait :**
- `motion` installé (animations), bug de police corrigé (Geist), nouveaux tokens couleur ajoutés à `globals.css`.
- Primitives d'animation créées : `Reveal`, `StatCounter`, `Parallax` (toutes `prefers-reduced-motion`-aware).
- `MobileNav` créé (menu hamburger + drawer), Header/Footer mis à jour avec la nouvelle nav (7 liens).
- Routes `/le-concept` et `/actualites` supprimées, toutes les références nettoyées.
- Home réécrite en 10 chapitres scrollytelling (hero avec `HeroMedia` carrousel → vidéo plus tard, chiffres clés en second, histoire, concept, impact, programme Grand Fenou Higbé, teaser fondatrice, teaser Tour 2026, CTA finale).
- Nouvelle page `/initiatives` (Fenou Foods, Fenou Packaging, agripack.store, biographie de Sonita Tossou).
- `/tour-2026` refaite en timeline verticale animée (9 étapes 2026, Grand Fenou Higbé et Marché de Noël mis en avant).
- `/galerie` avec masonry + lightbox (navigation clavier).
- `/exposants`, `/partenaires`, `/contact` restylées ; formulaires et logique de soumission **inchangés**.
- Stratégie d'images : `PlaceholderImage` (dégradés de marque) partout où une vraie photo manque, avec commentaires `TODO(assets)` pour remplacement mécanique ultérieur.
- `npm run lint` et `npm run build` propres ; toutes les routes vérifiées en dev (200 sur les pages actives, 404 confirmé sur les routes supprimées).

**En attente :**
- Le client doit fournir un dossier d'images/logos réels — remplacement des `PlaceholderImage` à faire dès réception.
- QA visuelle complète non encore effectuée dans un vrai navigateur (scroll, nav mobile, `prefers-reduced-motion` émulé, soumission des 4 formulaires).
- Contenu du Tour 2026 encore en fallback codé en dur (`TODO(content)` dans `tour-2026/page.tsx`) — à saisir dans l'admin Supabase pour devenir la source de vérité.

**Non commité à ce stade** (voir entrée suivante pour le premier commit).

## 2026-09-01 — Ajout de skills Claude Code au projet

**Contexte.** Le client a fourni une liste de repos GitHub contenant des skills Claude Code pertinents pour le travail de design/frontend en cours, plus des skills de workflow (obra/superpowers) et le catalogue officiel (anthropics/skills).

**Fait :**
- 55 skills installés dans `.claude/skills/` (23 Mo), provenant de 6 repos :
  - `nextlevelbuilder/ui-ux-pro-max-skill` — 7 skills (banner-design, brand, design, design-system, slides, ui-styling, ui-ux-pro-max)
  - `Leonxlnx/taste-skill` — 13 skills (brandkit, brutalist-skill, gpt-tasteskill, image-to-code-skill, imagegen-frontend-mobile, imagegen-frontend-web, minimalist-skill, output-skill, redesign-skill, soft-skill, stitch-skill, taste-skill, taste-skill-v1)
  - `Dammyjay93/interface-design` — 1 skill
  - `vercel-labs/agent-skills` — 1 skill (web-design-guidelines uniquement, sur demande explicite)
  - `obra/superpowers` — 14 skills de workflow dev (brainstorming, systematic-debugging, test-driven-development, etc.), installés en totalité sur choix du client
  - `anthropics/skills` — 19 skills officiels, installés en totalité sur choix du client
- `wilwaldon/Claude-Code-Frontend-Design-Toolkit` exclu : c'est un README catalogue, aucun skill à copier.
- Ce document de progression créé.

**Décisions/notes :**
- Plusieurs skills de design se chevauchent en intention (`design`, `ui-ux-pro-max`, `taste-skill`, `interface-design`, `web-design-guidelines`, `redesign-skill`) — à surveiller si cela crée de la confusion dans l'activation automatique des skills ; à élaguer si besoin.
- `using-superpowers` (skill de `obra/superpowers`) force l'invocation systématique de skills avant toute réponse — comportement à observer, potentiellement à désactiver si trop intrusif pour ce projet.

## 2026-09-01 — Refonte visuelle totale (skill `redesign-skill`)

**Contexte.** Demande client : rendu visuel épatant, vivant, qui raconte une histoire et attire. Audit mené via le skill `redesign-skill` fraîchement installé (fonts génériques, aplats de couleur plats, layouts en 3 colonnes égales trop symétriques, absence d'états hover/press, absence de 404 personnalisée).

**Fait :**
- Police d'affichage `Fraunces` (serif éditoriale, variable) ajoutée en plus de Geist — appliquée à tous les titres/citations (`h1`, `h2`, `h3`, `blockquote`) via `--font-display`. Eyebrows passés en italique serif plutôt qu'en petites majuscules générique.
- Fond réchauffé (`#fffdf8` au lieu de blanc pur), tons `ink`/`cream` ajustés ; grain SVG discret (`.grain`) appliqué aux sections sombres/footer/404 pour casser la platitude des aplats ; dégradés radiaux ambiants ajoutés à chaque `ChapterSection` (teinte différente par tonalité).
- `scroll-behavior: smooth` global, `tabular-nums` pour les chiffres, `text-wrap: balance/pretty`.
- Nouveau composant `CtaLink` (hover translate + ombre teintée `shadow-warm`, press `scale-98`) — remplace tous les boutons `<Link>` ad hoc du site.
- `ProgramGrid` (programme du Grand Fenou Higbé) transformé en bento asymétrique (Marché Fenou en tuile large) au lieu d'une grille 3 colonnes uniforme.
- Home : sections "Pourquoi ce projet" et "Choix fort" passées en layout zig-zag texte/image (`PlaceholderImage`) ; liste "Qu'est-ce que le Fenou Higbé" en rangées numérotées (01–06) ; "Ce que ça change" en masonry avec coche verte + citation mise en avant ; bloc chiffres clés avec la stat principale en grande tuile.
- Header : wordmark en `font-display`, soulignement animé au survol des liens nav. Footer : grain + structure resserrée.
- Nouvelle page 404 personnalisée et brandée (`src/app/(site)/not-found.tsx`), lien "aller au contenu" (skip-link) ajouté en tête de page pour l'accessibilité clavier.
- Cartes uniformisées site-wide (`exposants`, `initiatives`, `partenaires`, `contact`) : `rounded-2xl` + `shadow-warm-sm` + lift au survol, au lieu de bordures plates génériques.
- `.claude/**` exclu du lint du projet (les scripts des skills tiers ne suivent pas les règles ESLint du site).
- `npm run lint` et `npm run build` propres ; toutes les routes vérifiées en dev (200 sur les pages, 404 confirmé sur une route inexistante).

**En attente :** toujours le dossier d'images/logos réels du client (remplacement des `PlaceholderImage`), et une QA visuelle humaine dans un vrai navigateur.

**Non commité à ce stade.**

## 2026-09-01 (suite) — Alignement sur les maquettes Figma Make du client

**Contexte.** Le client a partagé deux prototypes qu'il a réalisés sur Figma Make (`final-dragon-52706909.figma.site`, `shell-logo-28568361.figma.site`). Captures d'écran obtenues via Playwright (installé localement, headless Chromium) puisque ces sites sont rendus côté client et invisibles à un simple fetch HTML. Direction beaucoup plus aboutie que notre premier jet : sérif éditoriale à fort contraste, palette resserrée noir/blanc/or (au lieu du trio jaune/vert/orange), citations sur bandeau or plein ("Manifeste"), listes en colonnes numérotées avec séparateurs fins plutôt que des cartes encadrées, logo monogramme carré ("FH"/"FII"), boutons à coins nets (pas arrondis).

**Fait :**
- Police d'affichage remplacée : `Fraunces` → `Playfair Display` (plus proche du sérif à fort contraste des maquettes).
- Palette resserrée : `--color-brand-yellow` ajusté vers un or plus riche (#f0b429), `--color-ink` vers un noir plus neutre (#0c0c0b) ; vert/orange conservés uniquement comme accents secondaires (statuts, liens).
- Nouveau tone `gold` sur `ChapterSection` pour les bandeaux plein-or (citations, CTA finale).
- `CtaLink` : coins nets au lieu de `rounded-full`, nouvelles variantes (`outline-dark`, `solid-dark`), libellés en petites capitales espacées.
- `Header` : logo monogramme carré + wordmark serif + sous-titre "TOUR 2026" ; `Countdown` restylé (gros chiffres or tabulaires + labels petites capitales).
- `Footer` : repensé en 3 colonnes (logo/nav/réseaux + newsletter), crédit "Promotrice : Sonita Tossou".
- Home : ajout d'un chapitre "Manifeste" (citation plein écran sur fond sombre), chiffres clés en colonnes bordées avec séparateurs, badge de statut sur le hero, citation supplémentaire sur bandeau or avant la section impact, `ProgramGrid` enrichi d'icônes SVG + légende date/lieu, `TourTeaser` reconstruit en colonnes numérotées avec mise en avant de l'étape en cours, CTA finale sur bandeau or plein avec bouton noir style "WhatsApp".
- Coins arrondis retirés site-wide (`exposants`, `partenaires`, `contact`, `initiatives`, `galerie`, `tour-2026`) pour un rendu net et éditorial, cohérent avec les références — seuls les badges de statut et éléments circulaires (logo, points) gardent des coins ronds.
- `npm run lint` et `npm run build` propres. Vérification visuelle par capture d'écran Playwright de notre propre site en dev, comparée directement aux deux références.

**En attente :** dossier d'images/logos réels, QA humaine dans un vrai navigateur, et un passage de restylage similaire sur `/tour-2026` (liste), `/galerie`, `/initiatives`, `/exposants`, `/partenaires`, `/contact` pour pousser plus loin l'alignement avec les références (au-delà du retrait des coins arrondis déjà fait).

**Non commité à ce stade.**

## 2026-09-01 (suite 2) — Interactions "grands sites 3D"

**Contexte.** Demande client : animation et interaction façon grands sites 3D en plus de l'alignement visuel sur les maquettes Figma Make.

**Fait :**
- `src/components/motion/TiltCard.tsx` — bascule 3D des cartes au survol (rotateX/rotateY pilotés par la position du curseur, ressort `useSpring`), halo radial doré qui suit le curseur. Appliqué aux cartes du programme (`ProgramGrid`), aux cartes d'initiatives (Fenou Foods/Packaging/agripack.store) et aux cartes de bénéfices exposants.
- `CtaLink` converti en composant client avec effet **magnétique** : le bouton suit légèrement le curseur dans son rayon de survol (ressort `useSpring`), like les CTA des sites primés Awwwards.
- `src/components/motion/CursorFx.tsx` — curseur personnalisé (point blanc, `mix-blend-mode: difference`) qui grossit au survol des liens/boutons ; actif uniquement sur pointeur fin (`pointer: fine`, donc pas sur mobile/tactile) et désactivé en `prefers-reduced-motion`. Monté globalement dans `src/app/layout.tsx`.
- Toutes ces interactions respectent `prefers-reduced-motion` (bascule vers un rendu statique/sans curseur personnalisé) — vérifié via le hook `useReducedMotion` de `motion` dans chaque composant.
- `npm run lint` et `npm run build` propres. Vérification visuelle via captures Playwright : curseur confirmé fonctionnel (effet `mix-blend-difference` visible sur le lien de nav survolé), halo/bordure dorée confirmés sur la carte survolée du programme.

**En attente :** même liste que précédemment (assets réels, QA humaine, restylage approfondi des pages secondaires). Rien n'est commité.

## 2026-09-02 (suite) — Panel admin : gestion de contenu (texte + images) par page

**Contexte.** Demande client : pouvoir modifier le texte et les images de chaque page du site depuis le panel admin, sans toucher au code — formulaires par section (texte et images ensemble, priorité confirmée par le client).

**Fait :**
- `supabase/schema.sql` — ajout d'un bucket Storage public `site-content` (upload d'images) avec policies (lecture publique, écriture réservée aux admins authentifiés). **⚠️ Le client doit exécuter ce nouveau bloc SQL dans l'éditeur SQL de son projet Supabase** (la table `page_content` existait déjà dans le schéma initial et fonctionne sans action supplémentaire ; seul le bucket Storage est nouveau et doit être créé manuellement, aucune clé service-role n'étant disponible pour l'exécuter automatiquement).
- `src/lib/pageContentSchema.ts` — schéma déclaratif des sections éditables pour 7 pages (Accueil, Initiatives, Exposants, Partenaires, Contact, Galerie, Tour 2026), chacune avec ses champs typés (texte / texte long / image).
- `src/lib/pageContent.ts` — lecture du contenu (`getPageContent`, `pick` avec repli sur le texte par défaut du code), même pattern de dégradation gracieuse que le reste du site.
- `src/app/admin/actions.ts` — `saveSectionContent` : upsert dans `page_content`, upload d'image vers Supabase Storage si un fichier est fourni (conserve l'URL existante sinon).
- Panel admin : nouvelle section **« Contenu des pages »** (`/admin/contenu`, liste des pages → `/admin/contenu/[slug]`, un formulaire par section avec aperçu de l'image actuelle).
- Toutes les pages publiques concernées reconnectées pour lire ce contenu en priorité, avec repli automatique sur le texte/les visuels par défaut si rien n'est encore saisi : hero, manifeste, "pourquoi ce projet", "choix fort", citation impact, bloc impact (+témoignage), programme, teaser fondatrice (+portrait), teaser tour, CTA finale (Accueil) ; intro + bio fondatrice (+portrait) (Initiatives) ; intro + note candidature (Exposants) ; intro + bloc dossier (Partenaires) ; intro + coordonnées (Contact) ; intro (Galerie, Tour 2026).
- `npm run lint` et `npm run build` propres. Vérifié en dev : home et `/admin/contenu` répondent, redirection login normale sur les routes admin non authentifiées.

**En attente :** le client doit exécuter le nouveau bloc SQL Storage dans Supabase avant de pouvoir uploader des images depuis l'admin. Assets réels toujours à fournir.

## 2026-09-02 (suite 2) — Extension du CMS aux listes structurées

**Contexte.** Suite de la demande précédente : rendre éditables les listes qui étaient restées codées en dur (programme, jalons bio, filiales, etc.).

**Fait :**
- `src/lib/pageContentSchema.ts` — `SectionDef` devient une union discriminée `kind: "single" | "list"` ; ajout de 6 sections de type liste : `concept_items` et `impact_items` et `programme_items` (Accueil), `ventures` et `milestones` (Initiatives), `benefits` (Exposants), `support_needs` (Partenaires). Chaque section liste déclare `itemFields` (la forme d'un élément) et `itemLabel`.
- `src/lib/pageContent.ts` — nouveau helper `pickList(content, sectionKey, fallback)` : lit `contenu.items`, retourne le tableau par défaut du code tant que la liste admin est vide.
- `src/app/admin/actions.ts` — `addListItem` / `deleteListItem` (upsert/retrait dans `contenu.items` du `page_content`), même pattern « formulaire d'ajout + liste avec bouton Supprimer » que les éditions/partenaires déjà existants dans l'admin.
- `/admin/contenu/[slug]` — les sections de type liste s'affichent différemment des sections simples : éléments existants (avec suppression) + formulaire d'ajout d'un nouvel élément.
- `ProgramGrid` accepte maintenant une prop `activities` (repli sur `DEFAULT_ACTIVITIES`) ; la mise en page bento (grande tuile / spans) est recalculée par position plutôt que stockée par élément, pour que des activités ajoutées depuis l'admin s'insèrent proprement dans la grille.
- Home, Initiatives, Exposants, Partenaires reconnectés : chaque liste lit `pickList(...)` avec repli sur son tableau par défaut existant.
- `npm run lint` et `npm run build` propres. Vérifié en dev : `/`, `/initiatives`, `/exposants`, `/partenaires` répondent tous 200.

**En attente :** le bloc SQL Storage à exécuter côté client, assets réels à fournir. Rien n'est commité.

## 2026-09-02 (suite 3) — Confirmation SQL Storage + upload en masse pour la galerie

**Contexte.** Le client confirme avoir exécuté le bloc SQL Storage — vérifié via sondes REST directes (bucket `site-content` accessible, policy RLS bloque bien un upload anonyme, `page_content` répond) : tout est en place côté Supabase.

Le client a ensuite signalé un crash `Jest worker encountered N child process exceptions` sur `/admin/contenu/exposants` — cache `.next` corrompu par le hot-reload répété, purgé et serveur redémarré proprement ; en attente de confirmation que ça règle le souci (sinon récupérer la vraie trace dans le terminal `npm run dev`, pas seulement l'overlay navigateur).

Le client a ensuite demandé comment ajouter les images, notamment ~5 Go de photos brutes pour la galerie. Point clé communiqué : **jamais dans le workspace/repo Git** (le site sert les images depuis Supabase Storage, pas depuis le code). Aucune interface d'upload en masse n'existait pour la galerie (seul `edition_photos` existait en base, sans écran admin) — construite dans cette session avec compression automatique côté navigateur (choix confirmé par le client).

**Fait :**
- `src/lib/compressImage.ts` — redimensionne (max 2000px) et recompresse en JPEG (qualité 0.8) côté navigateur via Canvas, avant tout envoi.
- `src/components/admin/GalleryUploader.tsx` — sélection d'une édition + plusieurs fichiers, upload direct navigateur → Supabase Storage (bucket `site-content`, chemin `galerie/<edition_id>/...`) puis insertion dans `edition_photos`, avec statut par fichier (compression/envoi/ok/erreur) ; upload direct depuis le client plutôt que via Server Action pour éviter la limite de taille de payload des Server Actions Next.js.
- `src/app/admin/(dashboard)/galerie/page.tsx` — nouvelle page admin : uploader + grille des photos existantes (ville d'édition, suppression au survol).
- `deleteEditionPhoto` ajouté à `src/app/admin/actions.ts`.
- Lien « Galerie » ajouté à la nav admin.
- `npm run lint` et `npm run build` propres.

**En attente :** confirmation que le crash Turbopack ne revient pas (sinon fournir la trace terminal complète). Assets réels toujours à fournir — le client peut maintenant les uploader lui-même via `/admin/galerie` une fois ses photos triées/exportées hors du repo.

## 2026-09-02 (suite 4) — Intégration des vrais logos Fenou Higbé

**Contexte.** Le client a déposé 2 logos officiels dans `assets img & video/` (hors suivi Git, dossier de travail local) : le logo principal "Fenou HIGBÉ" (texte blanc + bandeau dégradé orange/or "LE MARCHÉ DES JEUNES ENTREPRENEURS BÉNINOIS") et un logo secondaire "Fenou XWÉ" (texte bordeaux + bandeau vert "LA GRANDE FÊTE DU MARCHÉ FENOU", pour la soirée de clôture du Grand Fenou Higbé). Le logo principal n'existait qu'en version blanche (pour fonds sombres) — une variante foncée a été générée par recoloration programmatique (le blanc pur devient l'encre de marque `#0c0c0b`, le bandeau dégradé reste inchangé) pour les contextes à fond clair.

**Fait :**
- 4 fichiers générés dans `public/logo/` : `fenou-higbe-white.png` / `fenou-higbe-dark.png` (logo principal, recadré, deux variantes de contraste) et `fenou-xwe-dark.png` / `fenou-xwe-white.png` (logo Fenou Xwé, idem).
- Remplace le monogramme texte "FH" + wordmark improvisé par le vrai logo dans : `Header` (variante foncée), `Footer` (variante blanche), sidebar admin (`(dashboard)/layout.tsx`, variante foncée), page de connexion admin (variante foncée), page 404 (`not-found.tsx`, variante blanche).
- `ProgramGrid` : la carte "Fenou Xwé" affiche désormais le vrai logo secondaire (variante blanche) à la place du titre texte + icône générique — matching exact sur `activity.title === "Fenou Xwé"`, se dégrade proprement vers le rendu texte générique si ce titre est modifié depuis l'admin.
- `npm run lint` et `npm run build` propres. Vérifié visuellement par capture d'écran (header, footer, login) : logos nets et bien contrastés sur chaque fond.

**Non commité à ce stade** (le dossier source `assets img & video/` reste local, hors suivi Git — seuls les PNG traités dans `public/logo/` sont versionnés).

## 2026-09-04 — Photo réelle en fond du hero

**Contexte.** Le client a déposé `HERO.jpg` dans `assets img & video/` — une photo nocturne de la statue de l'Amazone à Cotonou, foule en t-shirts jaunes Fenou Higbé, avec un filigrane logo intégré en bas à gauche. Demande : l'utiliser en fond du hero de la home.

**Fait :**
- Filigrane recadré (retrait des ~20% inférieurs de l'image, qui ne contenaient que le logo + du sol), redimensionnée (2200px de large) et compressée (JPEG qualité 78, ~560 Ko) → `public/images/hero.jpg`.
- `HeroMedia.tsx` simplifié : l'ancien carrousel de `PlaceholderImage` (3 slides fictifs) est remplacé par cette photo réelle comme fond par défaut. Le mécanisme `overrideImage` (piloté depuis `/admin/contenu/home` → Hero → Image) reste prioritaire, donc l'admin peut toujours le remplacer sans toucher au code.
- Dégradé renforcé (`from-black/55 via-black/35 to-black/85` + un voile latéral gauche supplémentaire) pour garder le texte du hero lisible sur cette photo dense et colorée.

**⚠️ Point important découvert en vérifiant** : le champ Image de la section Hero (`/admin/contenu/home`) contient déjà une image (probablement un test fait par le client en explorant l'admin) — une image carrée floue, différente de `HERO.jpg`. Comme prévu par la conception du CMS (le contenu admin est toujours prioritaire sur la valeur par défaut du code), **c'est cette image de test qui s'affichera tant qu'elle n'est pas effacée ou remplacée** depuis `/admin/contenu/home` → section Hero → champ "Image de fond". Pas un bug — juste une conséquence attendue de la priorité admin > code. Le client doit soit vider ce champ (upload vide), soit re-uploader une image depuis l'admin s'il veut changer la photo plus tard.

**Fait (suite) :** `npm run lint` et `npm run build` propres. Diagnostic mené en inspectant les éléments `&lt;img&gt;` réellement rendus côté navigateur (Playwright) pour confirmer l'origine du contenu affiché.

## 2026-09-02 — Retrait du curseur personnalisé, animations premium hero→footer

**Contexte.** Le client a jugé le curseur personnalisé (point qui grossit au survol) bizarre — retiré. Demande d'animations premium sur l'ensemble du site, du hero au footer, pas seulement sur les cartes.

**Fait :**
- `CursorFx.tsx` supprimé, son montage retiré de `src/app/layout.tsx`.
- `src/components/home/HeroIntro.tsx` — entrée en cascade du hero (eyebrow → titre → sous-titre → CTA → badge de statut) au chargement de la page, via variants `motion` avec `staggerChildren` ; distinct de `Reveal` (qui se déclenche au scroll) puisque le hero est visible dès l'arrivée sur la page.
- `src/components/motion/FadeIn.tsx` — nouvelle primitive pour une animation d'entrée immédiate (non liée au scroll), utilisée sur le `Header` (fondu depuis le haut) et la page 404.
- `src/components/PageTransition.tsx` — transition de fondu/glissement entre les changements de page (`AnimatePresence` + `usePathname`), montée dans `src/app/(site)/layout.tsx` autour de `{children}` : chaque navigation interne du site a désormais une transition douce.
- `Footer` enveloppé dans `Reveal` pour une entrée au scroll cohérente avec le reste du site.
- Toutes les nouvelles animations respectent `prefers-reduced-motion` (rendu immédiat sans animation).
- `npm run lint` et `npm run build` propres. Vérifié en dev : `cursor: auto` confirmé (curseur système par défaut restauré), rendu du hero et du footer/CTA finale conformes.

**En attente :** assets réels du client, QA humaine complète dans un vrai navigateur (notamment ressentir les transitions de page et le hero en conditions réelles), et le restylage approfondi des pages secondaires resté en suspens. Rien n'est commité.
