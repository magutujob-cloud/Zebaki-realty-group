"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import type { Listing } from "@/lib/types";
import { CITIES, PROPERTY_TYPES, PURPOSES } from "@/lib/constants";
import { mapEmbedUrl } from "@/lib/utils";

type Props = {
  listings: Listing[];
  initialQuery?: string;
  initialCity?: string;
  initialType?: string;
  initialPurpose?: string;
};

export function SearchShell({
  listings,
  initialQuery = "",
  initialCity = "All cities",
  initialType = "All types",
  initialPurpose = "All purposes",
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState(initialType);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = listings.filter((listing) => {
      const haystack = [
        listing.title,
        listing.city,
        listing.area,
        listing.property_type,
        listing.purpose,
        listing.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (city === "All cities" || listing.city === city) &&
        (type === "All types" || listing.property_type === type) &&
        (purpose === "All purposes" || listing.purpose === purpose)
      );
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price-desc") result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "latest") result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sort === "featured") result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));

    return result;
  }, [city, listings, purpose, query, sort, type]);

  const mapQuery = filtered[0]?.map_query || (city !== "All cities" ? `${city} Kenya` : "Nairobi Kenya");

  const filters = (
    <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-950">Filter listings</h3>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCity("All cities");
            setType("All types");
            setPurpose("All purposes");
            setSort("featured");
          }}
          className="text-sm text-slate-500"
        >
          Reset
        </button>
      </div>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Search</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" placeholder="City, area, or property..." />
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">City</span>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
          <option>All cities</option>
          {CITIES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Property type</span>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
          <option>All types</option>
          {PROPERTY_TYPES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="block text-sm text-slate-700">
        <span className="mb-2 block font-medium">Purpose</span>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
          <option>All purposes</option>
          {PURPOSES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Search, filter, compare</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Listings</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse homes, land, rentals, and managed properties. Filters are client-side for speed and easy extension.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 lg:hidden">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
              <option value="featured">Featured first</option>
              <option value="latest">Latest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="hidden lg:block">{filters}</div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm text-slate-500">Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
                <h3 className="text-xl font-semibold text-slate-950">Available properties</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {filtered.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
            {filtered.length === 0 ? (
              <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No listings match those filters yet.
              </div>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Map view</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">Search area preview</h3>
            </div>
            <iframe title="Listings map" className="h-80 w-full xl:h-[540px]" loading="lazy" src={mapEmbedUrl(mapQuery || "Nairobi Kenya")} />
          </div>
        </div>
      </div>

      {showFilters ? (
        <div className="fixed inset-0 z-[60] bg-slate-950/50 lg:hidden">
          <div className="absolute inset-x-0 bottom-0 rounded-t-[32px] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950">Filters</h3>
              <button type="button" onClick={() => setShowFilters(false)} className="rounded-full border border-slate-200 px-4 py-2 text-sm">Close</button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
    </>
  );
}
