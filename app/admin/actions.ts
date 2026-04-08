"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { parseArray, slugify } from "@/lib/utils";

const listingSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  agent_id: z.string().uuid().optional().nullable().or(z.literal("")),
  title: z.string().min(3),
  slug: z.string().optional().nullable(),
  property_type: z.string().min(1),
  purpose: z.string().min(1),
  city: z.string().min(1),
  area: z.string().min(1),
  price: z.coerce.number().nullable().optional(),
  bedrooms: z.coerce.number().nullable().optional(),
  bathrooms: z.coerce.number().nullable().optional(),
  size_label: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  cover_image_url: z.string().optional().nullable(),
  description: z.string().min(5),
  title_status: z.string().optional().nullable(),
  zoning: z.string().optional().nullable(),
  road_access: z.string().optional().nullable(),
  map_query: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

const agentSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  full_name: z.string().min(2),
  role: z.string().min(2),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().or(z.literal("")),
  image_url: z.string().optional().nullable(),
  bio: z.string().min(5),
  years_experience: z.coerce.number().nullable().optional(),
  sales_count: z.coerce.number().nullable().optional(),
  sort_order: z.coerce.number().nullable().optional(),
  active: z.boolean().optional(),
});

const postSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3),
  slug: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  excerpt: z.string().min(5),
  content: z.string().min(20),
  cover_image_url: z.string().optional().nullable(),
  read_time_minutes: z.coerce.number().nullable().optional(),
  published: z.boolean().optional(),
});

