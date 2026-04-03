create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customer_profiles enable row level security;

alter table public.inquiries
add column if not exists customer_id uuid references public.customer_profiles(id) on delete set null;

create or replace function public.handle_new_customer()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.customer_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = nullif(excluded.full_name, ''),
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists customer_profiles_updated_at on public.customer_profiles;
create trigger customer_profiles_updated_at
before update on public.customer_profiles
for each row
execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_customer();

insert into public.customer_profiles (id, email, full_name)
select
  id,
  email,
  nullif(raw_user_meta_data ->> 'full_name', '')
from auth.users
where email is not null
on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.customer_profiles.full_name),
      updated_at = now();

drop policy if exists "customers can read own profile" on public.customer_profiles;
create policy "customers can read own profile"
on public.customer_profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "customers can update own profile" on public.customer_profiles;
create policy "customers can update own profile"
on public.customer_profiles
for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists "anyone can insert inquiries" on public.inquiries;
create policy "anyone can insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (
  customer_id is null or customer_id = auth.uid() or public.is_admin()
);

drop policy if exists "customers can read own inquiries" on public.inquiries;
create policy "customers can read own inquiries"
on public.inquiries
for select
to authenticated
using (customer_id = auth.uid() or public.is_admin());
