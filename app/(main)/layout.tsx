import NavHeader from "../components/nav-header/NavHeader";
import Footer from "../components/footer/Footer";
import "@/app/globals.css";
import type { Metadata } from "next";
import { getTranslations } from "@/app/_lib/getTranslations";

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
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
