import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { Listing } from "@/lib/types";
import { CITIES, PROPERTY_TYPES, PURPOSES } from "@/lib/constants";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: Partial<Listing>;
  submitLabel: string;
};

export function ListingForm({ action, initialData, submitLabel }: Props) {
  return (
    <form action={action} className="space-y-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {initialData?.id ? <input type="hidden" name="id" value={initialData.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Title</span>
          <input name="title" defaultValue={initialData?.title || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Slug (optional)</span>
          <input name="slug" defaultValue={initialData?.slug || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Property type</span>
          <select name="property_type" defaultValue={initialData?.property_type || "House"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
            {PROPERTY_TYPES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Purpose</span>
          <select name="purpose" defaultValue={initialData?.purpose || "Sale"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
            {PURPOSES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">City</span>
          <select name="city" defaultValue={initialData?.city || "Nairobi"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
            {CITIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Area / neighborhood</span>
          <input name="area" defaultValue={initialData?.area || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Price (KES)</span>
          <input name="price" type="number" defaultValue={initialData?.price || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Size label</span>
          <input name="size_label" defaultValue={initialData?.size_label || ""} placeholder="0.25 acres or 320 sqm" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Bedrooms</span>
          <input name="bedrooms" type="number" defaultValue={initialData?.bedrooms || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Bathrooms</span>
          <input name="bathrooms" type="number" defaultValue={initialData?.bathrooms || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Status</span>
          <input name="status" defaultValue={initialData?.status || "Available"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Map query</span>
          <input name="map_query" defaultValue={initialData?.map_query || ""} placeholder="Kilimani Nairobi Kenya" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>

      <ImageUploadField name="cover_image_url" label="Cover image URL" defaultValue={initialData?.cover_image_url} folder="listings" />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Gallery URLs (comma separated)</span>
          <textarea name="gallery_urls" defaultValue={(initialData?.gallery_urls || []).join(", ")} className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Amenities (comma separated)</span>
          <textarea name="amenities" defaultValue={(initialData?.amenities || []).join(", ")} className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Title status</span>
          <input name="title_status" defaultValue={initialData?.title_status || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Zoning</span>
          <input name="zoning" defaultValue={initialData?.zoning || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Road access</span>
          <input name="road_access" defaultValue={initialData?.road_access || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Utilities (comma separated)</span>
        <input name="utilities" defaultValue={(initialData?.utilities || []).join(", ")} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Description</span>
        <textarea name="description" defaultValue={initialData?.description || ""} required className="min-h-[180px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
          <input type="checkbox" name="featured" defaultChecked={initialData?.featured || false} className="h-4 w-4" />
          Featured listing
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
          <input type="checkbox" name="published" defaultChecked={initialData?.published ?? true} className="h-4 w-4" />
          Published
        </label>
      </div>

      <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white">
        {submitLabel}
      </button>
    </form>
  );
}
