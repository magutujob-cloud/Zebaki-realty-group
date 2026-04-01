import { createBlogPostAction } from "@/app/admin/actions";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return <BlogForm action={createBlogPostAction} submitLabel="Create post" />;
}
