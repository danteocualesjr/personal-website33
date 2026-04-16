import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        base: "var(--font-size-base, 1rem)",
      },
      backgroundImage: {
        "theme-gradient": "var(--bg-gradient, none)",
      },
      boxShadow: {
        card: "var(--shadow-card, 0 1px 2px rgba(0,0,0,0.04))",
      },
      borderRadius: {
        card: "var(--radius-card, 0.5rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
