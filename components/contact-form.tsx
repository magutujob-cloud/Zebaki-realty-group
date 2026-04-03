import { createInquiryAction } from "@/app/actions/public";

type Props = {
  listingId?: string;
  returnTo?: string;
  defaultValues?: {
    full_name?: string | null;
    email?: string | null;
    phone?: string | null;
    city?: string | null;
  };
  signedIn?: boolean;
};

export function ContactForm({ listingId, returnTo, defaultValues, signedIn = false }: Props) {
  return (
    <form action={createInquiryAction} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="listing_id" value={listingId || ""} />
      <input type="hidden" name="return_to" value={returnTo || "/contact"} />
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Full name</span>
        <input name="full_name" defaultValue={defaultValues?.full_name || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Email</span>
        <input name="email" type="email" defaultValue={defaultValues?.email || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Phone</span>
        <input name="phone" defaultValue={defaultValues?.phone || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Interest</span>
        <select name="interest" defaultValue="Buying a property" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
          <option>Buying a property</option>
          <option>Renting a property</option>
          <option>Listing a property</option>
          <option>Property management</option>
          <option>Land inquiry</option>
          <option>General inquiry</option>
        </select>
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">City</span>
        <input name="city" defaultValue={defaultValues?.city || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Budget</span>
        <input name="budget" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700 sm:col-span-2">
        <span className="mb-2 block font-medium">Message</span>
        <textarea name="message" required className="min-h-[140px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      {signedIn ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:col-span-2">
          This inquiry will be linked to your account so you can track it later.
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white">
          Send inquiry
        </button>
      </div>
    </form>
  );
}
