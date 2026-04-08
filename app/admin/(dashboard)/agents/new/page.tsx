import { createAgentFormAction } from "@/app/admin/actions";
import { AgentForm } from "@/components/admin/agent-form";

export default function NewAgentPage() {
  return <AgentForm action={createAgentFormAction} submitLabel="Create agent" />;
}
