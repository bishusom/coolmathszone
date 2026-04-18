-- Supabase schema for math curriculum content.
-- This keeps the app's syllabus structure in code while storing rich lesson content in Postgres.

create extension if not exists pgcrypto;

do $$
begin
  create type content_status as enum ('draft', 'review', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type difficulty_level as enum ('beginner', 'intermediate', 'advanced');
exception
  when duplicate_object then null;
end $$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Grade metadata mirrors src/data/syllabus.ts.
create table if not exists math_grades (
  id text primary key,
  title text not null,
  description text not null,
  age smallint not null check (age > 0),
  color text not null,
  icon text not null,
  sort_order integer not null,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists math_grades_sort_order_idx
  on math_grades (sort_order);

drop trigger if exists math_grades_updated_at on math_grades;
create trigger math_grades_updated_at
before update on math_grades
for each row execute function set_updated_at();

-- Topic metadata mirrors each grade's topic list.
create table if not exists math_topics (
  grade_id text not null references math_grades(id) on delete cascade,
  id text not null,
  title text not null,
  description text not null,
  emoji text not null,
  difficulty difficulty_level not null default 'beginner',
  category text not null,
  sort_order integer not null,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (grade_id, id),
  unique (grade_id, sort_order)
);

create index if not exists math_topics_grade_id_idx
  on math_topics (grade_id);

create index if not exists math_topics_id_idx
  on math_topics (id);

create index if not exists math_topics_category_idx
  on math_topics (category);

drop trigger if exists math_topics_updated_at on math_topics;
create trigger math_topics_updated_at
before update on math_topics
for each row execute function set_updated_at();

-- Main concept page for a topic.
-- Keep this flexible: one row per topic, with arrays for the repeatable sections.
create table if not exists math_concept_pages (
  grade_id text not null,
  topic_id text not null,
  learning_goal text not null,
  prerequisites text[] not null default '{}'::text[],
  core_explanation text not null,
  key_rules text[] not null default '{}'::text[],
  summary text not null,
  common_mistakes text[] not null default '{}'::text[],
  teaching_tips text[] not null default '{}'::text[],
  status content_status not null default 'draft',
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (grade_id, topic_id),
  foreign key (grade_id, topic_id) references math_topics(grade_id, id) on delete cascade
);

drop trigger if exists math_concept_pages_updated_at on math_concept_pages;
create trigger math_concept_pages_updated_at
before update on math_concept_pages
for each row execute function set_updated_at();

-- Row level security: public content is readable only when published.
alter table math_grades enable row level security;
alter table math_topics enable row level security;
alter table math_concept_pages enable row level security;

drop policy if exists "public can read published grades" on math_grades;
create policy "public can read published grades"
on math_grades for select
using (status = 'published');

drop policy if exists "public can read published topics" on math_topics;
create policy "public can read published topics"
on math_topics for select
using (status = 'published');

drop policy if exists "public can read published concept pages" on math_concept_pages;
create policy "public can read published concept pages"
on math_concept_pages for select
using (status = 'published');
