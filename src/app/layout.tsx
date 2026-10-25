import type { Metadata, Viewport } from "next";
import { Dancing_Script, Jost, Playfair_Display } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/data/site";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";
import { CvProvider } from "@/components/layout/CvProvider";

/**
 * Three faces, each with one job — matching the reference composition:
 * a light geometric sans for structure, a script for the single accent word
 * per heading, and a serif reserved for the "AI & Data Science" statement.
 */
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["200", "300", "400", "500"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
  weight: ["600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Islam El Himes | Full Stack Developer & AI Enthusiast",
    template: "%s | Islam El Himes",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: `${siteConfig.name} — Portfolio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: "Islam El Himes | Full Stack Developer & AI Enthusiast",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Islam El Himes | Full Stack Developer & AI Enthusiast",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#07040e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${dancingScript.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Stamps data-theme before first paint so the palette never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CvProvider>{children}</CvProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
