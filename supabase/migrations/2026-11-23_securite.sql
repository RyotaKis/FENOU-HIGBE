-- ═════════════════════════════════════════════════════════════════════════
-- Fenou Higbé — migration sécurité (23/11/2026)
-- À exécuter UNE FOIS dans Supabase → SQL Editor → New query → Run.
-- Le script peut être relancé sans risque (idempotent).
--
-- AVANT de lancer : Authentication → Users. Vérifie que la liste ne
-- contient QUE des comptes de l'équipe : tous les comptes présents
-- deviennent administrateurs (étape 1). Supprime d'abord les inconnus.
--
-- Ce que fait ce script :
--  1. Seuls les comptes listés dans la table `admins` peuvent modifier le
--     site ou lire les messages (avant : n'importe quel compte connecté).
--  2. Les adresses IP de la table `rate_limits` ne sont plus lisibles
--     publiquement.
--  3. Les formulaires (contact, newsletter) passent par des fonctions
--     contrôlées (validation + anti-spam) : plus d'écriture directe
--     possible dans les tables depuis l'extérieur du site.
-- ═════════════════════════════════════════════════════════════════════════

-- ── 1. Administrateurs ───────────────────────────────────────────────────

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
-- RLS activée sans aucune policy : la table est invisible depuis l'API.
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- Les comptes existants (créés par l'équipe) deviennent administrateurs.
-- Pour un nouvel admin plus tard :
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'adresse@exemple.com';
insert into public.admins (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- Contenu du site : écriture réservée aux administrateurs.
drop policy if exists "admin write editions" on public.editions;
create policy "admin write editions" on public.editions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write edition_photos" on public.edition_photos;
create policy "admin write edition_photos" on public.edition_photos
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write partners" on public.partners;
create policy "admin write partners" on public.partners
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write stats" on public.stats;
create policy "admin write stats" on public.stats
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write page_content" on public.page_content;
create policy "admin write page_content" on public.page_content
  for all using (public.is_admin()) with check (public.is_admin());

-- Messages et abonnés : lecture/suppression réservées aux administrateurs.
drop policy if exists "admin read contact_messages" on public.contact_messages;
create policy "admin read contact_messages" on public.contact_messages
  for select using (public.is_admin());

drop policy if exists "admin delete contact_messages" on public.contact_messages;
create policy "admin delete contact_messages" on public.contact_messages
  for delete using (public.is_admin());

drop policy if exists "admin read newsletter_subscribers" on public.newsletter_subscribers;
create policy "admin read newsletter_subscribers" on public.newsletter_subscribers
  for select using (public.is_admin());

-- Images (bucket site-content) : envoi/modification/suppression par les admins.
drop policy if exists "admin write site-content" on storage.objects;
create policy "admin write site-content" on storage.objects
  for insert with check (bucket_id = 'site-content' and public.is_admin());

drop policy if exists "admin update site-content" on storage.objects;
create policy "admin update site-content" on storage.objects
  for update using (bucket_id = 'site-content' and public.is_admin());

drop policy if exists "admin delete site-content" on storage.objects;
create policy "admin delete site-content" on storage.objects
  for delete using (bucket_id = 'site-content' and public.is_admin());

-- ── 2 & 3. Formulaires publics ───────────────────────────────────────────

-- Plus aucun accès direct depuis l'extérieur : seules les fonctions
-- ci-dessous (exécutées avec les droits du propriétaire) écrivent.
drop policy if exists "public insert contact_messages" on public.contact_messages;
drop policy if exists "public insert newsletter_subscribers" on public.newsletter_subscribers;
drop policy if exists "public insert rate_limits" on public.rate_limits;
drop policy if exists "public read rate_limits" on public.rate_limits;

-- Anti-spam : 5 envois / 10 min par adresse IP, et 60 / 10 min au total
-- (le plafond global protège même si un robot change d'IP à chaque fois).
create or replace function public.fh_rate_limit_ok(p_scope text, p_ip text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key text := p_scope || ':' || coalesce(nullif(left(p_ip, 64), ''), 'inconnue');
begin
  -- Ménage : on ne garde que 24 h d'historique.
  delete from public.rate_limits where created_at < now() - interval '1 day';

  if (select count(*) from public.rate_limits
      where key = v_key and created_at > now() - interval '10 minutes') >= 5 then
    return false;
  end if;

  if (select count(*) from public.rate_limits
      where key like p_scope || ':%' and created_at > now() - interval '10 minutes') >= 60 then
    return false;
  end if;

  insert into public.rate_limits (key) values (v_key);
  return true;
end;
$$;

revoke execute on function public.fh_rate_limit_ok(text, text) from public, anon, authenticated;

create or replace function public.submit_contact(
  p_nom text,
  p_email text,
  p_message text,
  p_ip text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_nom is null or length(trim(p_nom)) = 0 or length(p_nom) > 100
     or p_email is null or length(p_email) > 254
     or p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
     or p_message is null or length(trim(p_message)) = 0 or length(p_message) > 3000 then
    return 'invalid_fields';
  end if;

  if not public.fh_rate_limit_ok('contact', p_ip) then
    return 'rate_limited';
  end if;

  insert into public.contact_messages (nom, email, message)
  values (trim(p_nom), lower(trim(p_email)), trim(p_message));
  return 'ok';
end;
$$;

create or replace function public.subscribe_newsletter(
  p_email text,
  p_ip text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_email is null or length(p_email) > 254
     or p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    return 'invalid_email';
  end if;

  if not public.fh_rate_limit_ok('newsletter', p_ip) then
    return 'rate_limited';
  end if;

  insert into public.newsletter_subscribers (email)
  values (lower(trim(p_email)))
  on conflict (email) do nothing;
  return 'ok';
end;
$$;

grant execute on function public.submit_contact(text, text, text, text) to anon, authenticated;
grant execute on function public.subscribe_newsletter(text, text) to anon, authenticated;
