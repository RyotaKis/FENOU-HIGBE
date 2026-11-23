-- Fenou Higbé — schéma Supabase (Postgres) et policies RLS.
-- Aucune colonne tarifaire n'existe dans ce schéma, volontairement
-- (cf. cahier des charges §8) : les tarifs restent hors base de données
-- publique, traités uniquement par email/téléphone.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- Contenu public (lecture publique, écriture admin uniquement)
-- ─────────────────────────────────────────────────────────────────────────

create table editions (
  id uuid primary key default gen_random_uuid(),
  ville text not null,
  date_debut date not null,
  date_fin date not null,
  statut text not null check (statut in ('a_venir', 'en_cours', 'terminee')),
  cover_image_url text,
  description text,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);

create table edition_photos (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid references editions(id) on delete cascade,
  url text not null,
  alt text,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);

create table partners (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  logo_url text not null,
  site_url text,
  ordre int not null default 0,
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

create table stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  valeur text not null,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);

create table page_content (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  section_key text not null,
  contenu jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page_slug, section_key)
);

-- ─────────────────────────────────────────────────────────────────────────
-- Formulaires publics (écriture publique insert-only, lecture admin uniquement)
-- ─────────────────────────────────────────────────────────────────────────

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Compteur de requêtes anonymes (rate-limit léger, sans dépendance externe).
-- `key` combine route + IP (ex. "contact:203.0.113.5") ; les lignes sont
-- jetables, aucune donnée personnelle identifiable au-delà de l'IP.
create table rate_limits (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  created_at timestamptz not null default now()
);
create index rate_limits_key_created_idx on rate_limits (key, created_at);

-- ─────────────────────────────────────────────────────────────────────────
-- RLS : activer sur toutes les tables
-- ─────────────────────────────────────────────────────────────────────────

alter table editions enable row level security;
alter table edition_photos enable row level security;
alter table partners enable row level security;
alter table stats enable row level security;
alter table page_content enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table rate_limits enable row level security;

-- Lecture publique du contenu du site
create policy "public read editions" on editions for select using (true);
create policy "public read edition_photos" on edition_photos for select using (true);
create policy "public read partners" on partners for select using (actif = true);
create policy "public read stats" on stats for select using (true);
create policy "public read page_content" on page_content for select using (true);

-- Écriture du contenu du site réservée aux utilisateurs authentifiés (admin)
create policy "admin write editions" on editions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write edition_photos" on edition_photos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write partners" on partners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write stats" on stats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write page_content" on page_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Formulaires publics : insertion anonyme autorisée, lecture réservée à l'admin
create policy "public insert contact_messages" on contact_messages for insert with check (true);
create policy "admin read contact_messages" on contact_messages for select using (auth.role() = 'authenticated');
create policy "admin delete contact_messages" on contact_messages for delete using (auth.role() = 'authenticated');

-- Insert-only : l'upsert applicatif utilise `ignoreDuplicates` (INSERT ...
-- ON CONFLICT DO NOTHING), qui ne nécessite pas de policy UPDATE — inutile
-- d'autoriser qui que ce soit à modifier une ligne existante.
create policy "public insert newsletter_subscribers" on newsletter_subscribers for insert with check (true);
create policy "admin read newsletter_subscribers" on newsletter_subscribers for select using (auth.role() = 'authenticated');

-- rate_limits : lecture/écriture anonymes nécessaires (vérifiées avant
-- chaque insertion publique dans les tables ci-dessus), aucune donnée
-- sensible au-delà d'une IP et d'un horodatage.
create policy "public insert rate_limits" on rate_limits for insert with check (true);
create policy "public read rate_limits" on rate_limits for select using (true);

-- ─────────────────────────────────────────────────────────────────────────
-- Storage : bucket public pour les images gérées depuis le panel admin
-- (hero, portraits, illustrations de section — cf. src/lib/pageContentSchema.ts)
-- ─────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('site-content', 'site-content', true)
on conflict (id) do nothing;

create policy "public read site-content" on storage.objects
  for select using (bucket_id = 'site-content');

create policy "admin write site-content" on storage.objects
  for insert with check (bucket_id = 'site-content' and auth.role() = 'authenticated');

create policy "admin update site-content" on storage.objects
  for update using (bucket_id = 'site-content' and auth.role() = 'authenticated');

create policy "admin delete site-content" on storage.objects
  for delete using (bucket_id = 'site-content' and auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────
-- Migration manuelle — à exécuter une fois sur le projet Supabase existant.
-- `applicants` et `partnership_requests` n'ont plus aucune route ni page
-- admin qui les utilisent (formulaires "Devenir exposant"/"Devenir
-- partenaire" remplacés par WhatsApp + le formulaire de contact). Non
-- exécuté automatiquement : vérifie qu'aucune donnée à conserver ne s'y
-- trouve avant de lancer ces DROP.
-- ─────────────────────────────────────────────────────────────────────────
-- drop table if exists applicants;
-- drop table if exists partnership_requests;

-- ─────────────────────────────────────────────────────────────────────────
-- IMPORTANT — après ce fichier, exécuter dans l'ordre :
--   1. supabase/migrations/2026-11-23_securite.sql (droits admin + formulaires)
--   2. supabase/seed-editions-2026.sql (calendrier du Tour 2026)
-- ─────────────────────────────────────────────────────────────────────────
