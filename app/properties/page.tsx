import { SearchShell } from "@/components/search-shell";
import { getPublishedListings } from "@/lib/queries";

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
        initialQuery={typeof params.q === "string" ? params.q : ""}
        initialCity={typeof params.city === "string" ? params.city : "All cities"}
        initialType={typeof params.type === "string" ? params.type : "All types"}
        initialPurpose={typeof params.purpose === "string" ? params.purpose : "All purposes"}
      />
    </section>
  );
}
