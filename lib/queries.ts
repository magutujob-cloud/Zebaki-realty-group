import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { createClient, createPublicClient } from "@/lib/supabase/server";
import { requireCustomer } from "@/lib/auth";
import type { Agent, BlogPost, Inquiry, InquiryWithListing, Listing } from "@/lib/types";
import { getAgentSlug } from "@/lib/utils";

function logSupabaseError(context: string, error: unknown) {
  console.error(`[supabase:${context}]`, error);
}

export async function getFeaturedListings() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      logSupabaseError("getFeaturedListings", error);
      return [];
    }

    return (data ?? []) as Listing[];
  } catch (error) {
    logSupabaseError("getFeaturedListings", error);
    return [];
  }
}

export async function getPublishedListings() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      logSupabaseError("getPublishedListings", error);
      return [];
    }

    return (data ?? []) as Listing[];
  } catch (error) {
    logSupabaseError("getPublishedListings", error);
    return [];
  }
}

export async function getPublishedListingsByAgent(agentId: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("published", true)
      .eq("agent_id", agentId)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      logSupabaseError("getPublishedListingsByAgent", error);
      return [];
    }

    return (data ?? []) as Listing[];
  } catch (error) {
    logSupabaseError("getPublishedListingsByAgent", error);
    return [];
  }
}

export async function getListingBySlug(slug: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      logSupabaseError("getListingBySlug", error);
      notFound();
    }

    if (!data) notFound();
    return data as Listing;
  } catch (error) {
    logSupabaseError("getListingBySlug", error);
    notFound();
  }
}

export async function getAllAgents() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });

    if (error) {
      logSupabaseError("getAllAgents", error);
      return [];
    }

    return (data ?? []) as Agent[];
  } catch (error) {
    logSupabaseError("getAllAgents", error);
    return [];
  }
}

export async function getAgentBySlug(slug: string) {
  const agents = await getAllAgents();
  const agent = agents.find((item) => getAgentSlug(item) === slug);

  if (!agent) notFound();
  return agent;
}

export async function getPublishedPosts() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      logSupabaseError("getPublishedPosts", error);
      return [];
    }

    return (data ?? []) as BlogPost[];
  } catch (error) {
    logSupabaseError("getPublishedPosts", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      logSupabaseError("getPostBySlug", error);
      notFound();
    }

    if (!data) notFound();
    return data as BlogPost;
  } catch (error) {
    logSupabaseError("getPostBySlug", error);
    notFound();
  }
}

export async function getAdminDashboardData() {
  try {
    noStore();
    const supabase = await createClient();
    const [
      { data: listings, error: listingsError },
      { data: agents, error: agentsError },
      { data: posts, error: postsError },
      { data: inquiries, error: inquiriesError },
    ] = await Promise.all([
      supabase.from("listings").select("*").order("created_at", { ascending: false }),
      supabase.from("agents").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);

    if (listingsError) logSupabaseError("getAdminDashboardData:listings", listingsError);
    if (agentsError) logSupabaseError("getAdminDashboardData:agents", agentsError);
    if (postsError) logSupabaseError("getAdminDashboardData:posts", postsError);
    if (inquiriesError) logSupabaseError("getAdminDashboardData:inquiries", inquiriesError);

    return {
      listings: (listings ?? []) as Listing[],
      agents: (agents ?? []) as Agent[],
      posts: (posts ?? []) as BlogPost[],
      inquiries: (inquiries ?? []) as Inquiry[],
    };
  } catch (error) {
    logSupabaseError("getAdminDashboardData", error);
    return {
      listings: [],
      agents: [],
      posts: [],
      inquiries: [],
    };
  }
}

export async function getAdminListing(id: string) {
  try {
    noStore();
    const supabase = await createClient();
    const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
    if (error) {
      logSupabaseError("getAdminListing", error);
      notFound();
    }
    if (!data) notFound();
    return data as Listing;
  } catch (error) {
    logSupabaseError("getAdminListing", error);
    notFound();
  }
}

export async function getAdminAgent(id: string) {
  try {
    noStore();
    const supabase = await createClient();
    const { data, error } = await supabase.from("agents").select("*").eq("id", id).maybeSingle();
    if (error) {
      logSupabaseError("getAdminAgent", error);
      notFound();
    }
    if (!data) notFound();
    return data as Agent;
  } catch (error) {
    logSupabaseError("getAdminAgent", error);
    notFound();
  }
}

export async function getAdminAgents() {
  try {
    noStore();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true });
    if (error) {
      logSupabaseError("getAdminAgents", error);
      return [];
    }
    return (data ?? []) as Agent[];
  } catch (error) {
    logSupabaseError("getAdminAgents", error);
    return [];
  }
}

export async function getAdminPost(id: string) {
  try {
    noStore();
    const supabase = await createClient();
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (error) {
      logSupabaseError("getAdminPost", error);
      notFound();
    }
    if (!data) notFound();
    return data as BlogPost;
  } catch (error) {
    logSupabaseError("getAdminPost", error);
    notFound();
  }
}

export async function getCustomerInquiries() {
  try {
    const { supabase, user } = await requireCustomer();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*, listings(id, title, slug, city, area)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      logSupabaseError("getCustomerInquiries", error);
      return [];
    }

    return (data ?? []) as InquiryWithListing[];
  } catch (error) {
    logSupabaseError("getCustomerInquiries", error);
    return [];
  }
}
