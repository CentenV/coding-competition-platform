// ROOT LAYOUT //
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { background, primaryTextColor } from "./_components/globalstyle";
import "./globals.css";
import React from "react";
import ReactQueryClient from "./react_query_provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Competition Platform",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${background} ${primaryTextColor} p-4 h-screen w-screen flex flex-row gap-x-4 overflow-hidden`}>
          <ReactQueryClient>
            {children}
          </ReactQueryClient>
          <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      </body>
    </html>
  );
}
