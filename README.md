# Fenou Higbé — site vitrine

Site vitrine multi-pages pour le Fenou Higbé (marché des jeunes
entrepreneurs béninois), avec panel d'administration. Stack : Next.js 16 (App
Router) + TypeScript + Tailwind CSS v4 + Supabase.

## Démarrage

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Copier `.env.local.example` vers `.env.local` et renseigner l'URL du
   projet et la clé `anon` (Project Settings → API).
3. Exécuter `supabase/schema.sql` dans l'éditeur SQL Supabase (tables +
   policies RLS).
4. Créer un utilisateur admin dans Supabase Auth (Authentication → Users →
   Add user) — c'est le compte de connexion au panel `/admin`.
5. Installer et lancer :

   ```bash
   npm install
   npm run dev
   ```

6. Panel d'administration : [http://localhost:3000/admin](http://localhost:3000/admin/login)

## Structure

- `src/app/(site)` — pages publiques (Accueil, Le concept, Tour 2026,
  Exposants, Partenaires, Galerie, Actualités, Contact).
- `src/app/admin` — panel d'administration protégé (auth Supabase).
- `src/app/api` — routes pour les formulaires publics (candidature, contact,
  newsletter, demande de dossier partenariat).
- `src/proxy.ts` — protection des routes `/admin/*` (Next.js 16 a renommé
  `middleware.js` en `proxy.js`).
- `supabase/schema.sql` — schéma de base de données et policies RLS.

## Sécurité — points non négociables

- **Aucun tarif** (stands, partenariat) ne doit être ajouté à une table
  publique, un composant, ou un PDF/visuel téléchargeable depuis le site.
  Ces informations restent réservées aux échanges commerciaux directs.
- Le bouton « Recevoir notre dossier de partenariat » enregistre une demande
  (`partnership_requests`) traitée manuellement par email — jamais de lien de
  téléchargement direct.
- Toute image uploadée dans Supabase Storage doit être nettoyée de ses
  métadonnées EXIF avant publication.

## Prochaines étapes (non couvertes par ce scaffold initial)

- Carte interactive SVG du Bénin sur `/tour-2026` (actuellement liste de
  fiches par édition).
- Upload d'images depuis l'admin vers Supabase Storage (actuellement les URL
  de logos/photos sont saisies manuellement).
- Édition du contenu texte des pages (`page_content`) depuis l'admin.
- Envoi automatique d'email pour les demandes de dossier partenariat (ex.
  Resend), aujourd'hui seulement enregistrées en base pour traitement manuel.
- Déploiement (Vercel recommandé) et configuration des variables
  d'environnement en production.
