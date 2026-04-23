import Link from "next/link";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSectionNative";

export default function StatisticsSection() {
  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="إحصائيات همزة"
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">همزة في أرقام</h2>
            <Link
              href="/statistics-and-reports"
              className="dga-btn dga-btn--md dga-btn--secondary-outline !flex !justify-center !items-center !p-4 !cursor-pointer"
            >
              <span className="dga-btn-label">عرض الكل</span>
            </Link>
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
