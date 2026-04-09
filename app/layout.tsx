import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
// import ClientOnly from "./components/ClientOnly";
import AuthProvider from "@/lib/utils/AuthProvider";
import { cookies } from "next/headers";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  icons: {
    icon: "/assets/image/logo tap.svg",
  },
  keywords: [
    "همزة",
    "اختبار",
    "لغة عربية",
    "مجمع الملك سلمان",
    "قياس",
    "كفاية لغوية",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   // Read the cookie securely on the server
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA"; // Default to Arabic
  const direction = locale === "ar-SA" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>  {/*manage auth state for user*/}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
