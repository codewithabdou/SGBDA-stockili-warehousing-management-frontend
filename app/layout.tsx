import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { ThemeProvider } from "@components/shared/Theme/theme-provider";
import Navbar from "@components/layout/Navbar";
import { Toaster } from "@components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stockili",
  description: "Warehousing management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen px-[5%]  pt-24">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
