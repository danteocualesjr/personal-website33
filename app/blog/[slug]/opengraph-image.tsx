import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";
import { getPostBySlug } from "@/lib/posts";

export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function BlogPostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "Writing";
  const description = post?.description ?? "";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0b0f 0%, #131320 50%, #1a1a2e 100%)",
          color: "#f5f5f7",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8a8aa0",
          }}
        >
          <span>{siteConfig.name}</span>
          <span style={{ color: "#3a3a4a" }}>/</span>
          <span>Writing</span>
          {date && (
            <>
              <span style={{ color: "#3a3a4a" }}>/</span>
              <span style={{ letterSpacing: "0.15em" }}>{date}</span>
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.3,
                color: "#c9c9d6",
                maxWidth: 1000,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8a8aa0",
          }}
        >
          <div style={{ display: "flex" }}>
            {siteConfig.metadata.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex" }}>{siteConfig.role}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
