import Link from "next/link";
import { BRAND, CITIES } from "@/lib/constants";
import { getWhatsappLink } from "@/lib/utils";
import { LogoMark } from "@/components/logo-mark";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-violet-200/70 bg-[#080611] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr] lg:px-8">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-md text-sm leading-7 text-violet-100/72">
            A production-ready real-estate starter built for homes, land, rentals, and property management across Kenya.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Quick links</p>
          <div className="mt-4 space-y-3 text-sm text-violet-100/72">
            <Link href="/">Home</Link>
            <Link href="/properties" className="block">Listings</Link>
            <Link href="/services" className="block">Services</Link>
            <Link href="/agents" className="block">Agents</Link>
            <Link href="/blog" className="block">Insights</Link>
            <Link href="/contact" className="block">Contact</Link>
            <Link href="/account" className="block">My inquiries</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Coverage</p>
          <div className="mt-4 space-y-3 text-sm text-violet-100/72">
            {CITIES.map((city) => (
              <Link key={city} href={`/areas/${city.toLowerCase()}`} className="block">
                {city}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-violet-100/72">
            <a href={`tel:${BRAND.phone}`} className="block">{BRAND.displayPhone}</a>
            <a href={`mailto:${BRAND.email}`} className="block break-all">{BRAND.email}</a>
            <a href={getWhatsappLink("Hello Serena Property Group.")} target="_blank" rel="noreferrer" className="block">WhatsApp chat</a>
            <p>Nairobi HQ</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
