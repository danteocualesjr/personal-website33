import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, notes, and writing.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <PageTransition>
      <Container>
        <header className="py-8">
          <h1 className="text-4xl font-semibold tracking-tight">Writing</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Occasional notes on software, design, and whatever else is on my
            mind.
          </p>
        </header>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4 py-6 sm:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </Container>
    </PageTransition>
  );
}
