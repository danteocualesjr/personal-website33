import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-2 rounded-card border border-border bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-3">
        <time
          dateTime={post.date}
          className="text-xs uppercase tracking-wide text-muted-foreground"
        >
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{post.title}</h3>
      <p className="text-sm text-muted-foreground">{post.description}</p>
    </Link>
  );
}
