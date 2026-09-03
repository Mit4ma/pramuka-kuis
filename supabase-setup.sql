-- Jalankan sekali di Supabase SQL Editor.
-- Setelah membuat akun admin di Authentication > Users, masukkan UUID-nya
-- pada perintah INSERT paling bawah.
-- Aktifkan juga Authentication > Sign In > Anonymous Sign-Ins.

create table if not exists public.quiz_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references auth.users(id) on delete cascade,
  participant_name text not null check (char_length(btrim(participant_name)) between 1 and 80),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  current_question integer not null default 1 check (current_question between 1 and 50),
  score integer not null default 0 check (score between 0 and 500),
  total_questions integer not null default 50 check (total_questions = 50),
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.quiz_admins enable row level security;
alter table public.quiz_sessions enable row level security;

create or replace function public.is_quiz_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.quiz_admins where user_id = auth.uid()
  );
$$;

revoke all on table public.quiz_admins from anon, authenticated;
revoke all on function public.is_quiz_admin() from public;
grant execute on function public.is_quiz_admin() to anon, authenticated;

drop policy if exists "participants can create own quiz session" on public.quiz_sessions;
create policy "participants can create own quiz session"
on public.quiz_sessions for insert to authenticated
with check (participant_id = auth.uid());

drop policy if exists "participants can update own quiz session" on public.quiz_sessions;
create policy "participants can update own quiz session"
on public.quiz_sessions for update to authenticated
using (participant_id = auth.uid())
with check (participant_id = auth.uid());

drop policy if exists "admins can view quiz sessions" on public.quiz_sessions;
create policy "admins can view quiz sessions"
on public.quiz_sessions for select to authenticated
using (public.is_quiz_admin());

grant select, insert, update on public.quiz_sessions to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.quiz_sessions;
exception when duplicate_object then
  null;
end $$;

-- Ganti UUID berikut dengan UUID akun admin dari Authentication > Users.
-- insert into public.quiz_admins (user_id) values ('PASTE-ADMIN-USER-UUID') on conflict do nothing;
