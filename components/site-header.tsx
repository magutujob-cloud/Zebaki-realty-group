"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, MessageCircle, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { getWhatsappLink, cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo-mark";

const nav = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Listings" },
  { href: "/services", label: "Services" },
  { href: "/agents", label: "Agents" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LogoMark />

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            <Heart className="h-4 w-4" />
            Saved in browser
          </Link>
          <a
            href={getWhatsappLink("Hello Zebaki Realty Group. I would like help finding a property.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-slate-200 p-3 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className={cn("fixed inset-0 z-[60] bg-slate-950/45 transition lg:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <div className={cn("ml-auto flex h-full w-[88%] max-w-sm flex-col bg-white p-6 shadow-2xl transition", open ? "translate-x-0" : "translate-x-full")}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-950">{BRAND.name}</p>
              <p className="text-sm text-slate-500">{BRAND.tagline}</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full border border-slate-200 p-3" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-8">
            <a
              href={`tel:${BRAND.phone}`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={getWhatsappLink("Hello Zebaki Realty Group. I would like help finding a property.")}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
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
