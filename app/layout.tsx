import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavHeader from "./components/NavHeader";
import ClientOnly from "./components/ClientOnly";
import Footer from "./components/Footer";
// import "./styles/platformscode-core.css";
// import "./styles/platformscode-main.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const ibmPlexArabic = localFont({
//   // This path is RELATIVE to this file (e.g., layout.tsx)
//   // src: "./public/assets/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Medium.woff2",
//   variable: "--font-ibm-plex-arabic",
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
    <html lang="en" dir="rtl">
    <body className="min-h-screen flex flex-col">
  <ClientOnly>
    <NavHeader />

    <main className="mx-auto flex-1 w-full">
      {children}
    </main>

    <Footer />
  </ClientOnly>
</body>
    </html>
  );
}
