import type { Metadata } from "next";
import { Crimson_Pro, DM_Sans } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "LexBridge | Talk to verified lawyers",
    template: "%s | LexBridge",
  },
  description:
    "LexBridge connects you with verified advocates for real legal work—diligence, disputes, compliance, and counsel across India. Confidential chat or call intake.",
  openGraph: {
    title: "LexBridge | Talk to verified lawyers",
    description:
      "Verified advocates for legal work across India—confidential consultations and practical guidance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LexBridge | Talk to verified lawyers",
    description:
      "Verified advocates for legal work across India—confidential consultations and practical guidance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimson.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
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
