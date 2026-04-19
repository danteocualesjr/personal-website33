import { Rss } from "lucide-react";
import { siteConfig } from "@/content/site";
import { FooterYear } from "./FooterYear";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; <FooterYear /> {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {siteConfig.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            aria-label="Subscribe via RSS"
          >
            <Rss className="h-3.5 w-3.5" />
            <span>RSS</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
