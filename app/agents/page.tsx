import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getAllAgents } from "@/lib/queries";
import { splitPeople } from "@/lib/utils";

export default async function AgentsPage() {
  const allPeople = await getAllAgents();
  const { leadership, agents } = splitPeople(allPeople);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="People"
        title="Leadership and agents"
        body="Use Admin → New agent for both your leadership team and your field agents. CEO and director roles are shown separately here automatically."
      />

      <div className="mt-10 space-y-14">
        <div>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Leadership team</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                This section is ideal for your CEO, directors, founder, and other senior leadership profiles.
              </p>
            </div>
          </div>
          {leadership.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {leadership.map((person) => (
                <div key={person.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={person.image_url || "https://placehold.co/800x800?text=Leadership+Photo"}
                    alt={person.full_name}
                    width={800}
                    height={800}
                    className="h-72 w-full object-cover"
                  />
                  <div className="space-y-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{person.full_name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{person.role}{person.city ? ` • ${person.city}` : ""}</p>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{person.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {(person.specialties || []).map((item) => (
                        <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-700">{item}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {person.phone ? <a href={`tel:${person.phone}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Call</a> : null}
                      {person.email ? <a href={`mailto:${person.email}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">Email</a> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600">
              No leadership profiles yet. Add your CEO and directors from <strong>Admin → New agent</strong>. Use role titles like <strong>CEO</strong>, <strong>Director</strong>, <strong>Founder</strong>, or <strong>Managing Director</strong>.
            </div>
          )}
        </div>

        <div>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">Sales and field agents</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                These are the agents and advisors clients can contact for listings, viewings, rentals, and local market support.
              </p>
            </div>
          </div>
          {agents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                      <p className="mt-1 text-sm text-slate-500">{agent.role}{agent.city ? ` • ${agent.city}` : ""}</p>
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
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600">
              No agent profiles yet. Start with <strong>Admin → New agent</strong>, add the person’s details, and upload a profile photo from your computer.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
