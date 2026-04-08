"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, ChevronLeft, ChevronRight, Heart, MapPin, Ruler } from "lucide-react";
import { formatKES } from "@/lib/utils";
import type { Listing } from "@/lib/types";
import type { TouchEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const images = useMemo(() => {
    const fallback = "https://placehold.co/1200x800?text=Property+Photo";
    const candidates = [listing.cover_image_url, ...(listing.gallery_urls || [])].filter(Boolean) as string[];
    const unique = [...new Set(candidates)];

    return unique.length > 0 ? unique : [fallback];
  }, [listing.cover_image_url, listing.gallery_urls]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const isSaved = saved.includes(listing.id);
  const activeImage = images[activeImageIndex] || images[0];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [listing.id]);

  function goToImage(index: number) {
    const nextIndex = (index + images.length) % images.length;
    setActiveImageIndex(nextIndex);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null || images.length < 2) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) > 40) {
      goToImage(activeImageIndex + (deltaX < 0 ? 1 : -1));
    }

    touchStartX.current = null;
  }

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
      <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <Image src={activeImage} alt={listing.title} width={1200} height={800} className="h-64 w-full object-cover" />
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
        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goToImage(activeImageIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-sm transition hover:bg-white"
              aria-label="Previous preview image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goToImage(activeImageIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-sm transition hover:bg-white"
              aria-label="Next preview image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-950/70 px-3 py-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => goToImage(index)}
                  className={`h-2 w-2 rounded-full transition ${index === activeImageIndex ? "bg-white" : "bg-white/40"}`}
                  aria-label={`Preview image ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        {images.length > 1 ? (
          <div className="-mt-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                type="button"
                onClick={() => goToImage(index)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${
                  index === activeImageIndex ? "border-slate-950" : "border-slate-200 hover:border-slate-300"
                }`}
                aria-label={`Open thumbnail ${index + 1}`}
              >
                <Image src={image} alt={`${listing.title} thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
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
