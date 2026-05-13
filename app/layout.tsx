import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
// import ClientOnly from "./components/ClientOnly";
import AuthProvider from "@/lib/utils/AuthProvider";
import { cookies } from "next/headers";
import Script from "next/script";

const agentMonitoringScript = `
if (!RVBD_EUE) {
  var RVBD_EUE = {
    startJS: Number(new Date()),

    clientId: "",
    appId: 1,

    collector: "apm.ksaa.gov.sa",

    collectorHttpPort: 80,
    collectorHttpsPort: 443,

    sv: "0401",
  };

  (function () {
    var w = window,
      l = w.addEventListener,
      m = w.attachEvent,
      d = document,
      s = "script",
      t = "load",
      o = RVBD_EUE,
      z = "-1ec0805dd88c137a7d9b221342ef4c8b.",
      r =
        ("https:" === d.location.protocol ? "https" : "http") +
        "://jsi-cdn.steelcentral.net/riverbed_appinternals.d." +
        (o.ajax ? "ajax.js" : "js"),
      p = "onpagehide" in w,
      e = p ? "pageshow" : t,
      j = d.createElement(s),
      x = d.getElementsByTagName(s)[0],
      h = function (y) {
        o.ldJS = o.ldJS || new Date();
        o.per = y ? y.persisted : null;
      },
      i = function () {
        o.ld = 1;
      };
    o.cookie = d.cookie;
    d.cookie = "_op_aixPageId=0; path=/; expires=" + new Date(0).toGMTString();

    o.cookieAfterDelete = d.cookie;
    j.async = 1;
    j.src = r;

    if (l) {
      l(e, h, false);
      if (p) {
        l(t, i, false);
      }
    } else if (m) {
      m("on" + e, h);
      if (p) {
        m("on" + t, i);
      }
    }

    if (o.sync) {
      d.write("<" + s + " src='" + r + "'></" + s + ">");
    } else {
      x.parentNode.insertBefore(j, x);
    }
  })();
}
`


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
  // Read language from cookie to set html attributes
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const isArabic = locale === "ar-SA";
  const lang = isArabic ? "ar" : "en";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
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
        ` }} />
      </head>
      <body className="min-h-screen flex flex-col" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <AuthProvider>  {/*manage auth state for user*/}
          {children}
        </AuthProvider>
        
        {/* Riverbed AppInternals: Tracks key metrics (visits, top pages, user regions) for KSGAAL platforms */}
        <Script
          // id prevents duplicate execution on navigation
          id="agent-monitoring"
          // Loads after the page is interactive without blocking rendering
          strategy="lazyOnload"
          // Safely injects inline JS without React processing it
          dangerouslySetInnerHTML={{ __html: agentMonitoringScript }}
        />
      </body>
    </html>
  );
}
