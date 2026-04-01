import Image from "next/image";
import Link from "next/link";
import { getPostBySlug } from "@/lib/queries";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/blog" className="mb-6 inline-block text-sm font-medium text-slate-500 hover:text-slate-950">
        ← Back to insights
      </Link>

      <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <Image
          src={post.cover_image_url || "https://placehold.co/1200x800?text=Blog+Image"}
          alt={post.title}
          width={1600}
          height={900}
          className="h-[360px] w-full object-cover"
        />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.read_time_minutes || 4} min read</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{post.title}</h1>
          <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-slate-700">{post.content}</div>
        </div>
      </article>
    </section>
  );
}
