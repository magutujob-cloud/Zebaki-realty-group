import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCustomerSession } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serena Property Group",
  description: "Property sales, rentals, and management across major Kenyan cities.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCustomerSession();

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fcfcfb] text-slate-950 antialiased">
        <SiteHeader isSignedIn={Boolean(user)} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
