# Supabase Curriculum Schema

This schema is the database layer for math lesson content.

## Design

- `math_grades` mirrors the grade list in `src/data/syllabus.ts`
- `math_topics` mirrors each grade's topic list
- `math_concept_pages` stores the actual concept literature for one topic

## Recommended Fill Order

1. Insert grades
2. Insert topics
3. Insert concept pages

## Seed Files

- `seed-kindergarten-grade1.sql`
- `seed-grade2.sql`
- `seed-grade3.sql`
- `seed-grade4.sql`
- `seed-grade5.sql`
- `seed-grade6.sql`
- `seed-grade7.sql`
- `seed-grade8.sql`

## Publishing Flow

- Keep new concept pages in `draft`
- Move them to `review` when ready for QA
- Set them to `published` when they should be visible in the app
