alter table public.agents
  add column if not exists years_experience integer,
  add column if not exists sales_count integer;

alter table public.listings
  add column if not exists agent_id uuid;

create index if not exists listings_agent_id_idx on public.listings(agent_id);

alter table public.listings
  drop constraint if exists listings_agent_id_fkey;

alter table public.listings
  add constraint listings_agent_id_fkey
  foreign key (agent_id) references public.agents(id) on delete set null;
