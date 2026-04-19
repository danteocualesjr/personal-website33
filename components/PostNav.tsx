import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

type Props = {
  prev: PostMeta | null;
  next: PostMeta | null;
};

export function PostNav({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 shadow-card transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground">
            <ArrowLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="line-clamp-2 text-sm font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 rounded-card border border-border bg-card p-4 text-right shadow-card transition-transform duration-200 hover:-translate-y-0.5 sm:items-end"
        >
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground">
            Next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="line-clamp-2 text-sm font-medium">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
