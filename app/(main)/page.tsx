import type { ReactElement } from "react";
import type { Metadata } from "next";
import { SERVICES, PARTNERS } from "./(landing)/_data/homeData";
import { news } from "@/app/(main)/news/_data/newsData";

import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import StatisticsSection from "./(landing)/_components/StatisticsSection";
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
        <StatisticsSection />
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
