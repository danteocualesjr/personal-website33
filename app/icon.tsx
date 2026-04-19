import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
            "linear-gradient(135deg, #0b0b0f 0%, #1a1a2e 100%)",
          color: "#f5f5f7",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          borderRadius: 6,
        }}
      >
        {initial}
      </div>
    ),
    { ...size }
  );
}
