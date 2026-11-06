
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lemon Cafe | Online Ordering",
  description: "Lemon Cafe Management and Online Ordering System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

