import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieNotice } from "@/components/layout/cookie-notice";
import { PrivacyAnalytics } from "@/components/layout/privacy-analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://michellecarter.ie"),
  title: {
    default: "Michelle Carter Consultancy | Healthcare Training",
    template: "%s | Michelle Carter Consultancy",
  },
  description:
    "Professional healthcare training and consultancy services by Michelle Carter Consultancy.",
  openGraph: {
    title: "Michelle Carter Consultancy | Healthcare Training",
    description:
      "Professional healthcare training and consultancy services by Michelle Carter Consultancy.",
    type: "website",
    url: "https://michellecarter.ie",
    siteName: "Michelle Carter Consultancy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michelle Carter Consultancy | Healthcare Training",
    description:
      "Professional healthcare training and consultancy services by Michelle Carter Consultancy.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieNotice />
        <PrivacyAnalytics />
      </body>
    </html>
  );
}
