import { createListingAction } from "@/app/admin/actions";
import { ListingForm } from "@/components/admin/listing-form";
import { getAdminAgents } from "@/lib/queries";

export default async function NewListingPage() {
  const agents = await getAdminAgents();

  return <ListingForm action={createListingAction} agents={agents} submitLabel="Create listing" />;
}