function truthy(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function invalidate() {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/properties", "layout");
  revalidatePath("/agents");
  revalidatePath("/agents", "layout");
  revalidatePath("/blog");
  revalidatePath("/contact");
  revalidatePath("/admin");
}

export async function createListingAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const parsed = listingSchema.parse({
    agent_id: formData.get("agent_id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    property_type: formData.get("property_type"),
    purpose: formData.get("purpose"),
    city: formData.get("city"),
    area: formData.get("area"),
    price: formData.get("price") || null,
    bedrooms: formData.get("bedrooms") || null,
    bathrooms: formData.get("bathrooms") || null,
    size_label: formData.get("size_label"),
    status: formData.get("status"),
    cover_image_url: formData.get("cover_image_url"),
    description: formData.get("description"),
    title_status: formData.get("title_status"),
    zoning: formData.get("zoning"),
    road_access: formData.get("road_access"),
    map_query: formData.get("map_query"),
    featured: truthy(formData, "featured"),
    published: truthy(formData, "published"),
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);

  await supabase.from("listings").insert({
    agent_id: parsed.agent_id || null,
    title: parsed.title,
    slug,
    property_type: parsed.property_type,
    purpose: parsed.purpose,
    city: parsed.city,
    area: parsed.area,
    price: parsed.price || null,
    bedrooms: parsed.bedrooms || null,
    bathrooms: parsed.bathrooms || null,
    size_label: parsed.size_label || null,
    status: parsed.status || "Available",
    cover_image_url: parsed.cover_image_url || null,
    gallery_urls: parseArray(formData.get("gallery_urls")),
    description: parsed.description,
    amenities: parseArray(formData.get("amenities")),
    title_status: parsed.title_status || null,
    zoning: parsed.zoning || null,
    road_access: parsed.road_access || null,
    utilities: parseArray(formData.get("utilities")),
    map_query: parsed.map_query || `${parsed.area} ${parsed.city} Kenya`,
    featured: parsed.featured || false,
    published: parsed.published ?? true,
  });

  invalidate();
  redirect("/admin");
}

export async function updateListingAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const parsed = listingSchema.parse({
    id: formData.get("id"),
    agent_id: formData.get("agent_id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    property_type: formData.get("property_type"),
    purpose: formData.get("purpose"),
    city: formData.get("city"),
    area: formData.get("area"),
    price: formData.get("price") || null,
    bedrooms: formData.get("bedrooms") || null,
    bathrooms: formData.get("bathrooms") || null,
    size_label: formData.get("size_label"),
    status: formData.get("status"),
    cover_image_url: formData.get("cover_image_url"),
    description: formData.get("description"),
    title_status: formData.get("title_status"),
    zoning: formData.get("zoning"),
    road_access: formData.get("road_access"),
    map_query: formData.get("map_query"),
    featured: truthy(formData, "featured"),
    published: truthy(formData, "published"),
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);

  await supabase.from("listings").update({
    agent_id: parsed.agent_id || null,
    title: parsed.title,
    slug,
    property_type: parsed.property_type,
    purpose: parsed.purpose,
    city: parsed.city,
    area: parsed.area,
    price: parsed.price || null,
    bedrooms: parsed.bedrooms || null,
    bathrooms: parsed.bathrooms || null,
    size_label: parsed.size_label || null,
    status: parsed.status || "Available",
    cover_image_url: parsed.cover_image_url || null,
    gallery_urls: parseArray(formData.get("gallery_urls")),
    description: parsed.description,
    amenities: parseArray(formData.get("amenities")),
    title_status: parsed.title_status || null,
    zoning: parsed.zoning || null,
    road_access: parsed.road_access || null,
    utilities: parseArray(formData.get("utilities")),
    map_query: parsed.map_query || `${parsed.area} ${parsed.city} Kenya`,
    featured: parsed.featured || false,
    published: parsed.published ?? true,
  }).eq("id", parsed.id!);

  invalidate();
  redirect("/admin");
}

export async function deleteListingAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  await supabase.from("listings").delete().eq("id", id);
  invalidate();
  redirect("/admin");
}

export async function createAgentAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = agentSchema.parse({
    full_name: formData.get("full_name"),
    role: formData.get("role"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    image_url: formData.get("image_url"),
    bio: formData.get("bio"),
    years_experience: formData.get("years_experience") || null,
    sales_count: formData.get("sales_count") || null,
    sort_order: formData.get("sort_order") || null,
    active: truthy(formData, "active"),
  });

  await supabase.from("agents").insert({
    full_name: parsed.full_name,
    role: parsed.role,
    city: parsed.city || null,
    phone: parsed.phone || null,
    email: parsed.email || null,
    image_url: parsed.image_url || null,
    specialties: parseArray(formData.get("specialties")),
    bio: parsed.bio,
    years_experience: parsed.years_experience || null,
    sales_count: parsed.sales_count || null,
    sort_order: parsed.sort_order || null,
    active: parsed.active ?? true,
  });

  invalidate();
  redirect("/admin");
}

export async function updateAgentAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = agentSchema.parse({
    id: formData.get("id"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    image_url: formData.get("image_url"),
    bio: formData.get("bio"),
    years_experience: formData.get("years_experience") || null,
    sales_count: formData.get("sales_count") || null,
    sort_order: formData.get("sort_order") || null,
    active: truthy(formData, "active"),
  });

  await supabase.from("agents").update({
    full_name: parsed.full_name,
    role: parsed.role,
    city: parsed.city || null,
    phone: parsed.phone || null,
    email: parsed.email || null,
    image_url: parsed.image_url || null,
    specialties: parseArray(formData.get("specialties")),
    bio: parsed.bio,
    years_experience: parsed.years_experience || null,
    sales_count: parsed.sales_count || null,
    sort_order: parsed.sort_order || null,
    active: parsed.active ?? true,
  }).eq("id", parsed.id!);

  invalidate();
  redirect("/admin");
}

export async function deleteAgentAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  await supabase.from("agents").delete().eq("id", id);
  invalidate();
  redirect("/admin");
}

export async function createBlogPostAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url"),
    read_time_minutes: formData.get("read_time_minutes") || 4,
    published: truthy(formData, "published"),
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);

  await supabase.from("blog_posts").insert({
    title: parsed.title,
    slug,
    category: parsed.category || null,
    excerpt: parsed.excerpt,
    content: parsed.content,
    cover_image_url: parsed.cover_image_url || null,
    author_name: "Serena Property Group",
    read_time_minutes: parsed.read_time_minutes || 4,
    published: parsed.published ?? true,
    published_at: parsed.published ? new Date().toISOString() : null,
  });

  invalidate();
  redirect("/admin");
}

export async function updateBlogPostAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const parsed = postSchema.parse({
    id: formData.get("id"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url"),
    read_time_minutes: formData.get("read_time_minutes") || 4,
    published: truthy(formData, "published"),
  });

  const slug = parsed.slug ? slugify(parsed.slug) : slugify(parsed.title);

  await supabase.from("blog_posts").update({
    title: parsed.title,
    slug,
    category: parsed.category || null,
    excerpt: parsed.excerpt,
    content: parsed.content,
    cover_image_url: parsed.cover_image_url || null,
    read_time_minutes: parsed.read_time_minutes || 4,
    published: parsed.published ?? true,
    published_at: parsed.published ? new Date().toISOString() : null,
  }).eq("id", parsed.id!);

  invalidate();
  redirect("/admin");
}

export async function deleteBlogPostAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  await supabase.from("blog_posts").delete().eq("id", id);
  invalidate();
  redirect("/admin");
}

export async function updateInquiryStatusAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "new");
  await supabase.from("inquiries").update({ status }).eq("id", id);
  invalidate();
  redirect("/admin");
}
