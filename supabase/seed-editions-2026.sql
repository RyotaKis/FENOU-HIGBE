-- Fenou Higbé — calendrier du Tour 2026.
-- À exécuter une fois dans Supabase → SQL Editor, APRÈS la migration
-- sécurité. Rend les éditions modifiables depuis l'admin (Éditions du Tour)
-- et permet d'y rattacher des photos (Galerie photo).
-- Ne fait rien si des éditions existent déjà.

insert into public.editions (ville, date_debut, date_fin, statut, description, ordre)
select * from (values
  ('Cotonou', date '2026-02-05', date '2026-02-08', 'terminee', 'Festival de la Jeunesse et de la Musique (FEJEM 4).', 1),
  ('Porto-Novo', date '2026-04-02', date '2026-04-06', 'terminee', null, 2),
  ('Abomey', date '2026-05-07', date '2026-05-10', 'terminee', null, 3),
  ('Ouidah', date '2026-06-25', date '2026-06-28', 'terminee', null, 4),
  ('Parakou', date '2026-07-16', date '2026-07-19', 'terminee', null, 5),
  ('Bohicon', date '2026-08-13', date '2026-08-16', 'terminee', null, 6),
  ('Cotonou — Place de l''Amazone', date '2026-10-27', date '2026-11-01', 'terminee', 'Grand Fenou Higbé, 4ème édition — le rendez-vous phare de l''année.', 7),
  ('Cotonou — Palais des Congrès', date '2026-12-22', date '2026-12-25', 'a_venir', 'Le Marché de Noël, 3ème édition.', 8)
) as v (ville, date_debut, date_fin, statut, description, ordre)
where not exists (select 1 from public.editions);
