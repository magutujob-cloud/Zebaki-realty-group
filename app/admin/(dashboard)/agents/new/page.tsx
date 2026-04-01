import { createAgentAction } from "@/app/admin/actions";
import { AgentForm } from "@/components/admin/agent-form";

export default function NewAgentPage() {
  return <AgentForm action={createAgentAction} submitLabel="Create agent" />;
}
