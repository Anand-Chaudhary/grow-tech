import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#080E09] text-[#F4FDF6]">
        {children}
      </body>
    </html>
  );
}
