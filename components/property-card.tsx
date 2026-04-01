"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { formatKES } from "@/lib/utils";
import type { Listing } from "@/lib/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "zebaki_saved_listing_ids";

function useSavedListings() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) setSaved(JSON.parse(raw));
  }, []);

  function toggle(id: string) {
    setSaved((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { saved, toggle };
}

export function PropertyCard({ listing }: { listing: Listing }) {
  const { saved, toggle } = useSavedListings();
  const cover = listing.cover_image_url || "https://placehold.co/1200x800?text=Property+Photo";
  const isSaved = saved.includes(listing.id);

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
      <div className="relative">
        <Image src={cover} alt={listing.title} width={1200} height={800} className="h-64 w-full object-cover" />
        <button
          type="button"
          onClick={() => toggle(listing.id)}
          className="absolute right-4 top-4 rounded-full bg-white/95 p-3 shadow-sm"
          aria-label="Save listing"
        >
          <Heart className={isSaved ? "h-5 w-5 fill-rose-500 text-rose-500" : "h-5 w-5 text-slate-700"} />
        </button>
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-slate-950/90 px-3 py-1 text-xs font-medium text-white">
            {listing.purpose}
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-900">
            {listing.property_type}
          </span>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-slate-950">{formatKES(listing.price, listing.purpose)}</p>
          <h3 className="text-lg font-semibold text-slate-950">{listing.title}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            <span>{listing.area}, {listing.city}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
          <div className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{listing.bedrooms || "-"}</div>
          <div className="flex items-center gap-2"><Bath className="h-4 w-4" />{listing.bathrooms || "-"}</div>
          <div className="flex items-center gap-2"><Ruler className="h-4 w-4" />{listing.size_label || "-"}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(listing.amenities || []).slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/properties/${listing.slug}`}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
