import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CustomerProfile } from "@/lib/types";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function getCustomerSession() {
  const { supabase, user } = await getSessionUser();

  if (!user) {
    return { supabase, user: null, profile: null as CustomerProfile | null };
  }

  const { data: profile } = await supabase
    .from("customer_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { supabase, user, profile: (profile ?? null) as CustomerProfile | null };
}

export async function requireCustomer() {
  const { supabase, user, profile } = await getCustomerSession();

  if (!user?.email) {
    redirect("/account/login");
  }

  return { supabase, user, profile };
}

export async function requireAdmin() {
  const { supabase, user } = await getSessionUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const admin = createAdminClient();

  const { data: adminRow, error } = await admin
    .from("admin_users")
    .select("email")
    .ilike("email", user.email)
    .maybeSingle();

  if (error || !adminRow) {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user };
}
