import { createInquiryAction } from "@/app/actions/public";

export function ContactForm({ listingId }: { listingId?: string }) {
  return (
    <form action={createInquiryAction} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="listing_id" value={listingId || ""} />
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Full name</span>
        <input name="full_name" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Email</span>
        <input name="email" type="email" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Phone</span>
        <input name="phone" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
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
        <input name="city" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Budget</span>
        <input name="budget" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <label className="block text-sm text-slate-700 sm:col-span-2">
        <span className="mb-2 block font-medium">Message</span>
        <textarea name="message" required className="min-h-[140px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white">
          Send inquiry
        </button>
      </div>
    </form>
  );
}
