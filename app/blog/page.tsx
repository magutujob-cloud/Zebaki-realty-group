import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getPublishedPosts } from "@/lib/queries";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Insights"
        title="Content that builds search visibility and buyer trust"
        body="Use this section for area guides, buyer education, land due-diligence notes, rental tips, and owner-focused management insights."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <Image
              src={post.cover_image_url || "https://placehold.co/1200x800?text=Blog+Image"}
              alt={post.title}
              width={1200}
              height={800}
              className="h-64 w-full object-cover"
            />
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.read_time_minutes || 4} min read</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-950">{post.title}</h2>
              <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
