import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { PostNav } from "@/components/PostNav";
import { formatContentDate } from "@/lib/dates";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/posts";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
  defaultLang: "plaintext",
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const { prev, next } = await getAdjacentPosts(slug);
  const formattedDate = formatContentDate(post.date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageTransition>
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <header className="mt-6 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <time dateTime={post.date}>{formattedDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-3 text-lg text-muted-foreground">
              {post.description}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <article className="prose mt-8 max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </article>

        <PostNav prev={prev} next={next} />
      </Container>
    </PageTransition>
  );
}
