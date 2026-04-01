import Link from "next/link";
import { deleteAgentAction, deleteBlogPostAction, deleteListingAction, updateInquiryStatusAction } from "@/app/admin/actions";
import { getAdminDashboardData } from "@/lib/queries";
import { formatKES } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const { listings, agents, posts, inquiries } = await getAdminDashboardData();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Listings", value: listings.length },
          { label: "Agents", value: agents.length },
          { label: "Posts", value: posts.length },
          { label: "Inquiries", value: inquiries.length },
        ].map((item) => (
          <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Listings</h2>
          <Link href="/admin/listings/new" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">Add listing</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4">Title</th>
                <th className="pb-3 pr-4">City</th>
                <th className="pb-3 pr-4">Purpose</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-slate-100 align-top">
                  <td className="py-4 pr-4">{listing.title}</td>
                  <td className="py-4 pr-4">{listing.city}</td>
                  <td className="py-4 pr-4">{listing.purpose}</td>
                  <td className="py-4 pr-4">{formatKES(listing.price, listing.purpose)}</td>
                  <td className="py-4 pr-4">{listing.published ? "Published" : "Draft"}</td>
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/listings/${listing.id}/edit`} className="rounded-full border border-slate-200 px-3 py-1.5">Edit</Link>
                      <form action={deleteListingAction}>
                        <input type="hidden" name="id" value={listing.id} />
                        <button type="submit" className="rounded-full border border-rose-200 px-3 py-1.5 text-rose-700">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Agents</h2>
          <Link href="/admin/agents/new" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">Add agent</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <div key={agent.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-950">{agent.full_name}</p>
              <p className="mt-1 text-sm text-slate-500">{agent.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/admin/agents/${agent.id}/edit`} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm">Edit</Link>
                <form action={deleteAgentAction}>
                  <input type="hidden" name="id" value={agent.id} />
                  <button type="submit" className="rounded-full border border-rose-200 px-3 py-1.5 text-sm text-rose-700">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Blog posts</h2>
          <Link href="/admin/blog/new" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">Add post</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-950">{post.title}</p>
              <p className="mt-1 text-sm text-slate-500">{post.category} • {post.published ? "Published" : "Draft"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/admin/blog/${post.id}/edit`} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm">Edit</Link>
                <form action={deleteBlogPostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="rounded-full border border-rose-200 px-3 py-1.5 text-sm text-rose-700">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold text-slate-950">Inquiries</h2>
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-950">{inquiry.full_name}</p>
                  <p className="mt-1 text-sm text-slate-500">{inquiry.email} • {inquiry.phone}</p>
                </div>
                <p className="text-sm text-slate-500">{new Date(inquiry.created_at).toLocaleString()}</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">{inquiry.message}</p>
              <form action={updateInquiryStatusAction} className="mt-4 flex flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={inquiry.id} />
                <select name="status" defaultValue={inquiry.status || "new"} className="rounded-full border border-slate-200 px-4 py-2 text-sm">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
                <button type="submit" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">Update status</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
