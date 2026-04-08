"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { Agent } from "@/lib/types";
import { CITIES } from "@/lib/constants";

type FormState = {
  error: string | null;
};

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initialData?: Partial<Agent>;
  submitLabel: string;
};

export function AgentForm({ action, initialData, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prevState, formData) => {
      try {
        await action(formData);
        return { error: null };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Unable to save agent changes.",
        };
      }
    },
    { error: null },
  );

  return (
    <form action={formAction} className="space-y-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {initialData?.id ? <input type="hidden" name="id" value={initialData.id} /> : null}
      <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        Use this form for both <strong>agents</strong> and <strong>leadership</strong>. If the role includes <strong>CEO</strong>, <strong>Director</strong>, <strong>Founder</strong>, <strong>Managing Director</strong>, or <strong>Head of</strong>, the person will automatically appear in the Leadership Team section of the site.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Full name</span>
          <input name="full_name" defaultValue={initialData?.full_name || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Role</span>
          <input name="role" defaultValue={initialData?.role || ""} required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" placeholder="e.g. CEO, Sales Agent, Director" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">City</span>
          <select name="city" defaultValue={initialData?.city || "Nairobi"} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
            {CITIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Phone</span>
          <input name="phone" defaultValue={initialData?.phone || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Email</span>
          <input name="email" type="email" defaultValue={initialData?.email || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Years of experience</span>
          <input name="years_experience" type="number" min="0" defaultValue={initialData?.years_experience || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Sales recorded</span>
          <input name="sales_count" type="number" min="0" defaultValue={initialData?.sales_count || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Sort order</span>
          <input name="sort_order" type="number" defaultValue={initialData?.sort_order || ""} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>

      <ImageUploadField name="image_url" label="Profile image URL" defaultValue={initialData?.image_url} folder="agents" />

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Specialties (comma separated)</span>
        <input name="specialties" defaultValue={(initialData?.specialties || []).join(", ")} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Bio</span>
        <textarea name="bio" defaultValue={initialData?.bio || ""} required className="min-h-[180px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
        <input type="checkbox" name="active" defaultChecked={initialData?.active ?? true} className="h-4 w-4" />
        Active
      </label>

      {state.error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </form>
  );
}
