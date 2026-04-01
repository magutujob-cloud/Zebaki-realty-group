import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { CITIES } from "@/lib/constants";
import { getPublishedListings } from "@/lib/queries";
import { toTitleCase } from "@/lib/utils";

export default async function AreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: cityParam } = await params;
  const city = toTitleCase(cityParam);

  if (!CITIES.includes(city)) {
    notFound();
  }

  const listings = (await getPublishedListings()).filter((listing) => listing.city === city);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Area guide"
        title={`Property in ${city}`}
        body={`Use this page as a starting point for ${city}-specific listings, neighborhood highlights, and practical buyer or tenant guidance.`}
      />

      <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-base leading-8 text-slate-600">
              This area page is intentionally structured for later expansion. Add local pricing trends, transport links, schools, utilities, investor notes, and neighborhood-level content over time.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Current live listings</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{listings.length}</p>
            <Link href={`/properties?city=${encodeURIComponent(city)}`} className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
              Browse {city}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
