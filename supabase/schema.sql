create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(), full_name text not null check (char_length(full_name) between 3 and 100), normalized_name text not null unique,
  attendance text not null check (attendance in ('attending', 'not_attending')), guest_count integer not null default 0 check (guest_count between 0 and 20),
  note text check (char_length(note) <= 500), created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  constraint attendance_count_check check ((attendance = 'attending' and guest_count >= 1) or (attendance = 'not_attending' and guest_count = 0))
);
alter table public.rsvps enable row level security;
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger rsvps_set_updated_at before update on public.rsvps for each row execute function public.set_updated_at();
