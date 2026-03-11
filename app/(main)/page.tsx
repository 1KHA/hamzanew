import type { ReactElement } from "react";
import type { Metadata } from "next";

import { SERVICES, PARTNERS } from "./(landing)/_data/homeData";
import { news } from "@/app/(main)/news/_data/newsData";

import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";
import PartnersSection from "./(landing)/_components/PartnersSection";
import SubscriptionSection from "./(landing)/_components/SubscriptionSection";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

export const metadata: Metadata = {
  title: "اختبار همزة - الرئيسة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
};

export default function LandingPage(): ReactElement {
  return (
    <>
      <Banner />

      <ScrollReveal>
        <ServicesSection services={SERVICES} />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSection articles={news} />
      </ScrollReveal>

      <ScrollReveal>
        <div className="bg-neutral-50">
          <section
            className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
            aria-label="إحصائيات همزة"
          >
            <div className="grid gap-[24px]">
              <div className="flex-between-center">
                <h2 className="display-sm-bold">همزة في أرقام</h2>
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
      </ScrollReveal>

      <ScrollReveal>
        <PartnersSection partners={PARTNERS} />
      </ScrollReveal>
      <ScrollReveal>
        <SubscriptionSection />
      </ScrollReveal>
    </>
  );
}
