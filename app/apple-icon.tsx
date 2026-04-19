import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const initial = siteConfig.name.trim().charAt(0).toUpperCase() || "·";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0b0b0f 0%, #131320 50%, #1a1a2e 100%)",
          color: "#f5f5f7",
          fontSize: 120,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {initial}
      </div>
    ),
    { ...size }
  );
}
