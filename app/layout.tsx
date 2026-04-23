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
  const locale = cookieStore.get("lang")?.value || "ar"; // Default to Arabic
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* Preload all 4 font weights so the browser fetches them
            in parallel with CSS rather than waiting for CSS to be parsed first */}
        <link rel="preload" href="/assets/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Critical above-fold CSS — inlined to unblock hero paint before external CSS loads */}
        <style dangerouslySetInnerHTML={{ __html: `
          .c-mask{position:relative; overflow:hidden}
          .custom-banner{width:100%;height:100%;object-fit:cover;display:block}
          .overlay{position:absolute;inset:0;background:linear-gradient(to left,#104f34 10%,transparent 100%);display:flex;align-items:center;justify-content:flex-end}
          [dir="ltr"] .overlay{background:linear-gradient(to right,#104f34 10%,transparent 100%);justify-content:flex-start}
          .hero{z-index:2;color:#fff;max-width:1280px;text-align:right}
          [dir="ltr"] .hero{text-align:left}
          .hero h1{font-weight:700;margin-bottom:16px}
          .hero p{font-size:18px;line-height:1.6;margin-bottom:24px}
          .banner-logo{position:absolute;right:-120px;z-index:0;pointer-events:none;user-select:none}
          [dir="ltr"] .banner-logo{left:40px;right:auto}
          .banner-logo img{width:500px;height:auto}
          .embla__dots{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:12px;align-items:center}
          .embla__dot{width:12px;height:12px;border-radius:50%;background:#e5e7eb;border:none;cursor:pointer;transition:.3s}
          .embla__dot--selected{background:#1b8354}
          @keyframes spin{to{transform:rotate(360deg)}}
          .animate-spin-slow{animation:spin 8s linear infinite}
        ` }} />
      </head>
      <body className="min-h-screen flex flex-col" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <AuthProvider>  {/*manage auth state for user*/}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
