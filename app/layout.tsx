import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // optional but recommended
});

export const metadata: Metadata = {
  title: "Gabriel Ferreira's Portfolio",
  description: "...", // add in a desc later, enhance metadata for SEO
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} `}>{children}</body>
    </html>
  );
}
