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

create table applicants (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  telephone text,
  activite text not null,
  message text not null,
  created_at timestamptz not null default now()
);

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

create table partnership_requests (
  id uuid primary key default gen_random_uuid(),
  organisation text not null,
  nom text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- RLS : activer sur toutes les tables
-- ─────────────────────────────────────────────────────────────────────────

alter table editions enable row level security;
alter table edition_photos enable row level security;
alter table partners enable row level security;
alter table stats enable row level security;
alter table page_content enable row level security;
alter table applicants enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table partnership_requests enable row level security;

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
create policy "public insert applicants" on applicants for insert with check (true);
create policy "admin read applicants" on applicants for select using (auth.role() = 'authenticated');
create policy "admin delete applicants" on applicants for delete using (auth.role() = 'authenticated');

create policy "public insert contact_messages" on contact_messages for insert with check (true);
create policy "admin read contact_messages" on contact_messages for select using (auth.role() = 'authenticated');
create policy "admin delete contact_messages" on contact_messages for delete using (auth.role() = 'authenticated');

create policy "public upsert newsletter_subscribers" on newsletter_subscribers for insert with check (true);
create policy "public update own newsletter_subscribers" on newsletter_subscribers for update using (true) with check (true);
create policy "admin read newsletter_subscribers" on newsletter_subscribers for select using (auth.role() = 'authenticated');

create policy "public insert partnership_requests" on partnership_requests for insert with check (true);
create policy "admin read partnership_requests" on partnership_requests for select using (auth.role() = 'authenticated');

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
