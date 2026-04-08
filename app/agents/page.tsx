import { SectionHeading } from "@/components/section-heading";
import { AgentCard } from "@/components/agent-card";
import { getAllAgents } from "@/lib/queries";
import { splitPeople } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const allPeople = await getAllAgents();
  const { leadership, agents } = splitPeople(allPeople);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="People"
        title="Leadership and agents"
        body="Use Admin - New agent for both your leadership team and your field agents. CEO and director roles are shown separately here automatically."
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
                <AgentCard key={person.id} agent={person} imageFallbackText="Leadership+Photo" />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600">
              No leadership profiles yet. Add your CEO and directors from <strong>Admin - New agent</strong>. Use role titles like <strong>CEO</strong>, <strong>Director</strong>, <strong>Founder</strong>, or <strong>Managing Director</strong>.
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
                <AgentCard key={agent.id} agent={agent} imageFallbackText="Agent+Photo" />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600">
              No agent profiles yet. Start with <strong>Admin - New agent</strong>, add the person's details, and upload a profile photo from your computer.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
