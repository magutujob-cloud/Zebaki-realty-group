create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('magutujob@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  property_type text not null,
  purpose text not null,
  city text not null,
  area text not null,
  price numeric,
  bedrooms integer,
  bathrooms integer,
  size_label text,
  status text not null default 'Available',
  featured boolean not null default false,
  published boolean not null default true,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  description text,
  amenities text[] not null default '{}',
  title_status text,
  zoning text,
  road_access text,
  utilities text[] not null default '{}',
  map_query text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  city text,
  phone text,
  email text,
  image_url text,
  specialties text[] not null default '{}',
  bio text,
  sort_order integer default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  excerpt text,
  content text,
  cover_image_url text,
  author_name text default 'Zebaki Realty Group',
  read_time_minutes integer default 4,
  published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  interest text,
  city text,
  budget text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists listings_updated_at on public.listings;
create trigger listings_updated_at
before update on public.listings
for each row
execute function public.set_updated_at();

drop trigger if exists agents_updated_at on public.agents;
create trigger agents_updated_at
before update on public.agents
for each row
execute function public.set_updated_at();

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.listings enable row level security;
alter table public.agents enable row level security;
alter table public.blog_posts enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "admins can read admin_users" on public.admin_users;
create policy "admins can read admin_users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists "public can read published listings" on public.listings;
create policy "public can read published listings"
on public.listings
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "admins can manage listings" on public.listings;
create policy "admins can manage listings"
on public.listings
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read active agents" on public.agents;
create policy "public can read active agents"
on public.agents
for select
to anon, authenticated
using (active = true or public.is_admin());

drop policy if exists "admins can manage agents" on public.agents;
create policy "admins can manage agents"
on public.agents
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published posts" on public.blog_posts;
create policy "public can read published posts"
on public.blog_posts
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "admins can manage posts" on public.blog_posts;
create policy "admins can manage posts"
on public.blog_posts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "anyone can insert inquiries" on public.inquiries;
create policy "anyone can insert inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "admins can read inquiries" on public.inquiries;
create policy "admins can read inquiries"
on public.inquiries
for select
to authenticated
using (public.is_admin());

drop policy if exists "admins can update inquiries" on public.inquiries;
create policy "admins can update inquiries"
on public.inquiries
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('property-media', 'property-media', true)
on conflict (id) do nothing;

drop policy if exists "public can read property media" on storage.objects;
create policy "public can read property media"
on storage.objects
for select
to public
using (bucket_id = 'property-media');

drop policy if exists "admins can upload property media" on storage.objects;
create policy "admins can upload property media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'property-media' and public.is_admin());

drop policy if exists "admins can update property media" on storage.objects;
create policy "admins can update property media"
on storage.objects
for update
to authenticated
using (bucket_id = 'property-media' and public.is_admin())
with check (bucket_id = 'property-media' and public.is_admin());

drop policy if exists "admins can delete property media" on storage.objects;
create policy "admins can delete property media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'property-media' and public.is_admin());
