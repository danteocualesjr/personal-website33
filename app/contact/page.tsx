import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
  },
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Container>
        <header className="py-8">
          <h1 className="text-4xl font-semibold tracking-tight">Get in touch</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Have a question, a project idea, or just want to say hi? Send a
            note and I&apos;ll get back to you.
          </p>
        </header>

        <div className="grid gap-12 py-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm email={siteConfig.email} />
          </div>
          <aside className="space-y-8 md:pt-2">
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
                Social
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
        </div>
      </Container>
    </PageTransition>
  );
}
