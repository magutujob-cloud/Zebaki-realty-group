import Link from "next/link";
import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/auth";
import { getCustomerInquiries } from "@/lib/queries";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const { user, profile } = await getCustomerSession();

  if (!user) {
    redirect("/account/login");
  }

  const inquiries = await getCustomerInquiries();
  const success = params.success === "1";

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Your account</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Inquiry tracking</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Signed-in clients can view their inquiry history, watch status changes, and reuse profile details for future property requests.
          </p>

          <div className="mt-8 space-y-4 rounded-[28px] bg-slate-50 p-5">
            <div>
              <p className="text-sm text-slate-500">Full name</p>
              <p className="mt-1 font-medium text-slate-950">{profile?.full_name || "Add your name through your next inquiry"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-1 font-medium text-slate-950">{profile?.email || user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-1 font-medium text-slate-950">{profile?.phone || "Not added yet"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">City</p>
              <p className="mt-1 font-medium text-slate-950">{profile?.city || "Not added yet"}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/properties" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
              Browse listings
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
              New inquiry
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">History</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Your inquiries</h2>
            </div>
            <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {inquiries.length} total
            </p>
          </div>

          {success ? (
            <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Your inquiry was submitted and linked to your account.
            </div>
          ) : null}

          <div className="mt-6 space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="rounded-[28px] border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">{inquiry.interest || "General inquiry"}</p>
                    {inquiry.listings ? (
                      <Link href={`/properties/${inquiry.listings.slug}`} className="mt-1 block text-sm text-slate-600 hover:text-slate-950">
                        {inquiry.listings.title} in {inquiry.listings.area}, {inquiry.listings.city}
                      </Link>
                    ) : (
                      <p className="mt-1 text-sm text-slate-600">{inquiry.city || "General request"}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-700">
                      {inquiry.status || "new"}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{new Date(inquiry.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{inquiry.message}</p>
              </div>
            ))}

            {inquiries.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 p-8 text-sm leading-7 text-slate-600">
                No tracked inquiries yet. Once you submit one while signed in, it will appear here automatically.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
