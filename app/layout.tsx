import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/reveal";
import { meta } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

// Site-wide defaults. Pages set their own title, description, canonical and
// Open Graph via pageMetadata() in lib/metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: meta.title, template: `%s | ${site.name}` },
  description: meta.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website", images: [site.ogImage] },
  twitter: { card: "summary_large_image", images: [{ url: site.ogImage.url, alt: site.ogImage.alt }] },
  formatDetection: { telephone: false },
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} dark h-full antialiased`}>
      <head>
        {/* Clash Display is served by Fontshare, not Google Fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
