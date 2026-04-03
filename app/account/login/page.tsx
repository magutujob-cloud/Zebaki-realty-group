import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AccountAuthForm } from "@/components/account-auth-form";
import { SectionHeading } from "@/components/section-heading";

export default function AccountLoginPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Client account"
            title="Create an account to track inquiries"
            body="Clients can create an account, sign in later, and follow inquiry progress instead of submitting everything anonymously each time."
          />
          <ShieldCheck className="mt-2 h-10 w-10 text-slate-400" />
        </div>

        <AccountAuthForm />

        <div className="mt-6 text-sm text-slate-500">
          Admin access still lives at <Link href="/admin/login" className="font-medium text-slate-900">/admin/login</Link>.
        </div>
      </div>
    </section>
  );
}
