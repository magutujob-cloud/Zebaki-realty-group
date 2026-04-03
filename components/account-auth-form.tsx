"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

type Props = {
  mode?: "signin" | "signup";
};

export function AccountAuthForm({ mode = "signup" }: Props) {
  const supabase = createClient();
  const [currentMode, setCurrentMode] = useState<"signin" | "signup">(mode);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("full_name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (currentMode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      setLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Account created. If email confirmation is enabled in Supabase, check your inbox before signing in.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = "/account";
  }

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-full border border-slate-200 p-1 text-sm">
        <button
          type="button"
          onClick={() => setCurrentMode("signup")}
          className={`rounded-full px-4 py-2 ${currentMode === "signup" ? "bg-slate-950 text-white" : "text-slate-600"}`}
        >
          Create account
        </button>
        <button
          type="button"
          onClick={() => setCurrentMode("signin")}
          className={`rounded-full px-4 py-2 ${currentMode === "signin" ? "bg-slate-950 text-white" : "text-slate-600"}`}
        >
          Sign in
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {currentMode === "signup" ? (
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Full name</span>
            <input name="full_name" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
          </label>
        ) : null}

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Email</span>
          <input name="email" type="email" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Password</span>
          <input name="password" type="password" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>

        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
        {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}

        <button disabled={loading} type="submit" className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white disabled:opacity-60">
          {loading ? (currentMode === "signup" ? "Creating account..." : "Signing in...") : currentMode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
