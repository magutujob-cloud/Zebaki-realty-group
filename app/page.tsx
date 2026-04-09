import Link from "next/link";
import { BarChart3, Building2, Handshake, HousePlus, Map, Search, ShieldCheck } from "lucide-react";
import { getAllAgents, getFeaturedListings, getPublishedListings } from "@/lib/queries";
import { AgentCard } from "@/components/agent-card";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { BRAND, CITIES } from "@/lib/constants";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { splitPeople } from "@/lib/utils";
import { HomeSearchForm } from "@/components/home-search-form";

export default async function HomePage() {
  const [featuredListings, listings, people] = await Promise.all([
    getFeaturedListings(),
    getPublishedListings(),
    getAllAgents(),
  ]);
  const { leadership } = splitPeople(people);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[36px] bg-[linear-gradient(145deg,#04050d_0%,#090611_54%,#160828_100%)] p-8 text-white shadow-[0_32px_90px_rgba(10,5,26,0.45)] sm:p-10 lg:p-12">
            <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-100">
              Nairobi based • Nationwide reach
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find homes, land, rentals, and property support that fit real life.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              Serena Property Group helps buyers, tenants, investors, and property owners across Nairobi, Nakuru, Kisumu, Kisii, Kiambu, and Nyandarua.
            </p>

            <HomeSearchForm listings={listings} />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Live listings", value: `${listings.length}+` },
                { label: "Cities covered", value: `${CITIES.length}` },
                { label: "Contact channels", value: "Phone • Email • WhatsApp" },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-violet-300/12 bg-white/5 p-5">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-violet-100/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-violet-200/80 bg-white shadow-sm">
            <div className="border-b border-violet-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-violet-700">Live preview</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-950">Map of focus area</h3>
                </div>
                <Map className="h-8 w-8 text-violet-500" />
              </div>
            </div>
            <iframe title="Map" className="h-[430px] w-full" loading="lazy" src="https://www.google.com/maps?q=Nairobi%20Kenya&output=embed" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured inventory"
            title="A strong starting mix of homes, land, and rentals"
            body="This project ships with a real database structure. Add or edit listings from the admin dashboard once Supabase is connected."
          />
          <Link href="/properties" className="hidden rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-medium text-violet-900 md:inline-flex">
            View all listings
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Why Serena"
            title="Built for practical property journeys, not just beautiful pages"
            body="The stack supports search-led discovery, real admin auth, persistent data, image storage, and clear paths for buyers, tenants, investors, and owners."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Search, title: "Search-first experience", text: "Search, filters, maps, and clear separation between homes, land, rentals, and management." },
              { icon: ShieldCheck, title: "Admin-protected CMS", text: "Admin login is handled with Supabase Auth and row-level security, not local browser storage." },
              { icon: HousePlus, title: "Production-ready backend", text: "Listings, agents, blog posts, inquiries, and images can be managed inside Supabase." },
              { icon: Handshake, title: "Owner and tenant journeys", text: "The site supports property sales, rental inquiries, and property management lead generation." },
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <item.icon className="h-8 w-8 text-slate-500" />
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the CEO and directors"
            body="This section is powered by the same People database as your agents. Anyone whose role contains CEO, Director, Founder, Managing Director, Chair, or Head of will show here automatically."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {leadership.length > 0 ? leadership.slice(0, 3).map((person) => (
              <AgentCard key={person.id} agent={person} imageFallbackText="Leadership+Photo" showBio={false} />
            )) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600 md:col-span-2 xl:col-span-3">
                Add your CEO and directors from <strong>Admin → New agent</strong>. Use role titles like <strong>CEO</strong>, <strong>Director</strong>, or <strong>Managing Director</strong> and they will appear here automatically.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <MortgageCalculator />
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Seller & owner CTA"
              title="Need to sell, let, or manage a property?"
              body="Use this section to attract owners as well as buyers. That is especially important because property management and listings supply compound over time."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Building2, title: "List your property", text: "Show homes, land, and commercial spaces to qualified buyers and tenants." },
                { icon: HousePlus, title: "Rental support", text: "Let us help place tenants and market vacancies faster." },
                { icon: ShieldCheck, title: "Property management", text: "Rent collection, tenant support, maintenance coordination, and reporting." },
                { icon: BarChart3, title: "Investment advisory", text: "Guidance on land, homes, and mixed-use opportunities across priority cities." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                  <item.icon className="h-6 w-6 text-slate-500" />
                  <h3 className="mt-3 font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">Talk to our team</Link>
              <a href={`mailto:${BRAND.email}?subject=Property%20listing%20request`} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">Email us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
