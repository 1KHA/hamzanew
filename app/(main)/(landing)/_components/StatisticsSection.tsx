"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";

export default function StatisticsSection() {
  const router = useRouter();

  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="إحصائيات همزة"
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">همزة في أرقام</h2>
            <Button
              label="عرض الكل"
              variant="secondary-outline"
              size="md"
              onClick={() => router.push("/statistics-and-reports")}
            />
          </div>
          <p className="text-md-regular">
            يعرض قسم إحصائيات همزة بيانات عن عدد المختبرين عالميًا، وتنوّع
            الجنسيات والدول، إضافة إلى أعداد المختبرين في مراكز الاختبار.
          </p>
        </div>
        <div aria-label="الإحصائيات العامة">
          <GlobalStatisticsSection />
        </div>
      </section>
    </div>
  );
}
