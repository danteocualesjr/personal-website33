import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About",
  description: `About ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <PageTransition>
      <Container>
        <header className="py-8">
          <h1 className="text-4xl font-semibold tracking-tight">About</h1>
          <p className="mt-3 text-muted-foreground">
            A little bit about who I am and what I do.
          </p>
        </header>

        <section className="grid gap-12 py-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-5 text-base leading-relaxed">
              {siteConfig.longBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Location
              </h2>
              <p className="mt-2">{siteConfig.location}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Email
              </h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Elsewhere
              </h2>
              <ul className="mt-2 space-y-1">
                {siteConfig.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {siteConfig.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <ol className="mt-6 space-y-8 border-l border-border pl-6">
            {siteConfig.experience.map((exp, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">
                    {exp.role}{" "}
                    <span className="text-muted-foreground">
                      · {exp.company}
                    </span>
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">{exp.summary}</p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </PageTransition>
  );
}
