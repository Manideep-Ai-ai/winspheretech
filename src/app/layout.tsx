import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { contactInfo } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://www.winspheretech.com";
const title = "Digital Marketing & IT Solutions for Businesses | WinSphere Technologies";
const description =
  "WinSphere Technologies provides digital marketing and IT solutions for businesses, including SEO, social media, AI, software, data, cloud and IT staffing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "WinSphere Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WinSphere Technologies",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
  sameAs: contactInfo.social.map((s) => s.url),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contactInfo.phone,
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WinSphere Technologies",
  url: siteUrl,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
