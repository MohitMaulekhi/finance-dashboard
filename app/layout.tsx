import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to Next.js — Microsoft Internet Explorer",
  description: "Next.js starter page styled in authentic Windows 2000 / IE5 aesthetic",
};

export const viewport: Viewport = {
  themeColor: "#008080",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
