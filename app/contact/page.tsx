import { Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { BRAND } from "@/lib/constants";
import { getCustomerSession } from "@/lib/auth";
import { getWhatsappLink } from "@/lib/utils";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const success = params.success === "1";
  const { user, profile } = await getCustomerSession();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading
            eyebrow="Contact"
            title="Talk to Serena Property Group"
            body="Use the form, call, email, or reach out on WhatsApp. Form submissions are stored in the backend and visible in the admin dashboard."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${BRAND.phone}`} className="rounded-[24px] bg-slate-50 p-5">
              <Phone className="h-6 w-6 text-slate-500" />
              <p className="mt-4 font-semibold text-slate-950">Phone</p>
              <p className="mt-1 text-sm text-slate-600">{BRAND.displayPhone}</p>
            </a>
            <a href={`mailto:${BRAND.email}`} className="rounded-[24px] bg-slate-50 p-5">
              <Mail className="h-6 w-6 text-slate-500" />
              <p className="mt-4 font-semibold text-slate-950">Email</p>
              <p className="mt-1 break-all text-sm text-slate-600">{BRAND.email}</p>
            </a>
            <a href={getWhatsappLink("Hello Serena Property Group. I would like to speak with your team.")} target="_blank" rel="noreferrer" className="rounded-[24px] bg-slate-50 p-5">
              <MessageCircle className="h-6 w-6 text-slate-500" />
              <p className="mt-4 font-semibold text-slate-950">WhatsApp</p>
              <p className="mt-1 text-sm text-slate-600">Quick property inquiries and follow-up</p>
            </a>
            <div className="rounded-[24px] bg-slate-50 p-5">
              <Clock3 className="h-6 w-6 text-slate-500" />
              <p className="mt-4 font-semibold text-slate-950">Office</p>
              <p className="mt-1 text-sm text-slate-600">Nairobi HQ • Add physical address once confirmed</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {success ? (
            <div className="mb-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Your inquiry has been submitted successfully.
            </div>
          ) : null}
          {!user ? (
            <div className="mb-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Create a client account to track inquiry progress later from your dashboard.
            </div>
          ) : null}
          <ContactForm
            returnTo="/contact"
            signedIn={Boolean(user)}
            defaultValues={{
              full_name: profile?.full_name,
              email: profile?.email || user?.email || null,
              phone: profile?.phone,
              city: profile?.city,
            }}
          />
        </div>
      </div>
    </section>
  );
}
