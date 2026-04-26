import type { Metadata } from "next";
import { Crimson_Pro, DM_Sans } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
import { ThemeStyle } from "@/components/site/ThemeStyle";
import { layoutSiteMeta } from "@/content/pageCopy";
import { getSiteSettings } from "@/lib/cms";
import { getSiteUrl } from "@/lib/siteUrl";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const titleDefault = `${settings.brandName} | Talk to verified lawyers`;
  const baseTitle = layoutSiteMeta.title;
  const inheritedTitle =
    baseTitle && typeof baseTitle === "object" && "default" in baseTitle && baseTitle.default
      ? baseTitle
      : { default: titleDefault, template: `%s | ${settings.brandName}` };

  return {
    metadataBase: getSiteUrl(),
    ...layoutSiteMeta,
    title: inheritedTitle,
    icons: settings.favicon?.url
      ? {
          icon: [{ url: settings.favicon.url }],
        }
      : layoutSiteMeta.icons,
    openGraph: {
      ...layoutSiteMeta.openGraph,
      images: settings.ogImage?.url
        ? [
            {
              url: settings.ogImage.url,
              alt: settings.ogImage.alt || settings.brandName,
            },
          ]
        : layoutSiteMeta.openGraph?.images,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${crimson.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <ThemeStyle settings={settings} />
      </head>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
