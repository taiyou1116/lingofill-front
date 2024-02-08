import type { Metadata } from "next";
import { m_plus_rounded_1c } from "@/store/fontStore";
import "./globals.css";
import SidebarComponent from "@/components/SidebarComponent";
import HeaderComponent from "@/components/HeaderComponent";
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
      <body className={` flex w-screen h-screen ${m_plus_rounded_1c.className}`}>
        <SidebarComponent />
        <div className=" h-screen w-screen">
          <HeaderComponent />
          {/* コンテンツの中身 */}
          <div>{children}</div>
      </div>  
      </body>
    </html>
  );
}
