import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Agent, BlogPost, Inquiry, Listing } from "@/lib/types";

export async function getFeaturedListings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (data ?? []) as Listing[];
}

export async function getPublishedListings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (data ?? []) as Listing[];
}

export async function getListingBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) notFound();
  return data as Listing;
}

export async function getAllAgents() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("agents")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  return (data ?? []) as Agent[];
}

export async function getPublishedPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) notFound();
  return data as BlogPost;
}

export async function getAdminDashboardData() {
  const supabase = await createClient();
  const [{ data: listings }, { data: agents }, { data: posts }, { data: inquiries }] =
    await Promise.all([
      supabase.from("listings").select("*").order("created_at", { ascending: false }),
      supabase.from("agents").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);

  return {
    listings: (listings ?? []) as Listing[],
    agents: (agents ?? []) as Agent[],
    posts: (posts ?? []) as BlogPost[],
    inquiries: (inquiries ?? []) as Inquiry[],
  };
}

export async function getAdminListing(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return data as Listing;
}

export async function getAdminAgent(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("agents").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return data as Agent;
}

export async function getAdminPost(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return data as BlogPost;
}
