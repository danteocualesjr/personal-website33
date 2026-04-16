import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { siteConfig } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const featured = siteConfig.projects.filter((p) => p.featured).slice(0, 3);
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <PageTransition>
      <Container>
        <section className="py-12 sm:py-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {siteConfig.role}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hi, I&apos;m {siteConfig.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {siteConfig.shortBio}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <section className="py-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="py-12">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Latest writing
              </h2>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                All posts →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </PageTransition>
  );
}
