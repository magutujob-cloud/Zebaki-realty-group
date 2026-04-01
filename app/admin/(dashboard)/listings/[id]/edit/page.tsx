import { updateListingAction } from "@/app/admin/actions";
import { ListingForm } from "@/components/admin/listing-form";
import { getAdminListing } from "@/lib/queries";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getAdminListing(id);

  return <ListingForm action={updateListingAction} initialData={listing} submitLabel="Save changes" />;
}
