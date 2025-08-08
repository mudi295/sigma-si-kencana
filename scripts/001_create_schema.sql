-- Run this in Supabase SQL editor.

-- profiles table mirrors auth.users with role info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text check (role in ('admin','member','konselor')) not null default 'member',
  counselor_id uuid references public.profiles(id),
  public_key text,
  created_at timestamp with time zone default now()
);

-- helper view to join email from auth.users
create or replace view public.profiles_with_email as
select p.id, p.name, u.email, p.role, p.counselor_id, p.public_key, p.created_at
from public.profiles p
left join auth.users u on u.id = p.id;

-- chat messages
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id text not null,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  nonce text not null,
  ciphertext text not null,
  sender_pub text,
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.chat_messages enable row level security;

-- RLS policies for profiles
drop policy if exists "select_own_or_admin" on public.profiles;
create policy "select_own_or_admin" on public.profiles
for select
using (
  auth.uid() = id
  or exists (select 1 from public.profiles ap where ap.id = auth.uid() and ap.role = 'admin')
);

drop policy if exists "update_self_basic" on public.profiles;
create policy "update_self_basic" on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "admin_update_all" on public.profiles;
create policy "admin_update_all" on public.profiles
for update
to authenticated
using (exists (select 1 from public.profiles ap where ap.id = auth.uid() and ap.role = 'admin'))
with check (true);

drop policy if exists "insert_self" on public.profiles;
create policy "insert_self" on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "admin_delete" on public.profiles;
create policy "admin_delete" on public.profiles
for delete
to authenticated
using (exists (select 1 from public.profiles ap where ap.id = auth.uid() and ap.role = 'admin'));

-- RLS policies for chat_messages (only participants can read/insert)
drop policy if exists "chat_select" on public.chat_messages;
create policy "chat_select" on public.chat_messages
for select
to authenticated
using (sender_id = auth.uid() or receiver_id = auth.uid());

drop policy if exists "chat_insert" on public.chat_messages;
create policy "chat_insert" on public.chat_messages
for insert
to authenticated
with check (sender_id = auth.uid());

-- Realtime
alter publication supabase_realtime add table public.chat_messages;

-- RPC to list counselors with current load
create or replace function public.list_counselors_with_load()
returns table (id uuid, name text, assigned integer)
language sql
security definer
as $$
  select c.id, coalesce(c.name, 'Konselor') as name,
    (select count(*) from public.profiles m where m.counselor_id = c.id) as assigned
  from public.profiles c
  where c.role = 'konselor'
  order by assigned asc, name asc;
$$;
