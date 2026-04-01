import Link from "next/link";
import { Building2, LayoutDashboard, Newspaper, Users } from "lucide-react";
import { SignOutButton } from "@/components/admin/sign-out-button";

export function AdminNav() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Zebaki dashboard</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          <LayoutDashboard className="h-4 w-4" />
          Overview
        </Link>
        <Link href="/admin/listings/new" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          <Building2 className="h-4 w-4" />
          New listing
        </Link>
        <Link href="/admin/agents/new" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          <Users className="h-4 w-4" />
          New agent
        </Link>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          <Newspaper className="h-4 w-4" />
          New post
        </Link>
        <SignOutButton />
      </div>
    </div>
  );
}
