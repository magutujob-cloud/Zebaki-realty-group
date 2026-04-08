"use client";

import { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

type Props = {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder?: string;
};

export function ImageUploadField({ name, label, defaultValue = "", folder = "general" }: Props) {
  const supabase = createClient();
  const [value, setValue] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("property-media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      if (error.message.includes("54001")) {
        setError("Image upload is blocked by the current Supabase storage policy. Apply the latest storage-policy migration, then try again.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("property-media").getPublicUrl(path);
    setValue(data.publicUrl);
    setLoading(false);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">{label}</span>
        <input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          placeholder="https://..."
        />
      </label>

      <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
        <Upload className="h-4 w-4" />
        {loading ? "Uploading..." : "Upload from computer"}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {value ? (
        <img src={value} alt="Preview" className="h-32 w-full rounded-2xl object-cover" />
      ) : null}

      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}
