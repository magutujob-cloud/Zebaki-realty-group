import { updateAgentAction } from "@/app/admin/actions";
import { AgentForm } from "@/components/admin/agent-form";
import { getAdminAgent } from "@/lib/queries";

export default async function EditAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAdminAgent(id);

  return <AgentForm action={updateAgentAction} initialData={agent} submitLabel="Save changes" />;
}
