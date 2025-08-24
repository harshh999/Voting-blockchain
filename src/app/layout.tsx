import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoteChain - Blockchain Voting System",
  description: "Secure, transparent, and immutable voting platform built on blockchain technology. Revolutionizing democratic processes with cutting-edge security.",
  keywords: ["VoteChain", "blockchain", "voting", "election", "democracy", "security", "transparency", "Next.js", "TypeScript"],
  authors: [{ name: "VoteChain Team" }],
  openGraph: {
    title: "VoteChain - Blockchain Voting System",
    description: "Secure and transparent voting platform powered by blockchain technology",
    url: "https://votechain.example.com",
    siteName: "VoteChain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteChain - Blockchain Voting System",
    description: "Secure and transparent voting platform powered by blockchain technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
