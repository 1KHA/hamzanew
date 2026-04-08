import NavHeader from "@/app/components/nav-header/NavHeader";
import Footer from "@/app/components/footer/Footer";
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
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
