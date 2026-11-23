-- Fenou Higbé — contrôle après la migration du 23/11/2026.
-- Supabase → SQL Editor → coller → Run. Chaque ligne doit afficher « OK ».

select 'Table admins'                         as controle,
       case when to_regclass('public.admins') is not null then 'OK' else 'MANQUANT' end as resultat,
       (select count(*)::text from public.admins) || ' admin(s)' as detail
union all
select 'Comptes non admin',
       case when (select count(*) from auth.users u
                  where not exists (select 1 from public.admins a where a.user_id = u.id)) = 0
            then 'OK' else 'A VERIFIER' end,
       (select string_agg(email, ', ') from auth.users u
        where not exists (select 1 from public.admins a where a.user_id = u.id))
union all
select 'Fonction is_admin',
       case when to_regprocedure('public.is_admin()') is not null then 'OK' else 'MANQUANT' end, null
union all
select 'Fonction submit_contact',
       case when to_regprocedure('public.submit_contact(text,text,text,text)') is not null then 'OK' else 'MANQUANT' end, null
union all
select 'Fonction subscribe_newsletter',
       case when to_regprocedure('public.subscribe_newsletter(text,text)') is not null then 'OK' else 'MANQUANT' end, null
union all
select 'Ecriture publique fermee',
       case when count(*) = 0 then 'OK' else 'ENCORE OUVERTE' end,
       string_agg(tablename || ' / ' || policyname, ', ')
from pg_policies
where schemaname = 'public'
  and policyname in ('public insert contact_messages', 'public insert newsletter_subscribers',
                     'public insert rate_limits', 'public read rate_limits')
union all
select 'Policies admin -> is_admin()',
       case when count(*) filter (where coalesce(qual, with_check) not like '%is_admin%') = 0 then 'OK' else 'ANCIENNES' end,
       count(*)::text || ' policies'
from pg_policies
where (schemaname = 'public' and policyname like 'admin %')
   or (schemaname = 'storage' and policyname like 'admin %site-content')
union all
select 'Editions 2026',
       case when (select count(*) from public.editions) >= 8 then 'OK' else 'MANQUANTES' end,
       (select count(*)::text from public.editions) || ' edition(s)';
