import NavHeader from "../components/nav-header/NavHeader";
import ClientOnly from "../components/ClientOnly";
import Footer from "../components/footer/Footer";
import "@/app/globals.css";
import type { Metadata } from "next";

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
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
