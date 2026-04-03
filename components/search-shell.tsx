"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import type { Listing } from "@/lib/types";
import { CITIES, PROPERTY_TYPES, PURPOSES } from "@/lib/constants";
import { mapEmbedUrl } from "@/lib/utils";

type Props = {
  listings: Listing[];
  initialQuery?: string;
  initialCity?: string;
  initialArea?: string;
  initialType?: string;
  initialPurpose?: string;
  initialStatus?: string;
  initialZoning?: string;
  initialTitleStatus?: string;
  initialRoadAccess?: string;
  initialAmenity?: string;
  initialUtility?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  initialMinBedrooms?: string;
  initialMinBathrooms?: string;
  initialFeaturedOnly?: boolean;
  initialSort?: string;
  initialAdvanced?: boolean;
};

function getUniqueValues(values: Array<string | null | undefined>) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function SearchShell({
  listings,
  initialQuery = "",
  initialCity = "All cities",
  initialArea = "",
  initialType = "All types",
  initialPurpose = "All purposes",
  initialStatus = "",
  initialZoning = "",
  initialTitleStatus = "",
  initialRoadAccess = "",
  initialAmenity = "",
  initialUtility = "",
  initialMinPrice = "",
  initialMaxPrice = "",
  initialMinBedrooms = "",
  initialMinBathrooms = "",
  initialFeaturedOnly = false,
  initialSort = "featured",
  initialAdvanced = false,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [area, setArea] = useState(initialArea);
  const [type, setType] = useState(initialType);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [status, setStatus] = useState(initialStatus);
  const [zoning, setZoning] = useState(initialZoning);
  const [titleStatus, setTitleStatus] = useState(initialTitleStatus);
  const [roadAccess, setRoadAccess] = useState(initialRoadAccess);
  const [amenity, setAmenity] = useState(initialAmenity);
  const [utility, setUtility] = useState(initialUtility);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [minBedrooms, setMinBedrooms] = useState(initialMinBedrooms);
  const [minBathrooms, setMinBathrooms] = useState(initialMinBathrooms);
  const [featuredOnly, setFeaturedOnly] = useState(initialFeaturedOnly);
  const [sort, setSort] = useState(initialSort);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(initialAdvanced);

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

  const filtered = useMemo(() => {
    const minPriceValue = minPrice ? Number(minPrice) : null;
    const maxPriceValue = maxPrice ? Number(maxPrice) : null;
    const minBedroomsValue = minBedrooms ? Number(minBedrooms) : null;
    const minBathroomsValue = minBathrooms ? Number(minBathrooms) : null;

    let result = listings.filter((listing) => {
      const haystack = [
        listing.title,
        listing.city,
        listing.area,
        listing.property_type,
        listing.purpose,
        listing.description,
        listing.status,
        listing.zoning,
        listing.title_status,
        listing.road_access,
        ...(listing.amenities || []),
        ...(listing.utilities || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || haystack.includes(query.toLowerCase())) &&
        (city === "All cities" || listing.city === city) &&
        (!area || listing.area === area) &&
        (type === "All types" || listing.property_type === type) &&
        (purpose === "All purposes" || listing.purpose === purpose) &&
        (!status || listing.status === status) &&
        (!zoning || listing.zoning === zoning) &&
        (!titleStatus || listing.title_status === titleStatus) &&
        (!roadAccess || listing.road_access === roadAccess) &&
        (!amenity || (listing.amenities || []).includes(amenity)) &&
        (!utility || (listing.utilities || []).includes(utility)) &&
        (!featuredOnly || listing.featured) &&
        (minPriceValue === null || (listing.price ?? 0) >= minPriceValue) &&
        (maxPriceValue === null || (listing.price ?? 0) <= maxPriceValue) &&
        (minBedroomsValue === null || (listing.bedrooms ?? 0) >= minBedroomsValue) &&
        (minBathroomsValue === null || (listing.bathrooms ?? 0) >= minBathroomsValue)
      );
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price-desc") result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
    if (sort === "latest") result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sort === "featured") result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));

    return result;
  }, [
    amenity,
    area,
    city,
    featuredOnly,
    listings,
    maxPrice,
    minBathrooms,
    minBedrooms,
    minPrice,
    purpose,
    query,
    roadAccess,
    sort,
    status,
    titleStatus,
    type,
    utility,
    zoning,
  ]);

  const mapQuery = filtered[0]?.map_query || (area ? `${area} ${city !== "All cities" ? city : "Kenya"}` : city !== "All cities" ? `${city} Kenya` : "Nairobi Kenya");

  const resetFilters = () => {
    setQuery("");
    setCity("All cities");
    setArea("");
    setType("All types");
    setPurpose("All purposes");
    setStatus("");
    setZoning("");
    setTitleStatus("");
    setRoadAccess("");
    setAmenity("");
    setUtility("");
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setMinBathrooms("");
    setFeaturedOnly(false);
    setSort("featured");
    setShowAdvanced(false);
  };

  const filters = (
    <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-950">Filter listings</h3>
        <button type="button" onClick={resetFilters} className="text-sm text-slate-500">
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

      <button
        type="button"
        onClick={() => setShowAdvanced((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700"
      >
        <span>Advanced search</span>
        <ChevronDown className={`h-4 w-4 transition ${showAdvanced ? "rotate-180" : ""}`} />
      </button>

      {showAdvanced ? (
        <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Area</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any area</option>
              {options.areas.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min price</span>
              <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Max price</span>
              <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min bedrooms</span>
              <input value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Min bathrooms</span>
              <input value={minBathrooms} onChange={(e) => setMinBathrooms(e.target.value)} type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
            </label>
          </div>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any status</option>
              {options.statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Zoning</span>
            <select value={zoning} onChange={(e) => setZoning(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any zoning</option>
              {options.zonings.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Title status</span>
            <select value={titleStatus} onChange={(e) => setTitleStatus(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any title status</option>
              {options.titleStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Road access</span>
            <select value={roadAccess} onChange={(e) => setRoadAccess(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any road access</option>
              {options.roadAccesses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Amenity</span>
            <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any amenity</option>
              {options.amenities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block font-medium">Utility</span>
            <select value={utility} onChange={(e) => setUtility(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400">
              <option value="">Any utility</option>
              {options.utilities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
            <span className="font-medium">Featured listings only</span>
          </label>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Search, filter, compare</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Listings</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse homes, land, rentals, and managed properties. Advanced search now covers most practical listing fields from the database.
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

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
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
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[32px] bg-white p-5 shadow-2xl">
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
