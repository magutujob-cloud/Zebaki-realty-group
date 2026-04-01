"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  interest: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  message: z.string().min(5),
  listing_id: z.string().uuid().optional().or(z.literal("")).nullable(),
});

export async function createInquiryAction(formData: FormData) {
  const parsed = inquirySchema.parse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    interest: formData.get("interest"),
    city: formData.get("city"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    listing_id: formData.get("listing_id"),
  });

  const supabase = await createClient();

  await supabase.from("inquiries").insert({
    full_name: parsed.full_name,
    email: parsed.email,
    phone: parsed.phone || null,
    interest: parsed.interest || "General inquiry",
    city: parsed.city || null,
    budget: parsed.budget || null,
    message: parsed.message,
    listing_id: parsed.listing_id || null,
  });

  redirect("/contact?success=1");
}
