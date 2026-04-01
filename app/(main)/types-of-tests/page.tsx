import { Metadata } from "next";
import TypesOfTestsContent from "./TypesOfTestsContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./types-of-tests.css";

export const metadata: Metadata = {
  title: "أنواع اختبارات همزة",
  description:
    "قارن بين اختبارات همزة واختر الاختبار المناسب لك. تعرّف على تفاصيل كل اختبار وسجّل الآن.",
};

export default function TypesOfTestsPage() {
  return (
    <section className="bg-color-grey-50" aria-labelledby="comparison-title">
      <div className="content !py-[40px] md:!py-[80px] flex flex-col gap-[24px] md:gap-[32px]">
        <TypesOfTestsContent />
      </div>
    </section>
  );
}
