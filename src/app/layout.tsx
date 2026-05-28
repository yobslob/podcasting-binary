import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { StatsDashboard } from "@/components/StatsDashboard";
import { PolicyModal } from "@/components/PolicyModal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Podcasting | Binary Growth",
  description:
    "Explore our podcast production, editing, and distribution strategy showcases. Premium media production and growth case studies.",
  keywords:
    "podcast production, video editing, media distribution, portfolio, creator economy, brand strategy, post production",
  openGraph: {
    title: "Podcasting | Binary Growth",
    description:
      "Explore our podcast production, editing, and distribution strategy showcases. Premium media production and growth case studies.",
    type: "website",
    url: "https://binarygrowth.org/podcasting",
    siteName: "Binary Growth",
    locale: "en_US",
    images: [
      {
        url: "https://binarygrowth.org/white_logo.png",
        width: 800,
        height: 800,
        alt: "Binary Growth Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcasting | Binary Growth",
    description:
      "Explore our podcast production, editing, and distribution strategy showcases.",
    images: ["https://binarygrowth.org/white_logo.png"],
  },
  icons: {
    icon: "/white_logo.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Podcast Production & Distribution",
  "provider": {
    "@type": "Organization",
    "name": "Binary Growth",
    "url": "https://binarygrowth.org"
  },
  "description": "Premium podcast production, master editing, guest research, packaging, and distribution services for creators and brands.",
  "areaServed": "Worldwide"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AnalyticsTracker />
        <StatsDashboard />
        <PolicyModal />
        {children}
      </body>
    </html>
  );
}
