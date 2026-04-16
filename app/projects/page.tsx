import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of things I've built.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <Container>
        <header className="py-8">
          <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A selection of things I&apos;ve built. Some are personal
            experiments, others are professional work.
          </p>
        </header>
        <div className="grid gap-4 py-6 sm:grid-cols-2">
          {siteConfig.projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
