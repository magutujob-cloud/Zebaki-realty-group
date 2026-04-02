import { ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/admin/auth-form";
import { SectionHeading } from "@/components/section-heading";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Admin access"
            title="Sign in to manage Zebaki Realty Group"
            body="Admin authorization is enforced through Supabase Auth and an admin email allowlist in the database."
          />
          <ShieldCheck className="mt-2 h-10 w-10 text-slate-400" />
        </div>
        <AuthForm />
      </div>
    </section>
  );
}
