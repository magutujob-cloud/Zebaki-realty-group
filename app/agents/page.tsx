import { SectionHeading } from "@/components/section-heading";
import { AgentCard } from "@/components/agent-card";
import { getAllAgents } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const allPeople = await getAllAgents();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="People"
        title="People"
        body="Meet the people behind Serena Property Group. As your team grows, this page can continue to showcase everyone in one place."
      />

      <div className="mt-10">
        {allPeople.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {allPeople.map((person) => (
              <AgentCard key={person.id} agent={person} imageFallbackText="Team+Photo" />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm leading-7 text-slate-600">
            No people profiles yet. Start with <strong>Admin - New agent</strong>, add the person's details, and upload a profile photo from your computer.
          </div>
        )}
      </div>
    </section>
  );
}
