import { updateBlogPostAction } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/blog-form";
import { getAdminPost } from "@/lib/queries";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminPost(id);

  return <BlogForm action={updateBlogPostAction} initialData={post} submitLabel="Save changes" />;
}
