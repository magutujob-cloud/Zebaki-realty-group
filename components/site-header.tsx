"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, MessageCircle, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getWhatsappLink, cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo-mark";
import { SignOutButton } from "@/components/admin/sign-out-button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Listings" },
  { href: "/services", label: "Services" },
  { href: "/agents", label: "Agents" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

type Props = {
  isSignedIn?: boolean;
};

export function SiteHeader({ isSignedIn = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-200/30 bg-black/92 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LogoMark />

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-white/72 transition hover:text-violet-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isSignedIn ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/88"
            >
              My inquiries
            </Link>
          ) : (
            <Link
              href="/account/login"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/88"
            >
              Create account
            </Link>
          )}
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/88"
          >
            <Heart className="h-4 w-4" />
            Saved in browser
          </Link>
          <a
            href={getWhatsappLink("Hello Serena Property Group. I would like help finding a property.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(109,40,217,0.35)]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          {isSignedIn ? (
            <SignOutButton
              redirectTo="/"
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/88"
            />
          ) : null}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-violet-400/30 bg-white/5 p-3 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className={cn("fixed inset-0 z-[60] bg-black/70 transition lg:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className={cn("ml-auto flex h-full w-[88%] max-w-sm flex-col bg-[#090611] p-6 text-white shadow-2xl transition", open ? "translate-x-0" : "translate-x-full")}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">{BRAND.name}</p>
              <p className="text-sm text-violet-200/80">{BRAND.tagline}</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full border border-violet-400/30 p-3" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {isSignedIn ? (
              <Link href="/account" onClick={() => setOpen(false)} className="block rounded-2xl border border-violet-400/30 bg-white/5 px-4 py-3 font-medium text-white">
                My inquiries
              </Link>
            ) : (
              <Link href="/account/login" onClick={() => setOpen(false)} className="block rounded-2xl border border-violet-400/30 bg-white/5 px-4 py-3 font-medium text-white">
                Create account
              </Link>
            )}
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl border border-violet-400/30 bg-white/5 px-4 py-3 font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-8">
            {isSignedIn ? (
              <SignOutButton
                redirectTo="/"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-violet-400/30 px-5 py-3 text-sm font-medium text-white/88"
              />
            ) : null}
            <a
              href={`tel:${BRAND.phone}`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-violet-400/30 px-5 py-3 text-sm font-medium text-white/88"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={getWhatsappLink("Hello Serena Property Group. I would like help finding a property.")}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
