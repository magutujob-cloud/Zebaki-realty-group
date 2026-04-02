# Zebaki Realty Group — production starter

This is a deployable **Next.js App Router + Supabase** real-estate project for **Zebaki Realty Group**. It includes:

- public property website
- listings, property detail pages, city pages, services, agents, and blog
- contact inquiries stored in the backend
- **Supabase Auth** admin login
- protected admin dashboard for listings, agents, blog posts, and inquiries
- Supabase Storage integration for image uploads
- row-level security policies for public vs admin access

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Vercel-ready deployment

## 1) Create the Supabase project

Create a new Supabase project, then copy:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Add them to `.env.local`.

Start from `.env.example`:

```bash
cp .env.example .env.local
```

## 2) Apply database setup

In Supabase:
- open **SQL Editor**
- run `supabase/schema.sql`
- then run `supabase/seed.sql`

This creates:
- `admin_users`
- `listings`
- `agents`
- `blog_posts`
- `inquiries`
- `property-media` storage bucket
- RLS policies

The schema also seeds the admin allowlist with:

- `magutujob@gmail.com`

## 3) Create your admin auth user

In Supabase:
- go to **Authentication**
- create a user with the same email: `magutujob@gmail.com`
- set a password

That email is already allowlisted in `admin_users`, so once the auth user exists, it can sign in at:

- `/admin/login`

## 4) Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## 5) Deploy to Vercel

Push the project to GitHub, then import it into Vercel.

Add the same environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` = your production URL

Then deploy.

## Admin workflow

Use the admin dashboard to:
- add and edit listings
- add and edit agents
- add and edit blog posts
- review and update inquiry status

## Current behavior notes

- public visitors can browse listings and submit inquiries without logging in
- admin content changes are protected by Supabase Auth + database policies
- image uploads use the `property-media` Supabase Storage bucket
- anonymous “saved listings” are still browser-local for public users; this can later be upgraded to account-based saved properties if needed

## Recommended next upgrades

- mortgage prequalification form linked to bank partners
- Google Maps Places / geocoding integration
- pagination for large inventory
- rich text editor for blog posts
- advanced SEO metadata and sitemap generation
- customer accounts for persistent saved listings
- WhatsApp click tracking and CRM integration

## Suggested production hosting

- frontend: Vercel
- backend: Supabase

That gives you the simplest reliable production path for this project.
