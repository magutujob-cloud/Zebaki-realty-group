import { updateListingAction } from "@/app/admin/actions";
import { ListingForm } from "@/components/admin/listing-form";
import { getAdminAgents, getAdminListing } from "@/lib/queries";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [listing, agents] = await Promise.all([getAdminListing(id), getAdminAgents()]);

  return <ListingForm action={updateListingAction} agents={agents} initialData={listing} submitLabel="Save changes" />;
}
