import Image from "next/image";
import Link from "next/link";
import type { Agent } from "@/lib/types";
import { getAgentPath } from "@/lib/utils";

type Props = {
  agent: Agent;
  imageFallbackText: string;
  showBio?: boolean;
};

export function AgentCard({ agent, imageFallbackText, showBio = true }: Props) {
  const profilePath = getAgentPath(agent);

  return (
    <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1">
      <Link href={profilePath} className="block">
        <Image
          src={agent.image_url || `https://placehold.co/800x800?text=${imageFallbackText}`}
          alt={agent.full_name}
          width={800}
          height={800}
          className="h-72 w-full object-cover"
        />
      </Link>
      <div className="space-y-4 p-6">
        <div>
          <Link href={profilePath} className="text-xl font-semibold text-slate-950 transition hover:text-slate-700">
            {agent.full_name}
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            {agent.role}
            {agent.city ? ` - ${agent.city}` : ""}
          </p>
        </div>
        {showBio ? <p className="text-sm leading-7 text-slate-600">{agent.bio}</p> : null}
        <div className="flex flex-wrap gap-2">
          {(agent.specialties || []).map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-700">
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Sales</p>
            <p className="mt-1 font-semibold text-slate-950">{agent.sales_count ?? 0}+</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Experience</p>
            <p className="mt-1 font-semibold text-slate-950">{agent.years_experience ?? 0}+ yrs</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={profilePath} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
            View profile
          </Link>
          {agent.phone ? (
            <a href={`tel:${agent.phone}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
              Call
            </a>
          ) : null}
          {agent.email ? (
            <a href={`mailto:${agent.email}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
              Email
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
