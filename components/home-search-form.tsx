"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { CITIES, PROPERTY_TYPES, PURPOSES } from "@/lib/constants";
import type { Listing } from "@/lib/types";

type Props = {
  listings: Listing[];
};

function getUniqueValues(values: Array<string | null | undefined>) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function HomeSearchForm({ listings }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const options = useMemo(() => {
    return {
      areas: getUniqueValues(listings.map((listing) => listing.area)),
      statuses: getUniqueValues(listings.map((listing) => listing.status)),
      zonings: getUniqueValues(listings.map((listing) => listing.zoning)),
      titleStatuses: getUniqueValues(listings.map((listing) => listing.title_status)),
      roadAccesses: getUniqueValues(listings.map((listing) => listing.road_access)),
      amenities: getUniqueValues(listings.flatMap((listing) => listing.amenities || [])),
      utilities: getUniqueValues(listings.flatMap((listing) => listing.utilities || [])),
    };
  }, [listings]);

  return (
    <form action="/properties" className="mt-8 rounded-[28px] border border-violet-200/70 bg-white p-4 text-slate-950 shadow-[0_20px_60px_rgba(17,5,35,0.18)] sm:p-5">
      <input type="hidden" name="advanced" value={showAdvanced ? "1" : "0"} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Keyword</span>
          <input
            name="q"
            placeholder="House, land, area..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">City</span>
          <select
            name="city"
            defaultValue="All cities"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          >
            <option>All cities</option>
            {CITIES.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Property type</span>
          <select
            name="type"
            defaultValue="All types"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          >
            <option>All types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block font-medium">Purpose</span>
          <select
            name="purpose"
            defaultValue="All purposes"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          >
            <option>All purposes</option>
            {PURPOSES.map((purpose) => (
              <option key={purpose}>{purpose}</option>
            ))}
          </select>
        </label>
      </div>

      {showAdvanced ? (
        <div className="mt-4 space-y-4 rounded-[24px] border border-violet-200 bg-violet-50/70 p-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Area</span>
              <select name="area" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any area</option>
                {options.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min price</span>
              <input name="min_price" type="number" min="0" placeholder="e.g. 5000000" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Max price</span>
              <input name="max_price" type="number" min="0" placeholder="e.g. 30000000" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Status</span>
              <select name="status" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any status</option>
                {options.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min bedrooms</span>
              <input name="bedrooms_min" type="number" min="0" placeholder="Any" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min bathrooms</span>
              <input name="bathrooms_min" type="number" min="0" placeholder="Any" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Zoning</span>
              <select name="zoning" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any zoning</option>
                {options.zonings.map((zoning) => (
                  <option key={zoning} value={zoning}>
                    {zoning}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Title status</span>
              <select name="title_status" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any title status</option>
                {options.titleStatuses.map((titleStatus) => (
                  <option key={titleStatus} value={titleStatus}>
                    {titleStatus}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Road access</span>
              <select name="road_access" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any road access</option>
                {options.roadAccesses.map((roadAccess) => (
                  <option key={roadAccess} value={roadAccess}>
                    {roadAccess}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Amenity</span>
              <select name="amenity" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any amenity</option>
                {options.amenities.map((amenity) => (
                  <option key={amenity} value={amenity}>
                    {amenity}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Utility</span>
              <select name="utility" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Any utility</option>
                {options.utilities.map((utility) => (
                  <option key={utility} value={utility}>
                    {utility}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <input name="featured" type="checkbox" value="1" className="h-4 w-4 rounded border-slate-300" />
              <span className="font-medium">Featured listings only</span>
            </label>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowAdvanced((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-violet-200 px-6 py-3 text-sm font-medium text-violet-900"
        >
          <ChevronDown className={`h-4 w-4 transition ${showAdvanced ? "rotate-180" : ""}`} />
          {showAdvanced ? "Hide advanced search" : "Advanced search"}
        </button>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-6 py-3 text-sm font-medium text-white shadow-[0_14px_32px_rgba(109,40,217,0.28)]">
          <Search className="h-4 w-4" />
          Search properties
        </button>
      </div>
    </form>
  );
}
