import type { Metadata } from "next";
import { m_plus_rounded_1c } from "@/store/fontStore";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Ling Fill",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon_2.ico" />
      </Head>
      <body className={` ${m_plus_rounded_1c.className}`}>
        {children}
      </body>
    </html>
  );
}
