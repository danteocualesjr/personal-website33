import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = siteConfig.metadata.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
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
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8a8aa0",
          }}
        >
          {siteConfig.role}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.25,
              color: "#c9c9d6",
              maxWidth: 960,
            }}
          >
            {siteConfig.shortBio}
          </div>
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
          <div style={{ display: "flex" }}>{siteConfig.location}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
