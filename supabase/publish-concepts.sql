-- Helper SQL to move concept pages from draft to published.
-- Run this in the Supabase SQL editor when you are ready to launch concepts.

-- Publish everything currently in draft.
update math_concept_pages
set status = 'published'
where status = 'draft';

-- If you want to publish only one topic, use this pattern instead:
-- update math_concept_pages
-- set status = 'published'
-- where topic_id = 'counting';

-- If you want to publish a whole grade, use:
-- update math_concept_pages
-- set status = 'published'
-- where topic_id in (
--   select id
--   from math_topics
--   where grade_id = 'kindergarten'
-- );
