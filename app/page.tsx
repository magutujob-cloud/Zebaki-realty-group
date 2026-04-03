import Image from "next/image";
import Link from "next/link";
import { BarChart3, Building2, Handshake, HousePlus, Map, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { getAllAgents, getFeaturedListings, getPublishedListings } from "@/lib/queries";
import { SectionHeading } from "@/components/section-heading";
import { PropertyCard } from "@/components/property-card";
import { CITIES } from "@/lib/constants";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { getWhatsappLink, splitPeople } from "@/lib/utils";

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
          <div className="overflow-hidden rounded-[36px] bg-slate-950 p-8 text-white shadow-2xl sm:p-10 lg:p-12">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/80">
              Nairobi based • Nationwide reach
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Find homes, land, rentals, and property support that fit real life.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Serena Property Group helps buyers, tenants, investors, and property owners across Nairobi, Nakuru, Kisumu, Kisii, Mombasa, Nyeri, and Eldoret.
            </p>

            <form action="/properties" className="mt-8 rounded-[28px] bg-white p-4 text-slate-950 sm:p-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="block text-sm text-slate-700">
                  <span className="mb-2 block font-medium">Keyword</span>
                  <input name="q" placeholder="House, land, area..." className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
                </label>
                <label className="block text-sm text-slate-700">
                  <span className="mb-2 block font-medium">City</span>
                  <select name="city" defaultValue="All cities" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                    <option>All cities</option>
                    {CITIES.map((city) => <option key={city}>{city}</option>)}
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  <span className="mb-2 block font-medium">Property type</span>
                  <select name="type" defaultValue="All types" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                    <option>All types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Land</option>
                    <option>Commercial</option>
                  </select>
                </label>
                <label className="block text-sm text-slate-700">
                  <span className="mb-2 block font-medium">Purpose</span>
                  <select name="purpose" defaultValue="All purposes" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                    <option>All purposes</option>
                    <option>Sale</option>
                    <option>Rent</option>
                    <option>Manage</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white">
                  <Search className="h-4 w-4" />
                  Search properties
                </button>
                <a
                  href={getWhatsappLink("Hello Serena Property Group. Please help me find a property.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Quick help on WhatsApp
                </a>
              </div>
            </form>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Live listings", value: `${listings.length}+` },
                { label: "Cities covered", value: `${CITIES.length}` },
                { label: "Contact channels", value: "Phone • Email • WhatsApp" },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Live preview</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-950">Map of focus area</h3>
                </div>
                <Map className="h-8 w-8 text-slate-400" />
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
          <Link href="/properties" className="hidden rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 md:inline-flex">
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
              <div key={person.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                <Image
                  src={person.image_url || "https://placehold.co/800x800?text=Leadership+Photo"}
                  alt={person.full_name}
                  width={800}
                  height={800}
                  className="h-72 w-full object-cover"
                />
                <div className="space-y-3 p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{person.full_name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{person.role}</p>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{person.bio}</p>
                </div>
              </div>
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
              <a href="mailto:magutujob@gmail.com?subject=Property%20listing%20request" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">Email us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
