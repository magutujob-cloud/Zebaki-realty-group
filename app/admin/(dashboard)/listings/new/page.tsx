import { createListingAction } from "@/app/admin/actions";
import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  return <ListingForm action={createListingAction} submitLabel="Create listing" />;
}
