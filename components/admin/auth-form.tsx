"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function AuthForm({ initialError = "" }: { initialError?: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Admin email</span>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        />
      </label>

      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Password</span>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
        />
      </label>

      {error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <button
        disabled={loading}
        type="submit"
        className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
