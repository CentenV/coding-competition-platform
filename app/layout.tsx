// ROOT LAYOUT //
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { background, foreground, primaryTextColor } from "./_components/globalstyle";
import "./globals.css";
import React from "react";
import UniversalLayout from "./_components/universal_layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Competition Platform",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${background} ${primaryTextColor} p-4 h-screen flex flex-row`}>
        {children}
      </body>
    </html>
  );
}
