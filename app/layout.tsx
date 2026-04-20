import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Liquid Waste Removal & Vacuum Truck Services Canada`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Licensed liquid waste removal, grease trap cleaning, septic pumping, hydrovac, and industrial vacuum truck services across Canada.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Liquid Waste Removal & Vacuum Truck Services Canada`,
    description:
      "Canada-wide liquid waste removal, industrial pumping, hydrovac, and drainage service pages built for local search and direct response.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Canada-Wide Liquid Waste Services`,
    description: "Local liquid waste, vacuum truck, septic, and drainage service pages across Canada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
