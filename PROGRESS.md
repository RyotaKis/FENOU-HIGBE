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
