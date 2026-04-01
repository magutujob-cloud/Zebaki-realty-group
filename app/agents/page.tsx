import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getAllAgents } from "@/lib/queries";

export default async function AgentsPage() {
  const agents = await getAllAgents();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="People"
        title="Meet the team"
        body="Profiles make the company feel real, accountable, and easier to trust. Replace any seed content from the database with your actual team details."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {agents.map((agent) => (
          <div key={agent.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <Image
              src={agent.image_url || "https://placehold.co/800x800?text=Agent+Photo"}
              alt={agent.full_name}
              width={800}
              height={800}
              className="h-72 w-full object-cover"
            />
            <div className="space-y-4 p-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">{agent.full_name}</h3>
                <p className="mt-1 text-sm text-slate-500">{agent.role} • {agent.city}</p>
              </div>
              <p className="text-sm leading-7 text-slate-600">{agent.bio}</p>
              <div className="flex flex-wrap gap-2">
                {(agent.specialties || []).map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-700">{item}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {agent.phone ? <a href={`tel:${agent.phone}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Call</a> : null}
                {agent.email ? <a href={`mailto:${agent.email}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Email</a> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
