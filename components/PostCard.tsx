import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-card border border-border bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{post.title}</h3>
      {post.description && (
        <p className="text-sm text-muted-foreground">{post.description}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
