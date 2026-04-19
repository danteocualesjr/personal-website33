import { siteConfig } from "@/content/site";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = siteConfig.metadata.url.replace(/\/$/, "");
  const posts = await getAllPosts();

  const fullPosts = await Promise.all(
    posts.map((p) => getPostBySlug(p.slug))
  );

  const lastUpdated =
    posts[0]?.date ?? new Date().toISOString();

  const entries = fullPosts
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const published = new Date(post.date).toISOString();
      const summary = post.description || post.content.slice(0, 280);
      const categories = (post.tags ?? [])
        .map((t) => `<category term="${escapeXml(t)}" />`)
        .join("");
      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <updated>${published}</updated>
    <published>${published}</published>
    <summary type="html">${escapeXml(summary)}</summary>
    ${categories}
  </entry>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteConfig.metadata.title)}</title>
  <subtitle>${escapeXml(siteConfig.metadata.description)}</subtitle>
  <link href="${base}" />
  <link rel="self" href="${base}/feed.xml" type="application/atom+xml" />
  <id>${base}/</id>
  <updated>${new Date(lastUpdated).toISOString()}</updated>
  <author>
    <name>${escapeXml(siteConfig.name)}</name>
    <email>${escapeXml(siteConfig.email)}</email>
  </author>${entries}
</feed>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
