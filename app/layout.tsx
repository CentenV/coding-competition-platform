// ROOT LAYOUT //
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { background, foreground, primaryTextColor } from "./_components/globalstyle";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Competition Platform",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${background} ${primaryTextColor} p-4 h-screen flex flex-row`}>
        <nav className={"order-first basis-64 flex flex-col flex-none"}>
          <Link href={"/"} className={`${foreground}`}><Image className={`invert-0 dark:invert`} src={"/default/default_logo.png"} alt="Logo" width={873} height={476} priority /></Link>
        </nav>
        <div className={"order-last basis-full ml-4 flex-auto"}>
          {children} 
        </div>
      </body>
    </html>
  );
}
