"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

type Props = {
  redirectTo?: string;
  label?: string;
  className?: string;
};

export function SignOutButton({
  redirectTo = "/admin/login",
  label = "Sign out",
  className = "inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700",
}: Props) {
  const supabase = createClient();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await supabase.auth.signOut();
        router.push(redirectTo);
        router.refresh();
      }}
      className={className}
    >
      <LogOut className="h-4 w-4" />
      {label}
    </button>
  );
}
