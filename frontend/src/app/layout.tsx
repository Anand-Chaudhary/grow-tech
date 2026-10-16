import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grow Tech | Websites and apps that are built to grow with your business",
  description:
    "Websites and apps built to grow with your business. Custom design, high-performance web engineering, transparent pricing, and 100% full client ownership.",
  openGraph: {
    title: "Grow Tech | Websites and apps that are built to grow with your business",
    description:
      "Websites and apps built to grow with your business. Fast, premium web applications for growing small businesses.",
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
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6EC] text-[#16130F] font-sans selection:bg-[#3D9129]/20 selection:text-[#243629]">
        {children}
      </body>
    </html>
  );
}
