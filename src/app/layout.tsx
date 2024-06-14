import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Viewport } from 'next';
import LayoutClient from "./components/layout/LayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social media",
  description: "The best social media",
  icons:'/linear-icon.svg'
};

export const viewport: Viewport = {
 themeColor:'black',
 colorScheme:'dark'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
        </body>
    </html>
  );
}
