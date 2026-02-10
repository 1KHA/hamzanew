import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import NavHeader from "./components/nav-header/NavHeader";
import ClientOnly from "./components/ClientOnly";
import Footer from "./components/footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Hamza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <ClientOnly>
          <NavHeader />
          {/* </ClientOnly> */}
          <main className="flex-1 w-full bg-white ">{children}</main>
          {/* <ClientOnly> */}
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
