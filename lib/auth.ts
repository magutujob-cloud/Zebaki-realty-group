import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
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
