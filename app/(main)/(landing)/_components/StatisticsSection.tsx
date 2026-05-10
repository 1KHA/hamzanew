"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";

interface StatisticsSectionProps {
  translations?: Record<string, string> | null;
  countries?: { code: string; name: string }[];
}

export default function StatisticsSection({
  translations,
  countries,
}: StatisticsSectionProps) {
  const router = useRouter();

  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="إحصائيات همزة"
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">
              {translations?.["hamza-home-page-map-title"] || "همزة في أرقام"}
            </h2>
            <Button
              label="عرض الكل"
              variant="secondary-outline"
              size="md"
              onClick={() => router.push("/statistics-and-reports")}
            />
          </div>
          <p className="text-md-regular">
            {translations?.["hamza-home-page-map-institutions-description"] ||
              "يعرض قسم إحصائيات همزة بيانات عن عدد المختبرين عالميًا، وتنوّع الجنسيات والدول، إضافة إلى أعداد المختبرين في مراكز الاختبار."}
          </p>
        </div>
        <div aria-label="الإحصائيات العامة">
          <GlobalStatisticsSection
            translations={translations}
            countries={countries}
          />
        </div>
      </section>
    </div>
  );
}
