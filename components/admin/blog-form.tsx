import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { BlogPost } from "@/lib/types";
import { POST_CATEGORIES } from "@/lib/constants";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: Partial<BlogPost>;
  submitLabel: string;
};

export function BlogForm({ action, initialData, submitLabel }: Props) {
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
          <span className="mb-2 block font-medium">Category</span>
          <select name="category" defaultValue={initialData?.category || "Homes"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
            {POST_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Read time (minutes)</span>
          <input name="read_time_minutes" type="number" defaultValue={initialData?.read_time_minutes || 4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>

      <ImageUploadField name="cover_image_url" label="Cover image URL" defaultValue={initialData?.cover_image_url} folder="blog" />

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Excerpt</span>
        <textarea name="excerpt" defaultValue={initialData?.excerpt || ""} required className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Article content</span>
        <textarea name="content" defaultValue={initialData?.content || ""} required className="min-h-[260px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
        <input type="checkbox" name="published" defaultChecked={initialData?.published ?? true} className="h-4 w-4" />
        Published
      </label>

      <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white">
        {submitLabel}
      </button>
    </form>
  );
}
