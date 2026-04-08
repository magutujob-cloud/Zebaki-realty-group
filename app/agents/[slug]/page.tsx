import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { getAgentBySlug, getAllAgents, getPublishedListingsByAgent } from "@/lib/queries";
import { getAgentPath } from "@/lib/utils";

export async function generateStaticParams() {
  const agents = await getAllAgents();
  return agents.map((agent) => ({ slug: getAgentPath(agent).split("/").pop() || "" }));
}

export default async function AgentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  const listings = await getPublishedListingsByAgent(agent.id);

  const featuredListings = listings.filter((item) => item.featured).length;
  const saleListings = listings.filter((item) => item.purpose === "Sale").length;
  const citiesCovered = new Set([agent.city, ...listings.map((item) => item.city)].filter(Boolean)).size;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
          <Image
            src={agent.image_url || "https://placehold.co/1200x1200?text=Agent+Profile"}
            alt={agent.full_name}
            width={1200}
            height={1200}
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Trusted advisor</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{agent.full_name}</h1>
            <p className="mt-3 text-lg text-white/75">
              {agent.role}
              {agent.city ? ` in ${agent.city}` : ""}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">{agent.bio}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {agent.phone ? (
                <a href={`tel:${agent.phone}`} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950">
                  Call agent
                </a>
              ) : null}
              {agent.email ? (
                <a href={`mailto:${agent.email}`} className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white">
                  Email agent
                </a>
              ) : null}
              <Link href="/properties" className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white">
                Browse listings
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Sales recorded", value: `${agent.sales_count ?? 0}+` },
              { label: "Years of experience", value: `${agent.years_experience ?? 0}+` },
              { label: "Active listings", value: `${listings.length}` },
              { label: "Featured stock", value: `${featuredListings}` },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                eyebrow="Why clients trust this agent"
                title="Profile highlights"
                body="Clear expertise, reachable contact details, and current property inventory all help buyers and sellers move with more confidence."
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {(agent.specialties || []).map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <ShieldCheck className="h-6 w-6 text-slate-500" />
                  <p className="mt-3 font-semibold text-slate-950">Market coverage</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Supporting clients across {citiesCovered || 1} market{citiesCovered === 1 ? "" : "s"} with {saleListings} sale listing{saleListings === 1 ? "" : "s"} currently represented.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <Star className="h-6 w-6 text-slate-500" />
                  <p className="mt-3 font-semibold text-slate-950">Client-ready support</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This profile combines expertise, published inventory, and direct contact channels so clients can evaluate the agent before reaching out.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Reach out directly</h2>
              <div className="mt-6 space-y-4">
                {agent.phone ? (
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>{agent.phone}</span>
                  </a>
                ) : null}
                {agent.email ? (
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>{agent.email}</span>
                  </a>
                ) : null}
                {agent.city ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{agent.city}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Current inventory"
            title={`Listings represented by ${agent.full_name}`}
            body="Give clients an immediate view of the homes, rentals, and land opportunities this agent is actively handling."
          />
        </div>

        {listings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No listings are assigned to this agent yet. Link listings to this profile from the admin dashboard to populate this section.
          </div>
        )}
      </div>
    </section>
  );
}
