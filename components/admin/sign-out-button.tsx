"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
