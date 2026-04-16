import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/content/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col rounded-card border border-border bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} repository`}
              className="hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} link`}
              className="hover:text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
