import dynamic from "next/dynamic";
import Footer from "@/app/components/footer/Footer";
// import "@/app/globals.css";
import type { Metadata } from "next";
import { getTranslations } from "@/app/_lib/getTranslations";

// Wrap in dynamic() so React creates a Suspense boundary here.
// React 18 selective hydration lets it skip NavHeader's hydration and
// paint the hero section first, then come back to hydrate the nav.
const NavHeader = dynamic(() => import("@/app/components/nav-header/NavHeader"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "همزة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية، تقدم اختبارات قياس الكفاية اللغوية للناطقين بغيرها.",

  keywords: [
    "همزة",
    "اختبار",
    "لغة عربية",
    "مجمع الملك سلمان",
    "قياس",
    "كفاية لغوية",
  ],
};
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = await getTranslations();

  return (
    <>
      <NavHeader translations={translations} />
      <main className="flex-1 flex flex-col" style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
      <Footer />
    </>
  );
}
