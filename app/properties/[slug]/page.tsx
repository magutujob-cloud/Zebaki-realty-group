import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Download, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { getListingBySlug, getPublishedListings } from "@/lib/queries";
import { getCustomerSession } from "@/lib/auth";
import { formatKES, getWhatsappLink, mapEmbedUrl } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { PropertyCard } from "@/components/property-card";

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const listing = await getListingBySlug(slug);
  const related = (await getPublishedListings()).filter((item) => item.city === listing.city && item.id !== listing.id).slice(0, 3);
  const { user, profile } = await getCustomerSession();
  const success = query.success === "1";

  const gallery = listing.gallery_urls?.length ? listing.gallery_urls : [listing.cover_image_url].filter(Boolean);
  const brochureHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(`Brochure request - ${listing.title}`)}&body=${encodeURIComponent(`Hello Serena Property Group,\n\nPlease send me the brochure for ${listing.title} in ${listing.area}, ${listing.city}.`)}`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/properties" className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to listings
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Image
            src={gallery[0] || "https://placehold.co/1200x800?text=Property+Photo"}
            alt={listing.title}
            width={1400}
            height={900}
            className="h-[420px] w-full rounded-[32px] object-cover shadow-sm"
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {gallery.slice(0, 3).map((image) => (
              <Image key={image} src={image || "https://placehold.co/1200x800?text=Property+Photo"} alt={listing.title} width={800} height={600} className="h-32 w-full rounded-[24px] object-cover" />
            ))}
          </div>

          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">{listing.purpose}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{listing.property_type}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{listing.status}</span>
                </div>
                <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{listing.title}</h1>
                <div className="mt-3 flex items-center gap-2 text-slate-600">
                  <MapPin className="h-5 w-5" />
                  <span>{listing.area}, {listing.city}</span>
                </div>
              </div>
              <p className="text-3xl font-semibold text-slate-950">{formatKES(listing.price, listing.purpose)}</p>
            </div>

            <div className="mt-6 grid gap-4 rounded-[28px] bg-slate-50 p-5 sm:grid-cols-4">
              <div><p className="text-sm text-slate-500">Bedrooms</p><p className="mt-2 text-lg font-semibold text-slate-950">{listing.bedrooms || "-"}</p></div>
              <div><p className="text-sm text-slate-500">Bathrooms</p><p className="mt-2 text-lg font-semibold text-slate-950">{listing.bathrooms || "-"}</p></div>
              <div><p className="text-sm text-slate-500">Size</p><p className="mt-2 text-lg font-semibold text-slate-950">{listing.size_label || "-"}</p></div>
              <div><p className="text-sm text-slate-500">Title status</p><p className="mt-2 text-lg font-semibold text-slate-950">{listing.title_status || "-"}</p></div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">About this property</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{listing.description}</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">Property highlights</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(listing.amenities || []).map((item) => (
                        <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">Land and legal details</h3>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p><span className="font-medium text-slate-950">Zoning:</span> {listing.zoning || "-"}</p>
                      <p><span className="font-medium text-slate-950">Road access:</span> {listing.road_access || "-"}</p>
                      <p><span className="font-medium text-slate-950">Utilities:</span> {(listing.utilities || []).join(", ") || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Take action</p>
                <div className="mt-4 space-y-3">
                  <a href={`tel:${BRAND.phone}`} className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"><Phone className="h-4 w-4" />Call now</a>
                  <a href={getWhatsappLink(`Hello Serena Property Group. I am interested in ${listing.title} in ${listing.area}, ${listing.city}.`)} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"><MessageCircle className="h-4 w-4" />WhatsApp</a>
                  <a href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`Viewing request - ${listing.title}`)}&body=${encodeURIComponent(`Hello Serena Property Group,\n\nI would like to book a viewing for ${listing.title} in ${listing.area}, ${listing.city}.`)}`} className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"><CalendarDays className="h-4 w-4" />Book viewing</a>
                  <a href={brochureHref} className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"><Download className="h-4 w-4" />Request brochure</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Send an inquiry</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Use the form below to ask about availability, a viewing, or related options.
            </p>
            {success ? (
              <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Your inquiry has been submitted successfully.
              </div>
            ) : null}
            {!user ? (
              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                Create a client account if you want to track this inquiry from your dashboard later.
              </div>
            ) : null}
            <div className="mt-6">
              <ContactForm
                listingId={listing.id}
                returnTo={`/properties/${listing.slug}`}
                signedIn={Boolean(user)}
                defaultValues={{
                  full_name: profile?.full_name,
                  email: profile?.email || user?.email || null,
                  phone: profile?.phone,
                  city: profile?.city,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <iframe title="Property map" className="h-80 w-full" loading="lazy" src={mapEmbedUrl(listing.map_query || `${listing.area} ${listing.city} Kenya`)} />
          </div>
          <MortgageCalculator compact />
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Related listings</h3>
            <div className="mt-4 space-y-4">
              {related.map((item) => (
                <PropertyCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
