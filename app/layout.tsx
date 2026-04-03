import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glassmorphism Finance Dashboard",
  description: "A soft glassmorphic financial dashboard",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* Soft Mesh Background behind everything */}
          <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40 dark:opacity-100">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 dark:bg-indigo-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-400/20 dark:bg-purple-600/20 blur-[130px] mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-teal-400/20 dark:bg-blue-800/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
          </div>

          <div className="flex min-h-screen relative z-10 pb-28 md:pb-0">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
          </div>
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
