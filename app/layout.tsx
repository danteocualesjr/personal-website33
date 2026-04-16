import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.metadata.url),
  title: {
    default: siteConfig.metadata.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.metadata.description,
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    url: siteConfig.metadata.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 py-12">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
