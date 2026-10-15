import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grow Tech | Web Development for Growing Small Businesses",
  description:
    "Fast, premium websites for small businesses that are scaling. Clear prices, you own everything, free site review. Book yours today.",
  openGraph: {
    title: "Grow Tech | Web Development for Growing Small Businesses",
    description:
      "Fast, premium websites for small businesses that are scaling. Clear prices, you own everything, free site review.",
    url: "https://growtech.in",
    siteName: "Grow Tech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
