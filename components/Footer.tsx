import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          {siteConfig.socials.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
