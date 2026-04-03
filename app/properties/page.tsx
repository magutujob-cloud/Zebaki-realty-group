import { SearchShell } from "@/components/search-shell";
import { getPublishedListings } from "@/lib/queries";

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
  fallback = "",
) {
  return typeof params[key] === "string" ? params[key] : fallback;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const listings = await getPublishedListings();
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchShell
        listings={listings}
        initialQuery={getParam(params, "q")}
        initialCity={getParam(params, "city", "All cities")}
        initialArea={getParam(params, "area")}
        initialType={getParam(params, "type", "All types")}
        initialPurpose={getParam(params, "purpose", "All purposes")}
        initialStatus={getParam(params, "status")}
        initialZoning={getParam(params, "zoning")}
        initialTitleStatus={getParam(params, "title_status")}
        initialRoadAccess={getParam(params, "road_access")}
        initialAmenity={getParam(params, "amenity")}
        initialUtility={getParam(params, "utility")}
        initialMinPrice={getParam(params, "min_price")}
        initialMaxPrice={getParam(params, "max_price")}
        initialMinBedrooms={getParam(params, "bedrooms_min")}
        initialMinBathrooms={getParam(params, "bathrooms_min")}
        initialFeaturedOnly={getParam(params, "featured") === "1"}
        initialSort={getParam(params, "sort", "featured")}
        initialAdvanced={getParam(params, "advanced") === "1"}
      />
    </section>
  );
}
