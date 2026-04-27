import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        Back home
      </Link>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <Link href="/about" className="hover:text-foreground">
          About
        </Link>
        <Link href="/projects" className="hover:text-foreground">
          Projects
        </Link>
        <Link href="/blog" className="hover:text-foreground">
          Blog
        </Link>
        <Link href="/contact" className="hover:text-foreground">
          Contact
        </Link>
      </div>
    </Container>
  );
}
