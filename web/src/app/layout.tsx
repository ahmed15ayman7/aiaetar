import type { Metadata } from "next";
import { Cairo, Montserrat, Open_Sans } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading-family",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body-en-family",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-body-ar-family",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "American Institute of Applied Education for Tourism & Administrative Research",
    template: "%s | American Institute",
  },
  description:
    "Excellence in applied training and research for tourism and administrative professions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${montserrat.variable} ${openSans.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
