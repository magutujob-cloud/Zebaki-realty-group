import { BarChart3, Building2, Home, Landmark, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Core services"
        title="Sales, rentals, and management under one brand"
        body="The platform should do more than show inventory. It should also convert owners, investors, and tenants through clear service positioning."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Home, title: "Property sales", text: "Support for buyers and sellers across homes, land, and select commercial opportunities." },
          { icon: Landmark, title: "Land advisory", text: "Discovery, due diligence support, title guidance, and investment-led evaluation." },
          { icon: Building2, title: "Rentals & lettings", text: "Marketing, inquiry management, viewings, tenant matching, and leasing support." },
          { icon: ShieldCheck, title: "Property management", text: "Tenant relations, maintenance oversight, collections, owner reporting, and operational support." },
        ].map((item) => (
          <div key={item.title} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <item.icon className="h-9 w-9 text-slate-500" />
            <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          eyebrow="Commercial logic"
          title="Why this page matters"
          body="Service pages are lead-generation pages. They are especially important for attracting owners who want to list, rent out, or professionally manage property."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Add proof points such as years of experience, occupancy levels, or average response times once available.",
            "Use management case studies to show how Zebaki handles tenants, maintenance, and owner reporting.",
            "Include a dedicated valuation or management proposal form once you finalize the operating model.",
          ].map((text) => (
            <div key={text} className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
